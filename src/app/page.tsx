"use client";

import Link from "next/link";
import { useState } from "react";

const stats = [
  { value: "3+", label: "Active Ventures" },
  { value: "10+", label: "Years Building" },
  { value: "5", label: "Industries" },
  { value: "1M+", label: "Users Reached" },
];

const solutionTabs = [
  {
    name: "VoIP Solutions",
    description:
      "Enterprise-grade voice communications with crystal-clear calls, auto-attendants, and unified messaging. Reduce phone costs by up to 60%.",
    features: ["HD voice quality", "Auto-attendant & IVR", "Call recording & analytics", "Mobile & desktop apps"],
    href: "/solutions/ucaas",
  },
  {
    name: "Barcode Solutions",
    description:
      "Complete barcode and scanning solutions for warehousing, retail, and asset management. From handheld scanners to enterprise systems.",
    features: ["Handheld & fixed scanners", "Label printing", "Inventory management", "Asset tracking"],
    href: "/solutions/barcode-scanning",
  },
  {
    name: "POS Systems",
    description:
      "Point-of-sale systems designed for retail, hospitality, and services. Fast, reliable, and integrated with your existing tools.",
    features: ["Touch screen terminals", "Receipt printers", "Cash drawers", "Inventory sync"],
    href: "/solutions/pos-systems",
  },
  {
    name: "Networking",
    description:
      "Enterprise networking infrastructure built for performance and security. From structured cabling to managed switches and firewalls.",
    features: ["Structured cabling", "Managed switches", "Firewalls & security", "Wi-Fi coverage"],
    href: "/solutions/networking",
  },
  {
    name: "Bulk Messaging",
    description:
      "Reach thousands of customers instantly with bulk SMS and WhatsApp messaging. Smart scheduling, personalization, and delivery tracking.",
    features: ["Bulk SMS campaigns", "WhatsApp Business API", "Scheduled delivery", "Delivery reports"],
    href: "/solutions/bulk-messaging",
  },
  {
    name: "ERP Software",
    description:
      "Unified business management software connecting finance, HR, inventory, and operations in one platform built for African businesses.",
    features: ["Financial management", "HR & payroll", "Inventory control", "Custom modules"],
    href: "/solutions/erp-software",
  },
];

const ventures = [
  {
    name: "Vekta",
    tagline: "Last-Mile Delivery & Digital Commerce",
    description:
      "An integrated logistics and commerce platform powering last-mile delivery for businesses and consumers across Zimbabwe.",
    color: "from-blue-500/20 to-blue-600/5",
    href: "/projects#vekta",
  },
  {
    name: "Omniflex",
    tagline: "AI-Powered Bulk Messaging",
    description:
      "Enterprise messaging platform delivering millions of SMS, enabling businesses to reach their customers at scale with smart automation.",
    color: "from-emerald-500/20 to-emerald-600/5",
    href: "/projects#omniflex",
  },
  {
    name: "Mediaserv Digital",
    tagline: "Digital Publishing & Event Technology",
    description:
      "Digital media company operating news platforms and providing event technology including MineCon \u2014 Zimbabwe\u2019s premier mining and construction exhibition.",
    color: "from-purple-500/20 to-purple-600/5",
    href: "/projects#mediaserv",
  },
];

const strengths = [
  {
    title: "Local Expertise",
    description: "Deep understanding of Zimbabwean business challenges with solutions designed for local infrastructure.",
    icon: "\u{1F30D}",
  },
  {
    title: "End-to-End Support",
    description: "From consultation and installation to training and ongoing support \u2014 we\u2019re with you at every step.",
    icon: "\u{1F91D}",
  },
  {
    title: "Proven Technology",
    description: "Enterprise-grade solutions from global partners, deployed and supported locally.",
    icon: "\u26A1",
  },
  {
    title: "Scalable Growth",
    description: "Solutions that grow with your business \u2014 start small and scale as your needs evolve.",
    icon: "\u{1F4C8}",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8">
            Trusted by businesses across Zimbabwe
          </span>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            <span className="gradient-text">Streamlined Tech Solutions</span>
            <br />
            <span className="text-white">for Business Growth</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            From unified communications to enterprise hardware, we deliver
            technology solutions that drive efficiency, reduce costs, and
            accelerate your business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quote"
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/solutions"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors"
            >
              Explore Solutions
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Tabs Section (from demo) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solutions</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Comprehensive technology solutions tailored for businesses
              operating in Zimbabwe and the region.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {solutionTabs.map((tab, i) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  activeTab === i
                    ? "bg-brand-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="p-8 md:p-12 rounded-2xl bg-brand-card border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">{solutionTabs[activeTab].name}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {solutionTabs[activeTab].description}
                </p>
                <ul className="space-y-3 mb-8">
                  {solutionTabs[activeTab].features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-300">
                      <span className="text-brand-red">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={solutionTabs[activeTab].href}
                  className="inline-block px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-full h-64 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 flex items-center justify-center text-5xl">
                  {activeTab === 0 && "\u{1F4DE}"}
                  {activeTab === 1 && "\u{1F4F1}"}
                  {activeTab === 2 && "\u{1F4B3}"}
                  {activeTab === 3 && "\u{1F310}"}
                  {activeTab === 4 && "\u{1F4E8}"}
                  {activeTab === 5 && "\u{1F4CA}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-4">
              Our Ventures
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built by Tyflex</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Beyond solutions, we build and scale technology companies that
              serve African markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ventures.map((venture) => (
              <Link
                key={venture.name}
                href={venture.href}
                className="group relative p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${venture.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-1">{venture.name}</h3>
                  <p className="text-brand-red text-sm font-medium mb-3">{venture.tagline}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{venture.description}</p>
                  <span className="inline-flex items-center mt-4 text-sm text-gray-300 group-hover:text-white transition-colors">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Tyflex
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                With over a decade of experience delivering technology solutions
                in Zimbabwe, we combine global enterprise products with deep local
                knowledge and support.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-brand-red mt-1">&#10003;</span>
                  Certified partners of leading technology brands
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-red mt-1">&#10003;</span>
                  On-site installation and training across Zimbabwe
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-red mt-1">&#10003;</span>
                  24/7 technical support for enterprise clients
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-red mt-1">&#10003;</span>
                  Flexible payment plans and USD pricing
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-red mt-1">&#10003;</span>
                  10+ years trusted by leading Zimbabwean businesses
                </li>
              </ul>
              <Link
                href="/about"
                className="inline-block mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                About Tyflex
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-brand-card border border-white/5"
                >
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            Get a free consultation with our team to find the right technology
            solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quote"
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
