import Link from "next/link";
import GradientHeading from "@/components/ui/GradientHeading";
import FadeIn from "@/components/motion/FadeIn";
import WebstoreClient from "@/components/webstore/WebstoreClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Webstore | Tyflex",
  description:
    "Tyflex's online store for enterprise technology in Zimbabwe — Hikvision cameras and switches, MikroTik and TP-Link networking, Samsung displays, TSC and Printronix label printers, Yealink and Fanvil IP phones, Yeastar PBX and 3CX. Order and request pricing online; delivered countrywide.",
  path: "/webstore",
  keywords: [
    "enterprise technology Zimbabwe",
    "Hikvision Zimbabwe",
    "label printer Zimbabwe",
    "IP phone Zimbabwe",
    "barcode printing Zimbabwe",
    "VoIP hardware Zimbabwe",
  ],
});

export default function WebstorePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-4">
              Online Store &mdash; Order &amp; Quote Online
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GradientHeading as="span">Webstore</GradientHeading>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tyflex&rsquo;s online store for enterprise technology &mdash; VoIP phones,
              barcode printers, cameras, switches, displays and more. Browse, build a
              list and order or request pricing online. We deliver across Zimbabwe.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-sm text-gray-500">
              Prefer to shop by brand?{" "}
              <Link href="/brands" className="text-brand-red hover:underline">
                See all brands we supply
              </Link>
              .
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.25}>
          <div className="mx-auto max-w-3xl -mt-6 mb-14 rounded-xl border border-brand-red/25 bg-brand-red/[0.06] px-5 py-4 text-sm text-gray-300">
            <span className="font-semibold text-white">This is an online store.</span>{" "}
            Place your order or quote request right here &mdash; we deliver countrywide,
            or arrange collection by appointment. Our premises are not a walk-in shop, so
            please don&rsquo;t pop in without booking a time with us first.
          </div>
        </FadeIn>

        <WebstoreClient />
      </div>
    </div>
  );
}
