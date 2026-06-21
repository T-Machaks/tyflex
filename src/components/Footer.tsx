import Link from "next/link";

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

const resources = [
  { name: "Blog", href: "/resources/blog" },
  { name: "Case Studies", href: "/resources/case-studies" },
  { name: "Documentation", href: "/resources/docs" },
  { name: "Support", href: "/support" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Partners", href: "/partners" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <img src="/tyflex/logo.png" alt="Tyflex" className="h-8 w-8 rounded-lg bg-white/90 p-0.5 object-contain" />
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
              <p>+263 867 717 4838</p>
              <p>info@tyflex.co.zw</p>
              <p>122 Chiremba Road, Cranborne, Harare</p>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2">
              {solutions.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
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
            &copy; {new Date().getFullYear()} Tyflex Investments (Pvt) Ltd. All rights reserved.
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
