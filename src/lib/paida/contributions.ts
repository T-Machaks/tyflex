import { randomUUID } from "crypto";
import { z } from "zod";
import { METHODS, type Contribution, type MethodId } from "./contribution-constants";
import { deleteObject, getObject, listKeys, putObject } from "./store";

/**
 * One JSON object per contribution (contributions/<id>.json), same pattern as tributes.
 * Everything in here is PRIVATE. The public page only ever reads thanks.json, which
 * contains display names of confirmed, opted-in contributors and nothing else.
 */
const THANKS_KEY = "contributions-thanks.json";

// eslint-disable-next-line no-control-regex
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
const str = (max: number, min = 0) => z.string().transform(clean).pipe(z.string().min(min).max(max));
const methodIds = METHODS.map((m) => m.id) as [MethodId, ...MethodId[]];

/** Fields a contributor (or the admin, for manual entries) may supply. */
export const contributionFields = z.object({
  name: str(80, 1),
  phone: str(30).default(""),
  amount: z.coerce.number().positive().max(10_000_000).transform((n) => Math.round(n * 100) / 100),
  currency: z
    .string()
    .transform((s) => clean(s).toUpperCase())
    .pipe(z.string().regex(/^[A-Z0-9]{2,10}$/, "Enter a currency code, e.g. USD")),
  method: z.enum(methodIds),
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

/** Public thank-you list: display names only, for confirmed contributors who opted in. */
export async function listThanks(): Promise<string[]> {
  try {
    const buf = await getObject(THANKS_KEY);
    const names = buf ? (JSON.parse(buf.toString("utf8")) as unknown) : [];
    return Array.isArray(names) ? names.filter((n): n is string => typeof n === "string") : [];
  } catch (err) {
    console.error("[paida] could not load thank-you list:", err);
    return [];
  }
}

async function rebuildThanks(): Promise<void> {
  const seen = new Set<string>();
  const names: string[] = [];
  // Oldest first so the list reads in the order people gave.
  for (const c of (await listContributions()).reverse()) {
    if (c.status !== "confirmed" || !c.showName) continue;
    const k = c.name.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    names.push(c.name);
  }
  await putObject(THANKS_KEY, JSON.stringify(names), "application/json");
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
  await putObject(key(c.id), JSON.stringify(c), "application/json");
  if (c.status === "confirmed") await rebuildThanks();
  return c;
}

export const contributionPatch = contributionFields
  .partial()
  .extend({ status: z.enum(["pending", "confirmed", "rejected"]).optional(), note: str(300).optional() });

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
  const next = { ...(JSON.parse(buf.toString("utf8")) as Contribution), ...patch, id };
  await putObject(key(id), JSON.stringify(next), "application/json");
  await rebuildThanks();
  return next;
}

export async function deleteContribution(id: string): Promise<void> {
  await deleteObject(key(id));
  await rebuildThanks();
}

// ── CSV export ──────────────────────────────────────────────────────────────

const COLUMNS: [string, (c: Contribution) => string | number | boolean][] = [
  ["Received", (c) => c.createdAt],
  ["Status", (c) => c.status],
  ["Name", (c) => c.name],
  ["Phone", (c) => c.phone],
  ["Amount", (c) => c.amount],
  ["Currency", (c) => c.currency],
  ["Method", (c) => c.method],
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
