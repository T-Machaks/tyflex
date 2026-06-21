import Link from "next/link";

const solutions = [
  {
    name: "UCaaS & VoIP",
    description: "Enterprise voice communications with HD calls, auto-attendants, call recording, and unified messaging.",
    href: "/solutions/ucaas",
    icon: "\u{1F4DE}",
  },
  {
    name: "3CX Phone Systems",
    description: "Award-winning phone system for business \u2014 hosted or on-premise, with video conferencing and live chat.",
    href: "/solutions/3cx",
    icon: "\u{1F4F1}",
  },
  {
    name: "Barcode & Scanning",
    description: "Complete barcode solutions for warehousing, retail, and asset management with handheld and fixed scanners.",
    href: "/solutions/barcode-scanning",
    icon: "\u{1F4CB}",
  },
  {
    name: "POS Systems",
    description: "Point-of-sale hardware and software for retail, hospitality, and services businesses.",
    href: "/solutions/pos-systems",
    icon: "\u{1F4B3}",
  },
  {
    name: "Networking",
    description: "Enterprise networking infrastructure \u2014 structured cabling, managed switches, firewalls, and Wi-Fi.",
    href: "/solutions/networking",
    icon: "\u{1F310}",
  },
  {
    name: "Bulk Messaging",
    description: "Reach thousands instantly with bulk SMS and WhatsApp. Smart scheduling, personalization, and analytics.",
    href: "/solutions/bulk-messaging",
    icon: "\u{1F4E8}",
  },
  {
    name: "Enterprise Printing",
    description: "High-volume printers, managed print services, and document solutions for enterprise environments.",
    href: "/solutions/enterprise-printing",
    icon: "\u{1F5A8}",
  },
  {
    name: "ERP Software",
    description: "Unified business management \u2014 finance, HR, inventory, and operations in one integrated platform.",
    href: "/solutions/erp-software",
    icon: "\u{1F4CA}",
  },
];

export default function SolutionsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Solutions</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive technology solutions tailored for businesses
            operating in Zimbabwe and the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol) => (
            <Link
              key={sol.name}
              href={sol.href}
              className="group p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-red/30 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{sol.icon}</span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-red transition-colors">{sol.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{sol.description}</p>
              <span className="inline-flex items-center mt-4 text-sm text-gray-300 group-hover:text-white transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center p-12 rounded-2xl bg-brand-card border border-white/5">
          <h2 className="text-2xl font-bold mb-4">Not sure which solution is right for you?</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Our team will assess your needs and recommend the best technology
            stack for your business.
          </p>
          <Link
            href="/get-quote"
            className="inline-block px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
