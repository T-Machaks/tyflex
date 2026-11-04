"use client";

import { useEffect, useState } from "react";
import { eventLine, viewerLine } from "@/lib/paida/time";

/**
 * The event time in the event's own zone (e.g. "Fri 6 Nov, 10:00 NZDT") — rendered on the server so it
 * is there immediately — plus the viewer's local time ("Thu 5 Nov, 23:00 your time"), added in the
 * browser once it knows the visitor's zone. If the visitor is already in the event's zone, no second line.
 */
export default function EventTimes({ date, time, endTime, tz }: { date: string; time: string; endTime: string; tz: string }) {
  const [mine, setMine] = useState<string | null>(null);
  useEffect(() => setMine(viewerLine(date, time, tz)), [date, time, tz]);

  return (
    <>
      <div className="when">{eventLine(date, time, endTime, tz)}</div>
      {mine && <div className="when mine">🕐 {mine}</div>}
    </>
  );
}
