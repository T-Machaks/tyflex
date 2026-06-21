import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProposeChange from "@/components/ProposeChange";

export const metadata: Metadata = {
  title: "Tyflex | Enterprise Technology Solutions in Zimbabwe",
  description:
    "Tyflex helps Zimbabwean businesses grow with VoIP, 3CX, networking, barcode scanning, POS, ERP, printing, and business messaging solutions.",
  icons: {
    icon: "/tyflex/favicon.png",
    apple: "/tyflex/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-brand-black text-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <ProposeChange />
      </body>
    </html>
  );
}
