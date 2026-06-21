import Link from "next/link";

export default function Page() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mb-12">
          Terms and conditions governing the use of our services.
        </p>
        <div className="p-12 rounded-2xl bg-brand-card border border-white/5 text-center">
          <p className="text-gray-400 mb-6">This page is under construction. Check back soon.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
