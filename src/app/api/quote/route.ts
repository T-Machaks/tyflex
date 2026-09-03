import { NextRequest, NextResponse } from "next/server";
import { quoteSchema, HONEYPOT_FIELD } from "@/lib/validation";
import { renderKeyValueHtml, renderKeyValueText, sendMail } from "@/lib/email";
import { COMPANY } from "@/lib/constants";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill this hidden field get a fake success — no email sent.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, phone, company, companySize, industry, timeline, solutions, items, message } =
    parsed.data;

  const productLines = items.map(
    (it) => `${it.quantity} x ${it.brand ? `${it.brand} ` : ""}${it.name}`
  );

  const rows: [string, string][] = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone],
    ["Company", company],
    ["Company Size", companySize],
    ["Industry", industry],
    ["Timeline", timeline],
    ["Solutions Interested In", solutions.length ? solutions.join(", ") : "—"],
    ["Products Requested", productLines.length ? productLines.join("\n") : "—"],
    ["Message", message || "—"],
  ];

  const subjectSuffix = productLines.length
    ? ` — ${productLines.length} product${productLines.length === 1 ? "" : "s"}`
    : "";

  try {
    await sendMail({
      subject: `[Tyflex Website] New quote request from ${firstName} ${lastName} (${company})${subjectSuffix}`,
      html: `<h2 style="font-family:sans-serif;">New quote request</h2>${renderKeyValueHtml(rows)}`,
      text: `New quote request\n\n${renderKeyValueText(rows)}`,
      replyTo: email,
    });
  } catch (err) {
    console.error("Failed to send quote request email:", err);
    return NextResponse.json(
      {
        error: `We couldn't submit your request right now. Please email us directly at ${COMPANY.email} or call ${COMPANY.phoneDisplay}.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
