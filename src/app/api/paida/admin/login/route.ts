import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, adminConfigured, checkPassword, issueSession } from "@/lib/paida/auth";
import { allow, clientIp } from "@/lib/paida/ratelimit";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, message: "PAIDA_ADMIN_PASSWORD is not set on the server." }, { status: 503 });
  }
  if (!allow(`paida-login:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (!checkPassword(String(body.password ?? ""))) {
    return NextResponse.json({ ok: false, message: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, issueSession(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return res;
}
