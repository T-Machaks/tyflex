import { Clock, FileText, Mail, MessageCircleQuestion, Phone } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/motion/FadeIn";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { BUSINESS_HOURS, COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support | Tyflex Investments",
  description:
    "Get help with your Tyflex Investments products and installations — support channels, business hours, and answers to frequently asked questions.",
  path: "/support",
});

const channels = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team during business hours.",
    value: COMPANY.phoneDisplay,
    href: `tel:${COMPANY.phone}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send details of your issue and we'll respond within one business day.",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: MessageCircleQuestion,
    title: "Send a Message",
    description: "Use our contact form for general or account-specific support requests.",
    value: "Contact form",
    href: "/contact?subject=Support",
  },
];

const faqs = [
  {
    question: "How do I get support for an existing installation?",
    answer:
      "Call or email us with your company name and a description of the issue. For enterprise support contracts, critical systems are covered by 24/7 support — just mention this when you reach out so we can route it correctly.",
  },
  {
    question: "How long does a typical installation take?",
    answer:
      "It depends on scope — a single POS terminal can be set up same-day, while a multi-site networking or ERP rollout is usually scoped over several weeks. We'll give you a clear timeline as part of your quote.",
  },
  {
    question: "How do I get pricing for a product in the webstore?",
    answer:
      "Every product page has a \"Request a Quote\" button. Submit it and our team will confirm availability and pricing directly with you — there's no cart or online checkout, since most orders involve installation or configuration.",
  },
  {
    question: "Can I check the status of a quote or support request?",
    answer:
      "Right now our team follows up directly by phone or email. A self-service client portal for tracking requests and documents is in development — check back on this site for updates.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We're based in Harare and service businesses across Zimbabwe, with on-site installation and support available nationwide depending on project scope.",
  },
  {
    question: "Do you support products you didn't originally install?",
    answer:
      "In most cases, yes — particularly for networking, POS, and barcode hardware. Reach out with the make and model of your equipment and we'll confirm whether we can assist.",
  },
];

export default function SupportPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Support</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get help with your Tyflex products and solutions — we&apos;re
              here during business hours, and around the clock for covered
              enterprise systems.
            </p>
          </FadeIn>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {channels.map((channel, i) => (
            <FadeIn key={channel.title} delay={0.05 * i}>
              <GlassCard className="p-8 h-full">
                <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5">
                  <channel.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="font-bold mb-2">{channel.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{channel.description}</p>
                <a href={channel.href} className="text-brand-red text-sm font-medium hover:underline">
                  {channel.value}
                </a>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        {/* Hours + Docs link */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-6 rounded-2xl bg-brand-card border border-white/5 mb-20">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-brand-red" />
              </div>
              <dl className="flex flex-wrap gap-x-6 gap-y-1">
                {BUSINESS_HOURS.map((row) => (
                  <div key={row.day} className="text-sm">
                    <dt className="inline text-gray-500">{row.day}: </dt>
                    <dd className="inline text-gray-300">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a
              href="/resources/docs"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors shrink-0"
            >
              <FileText className="h-4 w-4" />
              Browse documentation
            </a>
          </div>
        </FadeIn>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          </FadeIn>
          <FAQAccordion faqs={faqs} />
        </div>

        <FadeIn>
          <div className="text-center p-12 rounded-2xl bg-brand-card border border-white/5">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Reach out and our support team will get back to you as soon as
              possible.
            </p>
            <GradientButton href="/contact?subject=Support" size="lg">
              Contact Support
            </GradientButton>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
