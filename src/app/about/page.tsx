import { Compass, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import StatusBadge from "@/components/ui/StatusBadge";
import FadeIn from "@/components/motion/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Timeline from "@/components/about/Timeline";
import { businessUnits, timeline } from "@/lib/data/business-units";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Tyflex Investments | Zimbabwe Technology Group",
  description: `Tyflex Investments is a Harare-based technology group founded in ${COMPANY.founded}, spanning six business units across communications, retail, power, and enterprise software.`,
  path: "/about",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "We deliver what we promise. Our solutions work, our support is responsive, and our timelines are honest.",
  },
  {
    icon: Compass,
    title: "Local First",
    description: "Solutions designed for the realities of doing business in Zimbabwe — infrastructure, payment methods, and expectations.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Thinking",
    description: "We build for the long term — sustainable relationships with clients and sustainable growth across our divisions.",
  },
  {
    icon: HeartHandshake,
    title: "One Team, Six Divisions",
    description: "Every division shares the same standard of service, so clients get the same reliability no matter which one they work with.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Tyflex</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-xl text-gray-400 leading-relaxed">
              Tyflex Investments is a technology group based in Harare, Zimbabwe,
              founded in {COMPANY.founded}. We operate six business units delivering
              enterprise technology, retail hardware, power solutions, messaging,
              and software to businesses across the region.
            </p>
          </FadeIn>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">What We Do</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                <strong className="text-white">Solutions:</strong> Across our six
                divisions we supply and support enterprise technology — VoIP phone
                systems, barcode scanners, POS terminals, networking equipment,
                electrical supplies, bulk messaging, and ERP software. Our clients
                range from SMEs to large enterprises across Zimbabwe.
              </p>
              <p>
                <strong className="text-white">Group Structure:</strong> Tyflex
                Investments is the parent company behind FlexTech, vFlex, FlexPOS,
                Getsiman, OmniFlex, and MacFlex — each focused on a distinct part
                of the technology stack businesses need to run and grow.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                We combine global enterprise products with deep local knowledge.
                Every solution we deliver is supported on the ground &#8212;
                installation, training, and ongoing technical support from a
                team that understands Zimbabwean business.
              </p>
              <p>
                Each division operates with the same builder mindset: hands-on
                delivery, lean operations, and a long-term view on building
                relationships that last well beyond the first install.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-2">Our Journey</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 mb-12 max-w-xl">
              From a single technology division in {COMPANY.founded} to a
              six-unit group serving businesses across Zimbabwe.
            </p>
          </FadeIn>
          <Timeline milestones={timeline} />
        </div>

        {/* Business Units */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-2">Our Business Units</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 mb-12 max-w-xl">
              Six divisions, one standard of service — each focused on a
              different part of the technology businesses run on.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessUnits.map((unit, i) => (
              <FadeIn key={unit.name} delay={0.05 * i}>
                <GlassCard className={`p-8 h-full flex flex-col ${unit.status ? "opacity-70" : ""}`}>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                      <DynamicIcon name={unit.icon} className="h-6 w-6 text-brand-red" />
                    </div>
                    {unit.status && <StatusBadge status={unit.status} />}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{unit.name}</h3>
                  <p className="text-brand-red text-sm font-medium mb-3">{unit.tagline}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{unit.description}</p>
                  <ul className="space-y-1.5 mt-auto pt-4 border-t border-white/5">
                    {unit.focus.map((f) => (
                      <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-brand-red shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mission */}
        <FadeIn>
          <div className="mb-24 p-10 md:p-12 rounded-2xl bg-brand-card border border-white/5 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-red mb-4">Our Mission</h2>
            <p className="text-xl md:text-2xl font-medium text-white max-w-3xl mx-auto leading-relaxed">
              To equip Zimbabwean businesses with reliable, enterprise-grade
              technology — delivered and supported locally, so companies can
              focus on growth instead of infrastructure.
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8">Our Values</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={0.05 * i}>
                <div className="p-6 rounded-xl bg-brand-card border border-white/5 h-full">
                  <value.icon className="h-6 w-6 text-brand-red mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <FadeIn>
          <div className="text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-4">Work With Us</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Whether you need technology solutions for your business or want
              to explore a career at Tyflex, we&#8217;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton href="/get-quote" size="lg">
                Get a Quote
              </GradientButton>
              <GradientButton href="/careers" variant="secondary" size="lg">
                Careers
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
