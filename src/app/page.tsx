import HomeClient from "@/components/home/HomeClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tyflex — Unified Communications & Enterprise Tech",
  description:
    "From unified communications to enterprise hardware, we deliver technology that drives efficiency and growth",
  path: "/",
});

export default function HomePage() {
  return <HomeClient />;
}
