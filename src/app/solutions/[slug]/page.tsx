import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingCart } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import SolutionIcon from "@/components/solutions/SolutionIcon";
import BrandsBlock from "@/components/solutions/BrandsBlock";
import FAQAccordion from "@/components/ui/FAQAccordion";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getSolutionBySlug, solutions } from "@/lib/data/solutions";
import { buildMetadata } from "@/lib/seo";

interface SolutionPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: SolutionPageProps): Metadata {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) return {};
  return buildMetadata({
    title: `${solution.name} | Tyflex`,
    description: solution.shortDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="pb-24">
      {/* FAQ structured data for SEO featured snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: solution.name, path: `/solutions/${solution.slug}` },
        ]}
      />

      {/* Hero */}
      <HeroShell>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">
          <FadeIn>
            <Link
              href="/solutions"
              className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              All Solutions
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-16 w-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-6">
              <SolutionIcon name={solution.icon} className="h-8 w-8 text-brand-red" />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{solution.name}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">{solution.tagline}</p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton href="/get-quote" size="lg">
                Get a Free Quote
              </GradientButton>
              <GradientButton href="/contact" variant="secondary" size="lg">
                Talk to an Expert
              </GradientButton>
            </div>
          </FadeIn>
        </div>
      </HeroShell>

      <div className="max-w-7xl mx-auto px-6">
        {/* Features */}
        <section className="py-20">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4 text-center">Key Features</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
              Everything you need, built into one {solution.name} solution.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.features.map((f, i) => (
              <FadeIn key={f.title} delay={0.05 * i}>
                <GlassCard className="p-6 h-full">
                  <div className="h-11 w-11 rounded-lg bg-brand-red/10 flex items-center justify-center mb-4">
                    <SolutionIcon name={f.icon} className="h-5 w-5 text-brand-red" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Use cases / benefits */}
        <section className="py-20 border-t border-white/5">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4 text-center">Who It&rsquo;s For</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
              Common ways businesses put {solution.name} to work.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {solution.useCases.map((u, i) => (
              <FadeIn key={u.title} delay={0.05 * i}>
                <div className="p-6 rounded-xl bg-white/5 border border-white/5 h-full">
                  <CheckCircle2 className="h-5 w-5 text-brand-red mb-3" />
                  <h3 className="font-semibold mb-2">{u.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{u.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Related products */}
        <section className="py-20 border-t border-white/5">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4 text-center">Related Products</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
              Hardware and add-ons that pair with {solution.name}, available through our webstore.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {solution.relatedProducts.map((p, i) => {
              const href = p.productId ? `/webstore/product/${p.productId}` : "/webstore";
              return (
                <FadeIn key={p.name} delay={0.05 * i}>
                  <Link href={href} className="block h-full">
                    <GlassCard className="p-6 h-full">
                      <div className="h-11 w-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <ShoppingCart className="h-5 w-5 text-gray-300" />
                      </div>
                      <h3 className="font-semibold mb-2">{p.name}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.description}</p>
                      <span className="text-sm text-brand-red inline-flex items-center gap-1">
                        {p.productId ? "View in Webstore" : "Browse Webstore"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </GlassCard>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Brands we supply */}
        {solution.brandGroups && solution.brandGroups.length > 0 && (
          <BrandsBlock groups={solution.brandGroups} solutionName={solution.name} />
        )}

        {/* FAQ */}
        <section className="py-20 border-t border-white/5 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-center mb-12">Common questions about {solution.name}.</p>
          </FadeIn>
          <FAQAccordion faqs={solution.faqs} />
        </section>

        {/* Cross-links to related solutions/pages */}
        {solution.crossLinks && solution.crossLinks.length > 0 && (
          <section className="py-8 border-t border-white/5">
            <div className="grid sm:grid-cols-2 gap-6">
              {solution.crossLinks.map((link) => (
                <FadeIn key={link.href}>
                  <Link href={link.href} className="block h-full">
                    <GlassCard className="p-6 h-full">
                      <h3 className="font-semibold mb-2 inline-flex items-center gap-1.5">
                        {link.label}
                        <ArrowRight className="h-4 w-4 text-brand-red" />
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{link.description}</p>
                    </GlassCard>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-8">
          <div className="p-10 md:p-12 rounded-2xl border border-white/5 bg-brand-card text-center">
            <h3 className="text-2xl font-bold mb-3">{solution.ctaHeading ?? `Interested in ${solution.name}?`}</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {solution.ctaDescription ?? "Get a tailored quote for your business needs."}
            </p>
            <GradientButton href="/get-quote" size="lg">
              {solution.ctaButtonLabel ?? "Get a Free Quote"}
            </GradientButton>
          </div>
        </section>
      </div>
    </div>
  );
}
