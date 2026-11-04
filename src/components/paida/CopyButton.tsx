"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy", compact = false }: { text: string; label?: string; compact?: boolean }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older / non-secure contexts: fall back to a temporary textarea.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }

  return (
    <button type="button" className={compact ? "btn ghost sm" : "btn ghost"} onClick={copy} aria-live="polite" aria-label={compact ? `Copy ${text}` : undefined}>
      {done ? "✓ Copied" : compact ? "📋 Copy" : `📋 ${label}`}
    </button>
  );
}
