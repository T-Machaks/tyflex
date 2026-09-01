export type EntityStatus = "in-development" | "on-hold" | "launching-soon";

const STATUS_LABELS: Record<EntityStatus, string> = {
  "in-development": "In Development",
  "on-hold": "On Hold",
  "launching-soon": "Launching Soon",
};

const STATUS_STYLES: Record<EntityStatus, string> = {
  "in-development": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "on-hold": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "launching-soon": "bg-brand-red/10 text-brand-red border-brand-red/20",
};

/**
 * Neutral status pill for anything not yet fully active — venture cards,
 * business units, timeline entries. Deliberately non-apologetic language
 * ("In Development" / "On Hold" / "Launching Soon"), not "not ready yet."
 * Omit entirely for active items rather than rendering an "Active" badge.
 */
export default function StatusBadge({ status, label }: { status: EntityStatus; label?: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium border ${STATUS_STYLES[status]}`}
    >
      {label ?? STATUS_LABELS[status]}
    </span>
  );
}
