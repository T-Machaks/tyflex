import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import {
  contributionFields,
  createContribution,
  deleteContribution,
  getContribution,
  listContributions,
  parsePatch,
  resolveMethod,
  toCsv,
  updateContribution,
} from "@/lib/paida/contributions";
import { loadContent, usableMethods } from "@/lib/paida/content";
import { rebuildFeed } from "@/lib/paida/feed";
import { listUsers } from "@/lib/paida/users";

// Everything here is Admin-or-above: Editors never see amounts, phones, references, totals or the export.
const ID = /^[0-9a-f-]{36}$/i;
const noStore = { "Cache-Control": "no-store" };

function zodMessage(err: ZodError) {
  const i = err.issues[0];
  return `${i.path.join(" › ") || "form"}: ${i.message}`;
}

const refresh = async () => {
  await rebuildFeed();
  revalidatePath("/paida");
};

export async function GET(req: Request) {
  const gate = await requireRole("admin");
  if (!gate.ok) return gate.res;
  const items = await listContributions();
  if (new URL(req.url).searchParams.get("format") === "csv") {
    await logActivity(gate.session, "exported the contributions CSV");
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(toCsv(items), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="paida-contributions-${stamp}.csv"`,
        ...noStore,
      },
    });
  }
  // Channels (saved payment methods + Cash/Other) with who confirms each, for the filter and forms.
  const [content, users] = await Promise.all([loadContent(), listUsers()]);
  const names = new Map<string, string>([["owner", "Owner"], ...users.map((u): [string, string] => [u.id, u.name])]);
  const methods = [
    ...usableMethods(content).map((m) => ({ id: m.id, label: m.label.trim(), confirmerId: m.confirmerId, confirmerName: names.get(m.confirmerId) ?? "" })),
    { id: "cash", label: "Cash", confirmerId: "", confirmerName: "" },
    { id: "other", label: "Other", confirmerId: "", confirmerName: "" },
  ];
  return NextResponse.json({ ok: true, contributions: items, methods }, { headers: noStore });
}

/** Add a contribution by hand (e.g. cash handed over in person). Confirmed by default. */
export async function POST(req: Request) {
  const gate = await requireRole("admin");
  if (!gate.ok) return gate.res;
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const input = contributionFields.parse(body);
    const method = resolveMethod(await loadContent(), input.method);
    if (!method) return NextResponse.json({ ok: false, message: "method: choose one of the saved payment methods, Cash or Other" }, { status: 400 });
    input.methodLabel = method.label;
    const status = ["pending", "confirmed", "rejected"].includes(String(body.status)) ? (body.status as "pending" | "confirmed" | "rejected") : "confirmed";
    const note = typeof body.note === "string" ? body.note.slice(0, 300) : "";
    const created = await createContribution(input, { source: "manual", status, note });
    await logActivity(gate.session, `added a ${status} contribution from ${created.name} by hand`);
    await refresh();
    return NextResponse.json({ ok: true, contribution: created });
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json({ ok: false, message: zodMessage(err) }, { status: 400 });
    console.error("[paida] add contribution failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const gate = await requireRole("admin");
  if (!gate.ok) return gate.res;
  try {
    const { id, patch } = (await req.json()) as { id?: string; patch?: unknown };
    if (!id || !ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
    const parsed = parsePatch(patch);
    if (parsed.method !== undefined) {
      const method = resolveMethod(await loadContent(), parsed.method);
      if (!method) return NextResponse.json({ ok: false, message: "method: choose one of the saved payment methods, Cash or Other" }, { status: 400 });
      parsed.methodLabel = method.label;
    }
    const updated = await updateContribution(id, parsed);
    if (updated) {
      const what =
        parsed.status === "confirmed" ? "confirmed a contribution from"
        : parsed.status === "rejected" ? "rejected a contribution from"
        : parsed.status === "pending" ? "moved a contribution back to pending from"
        : "edited a contribution from";
      await logActivity(gate.session, `${what} ${updated.name}`);
    }
    await refresh();
    return NextResponse.json({ ok: Boolean(updated), contribution: updated });
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json({ ok: false, message: zodMessage(err) }, { status: 400 });
    console.error("[paida] update contribution failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const gate = await requireRole("admin");
  if (!gate.ok) return gate.res;
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  const c = await getContribution(id);
  await deleteContribution(id);
  await logActivity(gate.session, `deleted a contribution record${c ? ` from ${c.name}` : ""}`);
  await refresh();
  return NextResponse.json({ ok: true });
}
