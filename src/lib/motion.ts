import type { Variants } from "framer-motion";

/** Standard scroll-triggered reveal — content rises and fades in. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/** Plain fade, no movement — useful for backgrounds / overlays. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Wrap a list container with this + fadeInUp on each child for a staggered reveal. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Hover lift + glow, spread onto a motion component's whileHover/whileTap props. */
export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
  whileTap: { y: -2 },
};

export const hoverGlowShadow = (color = "rgba(220, 38, 38, 0.35)") => ({
  boxShadow: `0 20px 45px -15px ${color}`,
});
