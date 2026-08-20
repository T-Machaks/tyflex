import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { getPortalSession } from "@/lib/auth";

type AdminCheck = { session: Session } | { response: NextResponse };

/** Shared guard for admin-only API routes (project tracker, billing) — keeps each route a one-liner. */
export async function requireAdminSession(): Promise<AdminCheck> {
  const session = await getPortalSession();
  if (!session) {
    return { response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  if (session.user.role !== "admin") {
    return { response: NextResponse.json({ error: "Forbidden." }, { status: 403 }) };
  }
  return { session };
}
