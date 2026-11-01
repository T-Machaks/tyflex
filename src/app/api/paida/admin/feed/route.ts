import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { addManual, deleteManual, listFeedAdmin, rebuildFeed, setHidden, updateManual } from "@/lib/paida/feed";

// Editors and above manage the public notification feed. This API only ever returns names,
// optional lines and times — never amounts, methods, phones, references or messages.
const ID = /^[0-9a-f-]{36}$/i;
const noStore = { "Cache-Control": "no-store" };

const refresh = async () => {
  await rebuildFeed();
  revalidatePath("/paida");
};

export async function GET() {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  return NextResponse.json({ ok: true, items: await listFeedAdmin() }, { headers: noStore });
}

/** Post a notification directly (cash at the funeral, a WhatsApp to Rufaro…). Not tied to any payment record. */
export async function POST(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  const body = (await req.json().catch(() => ({}))) as { name?: string; line?: string; at?: string };
  const item = await addManual({ name: String(body.name ?? ""), line: String(body.line ?? ""), at: body.at });
  if (!item) return NextResponse.json({ ok: false, message: "Please enter a name or group." }, { status: 400 });
  await logActivity(gate.session, `posted a notification for ${item.name}`);
  await refresh();
  return NextResponse.json({ ok: true, item });
}

/** Hide/show any entry; edit the wording of manual ones. */
export async function PATCH(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  const b = (await req.json().catch(() => ({}))) as { source?: string; id?: string; hidden?: boolean; name?: string; line?: string };
  if ((b.source !== "manual" && b.source !== "contribution") || !b.id || !ID.test(b.id)) {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
  let name: string | null = null;
  if (typeof b.hidden === "boolean") name = await setHidden(b.source, b.id, b.hidden);
  if (b.source === "manual" && (b.name !== undefined || b.line !== undefined)) {
    name = (await updateManual(b.id, { name: b.name, line: b.line }))?.name ?? name;
  }
  if (name) {
    await logActivity(gate.session, typeof b.hidden === "boolean" ? `${b.hidden ? "hid" : "showed"} the notification for ${name}` : `edited the notification for ${name}`);
  }
  await refresh();
  return NextResponse.json({ ok: Boolean(name) });
}

/**
 * Delete a manual notification. For one that came from a recorded contribution this only
 * removes it from the public feed (it is hidden); the private record is untouched.
 */
export async function DELETE(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  const url = new URL(req.url);
  const source = url.searchParams.get("source");
  const id = url.searchParams.get("id") ?? "";
  if ((source !== "manual" && source !== "contribution") || !ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });

  const existing = (await listFeedAdmin()).find((i) => i.source === source && i.id === id);
  if (source === "manual") await deleteManual(id);
  else await setHidden("contribution", id, true);
  if (existing) await logActivity(gate.session, `${source === "manual" ? "deleted" : "removed"} the notification for ${existing.name}`);
  await refresh();
  return NextResponse.json({ ok: true });
}
