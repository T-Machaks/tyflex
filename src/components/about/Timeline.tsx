"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import type { TimelineMilestone } from "@/lib/data/business-units";

interface TimelineProps {
  milestones: TimelineMilestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative pl-10 sm:pl-12">
      {/* Vertical line — animates in as it scrolls into view */}
      <motion.div
        className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-red via-white/10 to-transparent origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden
      />

      <div className="space-y-10">
        {milestones.map((milestone, i) => (
          <FadeIn key={`${milestone.year}-${milestone.title}`} delay={0.05 * i}>
            <div className="relative">
              {/* Dot */}
              <span className="absolute -left-10 sm:-left-12 top-1.5 h-6 w-6 rounded-full bg-brand-black border-2 border-brand-red flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-brand-red animate-glow-pulse" />
              </span>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4">
                <span className="text-brand-red font-bold text-sm shrink-0 sm:w-16">{milestone.year}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{milestone.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
