import type { ElementType, ReactNode } from "react";

interface GradientHeadingProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Heading text with the site's white-to-gray gradient fill.
 * <GradientHeading as="h1" className="text-5xl">Streamlined Tech Solutions</GradientHeading>
 */
export default function GradientHeading({ children, as: Tag = "h2", className }: GradientHeadingProps) {
  return <Tag className={`gradient-text font-bold ${className ?? ""}`}>{children}</Tag>;
}
