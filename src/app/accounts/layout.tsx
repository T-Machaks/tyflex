import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppShell from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Billing & Accounts | Tyflex Investments",
  },
  description: "Internal billing and invoicing tool for Tyflex Investments.",
  robots: { index: false, follow: false },
};

export default function AccountsLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
