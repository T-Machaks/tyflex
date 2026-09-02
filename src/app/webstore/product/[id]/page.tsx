import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FadeIn from "@/components/motion/FadeIn";
import ProductCard from "@/components/webstore/ProductCard";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { COMPANY } from "@/lib/constants";
import { getProductById, getRelatedProducts, products } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo";

interface ProductPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductById(params.id);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} | Tyflex Webstore`,
    description: product.shortDescription,
    path: `/webstore/product/${product.id}`,
  });
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  // Catalog pricing is stubbed for now (inquiry-based ordering), so the
  // structured data omits an Offer/price rather than publish a placeholder.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: product.category,
    brand: { "@type": "Organization", name: COMPANY.name },
  };

  const quoteHref = `/get-quote?product=${encodeURIComponent(product.name)}`;

  return (
    <div className="pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Webstore", path: "/webstore" },
          { name: product.name, path: `/webstore/product/${product.id}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <Link
            href="/webstore"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Products
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image placeholder */}
          <FadeIn>
            <div className="relative h-80 lg:h-full min-h-[320px] rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/5 flex items-center justify-center">
              <DynamicIcon name={product.icon} className="h-24 w-24 text-brand-red/30" strokeWidth={1} />
              {product.featured && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-red text-xs font-medium text-white">
                  Featured
                </span>
              )}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-gray-200">
                {product.category}
              </span>
            </div>
          </FadeIn>

          {/* Info */}
          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">{product.description}</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-lg font-semibold text-gray-300">Pricing on request</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-xs font-medium">
                  <Tag className="h-3.5 w-3.5" />
                  Request Quote — Inquiry Based
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <GlassCard interactive={false} className="p-6 mb-8">
                <h2 className="font-semibold mb-4">Specifications</h2>
                <dl className="space-y-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <dt className="text-gray-500">{spec.label}</dt>
                      <dd className="text-gray-300 text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton href={quoteHref} size="lg">
                  Request a Quote
                </GradientButton>
                <GradientButton href="/contact" variant="secondary" size="lg">
                  Ask a Question
                </GradientButton>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                No cart, no checkout — our team confirms availability and final
                pricing directly with you.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="pt-16 border-t border-white/5">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={0.05 * i}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.1}>
              <div className="text-center mt-10">
                <Link
                  href="/webstore"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Browse all products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </section>
        )}
      </div>
    </div>
  );
}
