"use client";

import { motion } from "framer-motion";
import type { ReactNode, MouseEventHandler } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Disable the hover lift/glow (e.g. for static informational cards). */
  interactive?: boolean;
}

/**
 * Standard card surface: flat dark background with a subtle border that
 * glows brand-red and lifts slightly on hover. Base building block for
 * feature cards, pricing cards, testimonial cards, etc.
 */
export default function GlassCard({ children, className, onClick, interactive = true }: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`rounded-2xl border border-white/5 bg-brand-card transition-colors duration-300 ${
        interactive ? "hover:border-brand-red/30" : ""
      } ${className ?? ""}`}
      whileHover={
        interactive
          ? { y: -6, boxShadow: "0 20px 45px -15px rgba(220, 38, 38, 0.2)" }
          : undefined
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
