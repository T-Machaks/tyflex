"use client";

import { useState } from "react";

export default function AdminLogin({ configured }: { configured: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/paida/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: String(data.get("identifier") ?? ""), password: String(data.get("password") ?? "") }),
    });
    if (res.ok) {
      window.location.reload();
      return;
    }
    setError(((await res.json().catch(() => ({}))) as { message?: string }).message || "Could not sign in.");
    setBusy(false);
  }

  return (
    <div className="admin">
      <div className="card" style={{ maxWidth: 420, margin: "3rem auto" }}>
        <h1 style={{ fontSize: "1.6rem" }}>Paida page — sign in</h1>
        {!configured && <p className="status err">The owner password is not set on the server (PAIDA_ADMIN_PASSWORD). Team members can still sign in.</p>}
        <form className="tform" onSubmit={onSubmit}>
          <label>
            Phone or email
            <input type="text" name="identifier" required autoComplete="username" autoCapitalize="none" placeholder="0771 234 567 or name@example.com" />
          </label>
          <label>
            Password
            <input type="password" name="password" required autoComplete="current-password" />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          {error && (
            <p className="status err" role="alert">
              {error}
            </p>
          )}
          <p className="muted small" style={{ margin: 0 }}>
            Site owner: type <strong>owner</strong> as the phone or email.
          </p>
        </form>
      </div>
    </div>
  );
}
