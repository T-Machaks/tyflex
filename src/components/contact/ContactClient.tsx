"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import { BUSINESS_HOURS, COMPANY } from "@/lib/constants";
import { HONEYPOT_FIELD } from "@/lib/validation";
import { inputClass, selectOptionClass } from "@/lib/form-styles";

type Status = "idle" | "submitting" | "success" | "error";

const infoItems = [
  { icon: MapPin, label: "Office", value: COMPANY.address },
  { icon: Phone, label: "Phone", value: COMPANY.phoneDisplay, href: `tel:${COMPANY.phone}` },
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`;

const SUBJECTS = ["General Inquiry", "Partnership", "Investment", "Careers", "Support"];

interface ContactClientProps {
  /** Pre-selects the Subject dropdown, e.g. when arriving via /contact?subject=Support. */
  initialSubject?: string;
}

export default function ContactClient({ initialSubject }: ContactClientProps) {
  const defaultSubject = initialSubject && SUBJECTS.includes(initialSubject) ? initialSubject : "General Inquiry";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left: Info */}
      <div>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Have a question, partnership proposal, or just want to connect?
            We&apos;d love to hear from you.
          </p>
        </FadeIn>

        <div className="space-y-4 mb-10">
          {infoItems.map((item, i) => (
            <FadeIn key={item.label} delay={0.1 + i * 0.05}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-300">{item.value}</p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.25}>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="h-10 w-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Business Hours</p>
                <dl className="space-y-1">
                  {BUSINESS_HOURS.map((row) => (
                    <div key={row.day} className="flex justify-between gap-6 text-sm">
                      <dt className="text-gray-400">{row.day}</dt>
                      <dd className="text-gray-300">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Map embed */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-64">
            <iframe
              title="Tyflex Investments office location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeIn>
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
                <h3 className="text-xl font-bold mb-2">Message Sent</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Send another message
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

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                  <input name="name" type="text" required className={inputClass} placeholder="Your name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
                    <input name="phone" type="tel" className={inputClass} placeholder="+263 xx xxx xxxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Company</label>
                  <input name="company" type="text" className={inputClass} placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
                  <select name="subject" defaultValue={defaultSubject} className={inputClass}>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} className={selectOptionClass}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us more..."
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
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
