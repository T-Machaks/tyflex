import { NextResponse } from "next/server";
import { requireRole } from "@/lib/paida/auth";
import { listActivity } from "@/lib/paida/activity";

/** Who did what and when — visible to Owner and Admin only. */
export async function GET() {
  const gate = await requireRole("admin");
  if (!gate.ok) return gate.res;
  return NextResponse.json({ ok: true, entries: await listActivity(200) }, { headers: { "Cache-Control": "no-store" } });
}
