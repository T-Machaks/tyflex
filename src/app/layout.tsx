import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { COMPANY, BUSINESS_HOURS } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_TITLE = "Tyflex Investments | Enterprise Technology Solutions in Zimbabwe";
const SITE_DESCRIPTION =
  "Tyflex Investments helps Zimbabwean businesses grow with VoIP, 3CX, networking, barcode scanning, POS, ERP, printing, and business messaging solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: { default: SITE_TITLE, template: "%s" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: COMPANY.url },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: COMPANY.url,
    siteName: COMPANY.name,
    type: "website",
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Weekday hours in BUSINESS_HOURS use an en dash range ("Monday – Friday") —
// schema.org wants individual dayOfWeek values, so this maps that one label
// to its five constituent days. Saturday/Sunday pass through as single days.
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function expandDays(label: string): string[] {
  if (label.includes("–") || label.includes("-")) {
    const [start, end] = label.split(/[–-]/).map((d) => d.trim());
    const startIdx = DAY_NAMES.indexOf(start);
    const endIdx = DAY_NAMES.indexOf(end);
    if (startIdx !== -1 && endIdx !== -1) return DAY_NAMES.slice(startIdx, endIdx + 1);
  }
  return [label.trim()];
}

// "8:00 AM" -> "08:00", "1:00 PM" -> "13:00" — schema.org opens/closes wants 24-hour HH:MM.
function to24Hour(time: string): string {
  const match = time.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return time.trim();
  let [, hourStr, minute, meridiem] = match;
  let hour = parseInt(hourStr, 10);
  if (meridiem.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (meridiem.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

const organizationAndLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${COMPANY.url}/#organization`,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: COMPANY.url,
      logo: `${COMPANY.url}/logo.png`,
      foundingDate: String(COMPANY.founded),
      email: COMPANY.email,
      telephone: COMPANY.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "40 St Athans Drive, Bluffhill",
        addressLocality: "Harare",
        addressCountry: "ZW",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${COMPANY.url}/#localbusiness`,
      name: COMPANY.name,
      image: `${COMPANY.url}/logo.png`,
      url: COMPANY.url,
      telephone: COMPANY.phone,
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "40 St Athans Drive, Bluffhill",
        addressLocality: "Harare",
        addressCountry: "ZW",
      },
      parentOrganization: { "@id": `${COMPANY.url}/#organization` },
      openingHoursSpecification: BUSINESS_HOURS.filter((h) => h.hours !== "Closed").map((h) => {
        const [opens, closes] = h.hours.split("–").map((t) => t.trim());
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: expandDays(h.day),
          opens: to24Hour(opens),
          closes: to24Hour(closes),
        };
      }),
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased bg-brand-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationAndLocalBusinessSchema) }}
        />
        <MaintenanceBanner />
        <Header />
        <main className="pt-10">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
