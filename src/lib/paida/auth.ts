import crypto from "crypto";
import { cookies } from "next/headers";
import { createToken, verifyToken } from "@/lib/portal/tokens";

export const ADMIN_COOKIE = "paida_admin";
export const SESSION_SECONDS = 12 * 60 * 60;

/** PAIDA_ADMIN_PASSWORD in production; a fixed dev password otherwise so local work needs no setup. */
function configuredPassword(): string | null {
  if (process.env.PAIDA_ADMIN_PASSWORD) return process.env.PAIDA_ADMIN_PASSWORD;
  return process.env.NODE_ENV === "production" ? null : "paida-dev";
}

export const adminConfigured = () => configuredPassword() !== null;

export function checkPassword(attempt: string): boolean {
  const expected = configuredPassword();
  if (!expected) return false;
  const a = crypto.createHash("sha256").update(attempt).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export const issueSession = () => createToken({ role: "paida-admin" }, SESSION_SECONDS);

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(token && verifyToken(token)?.role === "paida-admin");
}
