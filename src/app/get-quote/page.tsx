import GetQuoteClient from "@/components/get-quote/GetQuoteClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Quote | Tyflex Zimbabwe",
  description:
    "Request a tailored quote from Tyflex in Zimbabwe — add multiple products from the webstore to one request, or tell us about a VoIP, 3CX, networking, barcode or AWS project.",
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
