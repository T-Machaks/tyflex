import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import { COMPANY } from "@/lib/constants";
import "./paida.css";

// Self-hosted by next/font (no third-party request), two weights only to keep the payload small.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
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
