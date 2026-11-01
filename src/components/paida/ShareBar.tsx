"use client";

import { useEffect, useRef, useState } from "react";

/** Sticky bottom bar: jump to the support section, or open the share sheet. */
export default function ShareBar({ url, text, showSupport }: { url: string; text: string; showSupport: boolean }) {
  const sheet = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  // Decided after mount so server and client markup match during hydration.
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => setCanNativeShare(typeof navigator.share === "function"), []);
  const full = `${text} ${url}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: document.title, text, url });
      sheet.current?.close();
    } catch {
      /* dismissed */
    }
  }

  return (
    <>
      <div className="sticky no-print" role="region" aria-label="Quick actions">
        <div className="in" style={showSupport ? undefined : { gridTemplateColumns: "1fr" }}>
          {showSupport && (
            <a className="btn" href="#support">
              💐 Support the Family
            </a>
          )}
          <button type="button" className="btn ghost" onClick={() => sheet.current?.showModal()}>
            📤 Share
          </button>
        </div>
      </div>

      <dialog
        ref={sheet}
        className="sheet"
        aria-label="Share this page"
        onClick={(e) => e.target === sheet.current && sheet.current?.close()}
      >
        <div className="sheet-in">
          <h2>Share this page</h2>
          <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(full)}`} target="_blank" rel="noopener noreferrer">
            Share on WhatsApp
          </a>
          <button type="button" className="btn ghost" onClick={copyLink} aria-live="polite">
            {copied ? "✓ Link copied" : "🔗 Copy link"}
          </button>
          {canNativeShare && (
            <button type="button" className="btn ghost" onClick={nativeShare}>
              More options…
            </button>
          )}
          <button type="button" className="btn ghost" onClick={() => sheet.current?.close()}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
