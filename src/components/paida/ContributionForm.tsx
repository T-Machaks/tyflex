"use client";

import { useState } from "react";
import { CURRENCIES, METHODS } from "@/lib/paida/contribution-constants";

const today = () => new Date().toISOString().slice(0, 10);

/** "I've sent my contribution" — lets the family match payments and say thank you. Shows no data back. */
export default function ContributionForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [currency, setCurrency] = useState("USD");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/paida/contributions", { method: "POST", body: new FormData(form) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message || "Something went wrong. Please try again.");
      form.reset();
      setCurrency("USD");
      setState("done");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <details className="pay contrib" id="contribution">
      <summary className="btn" style={{ listStyle: "none" }}>
        💗 I&apos;ve sent my contribution
      </summary>

      {state === "done" ? (
        <p className="status" role="status" style={{ marginTop: "1rem" }}>
          💗 Thank you, from the bottom of our hearts. The family will confirm receipt and be in touch if needed.
        </p>
      ) : (
        <form className="tform" onSubmit={onSubmit}>
          <p className="muted small" style={{ margin: 0 }}>
            This only helps the family match payments and say thank you. Your phone number, amount and payment details are never shown on this page.
          </p>
          <label>
            Full name
            <input type="text" name="name" required maxLength={80} autoComplete="name" />
          </label>
          <label>
            Phone (optional)
            <input type="text" name="phone" inputMode="tel" maxLength={30} autoComplete="tel" />
          </label>
          <div className="two">
            <label>
              Amount
              <input type="text" name="amount" required inputMode="decimal" pattern="[0-9]*[.,]?[0-9]{0,2}" placeholder="50" />
            </label>
            <label>
              Currency
              <select name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {currency === "Other" && (
            <label>
              Currency code
              <input type="text" name="currencyOther" required maxLength={10} placeholder="e.g. BWP" />
            </label>
          )}
          <label>
            How did you send it?
            <select name="method" required defaultValue="">
              <option value="" disabled>
                Choose…
              </option>
              {METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Transaction reference (helps us confirm it)
            <input type="text" name="reference" maxLength={80} autoComplete="off" />
          </label>
          <label>
            Date sent
            <input type="date" name="dateSent" required defaultValue={today()} max={today()} />
          </label>
          <label>
            Your relationship to Paida
            <input type="text" name="relationship" maxLength={40} placeholder="e.g. cousin, friend, colleague" />
          </label>
          <label>
            Message to the family (optional)
            <textarea name="message" maxLength={600} />
          </label>
          <label className="check">
            <input type="checkbox" name="showName" defaultChecked />
            Show my name on the thank-you list
          </label>
          {/* Honeypot — hidden from people, irresistible to bots. */}
          <div className="hp" aria-hidden="true">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="btn" type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "💗 Send"}
          </button>
          {state === "error" && (
            <p className="status err" role="alert">
              {message}
            </p>
          )}
        </form>
      )}
    </details>
  );
}
