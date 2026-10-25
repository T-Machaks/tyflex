import type { Metadata } from "next";
import PortalLoginClient from "@/components/portal/PortalLoginClient";

export const metadata: Metadata = {
  title: "Sign In | Tyflex Document Portal",
};

interface PortalPageProps {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function PortalPage(props: PortalPageProps) {
  const searchParams = await props.searchParams;
  return <PortalLoginClient callbackUrl={searchParams.callbackUrl} error={searchParams.error} />;
}
