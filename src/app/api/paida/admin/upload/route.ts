import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { toOgJpeg, toWebp, toWebpTarget } from "@/lib/paida/images";
import { putObject } from "@/lib/paida/store";
import { mediaUrl } from "@/lib/paida/util";

const MAX_BYTES = 15 * 1024 * 1024;
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/heic": "heic", "image/heif": "heif", "image/gif": "gif" };

/**
 * Multipart upload (field "file", field "kind" = "hero" | "gallery").
 * Returns optimised WebP URLs (originals are kept under originals/); hero also returns a 1200×630 JPEG for link previews.
 * Editors may upload gallery photos; the hero photo is part of Basics and needs Admin.
 */
export async function POST(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const kind = form?.get("kind") === "hero" ? "hero" : "gallery";
  if (kind === "hero") {
    const adminGate = await requireRole("admin");
    if (!adminGate.ok) return adminGate.res;
  }
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ ok: false, message: "No file." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, message: "File too large (15 MB max)." }, { status: 400 });

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();
    // Gallery photos are fitted to 1600px wide and about 300 KB; hero stays 1200px.
    const full = kind === "hero" ? await toWebp(input, 1200, 78) : await toWebpTarget(input, 1600, 300 * 1024);
    await putObject(`media/${kind}/${id}.webp`, full.buffer, "image/webp");
    // Keep the untouched original (not served publicly) so nothing is ever lost to resizing.
    await putObject(`originals/${kind}/${id}.${EXT[file.type] ?? "bin"}`, input, file.type || "application/octet-stream");
    const out: Record<string, unknown> = { ok: true, src: mediaUrl(`media/${kind}/${id}.webp`), w: full.width, h: full.height };

    if (kind === "hero") {
      await putObject(`media/${kind}/${id}-og.jpg`, await toOgJpeg(input), "image/jpeg");
      out.ogSrc = mediaUrl(`media/${kind}/${id}-og.jpg`);
    } else {
      const thumb = await toWebp(input, 480, 68);
      await putObject(`media/${kind}/${id}-t.webp`, thumb.buffer, "image/webp");
      out.thumb = mediaUrl(`media/${kind}/${id}-t.webp`);
    }
    await logActivity(gate.session, kind === "hero" ? "uploaded a new hero photo" : "uploaded a photo to the Gallery");
    return NextResponse.json(out);
  } catch (err) {
    console.error("[paida] upload failed:", err);
    return NextResponse.json({ ok: false, message: "Upload failed — is it a valid image, and is storage configured?" }, { status: 400 });
  }
}
