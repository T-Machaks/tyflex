import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { caseStudies } from "@/lib/data/case-studies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies | Tyflex Investments",
  description:
    "See how Tyflex Investments solutions have helped businesses across Zimbabwe modernize networking, communications, retail operations, and financial systems.",
  path: "/resources/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Case Studies</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how our solutions have helped businesses across Zimbabwe
              achieve their goals.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.slug} delay={0.05 * i}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                    <DynamicIcon name={study.icon} className="h-6 w-6 text-brand-red" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{study.metric}</div>
                    <div className="text-xs text-gray-500 max-w-[140px]">{study.metricLabel}</div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-1">
                  {study.client} &middot; {study.industry}
                </p>
                <h3 className="text-lg font-bold mb-4 leading-snug">{study.title}</h3>

                <div className="space-y-3 text-sm mb-6 flex-1">
                  <p>
                    <span className="text-gray-500 font-medium">Challenge: </span>
                    <span className="text-gray-400">{study.challenge}</span>
                  </p>
                  <p>
                    <span className="text-gray-500 font-medium">Solution: </span>
                    <span className="text-gray-400">{study.solution}</span>
                  </p>
                  <p>
                    <span className="text-gray-500 font-medium">Result: </span>
                    <span className="text-gray-400">{study.result}</span>
                  </p>
                </div>

                <Link
                  href={`/solutions/${study.solutionSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-brand-red hover:underline mt-auto"
                >
                  View the solution
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-4">Want results like these?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Tell us about your business and we&apos;ll put together a
              tailored plan — the same way we did for these clients.
            </p>
            <GradientButton href="/get-quote" size="lg">
              Get a Free Quote
            </GradientButton>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
