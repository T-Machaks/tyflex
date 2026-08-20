import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import GradientHeading from "@/components/ui/GradientHeading";
import FadeIn from "@/components/motion/FadeIn";
import SolutionIcon from "@/components/solutions/SolutionIcon";
import { solutions } from "@/lib/data/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Technology Solutions | Tyflex Investments",
  description:
    "Explore Tyflex Investments' full range of technology solutions for Zimbabwean businesses — UCaaS, 3CX, networking, POS, ERP, cloud, and enterprise messaging.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-4">
              15 Solutions, One Partner
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GradientHeading as="span">Solutions</GradientHeading>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions tailored for businesses
              operating in Zimbabwe and the region.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <FadeIn key={sol.slug} delay={0.05 * (i % 6)}>
              <Link href={`/solutions/${sol.slug}`} className="block h-full">
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5">
                    <SolutionIcon name={sol.icon} className="h-6 w-6 text-brand-red" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{sol.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{sol.shortDescription}</p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {sol.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-sm text-gray-300 group-hover:text-white transition-colors">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </GlassCard>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn>
          <div className="mt-20 text-center p-12 rounded-2xl border border-white/5 bg-brand-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Not Sure Which Solution?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Our team will assess your needs and recommend the best
              technology stack for your business.
            </p>
            <GradientButton href="/get-quote" size="lg">
              Get a Free Consultation
            </GradientButton>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
