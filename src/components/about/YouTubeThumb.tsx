"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeThumbProps {
  youtubeId: string;
  label: string;
}

/**
 * Click-to-load YouTube embed — shows a static thumbnail + play button by
 * default, and only mounts the iframe (youtube-nocookie.com, to keep the
 * privacy footprint down) once the viewer actually clicks. Avoids loading
 * YouTube's player script and setting any cookies for visitors who never
 * press play.
 */
export default function YouTubeThumb({ youtubeId, label }: YouTubeThumbProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={label}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full aspect-video rounded-xl overflow-hidden border border-white/10"
      aria-label={`Play video: ${label}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={label}
        fill
        sizes="(max-width: 640px) 100vw, 480px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <span className="h-14 w-14 rounded-full bg-brand-red/90 group-hover:bg-brand-red flex items-center justify-center shadow-lg transition-colors">
          <Play className="h-6 w-6 text-white ml-0.5" fill="currentColor" />
        </span>
      </div>
      <span className="absolute bottom-3 left-3 right-3 text-xs text-white/90 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
        {label}
      </span>
    </button>
  );
}
