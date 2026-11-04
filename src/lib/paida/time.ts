// Client- and server-safe time zone helpers (no dependencies) for program events.

export const TIMEZONES = [
  { id: "Africa/Harare", label: "Zimbabwe (CAT)" },
  { id: "Pacific/Auckland", label: "New Zealand (NZ time)" },
  { id: "Australia/Sydney", label: "Australia – Sydney" },
  { id: "Africa/Johannesburg", label: "South Africa (SAST)" },
  { id: "Europe/London", label: "United Kingdom (UK time)" },
] as const;

export type TzId = (typeof TIMEZONES)[number]["id"];
export const TZ_IDS = TIMEZONES.map((t) => t.id) as [TzId, ...TzId[]];

// Offset (minutes east of UTC) -> short name, per supported zone.
const ABBR: Record<string, Record<number, string>> = {
  "Africa/Harare": { 120: "CAT" },
  "Pacific/Auckland": { 780: "NZDT", 720: "NZST" },
  "Australia/Sydney": { 660: "AEDT", 600: "AEST" },
  "Africa/Johannesburg": { 120: "SAST" },
  "Europe/London": { 60: "BST", 0: "GMT" },
};

function parts(ms: number, tz: string) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, hourCycle: "h23", weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const o: Record<string, string> = {};
  for (const p of f.formatToParts(new Date(ms))) o[p.type] = p.value;
  return o;
}

/** Minutes east of UTC for a zone at a given instant. */
export function offsetMinutes(ms: number, tz: string): number {
  const o = parts(ms, tz);
  const monthIdx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(o.month);
  const asUtc = Date.UTC(+o.year, monthIdx, +o.day, +o.hour, +o.minute, +o.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

/** "2026-11-06" + "10:00" in a given zone -> UTC milliseconds (handles daylight saving). */
export function zonedToUtcMs(date: string, time: string, tz: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  let utc = wall;
  for (let i = 0; i < 3; i++) utc = wall - offsetMinutes(utc, tz) * 60000;
  return utc;
}

export const tzAbbr = (ms: number, tz: string) => ABBR[tz]?.[offsetMinutes(ms, tz)] ?? tz.split("/").pop() ?? tz;

export function clock(ms: number, tz: string): string {
  const o = parts(ms, tz);
  return `${o.hour}:${o.minute}`;
}

/** "Fri 6 Nov, 10:00" in the given zone. */
export function dayAndClock(ms: number, tz: string): string {
  const o = parts(ms, tz);
  return `${o.weekday} ${o.day} ${o.month}, ${o.hour}:${o.minute}`;
}

/** The event as written in its own zone, e.g. "Fri 6 Nov, 10:00–12:00 NZDT". */
export function eventLine(date: string, time: string, endTime: string, tz: string): string {
  const start = zonedToUtcMs(date, time, tz);
  const end = endTime ? `–${clock(zonedToUtcMs(date, endTime, tz), tz)}` : "";
  return `${dayAndClock(start, tz)}${end} ${tzAbbr(start, tz)}`;
}

/** Same instant in the viewer's own zone, e.g. "Thu 5 Nov, 23:00 your time"; null if it's the same clock time as the event's zone. */
export function viewerLine(date: string, time: string, tz: string, viewerTz?: string): string | null {
  const mine = viewerTz ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const start = zonedToUtcMs(date, time, tz);
  if (!mine || offsetMinutes(start, mine) === offsetMinutes(start, tz)) return null;
  return `${dayAndClock(start, mine)} your time`;
}
