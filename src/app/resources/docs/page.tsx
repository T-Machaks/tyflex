import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Documentation</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technical documentation, setup guides, and API references for our products.
          </p>
        </div>
        <div className="text-center py-20 rounded-2xl bg-brand-card border border-white/5">
          <div className="text-5xl mb-6">&#x1F4D6;</div>
          <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Documentation is being prepared. For immediate support, contact our team directly.
          </p>
          <Link href="/support" className="inline-block px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
