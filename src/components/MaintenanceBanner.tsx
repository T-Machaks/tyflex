import { Wrench } from "lucide-react";

/**
 * Site-wide notice for what's still outstanding. Fixed to the very top (above
 * the Header, which is offset down by the same amount in layout.tsx / globals
 * via the `pt-10` on <main> and `top-10` on <header>). Non-dismissible on
 * purpose so the notice can't be missed while work is ongoing.
 *
 * Update this copy as outstanding items are resolved; remove the banner
 * entirely (and its usage in layout.tsx) once nothing is left.
 */
export default function MaintenanceBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-md">
      <p className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] leading-snug text-amber-200/90 sm:text-xs">
        <Wrench className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>
          The chat / AI assistant is currently disabled — it&rsquo;s not yet
          configured. Everything else on the site is live.
        </span>
      </p>
    </div>
  );
}
