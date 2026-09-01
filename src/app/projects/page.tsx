import Link from "next/link";
import DynamicIcon from "@/components/ui/DynamicIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import FadeIn from "@/components/motion/FadeIn";
import GradientButton from "@/components/ui/GradientButton";
import { ventures } from "@/lib/data/ventures";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Ventures | Built by Tyflex Investments",
  description:
    "ADMA Digital, Omniflex, and Vekta — platforms Tyflex Investments owns and operates, built with AWS support to solve real problems for African businesses.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Built by Tyflex</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Beyond the solutions we sell, we build and operate our own
              platforms — developed with support from our AWS partnership.
            </p>
          </FadeIn>
        </div>

        {/* Ventures */}
        <div className="space-y-12">
          {ventures.map((venture, i) => (
            <FadeIn key={venture.slug} delay={0.05 * i}>
              <div
                id={venture.slug}
                className="p-8 md:p-12 rounded-2xl bg-brand-card border border-white/5 scroll-mt-28"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <div className="h-11 w-11 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                      <DynamicIcon name={venture.icon} className="h-5 w-5 text-brand-red" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">{venture.name}</h2>
                    {venture.status && (
                      <StatusBadge
                        status={venture.status}
                        label={
                          venture.status === "launching-soon" && venture.launchDate
                            ? `Launching ${venture.launchDate}`
                            : undefined
                        }
                      />
                    )}
                  </div>
                  <p className="text-brand-red text-sm font-medium mb-4">{venture.tagline}</p>
                  <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">{venture.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {venture.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-brand-red mt-0.5">&#10003;</span>
                        {h}
                      </div>
                    ))}
                  </div>

                  {venture.url && (
                    <Link
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-red hover:underline inline-flex items-center gap-1"
                    >
                      Visit {venture.name} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn>
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-4">Interested in partnering with us?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We are always open to strategic partnerships and collaborations
              that create value.
            </p>
            <GradientButton href="/contact" size="lg">
              Get in Touch
            </GradientButton>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
