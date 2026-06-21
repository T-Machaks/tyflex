import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Tyflex</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Tyflex Investments is a technology company based in Harare, Zimbabwe.
            We deliver enterprise solutions to businesses and build technology
            ventures that serve African markets.
          </p>
        </div>

        {/* Two sides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-2xl font-bold mb-4">What We Do</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                <strong className="text-white">Solutions:</strong> We supply and support enterprise
                technology &#8212; VoIP phone systems, barcode scanners, POS terminals,
                networking equipment, printing solutions, and ERP software. Our clients
                range from SMEs to large enterprises across Zimbabwe.
              </p>
              <p>
                <strong className="text-white">Ventures:</strong> We build and scale technology
                companies &#8212; Vekta (last-mile delivery), Omniflex (bulk messaging),
                and Mediaserv Digital (digital publishing and events including MineCon).
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                We combine global enterprise products with deep local knowledge.
                Every solution we deliver is supported on the ground &#8212;
                installation, training, and ongoing technical support from a
                team that understands Zimbabwean business.
              </p>
              <p>
                For our ventures, we apply the same builder mindset: hands-on
                product development, lean operations, and a long-term view on
                building sustainable technology businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-xl bg-brand-card border border-white/5">
              <h3 className="text-lg font-semibold mb-3">Reliability</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We deliver what we promise. Our solutions work, our support is
                responsive, and our timelines are honest.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-brand-card border border-white/5">
              <h3 className="text-lg font-semibold mb-3">Local First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Solutions designed for the realities of doing business in Zimbabwe &#8212;
                infrastructure constraints, payment methods, and user expectations.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-brand-card border border-white/5">
              <h3 className="text-lg font-semibold mb-3">Long-Term Thinking</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We build for the long term. Sustainable relationships with
                clients and sustainable growth in our ventures.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center p-12 rounded-2xl bg-brand-card border border-white/5">
          <h2 className="text-2xl font-bold mb-4">Work With Us</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Whether you need technology solutions for your business or want to
            explore a partnership, we&#8217;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quote"
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/careers"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors"
            >
              Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
