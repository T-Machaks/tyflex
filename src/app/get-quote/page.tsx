import GetQuoteClient from "@/components/get-quote/GetQuoteClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Quote | Tyflex Zimbabwe",
  description:
    "Request a tailored quote for VoIP, 3CX, networking, barcode scanning, POS, ERP, and other enterprise technology solutions from Tyflex in Zimbabwe.",
  path: "/get-quote",
});

interface GetQuotePageProps {
  searchParams: { product?: string };
}

export default function GetQuotePage({ searchParams }: GetQuotePageProps) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <GetQuoteClient initialProduct={searchParams.product} />
      </div>
    </div>
  );
}
