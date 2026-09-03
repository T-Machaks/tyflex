import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileLock2 } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import SolutionIcon from "@/components/solutions/SolutionIcon";
import FAQAccordion from "@/components/ui/FAQAccordion";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { awsSolutions, getAwsSolution } from "@/lib/data/aws-solutions";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: { sub: string };
}

export function generateStaticParams() {
  return awsSolutions.map((s) => ({ sub: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getAwsSolution(params.sub);
  if (!s) return {};
  return buildMetadata({
    title: `${s.name} | AWS Cloud Solutions | Tyflex`,
    description: s.tagline,
    path: `/solutions/aws-cloud-solutions/${s.slug}`,
  });
}

export default function AwsSolutionPage({ params }: Props) {
  const s = getAwsSolution(params.sub);
  if (!s) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: `${s.theme} — ${s.awsService}`,
    description: s.tagline,
    provider: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    areaServed: { "@type": "Country", name: "Zimbabwe" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "AWS Cloud Solutions", path: "/solutions/aws-cloud-solutions" },
          { name: s.name, path: `/solutions/aws-cloud-solutions/${s.slug}` },
        ]}
      />

      {/* Hero */}
      <HeroShell>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">
          <FadeIn>
            <Link
              href="/solutions/aws-cloud-solutions"
              className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              AWS Cloud Solutions
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-16 w-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-6">
              <SolutionIcon name={s.icon} className="h-8 w-8 text-brand-red" />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{s.theme}</span>
              <span className="h-1 w-1 rounded-full bg-gray-600" />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-2.5 py-1 text-xs font-medium text-[#ffb454]">
                {s.awsService}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{s.name}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">{s.tagline}</p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton href="/get-quote" size="lg">
                Talk to our AWS team
              </GradientButton>
              <a
                href={s.brief}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download the solution brief
              </a>
            </div>
          </FadeIn>
        </div>
      </HeroShell>

      <div className="max-w-4xl mx-auto px-6">
        {/* Intro */}
        <section className="py-16">
          <FadeIn>
            <p className="text-lg text-gray-300 leading-relaxed">{s.intro}</p>
          </FadeIn>
        </section>

        {/* Stat band */}
        {s.stats && s.stats.length > 0 && (
          <section className="pb-16">
            <div className="grid sm:grid-cols-3 gap-4">
              {s.stats.map((st, i) => (
                <FadeIn key={st.label} delay={0.05 * i}>
                  <div className="rounded-xl border border-white/5 bg-brand-card p-6 h-full">
                    <div className="text-2xl font-bold text-brand-red mb-1">{st.value}</div>
                    <div className="text-sm text-gray-400 leading-snug">{st.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
            {s.stats.some((st) => st.source) && (
              <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                Sources:{" "}
                {s.stats
                  .filter((st) => st.source)
                  .map((st) => st.source)
                  .join("; ")}
                .
              </p>
            )}
          </section>
        )}

        {/* The problem */}
        {s.problem && s.problem.length > 0 && (
          <section className="py-16 border-t border-white/5">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8">The problem</h2>
            </FadeIn>
            <ul className="space-y-4">
              {s.problem.map((p, i) => (
                <FadeIn key={i} delay={0.04 * i}>
                  <li className="flex gap-3 text-gray-300 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    {p}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </section>
        )}

        {/* What we deliver */}
        <section className="py-16 border-t border-white/5">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">What we deliver</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {s.deliver.map((d, i) => (
              <FadeIn key={i} delay={0.04 * i}>
                <div className="flex gap-3 rounded-xl bg-white/5 border border-white/5 p-5 h-full">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-red mt-0.5" />
                  <p className="text-sm text-gray-300 leading-relaxed">{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 border-t border-white/5">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">How it works</h2>
          </FadeIn>
          <ol className="space-y-6">
            {s.howItWorks.map((step, i) => (
              <FadeIn key={step.title} delay={0.04 * i}>
                <li className="flex gap-5">
                  <span className="shrink-0 text-xl font-bold text-brand-red/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t border-white/5">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Frequently asked questions</h2>
          </FadeIn>
          <FAQAccordion faqs={s.faqs} />
        </section>

        {/* Gated deep-dive */}
        {s.gated && s.gated.length > 0 && (
          <section className="py-8 border-t border-white/5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <FileLock2 className="h-6 w-6 text-gray-400 shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Technical deep-dive</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Implementation guides and the solution design document for {s.name} are available to
                  evaluators on request.
                </p>
              </div>
              <Link
                href={`/contact?subject=${encodeURIComponent(`${s.name} — technical deep-dive`)}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Request access
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        )}

        {/* Cross-link */}
        <section className="py-8 border-t border-white/5">
          <Link href="/projects" className="block">
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-2 inline-flex items-center gap-1.5">
                Built with AWS support
                <ArrowRight className="h-4 w-4 text-brand-red" />
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                ADMA Digital, Omniflex and Vekta — the platforms Tyflex builds and co-develops on AWS.
              </p>
            </GlassCard>
          </Link>
        </section>

        {/* CTA */}
        <section className="py-8">
          <div className="p-10 md:p-12 rounded-2xl border border-white/5 bg-brand-card text-center">
            <h3 className="text-2xl font-bold mb-3">Talk to our AWS team about {s.name}</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              A scoped conversation about your environment, timeline and what a Tyflex-led engagement
              looks like.
            </p>
            <GradientButton href="/get-quote" size="lg">
              Get a Free Quote
            </GradientButton>
          </div>
        </section>
      </div>
    </div>
  );
}
