import { randomUUID } from "crypto";
import seed from "../../../content/paida.json";
import { paidaContentSchema, type PaidaContent } from "./schema";
import { getObject, putObject } from "./store";

const KEY = "content.json";

/** Parses with defaults applied and gives every list item a stable id. */
function normalize(input: unknown): PaidaContent {
  const c = paidaContentSchema.parse(input);
  const withIds = <T extends { id: string }>(items: T[]) => items.map((i) => (i.id ? i : { ...i, id: randomUUID() }));
  return {
    ...c,
    updates: withIds(c.updates),
    program: withIds(c.program),
    supportLocal: withIds(c.supportLocal),
    supportAbroad: withIds(c.supportAbroad),
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
