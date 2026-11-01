import crypto from "crypto";
import { cookies } from "next/headers";
import { createToken, verifyToken } from "@/lib/portal/tokens";
import { atLeast, type Role } from "./roles";
import { getUser } from "./users";

export const ADMIN_COOKIE = "paida_admin";
export const SESSION_SECONDS = 12 * 60 * 60;

export interface Session {
  id: string; // "owner" or a user id
  name: string;
  role: Role;
}

/**
 * The Owner is the PAIDA_ADMIN_PASSWORD bootstrap login (identifier "owner").
 * In dev with it unset, the owner password is "paida-dev".
 */
function ownerPassword(): string | null {
  if (process.env.PAIDA_ADMIN_PASSWORD) return process.env.PAIDA_ADMIN_PASSWORD;
  return process.env.NODE_ENV === "production" ? null : "paida-dev";
}

export const adminConfigured = () => ownerPassword() !== null;

export function checkOwnerPassword(attempt: string): boolean {
  const expected = ownerPassword();
  if (!expected) return false;
  const a = crypto.createHash("sha256").update(attempt).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

/** Owner sessions are tied to the current env password, so rotating it signs the owner out everywhere. */
export const ownerSessionVersion = () => crypto.createHash("sha256").update(ownerPassword() ?? "").digest("hex").slice(0, 12);

export const issueSession = (uid: string, version: string | number) =>
  createToken({ uid, sv: String(version) }, SESSION_SECONDS);

export const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge,
});

/**
 * Resolves the signed-in person from the cookie, re-checking the user store on every request,
 * so removing someone, resetting their access or changing their role takes effect immediately.
 */
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  const payload = token ? verifyToken(token) : null;
  if (!payload?.uid) return null;

  if (payload.uid === "owner") {
    if (!ownerPassword() || payload.sv !== ownerSessionVersion()) return null;
    return { id: "owner", name: "Owner", role: "owner" };
  }
  const user = await getUser(payload.uid);
  if (!user || !user.passwordHash || String(user.sessionVersion) !== payload.sv) return null;
  return { id: user.id, name: user.name, role: user.role };
}

type Gate = { ok: true; session: Session } | { ok: false; res: Response };

/** Server-side role gate for API routes: 401 if not signed in, 403 if the role is too low. */
export async function requireRole(min: Role): Promise<Gate> {
  const session = await getSession();
  if (!session) return { ok: false, res: Response.json({ ok: false, message: "Please sign in again." }, { status: 401 }) };
  if (!atLeast(session.role, min)) {
    return { ok: false, res: Response.json({ ok: false, message: "You don't have permission to do that." }, { status: 403 }) };
  }
  return { ok: true, session };
}
