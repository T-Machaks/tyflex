import { FileText } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documentation | Tyflex Investments",
  description:
    "Technical documentation and setup guides for Tyflex Investments products and solutions. New guides are being added regularly — check back soon.",
  path: "/resources/docs",
});

export default function DocsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Documentation</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Technical documentation, setup guides, and references for our products.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="text-center py-20 rounded-2xl bg-brand-card border border-white/5">
            <div className="h-14 w-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="h-7 w-7 text-brand-red" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Documentation Is Being Prepared</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Per-product setup guides are on the way. In the meantime, our
              support team can walk you through configuration, troubleshooting,
              or anything else you need.
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
