/**
 * Official AWS Partner badge, rendered on a white tile so it reads on the
 * dark site. Source asset: public/aws-partner-badge.png.
 */
export default function AwsPartnerBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-white p-3 shadow-[0_2px_20px_-6px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/aws-partner-badge.png"
        alt="AWS Partner"
        width={96}
        height={96}
        className="h-20 w-20"
      />
    </span>
  );
}
