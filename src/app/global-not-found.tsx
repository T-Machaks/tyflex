import { Inter } from "next/font/google";
import "./(site)/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";
import AppProviders from "@/components/providers/AppProviders";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Rendered for every 404. With two root layouts ((site) and (paida)) Next has no
// shared layout to wrap 404s in, so this repeats the site layout's shell.
export const metadata = { title: "Page not found | Tyflex", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased bg-brand-black text-white">
        <AppProviders>
          <Header />
          <main>
            <NotFoundContent />
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
