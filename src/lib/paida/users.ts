import crypto, { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { intlDigits } from "./util";
import { deleteObject, getObject, listKeys, putObject } from "./store";
import type { Role, TeamMember } from "./roles";

/**
 * Admin users and one-time invites, stored in S3 under paida/admin/ (dev: .paida-data/).
 * Passwords are bcrypt hashes; invite tokens are stored only as SHA-256 hashes.
 * The Owner is not stored here: it is the PAIDA_ADMIN_PASSWORD bootstrap login (see auth.ts).
 */
export interface StoredUser {
  id: string;
  name: string;
  phone: string; // normalised international digits, or ""
  email: string; // lower-case, or ""
  role: Role;
  passwordHash: string; // "" until the invite is accepted
  sessionVersion: number; // bumped to end every existing session
  createdAt: string;
  lastLoginAt?: string;
}

interface StoredInvite {
  hash: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
}

export const INVITE_TTL_MS = 48 * 60 * 60 * 1000;
export const MIN_PASSWORD = 10;
const BCRYPT_COST = 12;

const userKey = (id: string) => `admin/users/${id}.json`;
const inviteKey = (hash: string) => `admin/invites/${hash}.json`;
const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

const parse = <T>(buf: Buffer | null): T | null => (buf ? (JSON.parse(buf.toString("utf8")) as T) : null);

// ── identifiers ──────────────────────────────────────────────────────────────

/** Email → lower-case; anything else → international phone digits (bare 0… is Zimbabwe). */
export function normalizeIdentifier(input: string): { phone: string; email: string } {
  const v = input.trim();
  if (v.includes("@")) return { phone: "", email: v.toLowerCase() };
  return { phone: intlDigits(v), email: "" };
}

// ── users ────────────────────────────────────────────────────────────────────

export async function listUsers(): Promise<StoredUser[]> {
  const keys = (await listKeys("admin/users/")).filter((k) => k.endsWith(".json"));
  const users = await Promise.all(keys.map(async (k) => parse<StoredUser>(await getObject(k))));
  return users.filter((u): u is StoredUser => u !== null);
}

export async function getUser(id: string): Promise<StoredUser | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  return parse<StoredUser>(await getObject(userKey(id)));
}

export async function findByIdentifier(identifier: string): Promise<StoredUser | null> {
  const { phone, email } = normalizeIdentifier(identifier);
  if (!phone && !email) return null;
  return (await listUsers()).find((u) => (email && u.email === email) || (phone && u.phone === phone)) ?? null;
}

async function saveUser(u: StoredUser) {
  await putObject(userKey(u.id), JSON.stringify(u), "application/json");
}

export async function createUser(input: { name: string; phone: string; email: string; role: Role }): Promise<StoredUser> {
  const { phone } = normalizeIdentifier(input.phone);
  const email = input.email.trim().toLowerCase();
  const user: StoredUser = {
    id: randomUUID(),
    name: input.name.trim(),
    phone,
    email,
    role: input.role,
    passwordHash: "",
    sessionVersion: 1,
    createdAt: new Date().toISOString(),
  };
  await saveUser(user);
  return user;
}

export async function updateUser(id: string, patch: Partial<Omit<StoredUser, "id">>): Promise<StoredUser | null> {
  const u = await getUser(id);
  if (!u) return null;
  const next = { ...u, ...patch };
  await saveUser(next);
  return next;
}

/** Removes the person and every invite for them. Their sessions stop working immediately (the user record is gone). */
export async function deleteUser(id: string): Promise<void> {
  await deleteInvitesFor(id);
  await deleteObject(userKey(id));
}

// ── passwords ────────────────────────────────────────────────────────────────

export function passwordProblem(pw: string): string | null {
  if (pw.length < MIN_PASSWORD) return `Use at least ${MIN_PASSWORD} characters.`;
  if (Buffer.byteLength(pw, "utf8") > 72) return "That password is too long (72 bytes max).";
  if (/^(.)\1+$/.test(pw)) return "Please choose a less repetitive password.";
  return null;
}

export const hashPassword = (pw: string) => bcrypt.hash(pw, BCRYPT_COST);

let dummyHash: string | null = null;
/** Verifies against a hash; with no real hash it still burns a bcrypt compare so timing doesn't reveal unknown users. */
export async function verifyPassword(pw: string, hash: string | undefined): Promise<boolean> {
  if (!hash) {
    dummyHash ??= await bcrypt.hash("not-a-real-password", BCRYPT_COST);
    await bcrypt.compare(pw, dummyHash);
    return false;
  }
  return bcrypt.compare(pw, hash);
}

// ── invites ──────────────────────────────────────────────────────────────────

async function deleteInvitesFor(userId: string) {
  const keys = (await listKeys("admin/invites/")).filter((k) => k.endsWith(".json"));
  await Promise.all(
    keys.map(async (k) => {
      const inv = parse<StoredInvite>(await getObject(k));
      if (inv?.userId === userId) await deleteObject(k);
    })
  );
}

/** Creates a fresh one-time invite (48h), replacing any earlier one for that person. Returns the raw token — shown once, never stored. */
export async function createInvite(userId: string): Promise<{ token: string; expiresAt: string }> {
  await deleteInvitesFor(userId);
  const token = crypto.randomBytes(32).toString("base64url");
  const now = Date.now();
  const invite: StoredInvite = {
    hash: sha(token),
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + INVITE_TTL_MS).toISOString(),
  };
  await putObject(inviteKey(invite.hash), JSON.stringify(invite), "application/json");
  return { token, expiresAt: invite.expiresAt };
}

export async function lookupInvite(token: string): Promise<{ user: StoredUser; expiresAt: string } | null> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return null;
  const inv = parse<StoredInvite>(await getObject(inviteKey(sha(token))));
  if (!inv || new Date(inv.expiresAt).getTime() < Date.now()) return null;
  const user = await getUser(inv.userId);
  return user ? { user, expiresAt: inv.expiresAt } : null;
}

/** Sets the person's own password, burns the invite, and starts a new session generation. */
export async function acceptInvite(token: string, password: string): Promise<StoredUser | null> {
  const found = await lookupInvite(token);
  if (!found) return null;
  await deleteObject(inviteKey(sha(token)));
  return updateUser(found.user.id, { passwordHash: await hashPassword(password), sessionVersion: found.user.sessionVersion + 1 });
}

/** Clears the password, ends all sessions and issues a new invite — for "reset access". */
export async function resetAccess(userId: string): Promise<{ token: string; expiresAt: string } | null> {
  const u = await getUser(userId);
  if (!u) return null;
  await updateUser(userId, { passwordHash: "", sessionVersion: u.sessionVersion + 1 });
  return createInvite(userId);
}

export async function listTeam(): Promise<TeamMember[]> {
  const [users, inviteKeys] = await Promise.all([listUsers(), listKeys("admin/invites/")]);
  const invites = (await Promise.all(inviteKeys.filter((k) => k.endsWith(".json")).map(async (k) => parse<StoredInvite>(await getObject(k))))).filter(
    (i): i is StoredInvite => i !== null
  );
  return users
    .map((u) => {
      const inv = invites.find((i) => i.userId === u.id);
      return {
        id: u.id,
        name: u.name,
        phone: u.phone,
        email: u.email,
        role: u.role,
        status: u.passwordHash ? ("active" as const) : ("invited" as const),
        inviteExpiresAt: inv?.expiresAt ?? null,
        createdAt: u.createdAt,
        lastLoginAt: u.lastLoginAt ?? null,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
