import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAdmin } from "@/lib/paida/auth";
import { toOgJpeg, toWebp } from "@/lib/paida/images";
import { putObject } from "@/lib/paida/store";
import { mediaUrl } from "@/lib/paida/util";

const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Multipart upload (field "file", field "kind" = "hero" | "gallery").
 * Returns optimised WebP URLs; hero also returns a 1200×630 JPEG for link previews.
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false, message: "Please sign in again." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const kind = form?.get("kind") === "hero" ? "hero" : "gallery";
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ ok: false, message: "No file." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, message: "File too large (8 MB max)." }, { status: 400 });

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();
    const full = await toWebp(input, kind === "hero" ? 1200 : 1600, 78);
    await putObject(`media/${kind}/${id}.webp`, full.buffer, "image/webp");
    const out: Record<string, unknown> = { ok: true, src: mediaUrl(`media/${kind}/${id}.webp`), w: full.width, h: full.height };

    if (kind === "hero") {
      await putObject(`media/${kind}/${id}-og.jpg`, await toOgJpeg(input), "image/jpeg");
      out.ogSrc = mediaUrl(`media/${kind}/${id}-og.jpg`);
    } else {
      const thumb = await toWebp(input, 480, 68);
      await putObject(`media/${kind}/${id}-t.webp`, thumb.buffer, "image/webp");
      out.thumb = mediaUrl(`media/${kind}/${id}-t.webp`);
    }
    return NextResponse.json(out);
  } catch (err) {
    console.error("[paida] upload failed:", err);
    return NextResponse.json({ ok: false, message: "Upload failed — is it a valid image, and is storage configured?" }, { status: 400 });
  }
}
