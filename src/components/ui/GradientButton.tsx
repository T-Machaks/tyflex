"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

const MotionLink = motion(Link);

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  target?: string;
}

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-red hover:bg-brand-red-dark text-white",
  secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  ghost: "bg-transparent border border-white/15 text-white hover:border-white/30",
};

const hoverGlow = {
  primary: "0 10px 40px -8px rgba(220, 38, 38, 0.55)",
  secondary: "0 10px 30px -10px rgba(255, 255, 255, 0.15)",
  ghost: "0 10px 30px -10px rgba(255, 255, 255, 0.1)",
};

/**
 * Primary CTA button — solid brand red with a lift + glow hover animation.
 * Renders a <Link> when `href` is passed, otherwise a <button>.
 *
 * <GradientButton href="/get-quote">Get a Free Quote</GradientButton>
 */
export default function GradientButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disabled,
  target,
}: GradientButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className ?? ""}`;

  const motionProps = {
    whileHover: { y: -2, boxShadow: hoverGlow[variant] },
    whileTap: { y: 0, scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" },
  };

  if (href) {
    return (
      <MotionLink href={href} target={target} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
