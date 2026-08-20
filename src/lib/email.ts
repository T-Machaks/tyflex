import { SESClient, SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { COMPANY } from "@/lib/constants";

const REGION = process.env.AWS_REGION;
const FROM_EMAIL = process.env.SES_FROM_EMAIL || `no-reply@tyflex.co.zw`;
const TO_EMAIL = process.env.SES_TO_EMAIL || COMPANY.email;

const isSesConfigured = Boolean(REGION);

const sesClient = isSesConfigured ? new SESClient({ region: REGION }) : null;

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

/**
 * Sends a notification email via AWS SES.
 *
 * In production this requires:
 *  - AWS_REGION set
 *  - SES_FROM_EMAIL verified as a sending identity (or its domain verified) in SES
 *  - IAM permissions for ses:SendEmail on the runtime role (Amplify SSR compute role)
 *
 * Locally / in any non-production environment without AWS_REGION configured, this
 * logs the email to the console instead of sending, so forms remain testable without
 * live AWS credentials. In production, a real send failure is thrown to the caller —
 * we never want to tell a user "sent" when it wasn't.
 */
export async function sendMail({ subject, html, text, replyTo, to }: SendMailInput): Promise<void> {
  const recipient = to || TO_EMAIL;

  if (!sesClient) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SES is not configured — set AWS_REGION, SES_FROM_EMAIL, and SES_TO_EMAIL in the environment."
      );
    }
    // Local/dev fallback: no live AWS credentials — log instead of sending.
    console.log("\n[dev] SES not configured — logging email instead of sending:");
    console.log(`  To: ${recipient}`);
    console.log(`  From: ${FROM_EMAIL}`);
    console.log(`  Reply-To: ${replyTo ?? "(none)"}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  ---\n${text}\n  ---\n`);
    return;
  }

  const command = new SendEmailCommand({
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
  });

  await sesClient.send(command);
}

interface SendMailWithAttachmentInput extends SendMailInput {
  attachment: {
    filename: string;
    contentType: string;
    content: Buffer;
  };
}

/**
 * Sends an email with a single binary attachment (invoice PDFs) via SES's
 * SendRawEmailCommand. SES's simple SendEmailCommand has no attachment
 * support, so this builds the MIME multipart payload by hand rather than
 * pull in a full mail-builder library (e.g. nodemailer) for one use case —
 * SES is still the only email transport in the app.
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

  if (!sesClient) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SES is not configured — set AWS_REGION, SES_FROM_EMAIL, and SES_TO_EMAIL in the environment."
      );
    }
    console.log("\n[dev] SES not configured — logging email instead of sending:");
    console.log(`  To: ${recipient}`);
    console.log(`  From: ${FROM_EMAIL}`);
    console.log(`  Reply-To: ${replyTo ?? "(none)"}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Attachment: ${attachment.filename} (${attachment.content.length} bytes)`);
    console.log(`  ---\n${text}\n  ---\n`);
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
