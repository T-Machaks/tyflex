"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Photo {
  id: string;
  src: string;
  thumb: string;
  caption: string;
  w: number;
  h: number;
}

/** Thumbnail grid + lightbox. Thumbs are lazy and tiny (~480px WebP); the full image loads only on open. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dlg.current?.showModal();
  };
  const step = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [step]);

  const current = photos[index];

  return (
    <>
      <div className="grid">
        {photos.map((p, i) => (
          <button key={p.id} type="button" onClick={() => open(i)} aria-label={p.caption || `Open photo ${i + 1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb || p.src} alt={p.caption} loading="lazy" decoding="async" width={160} height={160} />
          </button>
        ))}
      </div>

      <dialog ref={dlg} className="lightbox" aria-label="Photo viewer" onClick={(e) => e.target === dlg.current && dlg.current?.close()}>
        <div className="lb">
          <button type="button" className="btn ghost lb-close" onClick={() => dlg.current?.close()} aria-label="Close">
            ✕
          </button>
          {current && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current.src} alt={current.caption} width={current.w || undefined} height={current.h || undefined} decoding="async" />
          )}
          {current?.caption && <p className="cap">{current.caption}</p>}
          {photos.length > 1 && (
            <div className="lb-nav">
              <button type="button" className="btn ghost" onClick={() => step(-1)} aria-label="Previous photo">
                ‹
              </button>
              <span aria-live="polite">
                {index + 1} / {photos.length}
              </span>
              <button type="button" className="btn ghost" onClick={() => step(1)} aria-label="Next photo">
                ›
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
