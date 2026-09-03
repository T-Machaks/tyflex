import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FadeIn from "@/components/motion/FadeIn";
import ProductCard from "@/components/webstore/ProductCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { brands, getBrandBySlug } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import { getSolutionBySlug } from "@/lib/data/solutions";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};
  return buildMetadata({
    title: brand.metaTitle,
    description: brand.metaDescription,
    path: `/brands/${brand.slug}`,
    keywords: brand.keywords,
  });
}

export default function BrandPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const brandProducts = products.filter((p) => brand.productBrandKeys.includes(p.brand ?? ""));
  const shown = brandProducts.slice(0, 9);
  const relatedSolutions = brand.solutionSlugs
    .map((s) => getSolutionBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const primaryCta = brand.awsHub
    ? { href: "/solutions/aws-cloud-solutions", label: "Explore AWS Cloud Solutions" }
    : { href: `/get-quote?product=${encodeURIComponent(brand.name)}`, label: `Get a ${brand.name} quote` };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.metaDescription,
    url: `${COMPANY.url}/brands/${brand.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <Link
            href="/brands"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All brands
          </Link>
        </FadeIn>

        {/* Hero */}
        <FadeIn delay={0.05}>
          <div className="flex items-start gap-5 mb-6">
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-brand-red/10 flex items-center justify-center">
              <DynamicIcon name={brand.icon} className="h-7 w-7 text-brand-red" />
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-brand-red mb-1">
                {brand.category} &middot; Zimbabwe
              </span>
              <h1 className="text-3xl md:text-5xl font-bold">{brand.name}</h1>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-6">{brand.tagline}</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <GradientButton href={primaryCta.href} size="lg">
              {primaryCta.label}
            </GradientButton>
            <GradientButton href="/resources/docs" variant="secondary" size="lg">
              Datasheets &amp; docs
            </GradientButton>
          </div>
        </FadeIn>

        {/* Intro */}
        <FadeIn>
          <div className="max-w-3xl space-y-4 mb-14">
            {brand.intro.map((para) => (
              <p key={para.slice(0, 40)} className="text-gray-400 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </FadeIn>

        {/* Highlights */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What Tyflex supplies &amp; supports</h2>
            <ul className="grid sm:grid-cols-2 gap-3 max-w-4xl">
              {brand.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Catalogue */}
        {shown.length > 0 ? (
          <FadeIn>
            <section className="mb-16">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">{brand.name} in the webstore</h2>
                <Link
                  href="/webstore"
                  className="text-sm text-brand-red hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  All {brandProducts.length} products
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shown.map((p, i) => (
                  <FadeIn key={p.id} delay={0.03 * i}>
                    <ProductCard product={p} />
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>
        ) : (
          <FadeIn>
            <section className="mb-16 rounded-2xl bg-brand-card border border-white/5 p-8">
              <h2 className="text-xl font-bold mb-2">Available on request</h2>
              <p className="text-gray-400 text-sm max-w-xl mb-6">
                We supply {brand.name} hardware and consumables to order. Tell us
                the model or the job and we&apos;ll quote availability and lead time.
              </p>
              <GradientButton href={primaryCta.href}>{primaryCta.label}</GradientButton>
            </section>
          </FadeIn>
        )}

        {/* Related solutions */}
        {relatedSolutions.length > 0 && (
          <FadeIn>
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Where {brand.name} fits</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedSolutions.map((s) => (
                  <Link key={s.slug} href={`/solutions/${s.slug}`} className="group block h-full">
                    <GlassCard className="h-full p-5">
                      <div className="h-11 w-11 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3">
                        <DynamicIcon name={s.icon} className="h-5 w-5 text-brand-red" />
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-white">{s.name}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.shortDescription}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs text-brand-red">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* FAQ */}
        <FadeIn>
          <section className="mb-16 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">{brand.name} — common questions</h2>
            <FAQAccordion faqs={brand.faqs} />
          </section>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-3">Need {brand.name} in Zimbabwe?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm">
              Tyflex supplies, installs and supports {brand.name} for businesses
              across the country. Tell us what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton href={primaryCta.href} size="lg">
                {primaryCta.label}
              </GradientButton>
              <Link
                href="/resources/docs"
                className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <FileText className="h-4 w-4" />
                Browse datasheets
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
