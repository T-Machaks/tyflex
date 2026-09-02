import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { PARTNER_CATEGORIES, partners } from "@/lib/data/partners";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Technology Partners | Tyflex",
  description:
    "Tyflex partners with 3CX, Microsoft, AWS, Ubiquiti, Fortinet, Zebra, and other leading technology brands to deliver enterprise solutions across Zimbabwe.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Partners</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We work with leading global technology brands, supplying and
              supporting their products for businesses across Zimbabwe.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-16 mb-20">
          {PARTNER_CATEGORIES.map((category, catIndex) => {
            const items = partners.filter((p) => p.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <FadeIn delay={0.05 * catIndex}>
                  <h2 className="text-xl font-bold mb-6">{category}</h2>
                </FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((partner, i) => (
                    <FadeIn key={partner.name} delay={0.05 * i}>
                      <GlassCard className="p-6 h-full flex gap-4">
                        <div className="h-11 w-11 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                          <DynamicIcon name={partner.icon} className="h-5 w-5 text-brand-red" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{partner.name}</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">{partner.description}</p>
                        </div>
                      </GlassCard>
                    </FadeIn>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <FadeIn>
          <div className="text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-4">Interested in Becoming a Partner?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              If you supply technology products or services and want to reach
              businesses across Zimbabwe, we&apos;d love to talk.
            </p>
            <GradientButton href="/contact" size="lg">
              Get in Touch
            </GradientButton>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
