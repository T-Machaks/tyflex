import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { COMPANY } from "@/lib/constants";
import "./paida.css";

// Bundled latin subset of Playfair Display (SIL OFL, variable 600-700) — no network fetch at build time.
const playfair = localFont({
  src: "./fonts/PlayfairDisplay-latin.woff2",
  weight: "600 700",
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  // A private page for family and friends — keep it out of search results.
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E💗%3C/text%3E%3C/svg%3E",
  },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a1f3d",
};

// Separate root layout: none of the Tyflex header/footer/chat/branding is rendered here.
export default function PaidaRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>{children}</body>
    </html>
  );
}
