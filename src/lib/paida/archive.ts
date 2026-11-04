import { gzipSync } from "zlib";
import { deleteObject, getObject, listKeys, putObject } from "./store";
import type { ZipEntry } from "./zip";

/**
 * Safety net for the page's data. Every night the data files (content, memories, contributions,
 * notifications, team and activity log) are bundled into one small gzip under archive/, keeping
 * the last 30. Photos are immutable (random names, never overwritten), so they are not copied
 * nightly; the Owner's full ZIP includes them and the untouched originals.
 */
const KEEP_NIGHTLY = 30;
const DATA_FILES = ["content.json", "approved.json", "feed.json"];
// Prefixes holding private/admin data. Invites (token hashes) are deliberately not archived.
const DATA_PREFIXES = ["tributes/", "contributions/", "notifications/", "admin/users/", "admin/log/"];

const today = () => new Date().toISOString().slice(0, 10);

async function dataKeys(): Promise<string[]> {
  const lists = await Promise.all(DATA_PREFIXES.map((p) => listKeys(p)));
  return [...DATA_FILES, ...lists.flat().filter((k) => k.endsWith(".json"))];
}

export async function runNightlyArchive(): Promise<string> {
  const bundle: Record<string, unknown> = {};
  for (const key of await dataKeys()) {
    const buf = await getObject(key);
    if (buf) bundle[key] = JSON.parse(buf.toString("utf8"));
  }
  const day = today();
  const name = `archive/${day}.json.gz`;
  await putObject(name, gzipSync(JSON.stringify(bundle)), "application/gzip");
  await putObject("archive/latest.json", JSON.stringify({ date: day, at: new Date().toISOString(), files: Object.keys(bundle).length }), "application/json");

  const old = (await listKeys("archive/")).filter((k) => /archive\/\d{4}-\d{2}-\d{2}\.json\.gz$/.test(k)).sort().slice(0, -KEEP_NIGHTLY);
  for (const k of old) await deleteObject(k);
  return name;
}

export async function lastArchive(): Promise<{ date: string; at: string; files: number } | null> {
  const buf = await getObject("archive/latest.json").catch(() => null);
  return buf ? JSON.parse(buf.toString("utf8")) : null;
}

let started = false;
/** Checks every 30 minutes and archives once per UTC day (after 01:00 UTC, i.e. 03:00 in Zimbabwe). */
export function scheduleNightlyArchive(): void {
  if (started) return;
  started = true;
  const tick = async () => {
    try {
      if (new Date().getUTCHours() < 1) return;
      if ((await lastArchive())?.date === today()) return;
      console.log("[paida] nightly archive:", await runNightlyArchive());
    } catch (err) {
      console.error("[paida] nightly archive failed:", err);
    }
  };
  setTimeout(tick, 90_000).unref?.();
  setInterval(tick, 30 * 60_000).unref?.();
}

/** Everything, for the Owner's ZIP: data, nightly bundles, photos and the untouched originals. */
export async function archiveEntries(): Promise<ZipEntry[]> {
  const [data, nightly, media, originals] = await Promise.all([dataKeys(), listKeys("archive/"), listKeys("media/"), listKeys("originals/")]);
  const readme = `Paida memorial page — full archive\nCreated: ${new Date().toISOString()}\n\n` +
    `data/       content, memories, contributions (PRIVATE: includes phone numbers), notifications, team, activity log\n` +
    `archive/    nightly data bundles (gzip JSON)\n` +
    `media/      photos as shown on the page\n` +
    `originals/  the original uploaded files, untouched\n`;
  const file = (name: string, key: string): ZipEntry => ({ name, data: async () => (await getObject(key).catch(() => null)) as Uint8Array | null });
  return [
    { name: "README.txt", data: async () => new TextEncoder().encode(readme) },
    ...data.map((k) => file(`data/${k}`, k)),
    ...nightly.filter((k) => !k.endsWith("latest.json")).map((k) => file(k, k)),
    ...media.map((k) => file(k, k)),
    ...originals.map((k) => file(k, k)),
  ];
}
