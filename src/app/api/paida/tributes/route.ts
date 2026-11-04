import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { allow, clientIp } from "@/lib/paida/ratelimit";
import { toWebp } from "@/lib/paida/images";
import { canWrite, putObject } from "@/lib/paida/store";
import { reviewReason } from "@/lib/paida/moderation";
import { createTribute, listAll } from "@/lib/paida/tributes";
import { mediaUrl } from "@/lib/paida/util";

const MAX_PHOTO_BYTES = 6 * 1024 * 1024;
const MAX_PENDING = 300;

const fail = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function POST(req: Request) {
  if (!canWrite) return fail("This is not available right now.", 503);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Could not read your tribute. Please try again.");
  }

  // Honeypot: real visitors never see this field. Pretend success so bots don't adapt.
  if (String(form.get("website") ?? "").trim() !== "") return NextResponse.json({ ok: true });

  const ip = clientIp(req);
  if (!allow(`tribute:${ip}`, 3, 10 * 60_000) || !allow("tribute:all", 60, 60 * 60_000)) {
    return fail("You're sending tributes very quickly — please wait a few minutes and try again.", 429);
  }

  const name = String(form.get("name") ?? "").trim();
  const relationship = String(form.get("relationship") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (name.length < 1 || name.length > 60) return fail("Please enter your name.");
  if (relationship.length > 40) return fail("Relationship is too long.");
  if (message.length < 5) return fail("Please write a short message.");
  if (message.length > 1500) return fail("Your message is too long (1500 characters max).");
  
  const photo = form.get("photo");
  let photoUrl = "";
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) return fail("That photo is too large (6 MB max).");
    try {
      const processed = await toWebp(Buffer.from(await photo.arrayBuffer()), 900, 72);
      const key = `media/tributes/${randomUUID()}.webp`;
      await putObject(key, processed.buffer, "image/webp");
      photoUrl = mediaUrl(key);
    } catch {
      return fail("We couldn't read that photo. Please try a JPG or PNG.");
    }
  }

  // Bound the moderation queue so a spam burst can't grow storage without limit.
  const pending = (await listAll().catch(() => [])).filter((t) => t.status === "pending").length;
  if (pending >= MAX_PENDING) return fail("Tributes are paused while the family catches up. Please try again later.", 503);

  const flag = reviewReason(name, relationship, message);
  const tribute = await createTribute({ name, relationship, message, photo: photoUrl, flag });
  return NextResponse.json({ ok: true, published: tribute.status === "approved" });
}
