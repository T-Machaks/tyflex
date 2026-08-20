import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppShell from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Document Portal | Tyflex Investments",
  },
  description: "Secure client document portal for Tyflex Investments.",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
