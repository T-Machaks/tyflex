"use client";

import { useEffect, useState } from "react";
import { ROLE_LABEL, type ActivityEntry } from "@/lib/paida/roles";

/** Who did what and when (Owner and Admin). Latest first. */
export default function ActivityAdmin() {
  const [entries, setEntries] = useState<ActivityEntry[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/paida/admin/activity", { cache: "no-store" });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; entries?: ActivityEntry[]; message?: string };
      if (out.ok && out.entries) setEntries(out.entries);
      else setError(out.message || "Could not load the activity log.");
    })();
  }, []);

  if (error) return <p className="status err">{error}</p>;
  if (!entries) return <p>Loading…</p>;
  if (entries.length === 0) return <p className="muted">Nothing has happened yet.</p>;

  return (
    <ul className="list">
      {entries.map((e, i) => (
        <li key={`${e.at}-${i}`} className="item">
          <div className="when">{new Date(e.at).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
          <p style={{ margin: "0.1rem 0 0" }}>
            <strong>{e.actorName}</strong> <span className="muted small">({ROLE_LABEL[e.actorRole]})</span> {e.action}
          </p>
        </li>
      ))}
    </ul>
  );
}
