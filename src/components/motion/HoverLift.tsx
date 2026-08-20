"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  /** CSS color used for the glow shadow on hover. */
  glowColor?: string;
  liftPx?: number;
}

/**
 * Generic hover lift + glow wrapper — pairs any element (icon, image, tile)
 * with a subtle upward lift and a soft brand-colored glow on hover.
 */
export default function HoverLift({
  children,
  className,
  glowColor = "rgba(220, 38, 38, 0.35)",
  liftPx = 6,
}: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -liftPx,
        boxShadow: `0 20px 45px -15px ${glowColor}`,
      }}
      whileTap={{ y: -liftPx / 3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
