"use client";

import { useState } from "react";

export default function AdminLogin({ configured }: { configured: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const res = await fetch("/api/paida/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
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
        <h1 style={{ fontSize: "1.6rem" }}>Paida page — admin</h1>
        {!configured ? (
          <p className="status err">The admin password is not set. Add PAIDA_ADMIN_PASSWORD to the server environment.</p>
        ) : (
          <form className="tform" onSubmit={onSubmit}>
            <label>
              Password
              <input type="password" name="password" required autoComplete="current-password" autoFocus />
            </label>
            <button className="btn" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            {error && (
              <p className="status err" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
