"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, CheckSquare, Loader2, Send, Square } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import { inputClass, selectOptionClass } from "@/lib/form-styles";
import { COMPANY_SIZES, INDUSTRIES, TIMELINES, HONEYPOT_FIELD } from "@/lib/validation";
import { solutions } from "@/lib/data/solutions";

type Status = "idle" | "submitting" | "success" | "error";

const steps = [
  { title: "Tell us your needs", description: "Fill out the form with your business requirements and current challenges." },
  { title: "We assess and design", description: "Our team reviews your needs and designs a tailored technology solution." },
  { title: "Receive your quote", description: "Get a detailed quote with transparent pricing, timelines, and support options." },
];

interface GetQuoteClientProps {
  /** Pre-fills the message field, e.g. when arriving from a webstore product page (?product=). */
  initialProduct?: string;
}

export default function GetQuoteClient({ initialProduct }: GetQuoteClientProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [message, setMessage] = useState(initialProduct ? `I'm interested in: ${initialProduct}\n\n` : "");

  function toggleSolution(name: string) {
    setSelectedSolutions((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      companySize: data.companySize,
      industry: data.industry,
      timeline: data.timeline,
      solutions: selectedSolutions,
      message: data.message,
      [HONEYPOT_FIELD]: data[HONEYPOT_FIELD],
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setSelectedSolutions([]);
      setMessage("");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left */}
      <div>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get a Free Quote</h1>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Tell us about your business needs and our team will put together a
            tailored solution with transparent pricing.
          </p>
        </FadeIn>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={0.1 + i * 0.05}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <FadeIn delay={0.1}>
        <GlassCard interactive={false} className="p-8">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red mb-4"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Request Received</h3>
                <p className="text-gray-400">
                  Thank you! Our team will review your requirements and get
                  back to you within 24 hours with a tailored quote.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name={HONEYPOT_FIELD}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
                    <input name="firstName" type="text" required className={inputClass} placeholder="First name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
                    <input name="lastName" type="text" required className={inputClass} placeholder="Last name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
                    <input name="phone" type="tel" required className={inputClass} placeholder="+263 xx xxx xxxx" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Company</label>
                  <input name="company" type="text" required className={inputClass} placeholder="Company name" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Company Size</label>
                    <select name="companySize" required defaultValue="" className={inputClass}>
                      <option value="" disabled className={selectOptionClass}>
                        Select size
                      </option>
                      {COMPANY_SIZES.map((size) => (
                        <option key={size} value={size} className={selectOptionClass}>
                          {size} employees
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Industry</label>
                    <select name="industry" required defaultValue="" className={inputClass}>
                      <option value="" disabled className={selectOptionClass}>
                        Select industry
                      </option>
                      {INDUSTRIES.map((industry) => (
                        <option key={industry} value={industry} className={selectOptionClass}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Timeline</label>
                  <select name="timeline" required defaultValue="" className={inputClass}>
                    <option value="" disabled className={selectOptionClass}>
                      When are you looking to get started?
                    </option>
                    {TIMELINES.map((timeline) => (
                      <option key={timeline} value={timeline} className={selectOptionClass}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Solutions You&apos;re Interested In
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {solutions.map((sol) => {
                      const selected = selectedSolutions.includes(sol.name);
                      return (
                        <button
                          key={sol.slug}
                          type="button"
                          onClick={() => toggleSolution(sol.name)}
                          aria-pressed={selected}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                            selected
                              ? "bg-brand-red text-white"
                              : "bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {selected ? (
                            <CheckSquare className="h-4 w-4 shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 shrink-0 opacity-40" />
                          )}
                          <span className="truncate">{sol.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Tell us about your needs</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe your requirements, current setup, and what you're looking to achieve..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 disabled:pointer-events-none text-white font-medium rounded-lg transition-colors"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Request a Quote
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
