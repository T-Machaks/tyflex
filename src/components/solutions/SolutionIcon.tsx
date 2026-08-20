import { iconMap, type IconName } from "@/lib/icon-map";

interface SolutionIconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

/** Resolves an icon name string (from solutions data) to its Lucide component. */
export default function SolutionIcon({ name, className, strokeWidth }: SolutionIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
