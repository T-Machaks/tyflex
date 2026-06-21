import Link from "next/link";

export default function Page() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/solutions" className="text-sm text-gray-400 hover:text-white transition-colors mb-8 inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">UCaaS & VoIP</h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mb-12">
          Enterprise-grade unified communications and Voice over IP solutions for businesses of all sizes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300"><span className="text-brand-red">&#10003;</span>HD voice quality over existing internet</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-brand-red">&#10003;</span>Auto-attendant and IVR menus</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-brand-red">&#10003;</span>Call recording and analytics dashboard</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-brand-red">&#10003;</span>Mobile and desktop softphone apps</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-brand-red">&#10003;</span>Video conferencing integration</li>
                <li className="flex items-center gap-3 text-gray-300"><span className="text-brand-red">&#10003;</span>Voicemail to email transcription</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-80 rounded-2xl bg-brand-card border border-white/5 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Product image coming soon</p>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-brand-card border border-white/5 text-center">
          <h3 className="text-xl font-bold mb-3">Interested in UCaaS & VoIP?</h3>
          <p className="text-gray-400 mb-6">Get a tailored quote for your business needs.</p>
          <Link href="/get-quote" className="inline-block px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
