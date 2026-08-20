import GradientHeading from "@/components/ui/GradientHeading";
import FadeIn from "@/components/motion/FadeIn";
import WebstoreClient from "@/components/webstore/WebstoreClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Webstore | Tyflex Investments",
  description:
    "Browse enterprise technology products from Tyflex Investments — phone systems, barcode scanners, label printers, networking gear, and POS hardware. Request a quote.",
  path: "/webstore",
});

export default function WebstorePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-4">
              Inquiry-Based Ordering
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GradientHeading as="span">Webstore</GradientHeading>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse and request pricing on enterprise technology products.
              From VoIP phones to barcode scanners, sourced and supported
              across Zimbabwe.
            </p>
          </FadeIn>
        </div>

        <WebstoreClient />
      </div>
    </div>
  );
}
