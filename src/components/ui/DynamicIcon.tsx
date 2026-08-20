import { iconMap, type IconName } from "@/lib/icon-map";

interface DynamicIconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

/** Resolves an icon name string (from data files) to its Lucide component. */
export default function DynamicIcon({ name, className, strokeWidth }: DynamicIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
