"use client";

import type { ReactNode } from "react";
import { QuoteCartProvider } from "@/lib/quote-cart/QuoteCartContext";
import QuoteCartDrawer from "@/components/webstore/QuoteCartDrawer";

/** Client-side context providers that need to wrap the whole app. */
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QuoteCartProvider>
      {children}
      <QuoteCartDrawer />
    </QuoteCartProvider>
  );
}
