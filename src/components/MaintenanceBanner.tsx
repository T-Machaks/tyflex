import { Wrench } from "lucide-react";

/**
 * Site-wide notice that the platform is under active maintenance. Fixed to the
 * very top (above the Header, which is offset down by the same amount in
 * layout.tsx / globals via the `pt-10` on <main> and `top-10` on <header>).
 * Non-dismissible on purpose so the notice can't be missed while work is ongoing.
 */
export default function MaintenanceBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-md">
      <p className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] leading-snug text-amber-200/90 sm:text-xs">
        <Wrench className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>
          This platform is under active maintenance — some pages, resources, and
          pricing may be incomplete or temporarily unavailable.
        </span>
      </p>
    </div>
  );
}
