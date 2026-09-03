"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Barcode,
  CreditCard,
  Network,
  Cloud,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Users,
  BadgeCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import FadeIn from "@/components/motion/FadeIn";
import CountUp from "@/components/motion/CountUp";
import { ventures } from "@/lib/data/ventures";

const stats = [
  { value: 50, suffix: "+", decimals: 0, label: "Clients Served" },
  // Registered 2016 — "10+" would overstate a decade that's exactly ten
  // years in 2026, same reasoning as the "a decade" fix on Why Choose Tyflex below.
  { value: 10, suffix: "", decimals: 0, label: "Years in Business" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime SLA" },
  { value: 24, suffix: "/7", decimals: 0, label: "Support Availability" },
];

const solutionTabs = [
  {
    name: "VoIP Solutions",
    icon: Phone,
    description:
      "Enterprise-grade voice communications with crystal-clear calls, auto-attendants, and unified messaging. Reduce phone costs by up to 60%.",
    features: ["HD voice quality", "Auto-attendant & IVR", "Call recording & analytics", "Mobile & desktop apps"],
    href: "/solutions/ucaas",
  },
  {
    name: "AutoID Solutions",
    icon: Barcode,
    description:
      "Barcode scanning, mobile computing, rugged field devices, and label and line matrix printing for warehousing, retail, and logistics.",
    features: ["Handheld & fixed scanners", "Rugged mobile computers", "Label printing", "Line matrix printing"],
    href: "/solutions/autoid",
  },
  {
    name: "POS Systems",
    icon: CreditCard,
    description:
      "Hardware-as-a-Service point-of-sale — terminals, scanners, and printers on a monthly subscription with no upfront cost. Outright purchase also available.",
    features: ["Zero upfront cost", "Device, support & replacement included", "Touch screen terminals", "Offline mode"],
    href: "/solutions/pos-systems",
  },
  {
    name: "Networking",
    icon: Network,
    description:
      "Enterprise networking infrastructure built for performance and security. From structured cabling to managed switches, firewalls, and Hikvision infrastructure.",
    features: ["Structured cabling", "Managed switches", "Firewalls & security", "Wi-Fi coverage"],
    href: "/solutions/networking",
  },
  {
    name: "AWS Cloud Solutions",
    icon: Cloud,
    description:
      "Cloud migration, AI-driven productivity, security and compliance, and day-to-day operations — powered by our AWS partnership.",
    features: ["Workload migration", "AI productivity & CX", "Security & compliance", "Monitoring & cost management"],
    href: "/solutions/aws-cloud-solutions",
  },
  {
    name: "Smart Building Solutions",
    icon: Building2,
    description:
      "Hikvision-powered network cameras, sensors, access control, and commercial displays — one integrated system for offices, retail, and warehouses.",
    features: ["Network cameras", "Access control", "Environmental sensors", "Commercial displays"],
    href: "/solutions/smart-building",
  },
];

const whyPoints = [
  "Certified partners of leading technology brands",
  "On-site installation and training across Zimbabwe",
  "24/7 technical support for enterprise clients",
  "Flexible payment plans and USD pricing",
  "A decade trusted by leading Zimbabwean businesses",
  "Single point of contact from consultation to support",
];

const features = [
  {
    title: "Enterprise Ready",
    icon: ShieldCheck,
    description:
      "Enterprise-grade solutions built for scale, security, and compliance — trusted by leading Zimbabwean organizations.",
  },
  {
    title: "Expert Team",
    icon: Users,
    description:
      "Certified engineers and technicians with deep experience across telecoms, networking, and business software.",
  },
  {
    title: "Quality Assured",
    icon: BadgeCheck,
    description:
      "Every installation follows a rigorous process — from planning and configuration to sign-off and training.",
  },
  {
    title: "Always Available",
    icon: Headphones,
    description:
      "24/7 technical support with rapid response times, so your business never misses a beat.",
  },
];

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState(0);
  const active = solutionTabs[activeTab];
  const ActiveIcon = active.icon;

  return (
    <>
      {/* Hero Section */}
      <HeroShell className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8">
              Trusted by businesses across Zimbabwe
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              <span className="gradient-text">Streamlined Tech Solutions</span>
              <br />
              <span className="text-white">for Business Growth</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              From unified communications to enterprise hardware, we deliver
              technology solutions that drive efficiency, reduce costs, and
              accelerate your business growth.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton href="/get-quote" size="lg">
                Get a Free Consultation
              </GradientButton>
              <GradientButton href="/solutions" variant="secondary" size="lg">
                Explore Solutions
              </GradientButton>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </HeroShell>

      {/* Solutions Tabs Section */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solutions</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Comprehensive technology solutions tailored for businesses
                operating in Zimbabwe and the region.
              </p>
            </div>
          </FadeIn>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {solutionTabs.map((tab, i) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all ${
                  activeTab === i
                    ? "bg-brand-red text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <GlassCard interactive={false} className="p-8 md:p-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5">
                    <ActiveIcon className="h-6 w-6 text-brand-red" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{active.name}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{active.description}</p>
                  <ul className="space-y-3 mb-8">
                    {active.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <GradientButton href={active.href}>Learn More</GradientButton>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-full h-64 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 flex items-center justify-center">
                    <ActiveIcon className="h-20 w-20 text-brand-red/25" strokeWidth={1.25} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>
      </section>

      {/* Why Businesses Choose Tyflex */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-4">
              Why Tyflex
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Businesses Choose <span className="gradient-text">Tyflex</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              With a decade of experience delivering technology solutions
              in Zimbabwe, we combine global enterprise products with deep
              local knowledge and support.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
            {whyPoints.map((point, i) => (
              <FadeIn key={point} delay={0.05 * i}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-brand-red mt-0.5 shrink-0" />
                  <span className="text-gray-300 text-sm">{point}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10">
              <GradientButton href="/about" variant="secondary">
                About Tyflex
              </GradientButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for the Way You Work</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Four reasons enterprise and growing businesses alike choose to
                partner with Tyflex.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={0.1 * i}>
                <GlassCard className="p-8 h-full">
                  <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5">
                    <f.icon className="h-6 w-6 text-brand-red" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Built by Tyflex — ventures teaser */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-4">
                Built by Tyflex
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Platforms We&apos;ve Built</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Beyond the solutions we sell, we build and co-develop
                platforms — with support from our AWS partnership.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ventures.map((venture, i) => (
              <FadeIn key={venture.slug} delay={0.1 * i}>
                <Link href={`/projects#${venture.slug}`} className="block h-full">
                  <GlassCard className="p-8 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <div className="h-11 w-11 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                        <DynamicIcon name={venture.icon} className="h-5 w-5 text-brand-red" />
                      </div>
                      {venture.status && (
                        <StatusBadge
                          status={venture.status}
                          label={
                            venture.status === "launching-soon" && venture.launchDate
                              ? `Launching ${venture.launchDate}`
                              : undefined
                          }
                        />
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{venture.name}</h3>
                    <p className="text-brand-red text-sm font-medium mb-3">{venture.tagline}</p>
                    {venture.partners && (
                      <p className="text-xs text-gray-500 mb-3 -mt-2">{venture.partners}</p>
                    )}
                    <p className="text-sm text-gray-400 leading-relaxed">{venture.description}</p>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                See all our ventures
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-transparent" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
              Get a free consultation with our team to find the right
              technology solution for your business needs.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton href="/get-quote" size="lg">
                Get a Free Quote
              </GradientButton>
              <GradientButton href="/contact" variant="secondary" size="lg">
                Contact Us
              </GradientButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
