"use client";

import { useEffect, useState } from "react";

/**
 * One quiet line under the tagline that gently cycles through the latest notifications.
 * No popups, no sound. With "reduce motion" it never cycles: it just shows the latest one.
 * The same entries are listed in full under "Ways to help", so this is decorative (aria-hidden).
 */
export default function FeedTicker({ items }: { items: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;
  return (
    <p className="ticker" aria-hidden="true">
      <span key={i}>{items[i % items.length]}</span>
    </p>
  );
}
