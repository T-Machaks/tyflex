"use client";

import { useState } from "react";

/**
 * Click-to-play facade: only a ~10 KB thumbnail loads up front; the YouTube player
 * iframe (hundreds of KB of JS) is created only when the visitor taps play.
 */
export default function YouTubeFacade({ id, title, watchUrl }: { id: string; title: string; watchUrl: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div className="video">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title || "YouTube video"}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play ${title || "video"}`}
            onClick={(e) => {
              e.preventDefault();
              setPlaying(true);
            }}
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" decoding="async" width={320} height={180} />
            <span className="play">
              <span aria-hidden>▶</span>
            </span>
          </a>
        )}
      </div>
      {title && <p className="vtitle">{title}</p>}
    </div>
  );
}
