import crypto from "crypto";
import { getAppSecret } from "@/lib/portal/secret";

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string): string {
  return crypto.createHmac("sha256", getAppSecret()).update(data).digest("base64url");
}

/**
 * Creates a compact, tamper-evident, expiring token — used for password
 * reset links and (in local-dev storage mode) signed document download
 * links, standing in for what a real deployment would get "for free" from
 * S3 presigned URLs.
 */
export function createToken(payload: Record<string, string>, ttlSeconds: number): string {
  const body = { ...payload, exp: String(Date.now() + ttlSeconds * 1000) };
  const encoded = base64url(JSON.stringify(body));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

/** Verifies signature and expiry. Returns the payload if valid, otherwise null. */
export function verifyToken(token: string): Record<string, string> | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Record<string, string>;
    if (Number(payload.exp) < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
