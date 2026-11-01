/** Returns the URL only if it is http(s) or a same-site path; otherwise null. */
export function safeUrl(u: string | undefined | null): string | null {
  if (!u) return null;
  const v = u.trim();
  return /^https?:\/\//i.test(v) || v.startsWith("/") ? v : null;
}

/** Digits-only international number. Bare "0…" numbers are treated as Zimbabwean. */
export function intlDigits(phone: string): string {
  const raw = phone.trim();
  const d = raw.replace(/\D/g, "");
  if (raw.startsWith("+")) return d;
  if (d.startsWith("00")) return d.slice(2);
  if (d.startsWith("0")) return "263" + d.slice(1);
  return d;
}
export const telHref = (phone: string) => `tel:+${intlDigits(phone)}`;
export const waHref = (phone: string) => `https://wa.me/${intlDigits(phone)}`;

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function formatDate(iso: string, withWeekday = false): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    ...(withWeekday ? { weekday: "long" } : {}),
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function mapsHref(ev: { mapsUrl: string; venue: string; address: string }): string | null {
  const explicit = safeUrl(ev.mapsUrl);
  if (explicit) return explicit;
  const q = [ev.venue, ev.address].filter(Boolean).join(", ");
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : null;
}

const MEDIA_ROUTE = "/api/paida/media/";
/** Store key `media/gallery/x.webp` <-> public URL `/api/paida/media/gallery/x.webp`. */
export const mediaUrl = (key: string) => MEDIA_ROUTE + key.replace(/^media\//, "");
export const mediaKey = (url: string) => (url.startsWith(MEDIA_ROUTE) ? "media/" + url.slice(MEDIA_ROUTE.length) : null);
