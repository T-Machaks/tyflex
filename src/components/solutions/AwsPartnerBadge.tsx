/**
 * Placeholder AWS Partner badge. Swap the inner markup for the official
 * AWS Partner Network badge asset (drop it in /public and use next/image)
 * once brand approval is confirmed.
 */
export default function AwsPartnerBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-[#ff9900]" aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
        Amazon Web Services Partner
      </span>
    </span>
  );
}
