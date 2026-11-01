"use client";

import { useState } from "react";

export default function InviteAccept({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password") ?? "");
    if (password !== String(data.get("confirm") ?? "")) {
      setError("The two passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    const res = await fetch("/api/paida/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) {
      window.location.href = "/paida/admin";
      return;
    }
    setError(((await res.json().catch(() => ({}))) as { message?: string }).message || "Something went wrong.");
    setBusy(false);
  }

  return (
    <form className="tform" onSubmit={onSubmit}>
      <label>
        Choose a password (at least 10 characters)
        <input type="password" name="password" required minLength={10} autoComplete="new-password" />
      </label>
      <label>
        Type it again
        <input type="password" name="confirm" required minLength={10} autoComplete="new-password" />
      </label>
      <button className="btn" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Set password and continue"}
      </button>
      {error && (
        <p className="status err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
