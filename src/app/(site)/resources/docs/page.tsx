import Link from "next/link";
import { FileText, Download, Cloud } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import { products } from "@/lib/data/products";
import { awsSolutions } from "@/lib/data/aws-solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Datasheets & Documentation | Tyflex",
  description:
    "Download product datasheets for hardware Tyflex supplies — Hikvision switches, PoE switches, UPS units, SFP modules and more. Pricing on request.",
  path: "/resources/docs",
});

const withDatasheets = products.filter((p) => p.datasheet);

// Group by brand (unbranded items fall under "Tyflex").
const groups = Array.from(
  withDatasheets.reduce((map, p) => {
    const key = p.brand ?? "Tyflex";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
    return map;
  }, new Map<string, typeof withDatasheets>())
);

export default function DocsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Datasheets &amp; Documentation</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Technical datasheets for hardware we supply. Every item is
              inquiry-based — request a quote for current pricing and stock.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <section className="mb-14">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-red mb-5">
              <Cloud className="h-4 w-4" />
              AWS solution briefs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {awsSolutions.map((s) => (
                <a
                  key={s.slug}
                  href={s.brief}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <GlassCard className="h-full p-5 flex gap-4 items-start">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-red/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-brand-red" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug mb-1 group-hover:text-white">{s.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{s.theme}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-brand-red">
                        <Download className="h-3.5 w-3.5" />
                        Download PDF
                      </span>
                    </div>
                  </GlassCard>
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-600">
              Full implementation guides for these solutions are available to evaluators —{" "}
              <Link href="/contact" className="text-brand-red hover:underline">request access</Link>.
            </p>
          </section>
        </FadeIn>

        {groups.map(([brand, items], gi) => (
          <FadeIn key={brand} delay={0.05 * gi}>
            <section className="mb-14">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-red mb-5">
                {brand}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((p) => (
                  <a
                    key={p.id}
                    href={p.datasheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <GlassCard className="h-full p-5 flex gap-4 items-start">
                      <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-red/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-brand-red" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-snug mb-1 group-hover:text-white">
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">{p.category}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs text-brand-red">
                          <Download className="h-3.5 w-3.5" />
                          Download PDF
                        </span>
                      </div>
                    </GlassCard>
                  </a>
                ))}
              </div>
            </section>
          </FadeIn>
        ))}

        <FadeIn delay={0.1}>
          <div className="text-center py-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-xl font-bold mb-3">Need a datasheet you don&apos;t see here?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm">
              We can supply full manufacturer documentation and configuration
              guidance for anything in our catalogue.
            </p>
            <GradientButton href="/support" size="lg">
              Visit Support
            </GradientButton>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
