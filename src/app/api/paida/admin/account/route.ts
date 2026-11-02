import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, cookieOptions, getSession, issueSession } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { allow, clientIp } from "@/lib/paida/ratelimit";
import { getUser, hashPassword, passwordProblem, updateUser, verifyPassword } from "@/lib/paida/users";

/** Change your own password. (The shared bootstrap owner login has none: its password is a server environment variable.) */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, message: "Please sign in again." }, { status: 401 });
  if (session.id === "owner") return NextResponse.json({ ok: false, message: "The shared owner login has no personal password. Add yourself as an Owner in the Team tab." }, { status: 400 });
  if (!allow(`pw:${session.id}:${clientIp(req)}`, 5, 10 * 60_000)) return NextResponse.json({ ok: false, message: "Too many attempts." }, { status: 429 });

  const { currentPassword, newPassword } = (await req.json().catch(() => ({}))) as { currentPassword?: string; newPassword?: string };
  const user = await getUser(session.id);
  if (!user || !(await verifyPassword(String(currentPassword ?? ""), user.passwordHash))) {
    return NextResponse.json({ ok: false, message: "Your current password is not right." }, { status: 400 });
  }
  const problem = passwordProblem(String(newPassword ?? ""));
  if (problem) return NextResponse.json({ ok: false, message: problem }, { status: 400 });

  // Bumping the session version signs out every other device; this one gets a fresh cookie.
  const updated = await updateUser(user.id, { passwordHash: await hashPassword(String(newPassword)), sessionVersion: user.sessionVersion + 1 });
  await logActivity(session, "changed their password");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, issueSession(user.id, updated!.sessionVersion), cookieOptions(SESSION_SECONDS));
  return res;
}
