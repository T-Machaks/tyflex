import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, adminConfigured, checkOwnerPassword, cookieOptions, issueSession, ownerSessionVersion } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { allow, clearFailures, clientIp, lockRemaining, registerFailure } from "@/lib/paida/ratelimit";
import type { Role } from "@/lib/paida/roles";
import { findByIdentifier, normalizeIdentifier, updateUser, verifyPassword } from "@/lib/paida/users";

const fail = (message: string, status: number) => NextResponse.json({ ok: false, message }, { status });

/** Sign in with phone/email + password (or identifier "owner" + the PAIDA_ADMIN_PASSWORD bootstrap password). */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { identifier?: string; password?: string };
  const identifier = String(body.identifier ?? "").trim();
  const password = String(body.password ?? "");
  const ip = clientIp(req);

  const isOwner = identifier.toLowerCase() === "owner";
  const norm = normalizeIdentifier(identifier);
  const idKey = `login:id:${isOwner ? "owner" : norm.email || norm.phone || identifier.toLowerCase()}`;
  const ipKey = `login:ip:${ip}`;

  // Temporary lockout after repeated failures, per account name and per address.
  const locked = Math.max(lockRemaining(idKey), lockRemaining(ipKey));
  if (locked > 0) return fail(`Too many attempts. Please try again in ${Math.ceil(locked / 60_000)} minutes.`, 429);
  if (!allow(`login:rate:${ip}`, 30, 10 * 60_000)) return fail("Too many attempts. Please wait a few minutes.", 429);
  if (!identifier || !password) return fail("Enter your phone or email and your password.", 400);

  const wrong = () => {
    registerFailure(idKey, 5);
    registerFailure(ipKey, 15);
    return fail("Wrong phone/email or password.", 401);
  };

  let token: string;
  let who: { id: string; name: string; role: Role };

  if (isOwner) {
    if (!adminConfigured()) return fail("PAIDA_ADMIN_PASSWORD is not set on the server.", 503);
    if (!checkOwnerPassword(password)) return wrong();
    token = issueSession("owner", ownerSessionVersion());
    who = { id: "owner", name: "Owner", role: "owner" };
  } else {
    const user = await findByIdentifier(identifier);
    const ok = await verifyPassword(password, user?.passwordHash); // burns a compare even for unknown users
    if (!user || !user.passwordHash || !ok) return wrong();
    await updateUser(user.id, { lastLoginAt: new Date().toISOString() }).catch(() => null);
    token = issueSession(user.id, user.sessionVersion);
    who = { id: user.id, name: user.name, role: user.role };
  }

  clearFailures(idKey);
  await logActivity(who, "signed in");
  const res = NextResponse.json({ ok: true, role: who.role });
  res.cookies.set(ADMIN_COOKIE, token, cookieOptions(SESSION_SECONDS));
  return res;
}
