"use client";

import { useEffect, useState } from "react";

interface Item {
  key: string;
  source: "manual" | "contribution";
  id: string;
  name: string;
  line: string;
  at: string;
  hidden: boolean;
}

const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/** The soft public "love and support" feed: post notifications, hide or delete any of them. Names only — no payment data lives here. */
export default function FeedAdmin() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [line, setLine] = useState("");

  async function refresh() {
    const res = await fetch("/api/paida/admin/feed", { cache: "no-store" });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; items?: Item[]; message?: string };
    if (out.ok && out.items) { setItems(out.items); setError(""); }
    else setError(out.message || "Could not load notifications.");
  }
  useEffect(() => { refresh(); }, []);

  async function call(method: string, body?: unknown, qs = "") {
    const res = await fetch(`/api/paida/admin/feed${qs}`, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    setMsg(res.ok && out.ok ? "✓ Done" : out.message || "Could not save.");
    await refresh();
    return res.ok && out.ok;
  }

  if (error) return <p className="status err">{error}</p>;
  if (!items) return <p>Loading…</p>;

  return (
    <div>
      <p className="muted small" style={{ marginTop: 0 }}>
        These appear on the page as gentle notes like “💗 <em>Name</em> sent love and support to the family”. Nothing appears until you approve it: a contribution only shows here once it is confirmed and the person chose to be named.
      </p>

      <div className="row">
        <h2 style={{ fontSize: "1.1rem" }}>Post a notification</h2>
        <label>Name or group
          <input type="text" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} placeholder="The Moyo family, Cousins in the UK…" />
        </label>
        <label>Short line (optional)
          <input type="text" value={line} maxLength={140} onChange={(e) => setLine(e.target.value)} placeholder="Leave empty for “sent love and support to the family”" />
        </label>
        <button className="btn" disabled={!name.trim()} onClick={async () => { if (await call("POST", { name, line })) { setName(""); setLine(""); } }}>Post</button>
        <span role="status" className="muted small">{msg}</span>
      </div>

      {items.length === 0 && <p className="muted">Nothing here yet.</p>}
      {items.map((i) => (
        <div key={i.key} className="row">
          <div>
            <strong>{i.name}</strong>{i.line && <> — {i.line}</>}{" "}
            <span className="badge">{i.hidden ? "hidden" : "showing"}</span>{" "}
            <span className="badge">{i.source === "manual" ? "posted by hand" : "from a confirmed contribution"}</span>
            <div className="muted small">{when(i.at)}</div>
          </div>
          <div className="btn-row" style={{ margin: 0 }}>
            <button className="btn ghost" onClick={() => call("PATCH", { source: i.source, id: i.id, hidden: !i.hidden })}>{i.hidden ? "Show" : "Hide"}</button>
            <button className="btn ghost" onClick={() => confirm(i.source === "manual" ? "Delete this notification?" : "Remove this name from the public feed? (The private record is kept.)") && call("DELETE", undefined, `?source=${i.source}&id=${i.id}`)}>
              {i.source === "manual" ? "Delete" : "Remove"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
