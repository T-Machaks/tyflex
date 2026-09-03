import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FadeIn from "@/components/motion/FadeIn";
import { brands } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Brands We Supply in Zimbabwe | Tyflex",
  description:
    "The technology brands Tyflex supplies, installs and supports in Zimbabwe — TSC, Printronix and TallyGenicom barcode printing, Urovo mobility devices, AWS cloud, 3CX, Yeastar, Fanvil and Yealink VoIP, and Hikvision video security.",
  path: "/brands",
  keywords: [
    "technology brands Zimbabwe",
    "TSC Zimbabwe",
    "Printronix Zimbabwe",
    "Urovo Zimbabwe",
    "3CX Zimbabwe",
    "Yeastar Zimbabwe",
    "Yealink Zimbabwe",
    "Hikvision Zimbabwe",
    "AWS partner Zimbabwe",
    "barcode printing Zimbabwe",
  ],
});

export default function BrandsPage() {
  const countFor = (keys: string[]) =>
    keys.length ? products.filter((p) => keys.includes(p.brand ?? "")).length : 0;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Brands</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The manufacturers Tyflex supplies, installs and supports across
              Zimbabwe — from barcode printing and enterprise mobility to VoIP,
              AWS cloud and video security.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((b, i) => {
            const n = countFor(b.productBrandKeys);
            return (
              <FadeIn key={b.slug} delay={0.04 * i}>
                <Link href={`/brands/${b.slug}`} className="group block h-full">
                  <GlassCard className="h-full p-6 flex flex-col">
                    <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4">
                      <DynamicIcon name={b.icon} className="h-6 w-6 text-brand-red" />
                    </div>
                    <h2 className="text-lg font-bold mb-1 group-hover:text-white">{b.name}</h2>
                    <p className="text-xs text-brand-red font-medium mb-3">{b.category}</p>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">{b.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-red">
                      {n > 0 ? `${n} products` : "Available on request"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </GlassCard>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="mt-16 text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-4">Looking for a brand not listed?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              We source from a wide supplier network. Tell us the make and model
              and we&apos;ll come back with availability and pricing.
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
