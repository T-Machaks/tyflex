import { getObject } from "@/lib/paida/store";

// Public photo server for gallery/hero/tribute images. Filenames are random UUIDs and
// never change, so responses are cached "forever" at the CDN and in browsers.
const SAFE_PATH = /^[a-z0-9_-]+(\/[a-z0-9_-]+)*\.(webp|jpg)$/i;

export async function GET(_req: Request, ctx: { params: Promise<{ key: string[] }> }) {
  const { key } = await ctx.params;
  const rel = key.join("/");
  if (!SAFE_PATH.test(rel)) return new Response("Not found", { status: 404 });

  const body = await getObject(`media/${rel}`).catch(() => null);
  if (!body) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": rel.endsWith(".jpg") ? "image/jpeg" : "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
