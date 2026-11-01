"use client";

import { useEffect, useState } from "react";
import { ROLE_LABEL, type TeamMember } from "@/lib/paida/roles";

const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—");

/** Owner-only: add people, share one-time invite links, change roles, reset access, remove. */
export default function TeamAdmin() {
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [invite, setInvite] = useState<{ name: string; url: string; expiresAt: string } | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "editor" });

  async function refresh() {
    const res = await fetch("/api/paida/admin/team", { cache: "no-store" });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; team?: TeamMember[]; message?: string };
    if (out.ok && out.team) { setTeam(out.team); setError(""); } else setError(out.message || "Could not load the team.");
  }
  useEffect(() => { refresh(); }, []);

  async function call(method: string, body?: unknown, qs = "") {
    const res = await fetch(`/api/paida/admin/team${qs}`, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; inviteUrl?: string; expiresAt?: string };
    if (!res.ok || !out.ok) { setMsg(out.message || "Could not save."); return null; }
    setMsg("✓ Done");
    await refresh();
    return out;
  }

  const whatsappHref = (name: string, url: string) =>
    `https://wa.me/?text=${encodeURIComponent(`Hi ${name}, you've been invited to help look after Paida's page. Open this link to set your password (it works once and expires in 48 hours): ${url}`)}`;

  if (error) return <p className="status err">{error}</p>;
  if (!team) return <p>Loading…</p>;

  return (
    <div>
      <p className="muted small" style={{ marginTop: 0 }}>
        <strong>Admin</strong>: everything except managing the team, including contributions. <strong>Editor</strong>: program, updates, her story, gallery, approving tributes and posting notifications — never contribution amounts, phones, references, totals or the export.
      </p>

      {invite && (
        <div className="row" style={{ background: "var(--blush)" }}>
          <strong>Invite link for {invite.name}</strong>
          <p className="small" style={{ margin: 0 }}>Shown once. It works one time and expires {when(invite.expiresAt)}. Send it to them yourself:</p>
          <input type="text" readOnly value={invite.url} onFocus={(e) => e.currentTarget.select()} />
          <div className="btn-row" style={{ margin: 0 }}>
            <button className="btn" onClick={() => navigator.clipboard?.writeText(invite.url).then(() => setMsg("✓ Link copied"))}>📋 Copy link</button>
            <a className="btn ghost" href={whatsappHref(invite.name, invite.url)} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
            <button className="btn ghost" onClick={() => setInvite(null)}>Done</button>
          </div>
        </div>
      )}

      <div className="row">
        <h2 style={{ fontSize: "1.1rem" }}>Add a person</h2>
        <label>Name<input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Phone<input type="text" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>Email<input type="text" inputMode="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Role
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="editor">Editor</option><option value="admin">Admin</option>
          </select>
        </label>
        <button className="btn" disabled={!form.name.trim() || (!form.phone.trim() && !form.email.trim())} onClick={async () => {
          const out = await call("POST", form);
          if (out?.inviteUrl) { setInvite({ name: form.name, url: out.inviteUrl, expiresAt: out.expiresAt! }); setForm({ name: "", phone: "", email: "", role: "editor" }); }
        }}>Create invite link</button>
        <span role="status" className="muted small">{msg}</span>
      </div>

      <div className="row"><strong>The Owner</strong><span className="muted small">You — signs in with “owner” and the server password. Cannot be changed here.</span></div>

      {team.length === 0 && <p className="muted">No one has been added yet.</p>}
      {team.map((m) => (
        <div key={m.id} className="row">
          <div>
            <strong>{m.name}</strong> <span className="badge">{ROLE_LABEL[m.role]}</span>{" "}
            <span className="badge">{m.status === "active" ? "active" : "invite pending"}</span>
            <div className="muted small">
              {[m.phone && `+${m.phone}`, m.email].filter(Boolean).join(" · ")} · last sign-in {when(m.lastLoginAt)}
              {m.status === "invited" && m.inviteExpiresAt && <> · link expires {when(m.inviteExpiresAt)}</>}
            </div>
          </div>
          <div className="btn-row" style={{ margin: 0 }}>
            <select aria-label={`Role for ${m.name}`} value={m.role} onChange={(e) => call("PATCH", { id: m.id, role: e.target.value })} style={{ width: "auto" }}>
              <option value="editor">Editor</option><option value="admin">Admin</option>
            </select>
            <button className="btn ghost" onClick={async () => {
              if (!confirm(`Reset access for ${m.name}? Their password stops working, they are signed out everywhere, and you get a new invite link.`)) return;
              const out = await call("PATCH", { id: m.id, reset: true });
              if (out?.inviteUrl) setInvite({ name: m.name, url: out.inviteUrl, expiresAt: out.expiresAt! });
            }}>Reset access</button>
            <button className="btn ghost" onClick={() => confirm(`Remove ${m.name}? They are signed out immediately.`) && call("DELETE", undefined, `?id=${m.id}`)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
