const hits = new Map<string, number[]>();

/**
 * In-memory sliding-window limiter. Best-effort only: each server instance keeps
 * its own counts, which is plenty to blunt casual spam on a family page.
 * Returns true if the call is allowed.
 */
export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return true;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

// ── login lockout ───────────────────────────────────────────────────────────

const failures = new Map<string, { times: number[]; lockedUntil: number }>();

/** Milliseconds left on a temporary lockout for this key (0 if not locked). */
export function lockRemaining(key: string): number {
  const f = failures.get(key);
  return f && f.lockedUntil > Date.now() ? f.lockedUntil - Date.now() : 0;
}

/** Records a failed attempt; after `max` failures inside `windowMs` the key is locked for `lockMs`. */
export function registerFailure(key: string, max = 5, windowMs = 15 * 60_000, lockMs = 15 * 60_000): void {
  const now = Date.now();
  const f = failures.get(key) ?? { times: [], lockedUntil: 0 };
  f.times = f.times.filter((t) => now - t < windowMs);
  f.times.push(now);
  if (f.times.length >= max) {
    f.lockedUntil = now + lockMs;
    f.times = [];
  }
  failures.set(key, f);
  if (failures.size > 5000) for (const [k, v] of failures) if (v.lockedUntil < now && v.times.length === 0) failures.delete(k);
}

export const clearFailures = (key: string) => void failures.delete(key);
