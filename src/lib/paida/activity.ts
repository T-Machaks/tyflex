import { randomBytes } from "crypto";
import type { Session } from "./auth";
import type { ActivityEntry } from "./roles";
import { getObject, listKeys, putObject } from "./store";

/**
 * Simple, readable accountability log: one JSON object per event under paida/admin/log/,
 * named by timestamp so a listing is already in chronological order. Lines carry names
 * but never amounts, phones or references.
 */
export async function logActivity(actor: Pick<Session, "id" | "name" | "role">, action: string): Promise<void> {
  try {
    const at = new Date().toISOString();
    const entry: ActivityEntry = { at, actorId: actor.id, actorName: actor.name, actorRole: actor.role, action };
    await putObject(`admin/log/${at.replace(/[:.]/g, "-")}-${randomBytes(3).toString("hex")}.json`, JSON.stringify(entry), "application/json");
  } catch (err) {
    // Never fail the real action because the log write failed.
    console.error("[paida] could not write activity log:", err);
  }
}

export async function listActivity(limit = 200): Promise<ActivityEntry[]> {
  const keys = (await listKeys("admin/log/")).filter((k) => k.endsWith(".json")).sort().slice(-limit);
  const entries = await Promise.all(
    keys.map(async (k) => {
      const buf = await getObject(k);
      return buf ? (JSON.parse(buf.toString("utf8")) as ActivityEntry) : null;
    })
  );
  return entries.filter((e): e is ActivityEntry => e !== null).reverse();
}
