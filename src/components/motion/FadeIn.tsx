"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Re-play the animation every time it scrolls into view instead of once. */
  once?: boolean;
  /** How far (in px, negative pulls the trigger earlier) before the element is "in view". */
  margin?: string;
}

/**
 * Scroll-triggered fade-in-up wrapper. Wrap any section/card with this to get
 * the standard reveal animation used across the site.
 *
 * <FadeIn delay={0.1}><Card /></FadeIn>
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  once = true,
  margin = "-80px",
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
