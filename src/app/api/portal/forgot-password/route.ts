import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getUserByEmail } from "@/lib/portal/users";
import { createToken } from "@/lib/portal/tokens";
import { sendMail } from "@/lib/email";
import { COMPANY } from "@/lib/constants";

const schema = z.object({ email: z.string().trim().email() });

const RESET_TTL_SECONDS = 30 * 60; // 30 minutes

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const user = getUserByEmail(parsed.data.email);

  // Always respond with the same success message whether or not the email
  // matches an account — this avoids leaking which emails are registered.
  if (user) {
    const token = createToken({ email: user.email }, RESET_TTL_SECONDS);
    const resetUrl = `${COMPANY.url}/portal/reset-password?token=${encodeURIComponent(token)}`;

    try {
      await sendMail({
        to: user.email,
        subject: "Reset your Tyflex Document Portal password",
        html: `<p>Hi ${user.name},</p><p>We received a request to reset your Document Portal password. This link expires in 30 minutes:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, you can safely ignore this email.</p>`,
        text: `Hi ${user.name},\n\nWe received a request to reset your Document Portal password. This link expires in 30 minutes:\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
      });
    } catch (err) {
      // Don't fail the request on an email hiccup for a sensitive, enumeration-
      // resistant flow — we've already decided not to reveal success/failure per-email.
      console.error("Failed to send password reset email:", err);
    }
  }

  return NextResponse.json({
    ok: true,
    message: "If that email is on file, we've sent a password reset link.",
  });
}
