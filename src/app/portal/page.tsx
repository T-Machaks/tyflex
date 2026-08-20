import type { Metadata } from "next";
import PortalLoginClient from "@/components/portal/PortalLoginClient";

export const metadata: Metadata = {
  title: "Sign In | Tyflex Document Portal",
};

interface PortalPageProps {
  searchParams: { callbackUrl?: string; error?: string };
}

export default function PortalPage({ searchParams }: PortalPageProps) {
  return <PortalLoginClient callbackUrl={searchParams.callbackUrl} error={searchParams.error} />;
}
