"use client";

import { useState } from "react";
import { resizeImage } from "./resizeImage";

const RELATIONSHIPS = ["Family", "Cousin", "Friend", "Colleague", "Church family", "Classmate", "Fan / viewer", "Other"];

export default function TributeForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "held" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      const photo = data.get("photo");
      if (photo instanceof File && photo.size > 0) data.set("photo", await resizeImage(photo, 1400, 0.82));
      else data.delete("photo");
      const res = await fetch("/api/paida/tributes", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; published?: boolean };
      if (!res.ok || !json.ok) throw new Error(json.message || "Something went wrong. Please try again.");
      form.reset();
      setMessage("");
      setState(json.published ? "done" : "held");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done" || state === "held") {
    return (
      <p className="status" role="status">
        {state === "done"
          ? "💗 Thank you for sharing. Your memory is now on the page."
          : "💗 Thank you. Your message has a link or a detail that needs a quick look first, so it will appear once the family has approved it."}
      </p>
    );
  }

  return (
    <form className="tform" onSubmit={onSubmit}>
      <h2>Share a memory or message</h2>
      <label>
        Your name
        <input type="text" name="name" required maxLength={60} autoComplete="name" />
      </label>
      <label>
        Your relationship to Paida
        <input type="text" name="relationship" maxLength={40} list="paida-rel" placeholder="e.g. cousin, friend, colleague" />
        <datalist id="paida-rel">
          {RELATIONSHIPS.map((r) => (
            <option key={r} value={r} />
          ))}
        </datalist>
      </label>
      <label>
        Your memory or message
        <textarea name="message" required minLength={5} maxLength={1500} />
      </label>
      <label>
        Add a photo (optional)
        <input type="file" name="photo" accept="image/*" />
      </label>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "💗 Share"}
      </button>
      {state === "error" && (
        <p className="status err" role="alert">
          {message}
        </p>
      )}
      <p className="muted small" style={{ margin: 0 }}>
        Please keep it kind. It appears straight away; messages with links or contact details wait for a quick review.
      </p>
    </form>
  );
}
