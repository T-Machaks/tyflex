"use client";

import { zonedToUtcMs } from "@/lib/paida/time";

interface Props {
  tz: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (Harare) or ""
  endTime: string;
  location: string;
  description: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const stamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

export function buildIcs(p: Props): string {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Paida Memorial//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT"];
  lines.push(`UID:${p.date}-${p.title.replace(/\W+/g, "-")}@paida`, `DTSTAMP:${stamp(new Date())}`);
  if (p.time) {
    const start = new Date(zonedToUtcMs(p.date, p.time, p.tz));
    const end = p.endTime ? new Date(zonedToUtcMs(p.date, p.endTime, p.tz)) : new Date(start.getTime() + 2 * 3600_000);
    lines.push(`DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`);
  } else {
    const [y, m, d] = p.date.split("-").map(Number);
    const next = new Date(Date.UTC(y, m - 1, d + 1));
    lines.push(`DTSTART;VALUE=DATE:${p.date.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`);
  }
  lines.push(`SUMMARY:${esc(p.title)}`);
  if (p.location) lines.push(`LOCATION:${esc(p.location)}`);
  if (p.description) lines.push(`DESCRIPTION:${esc(p.description)}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
}

export default function AddToCalendar(props: Props) {
  function download() {
    const blob = new Blob([buildIcs(props)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.title.replace(/\W+/g, "-").toLowerCase() || "event"}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <button type="button" className="btn ghost" onClick={download}>
      📅 Add to calendar
    </button>
  );
}
