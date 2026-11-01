import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { deleteTribute, listAll, setTributeStatus } from "@/lib/paida/tributes";

const ID = /^[0-9a-f-]{36}$/i;

export async function GET() {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  return NextResponse.json({ ok: true, tributes: await listAll() });
}

/** Editors can approve or hide tributes. */
export async function PATCH(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  const { id, status } = (await req.json().catch(() => ({}))) as { id?: string; status?: string };
  if (!id || !ID.test(id) || !["pending", "approved", "hidden"].includes(String(status))) {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
  const t = await setTributeStatus(id, status as "pending" | "approved" | "hidden");
  if (t) {
    const verb = status === "approved" ? "approved" : status === "hidden" ? "hid" : "moved back to pending";
    await logActivity(gate.session, `${verb} a tribute from ${t.name}`);
  }
  revalidatePath("/paida");
  return NextResponse.json({ ok: Boolean(t) });
}

/** Deleting is Admin-only. */
export async function DELETE(req: Request) {
  const gate = await requireRole("admin");
  if (!gate.ok) return gate.res;
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  const name = await deleteTribute(id);
  await logActivity(gate.session, `deleted a tribute${name ? ` from ${name}` : ""}`);
  revalidatePath("/paida");
  return NextResponse.json({ ok: true });
}
