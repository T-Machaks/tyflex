import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyToken } from "@/lib/portal/tokens";
import { getUserByEmail, updatePassword } from "@/lib/portal/users";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const INVALID_LINK_MESSAGE = "This reset link is invalid or has expired. Please request a new one.";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid request." }, { status: 400 });
  }

  const payload = verifyToken(parsed.data.token);
  const email = payload?.email;
  if (!email) {
    return NextResponse.json({ error: INVALID_LINK_MESSAGE }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: INVALID_LINK_MESSAGE }, { status: 400 });
  }

  updatePassword(user.email, parsed.data.password);

  return NextResponse.json({ ok: true });
}
