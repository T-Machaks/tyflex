import { SESClient, SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { COMPANY } from "@/lib/constants";

// ── Transport selection ──────────────────────────────────────────────────────
// Two transports are supported. Microsoft Graph (Exchange Online) is preferred
// when its four env vars are all present; otherwise AWS SES is used; otherwise
// (no transport configured) email is logged to the console in non-production
// and a hard error is thrown in production.

const REGION = process.env.AWS_REGION;

/** Microsoft Graph app-only credentials (Azure AD app registration with the
 * `Mail.Send` application permission granted admin consent). GRAPH_SENDER is
 * the mailbox the message is sent as/from — a real licensed or shared mailbox
 * in the tenant, e.g. no-reply@tyflex.co.zw. */
const GRAPH_TENANT_ID = process.env.GRAPH_TENANT_ID;
const GRAPH_CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const GRAPH_SENDER = process.env.GRAPH_SENDER;

const isGraphConfigured = Boolean(
  GRAPH_TENANT_ID && GRAPH_CLIENT_ID && GRAPH_CLIENT_SECRET && GRAPH_SENDER
);
const isSesConfigured = Boolean(REGION);

/** From address: the Graph mailbox when Graph is on, else the SES sending identity. */
const FROM_EMAIL = GRAPH_SENDER || process.env.SES_FROM_EMAIL || `no-reply@tyflex.co.zw`;
/** Business inbox that receives lead notifications. Transport-independent. */
const TO_EMAIL = process.env.SES_TO_EMAIL || COMPANY.email;

const sesClient = !isGraphConfigured && isSesConfigured ? new SESClient({ region: REGION }) : null;

const NO_TRANSPORT_ERROR =
  "No email transport configured — set GRAPH_TENANT_ID, GRAPH_CLIENT_ID, " +
  "GRAPH_CLIENT_SECRET and GRAPH_SENDER (Microsoft Graph), or AWS_REGION with " +
  "a verified SES_FROM_EMAIL (AWS SES).";

interface SendMailInput {
  subject: string;
  html: string;
  text: string;
  /** Set the submitter as reply-to so hitting "Reply" in the inbox goes straight to them. */
  replyTo?: string;
  /** Recipient override — defaults to the business inbox (SES_TO_EMAIL). Used for
   * user-facing emails like password resets, which must go to the user, not the business. */
  to?: string;
}

interface SendMailWithAttachmentInput extends SendMailInput {
  attachment: {
    filename: string;
    contentType: string;
    content: Buffer;
  };
}

function devLog(
  label: string,
  { to, replyTo, subject, text, attachment }: {
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
    attachment?: { filename: string; content: Buffer };
  }
): void {
  console.log(`\n[dev] ${label} — logging email instead of sending:`);
  console.log(`  To: ${to}`);
  console.log(`  From: ${FROM_EMAIL}`);
  console.log(`  Reply-To: ${replyTo ?? "(none)"}`);
  console.log(`  Subject: ${subject}`);
  if (attachment) console.log(`  Attachment: ${attachment.filename} (${attachment.content.length} bytes)`);
  console.log(`  ---\n${text}\n  ---\n`);
}

// ── Microsoft Graph transport ────────────────────────────────────────────────

let graphToken: { value: string; expiresAt: number } | null = null;

async function getGraphToken(): Promise<string> {
  if (graphToken && Date.now() < graphToken.expiresAt) return graphToken.value;

  const res = await fetch(
    `https://login.microsoftonline.com/${GRAPH_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: GRAPH_CLIENT_ID!,
        client_secret: GRAPH_CLIENT_SECRET!,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Graph token request failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  // Refresh a minute early to avoid using a token that expires mid-request.
  graphToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in - 60) * 1000 };
  return graphToken.value;
}

async function graphSendMail({
  subject,
  html,
  to,
  replyTo,
  attachment,
}: {
  subject: string;
  html: string;
  to: string;
  replyTo?: string;
  attachment?: { filename: string; contentType: string; content: Buffer };
}): Promise<void> {
  const token = await getGraphToken();

  const message: Record<string, unknown> = {
    subject,
    body: { contentType: "HTML", content: html },
    toRecipients: [{ emailAddress: { address: to } }],
  };
  if (replyTo) message.replyTo = [{ emailAddress: { address: replyTo } }];
  if (attachment) {
    message.attachments = [
      {
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: attachment.filename,
        contentType: attachment.contentType,
        contentBytes: attachment.content.toString("base64"),
      },
    ];
  }

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(GRAPH_SENDER!)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      // saveToSentItems:false keeps a transactional sender's mailbox clean; flip
      // to true if you want an audit trail in the mailbox's Sent Items.
      body: JSON.stringify({ message, saveToSentItems: false }),
    }
  );

  // A successful sendMail returns 202 Accepted with an empty body.
  if (!res.ok) {
    throw new Error(`Graph sendMail failed (${res.status}): ${await res.text()}`);
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Sends a notification email via Microsoft Graph or AWS SES (whichever is
 * configured — see "Transport selection" above).
 *
 * Microsoft Graph requires:
 *  - GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET
 *  - GRAPH_SENDER — a real mailbox in the tenant
 *  - the app registration holding the `Mail.Send` application permission with admin consent
 *
 * AWS SES requires:
 *  - AWS_REGION set
 *  - SES_FROM_EMAIL verified as a sending identity (or its domain verified)
 *  - ses:SendEmail on the runtime role / credentials
 *
 * With neither configured, this logs the email in non-production and throws in
 * production — we never tell a user "sent" when it wasn't.
 */
export async function sendMail({ subject, html, text, replyTo, to }: SendMailInput): Promise<void> {
  const recipient = to || TO_EMAIL;

  if (isGraphConfigured) {
    await graphSendMail({ subject, html, to: recipient, replyTo });
    return;
  }

  if (!sesClient) {
    if (process.env.NODE_ENV === "production") throw new Error(NO_TRANSPORT_ERROR);
    devLog("No email transport configured", { to: recipient, replyTo, subject, text });
    return;
  }

  await sesClient.send(
    new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [recipient] },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          Text: { Data: text, Charset: "UTF-8" },
        },
      },
    })
  );
}

/**
 * Sends an email with a single binary attachment (invoice PDFs).
 *
 * Microsoft Graph carries the attachment natively in the message JSON. SES has
 * no attachment support on its simple SendEmail API, so the SES path builds the
 * MIME multipart payload by hand rather than pull in a full mail-builder library.
 */
export async function sendMailWithAttachment({
  subject,
  html,
  text,
  replyTo,
  to,
  attachment,
}: SendMailWithAttachmentInput): Promise<void> {
  const recipient = to || TO_EMAIL;

  if (isGraphConfigured) {
    await graphSendMail({ subject, html, to: recipient, replyTo, attachment });
    return;
  }

  if (!sesClient) {
    if (process.env.NODE_ENV === "production") throw new Error(NO_TRANSPORT_ERROR);
    devLog("No email transport configured", { to: recipient, replyTo, subject, text, attachment });
    return;
  }

  const raw = buildRawMimeMessage({ from: FROM_EMAIL, to: recipient, replyTo, subject, html, text, attachment });

  await sesClient.send(
    new SendRawEmailCommand({
      Source: FROM_EMAIL,
      Destinations: [recipient],
      RawMessage: { Data: Buffer.from(raw, "utf-8") },
    })
  );
}

function buildRawMimeMessage(input: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachment: { filename: string; contentType: string; content: Buffer };
}): string {
  const mixedBoundary = `mixed-${Date.now().toString(36)}`;
  const altBoundary = `alt-${Date.now().toString(36)}-2`;
  const { from, to, replyTo, subject, html, text, attachment } = input;

  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
  ].filter(Boolean);

  const body = [
    `--${mixedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
    "",
    `--${altBoundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    text,
    "",
    `--${altBoundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    "",
    `--${altBoundary}--`,
    `--${mixedBoundary}`,
    `Content-Type: ${attachment.contentType}; name="${attachment.filename}"`,
    "Content-Transfer-Encoding: base64",
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    "",
    attachment.content.toString("base64").replace(/(.{76})/g, "$1\n"),
    "",
    `--${mixedBoundary}--`,
    "",
  ].join("\r\n");

  return `${headers.join("\r\n")}\r\n\r\n${body}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderKeyValueHtml(rows: [label: string, value: string][]): string {
  return `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
    ${rows
      .filter(([, value]) => value)
      .map(
        ([label, value]) => `<tr>
          <td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#0f172a;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
        </tr>`
      )
      .join("")}
  </table>`;
}

export function renderKeyValueText(rows: [label: string, value: string][]): string {
  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}
