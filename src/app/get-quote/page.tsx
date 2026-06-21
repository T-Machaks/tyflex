"use client";

import { useState } from "react";

const solutions = [
  "UCaaS & VoIP",
  "3CX Phone Systems",
  "Barcode & Scanning",
  "POS Systems",
  "Networking",
  "Bulk Messaging",
  "Enterprise Printing",
  "ERP Software",
  "Other",
];

export default function GetQuotePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get a Free Quote</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Tell us about your business needs and our team will put together a
              tailored solution with transparent pricing.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Tell us your needs</h3>
                  <p className="text-gray-400 text-sm">Fill out the form with your business requirements and current challenges.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">We assess and design</h3>
                  <p className="text-gray-400 text-sm">Our team reviews your needs and designs a tailored technology solution.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Receive your quote</h3>
                  <p className="text-gray-400 text-sm">Get a detailed quote with transparent pricing, timelines, and support options.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 rounded-2xl bg-brand-card border border-white/5">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">&#10003;</div>
                <h3 className="text-xl font-bold mb-2">Request Received</h3>
                <p className="text-gray-400">
                  Thank you! Our team will review your requirements and get back
                  to you within 24 hours with a tailored quote.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="First name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                  <input type="email" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Company</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Solution Interest</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-red/50 transition-colors">
                    <option value="">Select a solution</option>
                    {solutions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Tell us about your needs</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors resize-none" placeholder="Describe your requirements, current setup, and what you're looking to achieve..." />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors">
                  Request a Quote
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
