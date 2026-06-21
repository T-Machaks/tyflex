"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Have a question, partnership proposal, or just want to connect?
              We&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Email
                </h3>
                <p className="text-gray-400">info@tyflex.co.zw</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Phone
                </h3>
                <p className="text-gray-400">+263 867 717 4838</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Office
                </h3>
                <p className="text-gray-400">
                  122 Chiremba Road, Cranborne<br />
                  Harare, Zimbabwe
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 rounded-2xl bg-brand-card border border-white/5">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">&#10003;</div>
                <h3 className="text-xl font-bold mb-2">Message Sent</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-red/50 transition-colors">
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="investment">Investment</option>
                    <option value="careers">Careers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
