import { NextRequest, NextResponse } from "next/server";
import { contactSchema, HONEYPOT_FIELD } from "@/lib/validation";
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, company, subject, message } = parsed.data;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
    ["Subject", subject || "General Inquiry"],
    ["Message", message],
  ];

  try {
    await sendMail({
      subject: `[Tyflex Website] New contact message from ${name}`,
      html: `<h2 style="font-family:sans-serif;">New contact form submission</h2>${renderKeyValueHtml(rows)}`,
      text: `New contact form submission\n\n${renderKeyValueText(rows)}`,
      replyTo: email,
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      {
        error: `We couldn't send your message right now. Please email us directly at ${COMPANY.email} or call ${COMPANY.phoneDisplay}.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
