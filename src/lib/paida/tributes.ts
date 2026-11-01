import { randomUUID } from "crypto";
import type { Tribute } from "./schema";
import { mediaKey } from "./util";
import { deleteObject, getObject, listKeys, putObject } from "./store";

/**
 * One JSON object per tribute (tributes/<id>.json) so concurrent submissions never
 * overwrite each other, plus an approved.json snapshot that the public page reads
 * with a single GET (no S3 list permission needed on the visitor path).
 */
const APPROVED_KEY = "approved.json";

export async function listApproved(): Promise<Tribute[]> {
  try {
    const buf = await getObject(APPROVED_KEY);
    return buf ? (JSON.parse(buf.toString("utf8")) as Tribute[]) : [];
  } catch (err) {
    console.error("[paida] could not load approved tributes:", err);
    return [];
  }
}

export async function listAll(): Promise<Tribute[]> {
  const keys = (await listKeys("tributes/")).filter((k) => k.endsWith(".json"));
  const all = await Promise.all(
    keys.map(async (k) => {
      const buf = await getObject(k);
      return buf ? (JSON.parse(buf.toString("utf8")) as Tribute) : null;
    })
  );
  return all.filter((t): t is Tribute => t !== null).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function rebuildApproved(): Promise<void> {
  const approved = (await listAll()).filter((t) => t.status === "approved");
  await putObject(APPROVED_KEY, JSON.stringify(approved), "application/json");
}

export async function createTribute(input: {
  name: string;
  relationship: string;
  message: string;
  photo: string;
}): Promise<Tribute> {
  const tribute: Tribute = { id: randomUUID(), ...input, createdAt: new Date().toISOString(), status: "pending" };
  await putObject(`tributes/${tribute.id}.json`, JSON.stringify(tribute), "application/json");
  return tribute;
}

/** Returns the updated tribute, or null if it does not exist. */
export async function setTributeStatus(id: string, status: Tribute["status"]): Promise<Tribute | null> {
  const buf = await getObject(`tributes/${id}.json`);
  if (!buf) return null;
  const tribute = { ...(JSON.parse(buf.toString("utf8")) as Tribute), status };
  await putObject(`tributes/${id}.json`, JSON.stringify(tribute), "application/json");
  await rebuildApproved();
  return tribute;
}

/** Deletes a tribute and its photo; returns the author's name for the activity log. */
export async function deleteTribute(id: string): Promise<string | null> {
  const buf = await getObject(`tributes/${id}.json`);
  let name: string | null = null;
  if (buf) {
    const t = JSON.parse(buf.toString("utf8")) as Tribute;
    name = t.name;
    const photoKey = t.photo ? mediaKey(t.photo) : null;
    if (photoKey) await deleteObject(photoKey);
  }
  await deleteObject(`tributes/${id}.json`);
  await rebuildApproved();
  return name;
}
