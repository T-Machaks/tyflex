import { randomUUID } from "crypto";
import { z } from "zod";
import { FIXED_METHODS, type Contribution } from "./contribution-constants";
import type { PaidaContent } from "./schema";
import { usableMethods } from "./content";
import { deleteObject, getObject, listKeys, putObject } from "./store";

/**
 * One JSON object per contribution (contributions/<id>.json), same pattern as tributes.
 * Everything in here is PRIVATE. The public page only ever reads the notification feed
 * (see feed.ts), which holds display names of confirmed, opted-in contributors and nothing else.
 */

// eslint-disable-next-line no-control-regex
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
const str = (max: number, min = 0) => z.string().transform(clean).pipe(z.string().min(min).max(max));

/** Fields a contributor (or the admin, for manual entries) may supply. */
export const contributionFields = z.object({
  name: str(80, 1),
  phone: str(30).default(""),
  amount: z.coerce.number().positive().max(10_000_000).transform((n) => Math.round(n * 100) / 100),
  currency: z
    .string()
    .transform((s) => clean(s).toUpperCase())
    .pipe(z.string().regex(/^[A-Z0-9]{2,10}$/, "Enter a currency code, e.g. USD")),
  method: str(64, 1),
  methodLabel: str(80).default(""),
  reference: str(80).default(""),
  dateSent: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  relationship: str(40).default(""),
  message: str(600).default(""),
  showName: z.boolean().default(true),
});

export type ContributionInput = z.infer<typeof contributionFields>;

const key = (id: string) => `contributions/${id}.json`;

export async function listContributions(): Promise<Contribution[]> {
  const keys = (await listKeys("contributions/")).filter((k) => k.endsWith(".json"));
  const all = await Promise.all(
    keys.map(async (k) => {
      const buf = await getObject(k);
      return buf ? (JSON.parse(buf.toString("utf8")) as Contribution) : null;
    })
  );
  return all.filter((c): c is Contribution => c !== null).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createContribution(
  input: ContributionInput,
  opts: { source: "web" | "manual"; status?: Contribution["status"]; note?: string } = { source: "web" }
): Promise<Contribution> {
  const c: Contribution = {
    id: randomUUID(),
    ...input,
    status: opts.status ?? "pending",
    source: opts.source,
    note: opts.note ?? "",
    createdAt: new Date().toISOString(),
  };
  if (c.status === "confirmed") c.confirmedAt = c.createdAt;
  await putObject(key(c.id), JSON.stringify(c), "application/json");
  return c;
}

export const contributionPatch = contributionFields
  .partial()
  .extend({ status: z.enum(["pending", "confirmed", "rejected"]).optional(), note: str(300).optional(), feedHidden: z.boolean().optional() });

/**
 * Validates a partial update. Zod applies field defaults to missing keys even under
 * .partial(), which would silently blank stored fields — so only keys that were
 * actually sent are kept.
 */
export function parsePatch(raw: unknown): z.infer<typeof contributionPatch> {
  const parsed = contributionPatch.parse(raw);
  const sent = raw && typeof raw === "object" ? Object.keys(raw) : [];
  return Object.fromEntries(Object.entries(parsed).filter(([k]) => sent.includes(k)));
}

export async function updateContribution(id: string, patch: z.infer<typeof contributionPatch>): Promise<Contribution | null> {
  const buf = await getObject(key(id));
  if (!buf) return null;
  const prev = JSON.parse(buf.toString("utf8")) as Contribution;
  const next = { ...prev, ...patch, id };
  if (next.status === "confirmed" && prev.status !== "confirmed") next.confirmedAt = new Date().toISOString();
  await putObject(key(id), JSON.stringify(next), "application/json");
  return next;
}

export async function getContribution(id: string): Promise<Contribution | null> {
  const buf = await getObject(key(id));
  return buf ? (JSON.parse(buf.toString("utf8")) as Contribution) : null;
}

export async function deleteContribution(id: string): Promise<void> {
  await deleteObject(key(id));
}

// ── CSV export ──────────────────────────────────────────────────────────────

const COLUMNS: [string, (c: Contribution) => string | number | boolean][] = [
  ["Received", (c) => c.createdAt],
  ["Status", (c) => c.status],
  ["Name", (c) => c.name],
  ["Phone", (c) => c.phone],
  ["Amount", (c) => c.amount],
  ["Currency", (c) => c.currency],
  ["Method", (c) => c.methodLabel || c.method],
  ["Reference", (c) => c.reference],
  ["Date sent", (c) => c.dateSent],
  ["Relationship", (c) => c.relationship],
  ["Message", (c) => c.message],
  ["Show name on thank-you list", (c) => (c.showName ? "yes" : "no")],
  ["Source", (c) => c.source],
  ["Internal note", (c) => c.note],
  ["ID", (c) => c.id],
];

function cell(v: string | number | boolean, textLike: boolean): string {
  let s = String(v);
  // Digit-only phone/reference values: force text so Excel keeps leading zeros.
  if (textLike && /^\+?[\d ]+$/.test(s) && s.trim() !== "") return `"=""${s}"""`;
  // Visitor-supplied text must never execute as a spreadsheet formula.
  if (typeof v === "string" && /^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

/** UTF-8 with BOM + CRLF, which Excel opens correctly. */
export function toCsv(rows: Contribution[]): string {
  const head = COLUMNS.map(([h]) => `"${h}"`).join(",");
  const body = rows.map((c) =>
    COLUMNS.map(([h, f]) => cell(f(c), h === "Phone" || h === "Reference")).join(",")
  );
  return "﻿" + [head, ...body].join("\r\n") + "\r\n";
}

/** Resolves a chosen method id against the saved payment methods (plus Cash / Other). */
export function resolveMethod(content: PaidaContent, id: string): { id: string; label: string } | null {
  const fixed = FIXED_METHODS.find((m) => m.id === id);
  if (fixed) return { id: fixed.id, label: fixed.label };
  const m = usableMethods(content).find((x) => x.id === id);
  return m ? { id: m.id, label: m.label.trim() } : null;
}
