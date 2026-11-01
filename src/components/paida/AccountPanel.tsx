"use client";

import { useState } from "react";

/** Change-your-own-password, for Admins and Editors. */
export default function AccountPanel() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("newPassword") !== d.get("confirm")) { setErr(true); setMsg("The new passwords don't match."); return; }
    const res = await fetch("/api/paida/admin/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: d.get("currentPassword"), newPassword: d.get("newPassword") }),
    });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    setErr(!res.ok);
    setMsg(res.ok ? "✓ Password changed. Other devices were signed out." : out.message || "Could not change it.");
    if (res.ok) form.reset();
  }

  return (
    <details>
      <summary className="small" style={{ cursor: "pointer" }}>Change my password</summary>
      <form className="tform" onSubmit={onSubmit}>
        <label>Current password<input type="password" name="currentPassword" required autoComplete="current-password" /></label>
        <label>New password (10+ characters)<input type="password" name="newPassword" required minLength={10} autoComplete="new-password" /></label>
        <label>Type it again<input type="password" name="confirm" required minLength={10} autoComplete="new-password" /></label>
        <button className="btn" type="submit">Change password</button>
        <span role="status" className={err ? "status err" : "status"}>{msg}</span>
      </form>
    </details>
  );
}
