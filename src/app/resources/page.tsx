import Link from "next/link";

const sections = [
  {
    name: "Blog",
    description: "Insights, guides, and news from the Tyflex team on technology trends in Zimbabwe.",
    href: "/resources/blog",
    icon: "\u{1F4DD}",
  },
  {
    name: "Case Studies",
    description: "See how our solutions have helped businesses across Zimbabwe achieve their goals.",
    href: "/resources/case-studies",
    icon: "\u{1F4C8}",
  },
  {
    name: "Documentation",
    description: "Technical documentation, setup guides, and API references for our products.",
    href: "/resources/docs",
    icon: "\u{1F4D6}",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Resources</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Guides, case studies, and documentation to help you get the most
            out of our technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((sec) => (
            <Link
              key={sec.name}
              href={sec.href}
              className="group p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-white/10 transition-all text-center"
            >
              <span className="text-4xl mb-4 block">{sec.icon}</span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-red transition-colors">{sec.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{sec.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
