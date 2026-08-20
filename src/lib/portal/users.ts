import bcrypt from "bcryptjs";
import type { PortalUser } from "@/lib/portal/types";

/**
 * In-memory demo user store, seeded on module load.
 *
 * This is a stand-in for the real user store — production would read/write
 * these through DynamoDB or Supabase (per the project's tech stack), keyed
 * by a real signup/admin-provisioning flow. Changes made here (e.g. a
 * password reset) persist only for the lifetime of this server process —
 * they reset on redeploy and aren't shared across serverless instances.
 */
const seedUsers: Omit<PortalUser, "passwordHash">[] = [
  {
    id: "usr_admin",
    name: "Tyflex Admin",
    email: "admin@tyflex.co.zw",
    role: "admin",
    company: null,
  },
  {
    id: "usr_tendai",
    name: "Tendai Moyo",
    email: "tendai@hararelogistics.co.zw",
    role: "client",
    company: "Harare Logistics Group",
  },
  {
    id: "usr_rutendo",
    name: "Rutendo Chikafu",
    email: "rutendo@zimbankretail.co.zw",
    role: "client",
    company: "Zimbank Retail Division",
  },
];

const seedPasswords: Record<string, string> = {
  "admin@tyflex.co.zw": "Admin123!",
  "tendai@hararelogistics.co.zw": "Client123!",
  "rutendo@zimbankretail.co.zw": "Client123!",
};

const usersByEmail = new Map<string, PortalUser>(
  seedUsers.map((user) => [
    user.email.toLowerCase(),
    { ...user, passwordHash: bcrypt.hashSync(seedPasswords[user.email], 10) },
  ])
);

export function getUserByEmail(email: string): PortalUser | undefined {
  return usersByEmail.get(email.trim().toLowerCase());
}

export function verifyCredentials(email: string, password: string): PortalUser | null {
  const user = getUserByEmail(email);
  if (!user) return null;
  return bcrypt.compareSync(password, user.passwordHash) ? user : null;
}

/** Returns false if no user with that email exists. */
export function updatePassword(email: string, newPassword: string): boolean {
  const user = getUserByEmail(email);
  if (!user) return false;
  user.passwordHash = bcrypt.hashSync(newPassword, 10);
  usersByEmail.set(user.email.toLowerCase(), user);
  return true;
}

export function listCompanies(): string[] {
  return Array.from(new Set(seedUsers.map((u) => u.company).filter((c): c is string => Boolean(c))));
}
