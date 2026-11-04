import { randomUUID } from "crypto";
import seed from "../../../content/paida.json";
import { paidaContentSchema, type PaidaContent, type PaymentMethod } from "./schema";
import { getObject, putObject } from "./store";

const KEY = "content.json";

function guessFlag(label: string, details: string, local: boolean): string {
  const t = `${label} ${details}`.toLowerCase();
  if (/\bnz\b|new zealand/.test(t)) return "NZ";
  if (/south africa|\bsa\b|fnb|\brand\b/.test(t)) return "ZA";
  if (/zimbabwe|ecocash|\bzw\b/.test(t) || local) return "ZW";
  if (/united kingdom|\buk\b|gbp/.test(t)) return "GB";
  return "";
}

/**
 * Payment methods used to be two free-text lists (in Zimbabwe / outside). Convert whatever the
 * family already entered into the single ordered list, keeping every character of the details.
 * Empty placeholders are dropped. Nothing is marked "verified" until the Owner does that.
 */
function migratePayments(c: PaidaContent): PaidaContent {
  if (c.paymentMethods.length > 0 || (c.supportLocal.length === 0 && c.supportAbroad.length === 0)) {
    return { ...c, supportLocal: [], supportAbroad: [] };
  }
  const legacy = [...c.supportLocal.map((m) => ({ m, local: true })), ...c.supportAbroad.map((m) => ({ m, local: false }))].filter(
    ({ m }) => m.details || m.copyText || m.link || m.phone
  );
  const paymentMethods: PaymentMethod[] = legacy.map(({ m, local }) => ({
    id: m.id || randomUUID(),
    flag: guessFlag(m.label, m.details, local),
    label: m.label.trim(),
    bank: "", accountName: "", number: m.copyText, branchSwift: "", type: "",
    details: m.details, link: m.link, linkLabel: m.linkLabel, phone: m.phone,
    confirmerId: "", verifiedBy: "", verifiedAt: "",
  }));
  return { ...c, paymentMethods, supportLocal: [], supportAbroad: [] };
}

/** Parses with defaults applied and gives every list item a stable id. */
function normalize(input: unknown): PaidaContent {
  const c = migratePayments(paidaContentSchema.parse(input));
  const withIds = <T extends { id: string }>(items: T[]) => items.map((i) => (i.id ? i : { ...i, id: randomUUID() }));
  return {
    ...c,
    updates: withIds(c.updates),
    program: withIds(c.program),
    paymentMethods: withIds(c.paymentMethods),
    timeline: withIds(c.timeline),
    videos: withIds(c.videos),
    social: withIds(c.social),
    gallery: withIds(c.gallery),
    contacts: withIds(c.contacts),
  };
}

/** Saved content if any, else the bundled content/paida.json seed. Never throws. */
export async function loadContent(): Promise<PaidaContent> {
  try {
    const buf = await getObject(KEY);
    if (buf) return normalize(JSON.parse(buf.toString("utf8")));
  } catch (err) {
    console.error("[paida] could not load saved content, using seed:", err);
  }
  return normalize(seed);
}

/** Validates and persists the full content document. Throws ZodError on bad input. */
export async function saveContent(input: unknown): Promise<PaidaContent> {
  const content = normalize(input);
  await putObject(KEY, JSON.stringify(content, null, 2), "application/json");
  return content;
}

/**
 * What visitors may see. Family-only updates and internal fields (who confirms each payment
 * channel) are stripped here, so they can never reach public HTML or page props.
 */
export function toPublicContent(c: PaidaContent): PaidaContent {
  return {
    ...c,
    updates: c.updates.filter((u) => u.visibility !== "family"),
    paymentMethods: c.paymentMethods.map((m) => ({ ...m, confirmerId: "" })),
    supportLocal: [],
    supportAbroad: [],
  };
}

/** Payment methods that are filled in enough to show (and to choose in the contribution form). */
export const usableMethods = (c: PaidaContent) => c.paymentMethods.filter((m) => m.label.trim());
