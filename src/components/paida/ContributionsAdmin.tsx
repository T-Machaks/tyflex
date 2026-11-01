"use client";

import { useEffect, useMemo, useState } from "react";
import { CURRENCIES, METHODS, methodLabel, type Contribution, type ContributionStatus } from "@/lib/paida/contribution-constants";

const today = () => new Date().toISOString().slice(0, 10);
const fmt = (n: number) => n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

type Draft = Pick<Contribution, "name" | "phone" | "amount" | "currency" | "method" | "reference" | "dateSent" | "relationship" | "message" | "showName" | "note">;
const blank = (): Draft => ({ name: "", phone: "", amount: 0, currency: "USD", method: "cash", reference: "", dateSent: today(), relationship: "", message: "", showName: true, note: "" });

function Fields({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  return (
    <div className="tform" style={{ marginTop: 0 }}>
      <label>Name<input type="text" value={d.name} onChange={(e) => set({ name: e.target.value })} /></label>
      <label>Phone (private)<input type="text" value={d.phone} onChange={(e) => set({ phone: e.target.value })} /></label>
      <div className="two">
        <label>Amount<input type="text" inputMode="decimal" value={String(d.amount)} onChange={(e) => set({ amount: Number(e.target.value.replace(",", ".")) || 0 })} /></label>
        <label>Currency
          <input type="text" list="paida-cur" value={d.currency} onChange={(e) => set({ currency: e.target.value.toUpperCase() })} />
          <datalist id="paida-cur">{CURRENCIES.filter((c) => c !== "Other").map((c) => <option key={c} value={c} />)}</datalist>
        </label>
      </div>
      <label>Method
        <select value={d.method} onChange={(e) => set({ method: e.target.value as Draft["method"] })}>
          {METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </label>
      <label>Reference<input type="text" value={d.reference} onChange={(e) => set({ reference: e.target.value })} /></label>
      <label>Date sent<input type="date" value={d.dateSent} onChange={(e) => set({ dateSent: e.target.value })} /></label>
      <label>Relationship<input type="text" value={d.relationship} onChange={(e) => set({ relationship: e.target.value })} /></label>
      <label>Message<textarea value={d.message} onChange={(e) => set({ message: e.target.value })} rows={3} /></label>
      <label className="check"><input type="checkbox" checked={d.showName} onChange={(e) => set({ showName: e.target.checked })} />Show name on thank-you list</label>
      <label>Internal note (never public)<input type="text" value={d.note} onChange={(e) => set({ note: e.target.value })} /></label>
    </div>
  );
}

export default function ContributionsAdmin() {
  const [items, setItems] = useState<Contribution[] | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"all" | ContributionStatus>("all");
  const [method, setMethod] = useState("all");
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Draft>(blank());
  const [edits, setEdits] = useState<Record<string, Draft>>({});

  async function refresh() {
    const res = await fetch("/api/paida/admin/contributions", { cache: "no-store" });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; contributions?: Contribution[]; message?: string };
    if (out.ok && out.contributions) { setItems(out.contributions); setError(""); }
    else setError(out.message || "Could not load contributions (the bucket role may need s3:ListBucket).");
  }
  useEffect(() => { refresh(); }, []);

  async function call(method_: string, body?: unknown, url = "/api/paida/admin/contributions") {
    const res = await fetch(url, { method: method_, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    if (!res.ok || !out.ok) { setMsg(out.message || "Could not save."); return false; }
    setMsg("✓ Saved");
    await refresh();
    return true;
  }

  const setStatusOf = (id: string, s: ContributionStatus) => call("PATCH", { id, patch: { status: s } });

  const totals = useMemo(() => {
    const t: Record<string, number> = {};
    for (const c of items ?? []) if (c.status === "confirmed") t[c.currency] = Math.round(((t[c.currency] ?? 0) + c.amount) * 100) / 100;
    return t;
  }, [items]);
  const pendingCount = (items ?? []).filter((c) => c.status === "pending").length;

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (items ?? []).filter(
      (c) =>
        (status === "all" || c.status === status) &&
        (method === "all" || c.method === method) &&
        (!needle || c.name.toLowerCase().includes(needle) || c.reference.toLowerCase().includes(needle))
    );
  }, [items, status, method, q]);

  if (error) return <p className="status err">{error}</p>;
  if (!items) return <p>Loading…</p>;

  return (
    <div>
      <div className="row" style={{ background: "var(--blush)" }}>
        <strong>Confirmed totals (admin only)</strong>
        {Object.keys(totals).length === 0 ? <span className="muted">Nothing confirmed yet.</span> : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.2rem" }}>
            {Object.entries(totals).map(([cur, n]) => <span key={cur}><strong>{fmt(n)}</strong> {cur}</span>)}
          </div>
        )}
        <span className="muted small">{pendingCount} pending — not included above</span>
      </div>

      <div className="btn-row" style={{ marginTop: 0, marginBottom: "0.8rem" }}>
        <button className="btn" onClick={() => setAdding((a) => !a)}>{adding ? "Cancel" : "＋ Add manually"}</button>
        <a className="btn ghost" href="/api/paida/admin/contributions?format=csv">⬇ Export CSV</a>
        <span role="status" className="muted small">{msg}</span>
      </div>

      {adding && (
        <div className="row">
          <h2 style={{ fontSize: "1.1rem" }}>Add a contribution (e.g. cash handed over)</h2>
          <Fields d={draft} set={(p) => setDraft((d) => ({ ...d, ...p }))} />
          <button className="btn" onClick={async () => { if (await call("POST", { ...draft, status: "confirmed" })) { setDraft(blank()); setAdding(false); } }}>Save as confirmed</button>
        </div>
      )}

      <div className="tform" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "0.8rem" }}>
        <label>Status
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="all">All</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="rejected">Rejected</option>
          </select>
        </label>
        <label>Method
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="all">All</option>{METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </label>
        <label style={{ gridColumn: "1 / -1" }}>Search name or reference
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      {shown.length === 0 && <p className="muted">No contributions match.</p>}
      {shown.map((c) => {
        const d = edits[c.id];
        return (
          <div key={c.id} className="row">
            <div>
              <strong>{c.name}</strong> · {fmt(c.amount)} {c.currency} · {methodLabel(c.method)}{" "}
              <span className="badge">{c.status}</span>{c.source === "manual" && <> <span className="badge">manual</span></>}
              <div className="muted small">
                {c.reference && <>Ref {c.reference} · </>}sent {c.dateSent} · received {new Date(c.createdAt).toLocaleString("en-GB")}
                {c.relationship && <> · {c.relationship}</>}{!c.showName && <> · name hidden</>}
              </div>
              {c.message && <p style={{ margin: "0.3rem 0 0", whiteSpace: "pre-line" }}>{c.message}</p>}
            </div>
            <div className="btn-row" style={{ margin: 0 }}>
              {c.status !== "confirmed" && <button className="btn" onClick={() => setStatusOf(c.id, "confirmed")}>✓ Confirm</button>}
              {c.status !== "rejected" && <button className="btn ghost" onClick={() => setStatusOf(c.id, "rejected")}>✕ Reject</button>}
              {c.status !== "pending" && <button className="btn ghost" onClick={() => setStatusOf(c.id, "pending")}>↺ Pending</button>}
              <button className="btn ghost" onClick={() => setEdits((e) => d ? Object.fromEntries(Object.entries(e).filter(([k]) => k !== c.id)) : { ...e, [c.id]: { ...c } })}>{d ? "Close" : "Edit"}</button>
            </div>
            {d && (
              <>
                <Fields d={d} set={(p) => setEdits((e) => ({ ...e, [c.id]: { ...e[c.id], ...p } }))} />
                <div className="btn-row" style={{ margin: 0 }}>
                  <button className="btn" onClick={async () => { if (await call("PATCH", { id: c.id, patch: d })) setEdits((e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== c.id))); }}>Save changes</button>
                  <button className="btn ghost" onClick={() => confirm("Delete this record permanently?") && call("DELETE", undefined, `/api/paida/admin/contributions?id=${c.id}`)}>Delete</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
