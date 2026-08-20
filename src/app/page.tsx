import HomeClient from "@/components/home/HomeClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tyflex Investments | Enterprise Technology Solutions in Zimbabwe",
  description:
    "Tyflex Investments delivers VoIP, 3CX, networking, barcode scanning, POS, ERP, and enterprise messaging solutions to businesses across Zimbabwe. Get a free quote today.",
  path: "/",
});

export default function HomePage() {
  return <HomeClient />;
}
