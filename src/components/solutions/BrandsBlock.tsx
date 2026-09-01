import FadeIn from "@/components/motion/FadeIn";
import GlassCard from "@/components/ui/GlassCard";
import type { BrandGroup } from "@/lib/data/solutions";

/**
 * "Brands we supply" block for the solution detail template — grouped chips
 * reusing the same pill styling as the hub card badges, and the same
 * GlassCard surface used elsewhere on the page. Renders nothing if a
 * solution has no brandGroups (most don't need one).
 */
export default function BrandsBlock({ groups, solutionName }: { groups: BrandGroup[]; solutionName: string }) {
  return (
    <section className="py-20 border-t border-white/5">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-4 text-center">Brands We Supply</h2>
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
          The manufacturers and platforms behind our {solutionName} deployments.
        </p>
      </FadeIn>
      <div className={`grid gap-6 ${groups.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {groups.map((group, i) => (
          <FadeIn key={group.label} delay={0.05 * i}>
            <GlassCard interactive={false} className="p-6 h-full">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
