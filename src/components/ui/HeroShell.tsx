"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroShellProps {
  children: ReactNode;
  className?: string;
  /** Show the animated red glow blob behind the content. Defaults to true. */
  glow?: boolean;
  /** Show a faint animated grid overlay in addition to the glow. Defaults to false. */
  grid?: boolean;
  /** Extra top padding for pages where the hero sits under the fixed header. */
  padTop?: boolean;
}

/**
 * Reusable dark hero shell: solid black background with a soft red radial
 * wash and a drifting glow blob — matches the site's flat dark theme rather
 * than a heavy frosted-glass treatment. Drop page content as children.
 *
 * <HeroShell>
 *   <h1 className="gradient-text">...</h1>
 * </HeroShell>
 */
export default function HeroShell({ children, className, glow = true, grid = false, padTop = true }: HeroShellProps) {
  return (
    <section className={`relative overflow-hidden bg-brand-black ${padTop ? "pt-20" : ""} ${className ?? ""}`}>
      {/* Soft red wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" aria-hidden />

      {/* Optional faint grid overlay */}
      {grid && (
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          aria-hidden
        />
      )}

      {/* Animated glow blob */}
      {glow && (
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-brand-red/5 blur-3xl"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}

      <div className="relative w-full">{children}</div>
    </section>
  );
}
