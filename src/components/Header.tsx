"use client";

import Link from "next/link";
import { useState } from "react";

const solutions = [
  { name: "UCaaS & VoIP", href: "/solutions/ucaas" },
  { name: "3CX Phone Systems", href: "/solutions/3cx" },
  { name: "Barcode & Scanning", href: "/solutions/barcode-scanning" },
  { name: "POS Systems", href: "/solutions/pos-systems" },
  { name: "Networking", href: "/solutions/networking" },
  { name: "Bulk Messaging", href: "/solutions/bulk-messaging" },
  { name: "Enterprise Printing", href: "/solutions/enterprise-printing" },
  { name: "ERP Software", href: "/solutions/erp-software" },
];

const navLinks = [
  { label: "Webstore", href: "/webstore" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/tyflex/logo.png" alt="Tyflex" className="h-9 w-9 rounded-lg bg-white/90 p-0.5 object-contain" />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">Tyflex</span>
            <span className="text-brand-red">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolOpen(true)}
            onMouseLeave={() => setSolOpen(false)}
          >
            <button className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              Solutions
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {solOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-brand-dark border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                <Link
                  href="/solutions"
                  className="block px-4 py-2.5 text-sm text-brand-red font-medium hover:bg-white/5 transition-colors"
                >
                  All Solutions
                </Link>
                <div className="border-t border-white/5 my-1" />
                {solutions.map((sol) => (
                  <Link
                    key={sol.href}
                    href={sol.href}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {sol.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-quote"
            className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-dark border-t border-white/5 px-6 py-4 space-y-3">
          <Link
            href="/solutions"
            className="block text-gray-300 hover:text-white py-2 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Solutions
          </Link>
          {solutions.map((sol) => (
            <Link
              key={sol.href}
              href={sol.href}
              className="block text-gray-400 hover:text-white py-1.5 pl-4 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {sol.name}
            </Link>
          ))}
          <div className="border-t border-white/5 my-2" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-quote"
            className="block w-full text-center px-5 py-2.5 bg-brand-red text-white rounded-lg mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
