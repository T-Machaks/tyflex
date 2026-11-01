import { randomUUID } from "crypto";
import { getContribution, listContributions, updateContribution } from "./contributions";
import { deleteObject, getObject, listKeys, putObject } from "./store";

/**
 * The public "love and support" notification feed.
 *
 * Two kinds of entry, both shown only after an admin has approved them:
 *  - derived from a contribution: only once it is CONFIRMED and the person opted in
 *    (and an admin hasn't hidden it). Only the display name ever leaves this module.
 *  - manual: posted directly by the family (cash at the funeral, a WhatsApp to Rufaro…),
 *    not linked to any recorded payment.
 * The public page reads feed.json, which holds {name, line, at} per entry — never amounts,
 * methods, phones, references or contributor messages.
 */
const FEED_KEY = "feed.json";
const MAX_PUBLIC = 200;

export interface PublicFeedItem {
  name: string;
  line: string; // optional short line; "" = default wording
  at: string; // ISO — turned into "2 hours ago" on the server before it reaches the browser
}

export interface AdminFeedItem {
  key: string; // "manual:<id>" | "contribution:<id>"
  source: "manual" | "contribution";
  id: string;
  name: string;
  line: string;
  at: string;
  hidden: boolean;
}

interface ManualNotification {
  id: string;
  name: string;
  line: string;
  at: string;
  hidden: boolean;
}

// eslint-disable-next-line no-control-regex
const clean = (s: string, max: number) => s.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
const mKey = (id: string) => `notifications/${id}.json`;

async function listManual(): Promise<ManualNotification[]> {
  const keys = (await listKeys("notifications/")).filter((k) => k.endsWith(".json"));
  const all = await Promise.all(
    keys.map(async (k) => {
      const buf = await getObject(k);
      return buf ? (JSON.parse(buf.toString("utf8")) as ManualNotification) : null;
    })
  );
  return all.filter((n): n is ManualNotification => n !== null);
}

/** Everything the admin can manage: manual posts plus entries derived from opted-in, confirmed contributions. */
export async function listFeedAdmin(): Promise<AdminFeedItem[]> {
  const [manual, contributions] = await Promise.all([listManual(), listContributions()]);
  const items: AdminFeedItem[] = [
    ...manual.map((n) => ({ key: `manual:${n.id}`, source: "manual" as const, id: n.id, name: n.name, line: n.line, at: n.at, hidden: n.hidden })),
    ...contributions
      .filter((c) => c.status === "confirmed" && c.showName)
      .map((c) => ({ key: `contribution:${c.id}`, source: "contribution" as const, id: c.id, name: c.name, line: "", at: c.confirmedAt ?? c.createdAt, hidden: Boolean(c.feedHidden) })),
  ];
  return items.sort((a, b) => b.at.localeCompare(a.at));
}

/** Rebuilds the public snapshot. Call after anything that can change what is publicly visible. */
export async function rebuildFeed(): Promise<void> {
  const visible: PublicFeedItem[] = (await listFeedAdmin())
    .filter((i) => !i.hidden)
    .slice(0, MAX_PUBLIC)
    .map((i) => ({ name: i.name, line: i.line, at: i.at }));
  await putObject(FEED_KEY, JSON.stringify(visible), "application/json");
}

export async function listFeed(): Promise<PublicFeedItem[]> {
  try {
    const buf = await getObject(FEED_KEY);
    const raw = buf ? (JSON.parse(buf.toString("utf8")) as unknown) : [];
    if (!Array.isArray(raw)) return [];
    // Defensive: only these three string fields can ever reach the page, whatever the file contains.
    return raw
      .filter((i): i is PublicFeedItem => typeof i?.name === "string" && typeof i?.at === "string")
      .map((i) => ({ name: i.name, line: typeof i.line === "string" ? i.line : "", at: i.at }));
  } catch (err) {
    console.error("[paida] could not load feed:", err);
    return [];
  }
}

export async function addManual(input: { name: string; line?: string; at?: string }): Promise<AdminFeedItem | null> {
  const name = clean(input.name, 80);
  if (!name) return null;
  const when = input.at && !Number.isNaN(Date.parse(input.at)) && Date.parse(input.at) <= Date.now() + 60_000 ? new Date(input.at).toISOString() : new Date().toISOString();
  const n: ManualNotification = { id: randomUUID(), name, line: clean(input.line ?? "", 140), at: when, hidden: false };
  await putObject(mKey(n.id), JSON.stringify(n), "application/json");
  return { key: `manual:${n.id}`, source: "manual", id: n.id, name: n.name, line: n.line, at: n.at, hidden: false };
}

export async function updateManual(id: string, patch: { name?: string; line?: string; hidden?: boolean }): Promise<ManualNotification | null> {
  const buf = await getObject(mKey(id));
  if (!buf) return null;
  const n = JSON.parse(buf.toString("utf8")) as ManualNotification;
  if (patch.name !== undefined) n.name = clean(patch.name, 80) || n.name;
  if (patch.line !== undefined) n.line = clean(patch.line, 140);
  if (patch.hidden !== undefined) n.hidden = patch.hidden;
  await putObject(mKey(id), JSON.stringify(n), "application/json");
  return n;
}

export const deleteManual = (id: string) => deleteObject(mKey(id));

/** Hide/show an entry. For contribution-derived entries this only affects the public feed, never the private record. */
export async function setHidden(source: "manual" | "contribution", id: string, hidden: boolean): Promise<string | null> {
  if (source === "manual") return (await updateManual(id, { hidden }))?.name ?? null;
  const c = await getContribution(id);
  if (!c) return null;
  await updateContribution(id, { feedHidden: hidden });
  return c.name;
}

/** Soft, human "2 hours ago". Older than two weeks falls back to a plain date. */
export function relativeTime(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (Number.isNaN(s)) return "";
  if (s < 90) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} minutes ago`;
  const h = Math.round(m / 60);
  if (h < 24) return h === 1 ? "1 hour ago" : `${h} hours ago`;
  const d = Math.round(h / 24);
  if (d === 1) return "yesterday";
  if (d < 14) return `${d} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });
}
