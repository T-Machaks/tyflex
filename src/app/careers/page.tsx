import { Banknote, GraduationCap, Heart, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { businessUnits } from "@/lib/data/business-units";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers at Tyflex Investments | Join Our Team in Harare",
  description:
    "Explore career opportunities at Tyflex Investments across engineering, sales, and support roles in Harare, Zimbabwe. See open positions and submit your CV today.",
  path: "/careers",
});

const perks = [
  {
    icon: GraduationCap,
    title: "Vendor Training",
    description: "Certifications with the brands we partner with — 3CX, Ubiquiti, Fortinet, AWS, and more.",
  },
  {
    icon: Rocket,
    title: "Real Ownership",
    description: "Six focused business units mean you're close to the client and the decisions, not buried in layers.",
  },
  {
    icon: Banknote,
    title: "Fair, Transparent Pay",
    description: "USD-denominated compensation with clear paths for growth as the business units expand.",
  },
  {
    icon: Heart,
    title: "Local Impact",
    description: "Work on installations and systems that Zimbabwean businesses depend on every day.",
  },
];

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Careers</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-xl text-gray-400 leading-relaxed">
              Join our team and help build technology that Zimbabwean
              businesses run on — across networking, communications, retail,
              power, messaging, and software.
            </p>
          </FadeIn>
        </div>

        {/* Perks */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8">Why Tyflex</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <FadeIn key={perk.title} delay={0.05 * i}>
                <GlassCard className="p-6 h-full">
                  <perk.icon className="h-6 w-6 text-brand-red mb-4" />
                  <h3 className="font-semibold mb-2">{perk.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{perk.description}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Where we hire */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-2">Where We Often Hire</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 mb-12 max-w-2xl">
              We don&apos;t always have open requisitions posted, but these
              are the areas across our business units where we&apos;re most
              regularly looking for strong people. If one of these sounds
              like you, we&apos;d still like to hear from you.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessUnits.map((unit, i) => (
              <FadeIn key={unit.name} delay={0.05 * i}>
                <div className="p-6 rounded-xl bg-brand-card border border-white/5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                      <DynamicIcon name={unit.icon} className="h-4 w-4 text-brand-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{unit.name}</h3>
                      <p className="text-xs text-gray-500">{unit.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Field technicians, sales, and support roles supporting {unit.focus[0].toLowerCase()} and related work.
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* How to apply */}
        <FadeIn>
          <div className="text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Send your CV and a short note on what you&apos;re looking for
              to <a href={`mailto:${COMPANY.email}`} className="text-brand-red hover:underline">{COMPANY.email}</a>,
              or use the form below — we review every application, even
              without a specific role open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton href="/contact?subject=Careers" size="lg">
                Send a General Application
              </GradientButton>
              <GradientButton href="/about" variant="secondary" size="lg">
                Learn About Tyflex
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
