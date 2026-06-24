"use client";

import Link from "next/link";

const ventures = [
  {
    id: "vekta",
    name: "Vekta",
    tagline: "Last-Mile Delivery & Digital Commerce",
    description:
      "Vekta is an integrated logistics and commerce platform built to solve last-mile delivery challenges in Zimbabwe. From food delivery to e-commerce fulfillment, Vekta connects businesses with a reliable fleet of drivers and gives consumers a seamless ordering experience.",
    highlights: [
      "Real-time tracking and dispatch optimization",
      "Multi-vendor marketplace capabilities",
      "Driver app with earnings management",
      "Business dashboard for order management",
      "Integrated payment processing",
    ],
    status: "Active",
    color: "border-blue-500/30",
    accentBg: "bg-blue-500/10",
    accent: "text-blue-400",
  },
  {
    id: "omniflex",
    name: "Omniflex",
    tagline: "AI-Powered Bulk Messaging",
    description:
      "Omniflex is an enterprise messaging platform that enables businesses to communicate with their customers at scale. With AI-powered automation, smart scheduling, and detailed analytics, Omniflex delivers millions of SMS messages reliably across Zimbabwe and beyond.",
    highlights: [
      "AI-powered natural language assistant",
      "Bulk SMS with smart scheduling",
      "Campaign analytics and reporting",
      "API integration for developers",
      "Multi-carrier delivery (Netone, Econet)",
    ],
    status: "Active",
    color: "border-emerald-500/30",
    accentBg: "bg-emerald-500/10",
    accent: "text-emerald-400",
  },
  {
    id: "mediaserv",
    name: "Mediaserv Digital",
    tagline: "Digital Publishing & Event Technology",
    description:
      "Mediaserv Digital is a unified digital platform for publications and events, developed in partnership with Mediaserv Advertising & Marketing. It powers digital magazines, event companion apps, exhibitor portals, and advertising delivery across all Mediaserv properties.",
    highlights: [
      "Digital publications engine for all Mediaserv titles",
      "Event ticketing, gate scanning, and check-in systems",
      "MineCon — Zimbabwe's premier mining & construction exhibition",
      "Exhibitor portal with lead capture",
      "Advertising delivery and impression tracking",
      "Integrated Vekta commerce layer for payments",
    ],
    status: "Active",
    color: "border-purple-500/30",
    accentBg: "bg-purple-500/10",
    accent: "text-purple-400",
    subBrand: {
      name: "MineCon",
      description: "Zimbabwe's premier mining and construction B2B exhibition and conference platform, connecting suppliers, operators, and decision-makers.",
    },
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Ventures</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technology companies built to solve real problems across Africa.
            Each venture operates independently with dedicated teams,
            supported by our shared infrastructure and expertise.
          </p>
        </div>

        {/* Ventures */}
        <div className="space-y-12">
          {ventures.map((venture) => (
            <div
              key={venture.id}
              id={venture.id}
              className={`p-8 md:p-12 rounded-2xl bg-brand-card border ${venture.color} scroll-mt-28`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold">{venture.name}</h2>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${venture.accentBg} ${venture.accent}`}>
                    {venture.status}
                  </span>
                </div>
                <p className={`${venture.accent} text-sm font-medium mb-4`}>{venture.tagline}</p>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
                  {venture.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {venture.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-brand-red mt-0.5">&#10003;</span>
                      {h}
                    </div>
                  ))}
                </div>

                {/* MineCon sub-brand callout */}
                {venture.subBrand && (
                  <div className="mt-6 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-400 font-bold">{venture.subBrand.name}</span>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">Part of Mediaserv Digital</span>
                    </div>
                    <p className="text-gray-400 text-sm">{venture.subBrand.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Interested in partnering with us?</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            We are always open to strategic partnerships and collaborations
            that create value.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
