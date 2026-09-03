"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY, isProtectedPath } from "@/lib/constants";
import { solutions as allSolutions } from "@/lib/data/solutions";
import { brands as allBrands } from "@/lib/data/brands";

// Footer shows a curated subset — the full list lives at /solutions.
const footerSolutions = allSolutions.slice(0, 6);
// Priority brands for internal linking / SEO — full list at /brands.
const footerBrands = allBrands.slice(0, 7);

const resources = [
  { name: "Blog", href: "/resources/blog" },
  { name: "Case Studies", href: "/resources/case-studies" },
  { name: "Documentation", href: "/resources/docs" },
  { name: "Support", href: "/support" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Our Ventures", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Partners", href: "/partners" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();

  // Authenticated app sections (portal/tracker/accounts) get their own chrome.
  if (isProtectedPath(pathname)) return null;

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Tyflex"
                width={40}
                height={40}
                className="h-8 w-8 rounded-lg bg-white/90 p-0.5 object-contain"
              />
              <span className="text-2xl font-bold">
                Tyflex<span className="text-brand-red">.</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md leading-relaxed text-sm">
              Enterprise technology solutions for Zimbabwean businesses. From
              unified communications to commerce platforms, we deliver technology
              that drives growth.
            </p>
            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>{COMPANY.phoneDisplay}</p>
              <p>{COMPANY.email}</p>
              <p>{COMPANY.address}</p>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2">
              {footerSolutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/solutions" className="text-brand-red hover:text-white text-sm font-medium transition-colors">
                  View All Solutions &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Brands
            </h4>
            <ul className="space-y-2">
              {footerBrands.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {b.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brands" className="text-brand-red hover:text-white text-sm font-medium transition-colors">
                  All Brands &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((r) => (
                <li key={r.name}>
                  <Link href={r.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {company.map((c) => (
                <li key={c.name}>
                  <Link href={c.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
