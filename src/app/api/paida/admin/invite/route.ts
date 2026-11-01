import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, cookieOptions, issueSession } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { allow, clientIp } from "@/lib/paida/ratelimit";
import { acceptInvite, passwordProblem } from "@/lib/paida/users";

/** Public: a person opens their one-time invite link and sets their own password. The link works once and expires after 48 hours. */
export async function POST(req: Request) {
  if (!allow(`invite:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Please wait a few minutes." }, { status: 429 });
  }
  const { token, password } = (await req.json().catch(() => ({}))) as { token?: string; password?: string };
  const problem = passwordProblem(String(password ?? ""));
  if (problem) return NextResponse.json({ ok: false, message: problem }, { status: 400 });

  const user = await acceptInvite(String(token ?? ""), String(password));
  if (!user) return NextResponse.json({ ok: false, message: "This invite link is invalid, already used, or has expired. Ask for a new one." }, { status: 410 });

  await logActivity({ id: user.id, name: user.name, role: user.role }, "accepted their invite and set a password");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, issueSession(user.id, user.sessionVersion), cookieOptions(SESSION_SECONDS));
  return res;
}
