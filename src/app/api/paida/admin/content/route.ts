import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { loadContent, saveContent } from "@/lib/paida/content";
import type { PaymentMethod } from "@/lib/paida/schema";
import { EDITOR_CONTENT_FIELDS, FIELD_SECTION, atLeast } from "@/lib/paida/roles";

/** Which sections differ between two content documents, as readable names. */
function changedSections(prev: Record<string, unknown>, next: Record<string, unknown>): string[] {
  const out = new Set<string>();
  for (const [k, section] of Object.entries(FIELD_SECTION)) if (JSON.stringify(prev[k]) !== JSON.stringify(next[k])) out.add(section);
  return [...out];
}

// Fields that make up the account details people pay into. A change to any of these resets "last verified".
const PAYMENT_FIELDS: [keyof PaymentMethod, string][] = [
  ["flag", "country"], ["label", "name"], ["bank", "bank"], ["accountName", "account name"], ["number", "number"],
  ["branchSwift", "branch/SWIFT"], ["type", "account type"], ["details", "details"], ["link", "link"], ["linkLabel", "link label"], ["phone", "phone"],
];

const show = (v: unknown) => (v === "" || v === undefined || v === null ? "(empty)" : `"${String(v).replace(/\s*\n\s*/g, " / ")}"`);

type RawMethod = Partial<PaymentMethod> & { reverify?: boolean };

/**
 * Owner-only. Stamps "last verified" server-side (client-sent values are ignored) and returns
 * one readable log line per change, with old → new values.
 */
function stampAndDiffPayments(
  current: PaymentMethod[],
  incoming: RawMethod[],
  who: string,
  nowIso: string
): { methods: RawMethod[]; log: string[] } {
  const log: string[] = [];
  const byId = new Map(current.map((m) => [m.id, m]));
  const keptIds = new Set<string>();

  const methods = incoming.map((raw) => {
    const prev = raw.id ? byId.get(raw.id) : undefined;
    const { reverify, ...m } = raw;
    if (prev) keptIds.add(prev.id);
    const name = (m.label ?? prev?.label ?? "").trim() || "(unnamed)";

    if (!prev) {
      const filled = PAYMENT_FIELDS.filter(([k]) => m[k]).map(([k, label]) => `${label} ${show(m[k])}`).join(", ");
      log.push(`added payment method "${name}": ${filled || "no details yet"}`);
      return { ...m, verifiedBy: who, verifiedAt: nowIso };
    }

    const diffs = PAYMENT_FIELDS.filter(([k]) => String(m[k] ?? "") !== String(prev[k] ?? "")).map(([k, label]) => `${label} ${show(prev[k])} → ${show(m[k])}`);
    if (diffs.length) log.push(`changed payment method "${name}": ${diffs.join("; ")}`);
    if ((m.confirmerId ?? "") !== prev.confirmerId) log.push(`changed who confirms "${name}" (${prev.confirmerId || "nobody"} → ${m.confirmerId || "nobody"})`);

    if (diffs.length || reverify) {
      if (reverify && !diffs.length) log.push(`re-verified payment method "${name}"`);
      return { ...m, verifiedBy: who, verifiedAt: nowIso };
    }
    return { ...m, verifiedBy: prev.verifiedBy, verifiedAt: prev.verifiedAt };
  });

  for (const prev of current) {
    if (!keptIds.has(prev.id)) {
      const filled = PAYMENT_FIELDS.filter(([k]) => prev[k]).map(([k, label]) => `${label} ${show(prev[k])}`).join(", ");
      log.push(`removed payment method "${prev.label.trim() || "(unnamed)"}": ${filled}`);
    }
  }
  const order = (list: { id?: string }[]) => list.map((m) => m.id).filter((id) => keptIds.has(id as string)).join(",");
  if (order(current) !== order(methods) && keptIds.size > 1) log.push("changed the order of the payment methods");
  return { methods, log };
}

export async function PUT(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  const { session } = gate;

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const current = await loadContent();
    const isOwner = session.role === "owner";

    // Editors may only change About, program, updates, her story and gallery; Admins everything except
    // payment methods; only the Owner can change where people are asked to send money. Anything else
    // is taken from what is already saved, whatever the request says.
    let proposed: Record<string, unknown> = atLeast(session.role, "admin")
      ? { ...body }
      : { ...current, ...Object.fromEntries(EDITOR_CONTENT_FIELDS.filter((f) => f in body).map((f) => [f, body[f]])) };

    let paymentLog: string[] = [];
    if (isOwner && Array.isArray(body.paymentMethods)) {
      const r = stampAndDiffPayments(current.paymentMethods, body.paymentMethods as RawMethod[], session.name, new Date().toISOString());
      proposed.paymentMethods = r.methods;
      paymentLog = r.log;
    } else {
      proposed.paymentMethods = current.paymentMethods;
    }

    const content = await saveContent(proposed);
    const changed = changedSections(current as unknown as Record<string, unknown>, content as unknown as Record<string, unknown>);
    if (changed.length) await logActivity(session, `updated ${changed.join(", ")}`);
    for (const line of paymentLog) await logActivity(session, line);

    revalidatePath("/paida");
    revalidatePath("/paida/program");
    return NextResponse.json({ ok: true, content });
  } catch (err) {
    if (err instanceof ZodError) {
      const first = err.issues[0];
      return NextResponse.json({ ok: false, message: `${first.path.join(" › ")}: ${first.message}` }, { status: 400 });
    }
    console.error("[paida] save failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save. Check storage (S3) settings." }, { status: 500 });
  }
}
