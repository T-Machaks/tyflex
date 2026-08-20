import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppShell from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Project Tracker | Tyflex Investments",
  },
  description: "Internal project tracking tool for Tyflex Investments.",
  robots: { index: false, follow: false },
};

export default function TrackerLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
