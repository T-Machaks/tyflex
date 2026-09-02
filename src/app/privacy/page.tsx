import FadeIn from "@/components/motion/FadeIn";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Tyflex",
  description:
    "Read how Tyflex collects, uses, stores, and protects your personal information when you use our website and services.",
  path: "/privacy",
});

const LAST_UPDATED = "August 13, 2026";

const sections = [
  {
    title: "1. Introduction",
    body: (
      <p>
        This Privacy Policy explains how {COMPANY.legalName} (&quot;Tyflex&quot;,
        &quot;we&quot;, &quot;us&quot;) collects, uses, and protects personal
        information when you use {COMPANY.url} (the &quot;Site&quot;),
        including our contact, quote request, and webstore inquiry forms.
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    body: (
      <>
        <p>We collect information you provide directly to us, including:</p>
        <ul className="list-disc list-inside space-y-1.5 mt-3">
          <li>Contact details — name, email address, phone number, and company name</li>
          <li>Details of your inquiry — message content, solutions of interest, company size, industry, and timeline</li>
          <li>Any other information you choose to include in a form submission</li>
        </ul>
        <p className="mt-3">
          We also collect limited technical information automatically — such
          as browser type, pages visited, and general usage data — to help us
          maintain and improve the Site.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-1.5 mt-3">
          <li>Respond to contact messages and quote requests</li>
          <li>Provide, install, and support the products and services you request</li>
          <li>Communicate with you about your inquiry or an existing engagement</li>
          <li>Improve our Site, products, and services</li>
          <li>Meet legal and regulatory obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Cookies & Third-Party Services",
    body: (
      <p>
        The Site embeds a Google Maps view on our Contact page, which may set
        cookies or collect usage data under Google&apos;s own privacy
        practices. Form submissions are delivered via a third-party email
        service (Amazon Simple Email Service). We do not use these services
        to sell or trade your personal information.
      </p>
    ),
  },
  {
    title: "5. How We Share Information",
    body: (
      <p>
        We do not sell your personal information. We may share it with
        service providers who help us operate the Site and deliver our
        services (such as our email delivery and hosting providers), or where
        required by law. Each of these providers is only given the
        information necessary to perform their function.
      </p>
    ),
  },
  {
    title: "6. Data Retention",
    body: (
      <p>
        We retain information from contact and quote requests for as long as
        needed to respond to your inquiry and maintain records of any
        resulting business relationship, or as required by law.
      </p>
    ),
  },
  {
    title: "7. Your Rights",
    body: (
      <p>
        You may ask us to access, correct, or delete the personal information
        we hold about you at any time by contacting us using the details
        below. We will respond to reasonable requests within a reasonable
        timeframe.
      </p>
    ),
  },
  {
    title: "8. Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to protect
        personal information from unauthorized access, loss, or misuse. No
        method of transmission over the internet is completely secure, and we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    title: "9. Children's Privacy",
    body: (
      <p>
        The Site is intended for business use and is not directed at
        children. We do not knowingly collect personal information from
        children.
      </p>
    ),
  },
  {
    title: "10. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated revision date.
      </p>
    ),
  },
  {
    title: "11. Contact Us",
    body: (
      <p>
        Questions about this Privacy Policy can be sent to{" "}
        <a href={`mailto:${COMPANY.email}`} className="text-brand-red hover:underline">
          {COMPANY.email}
        </a>{" "}
        or {COMPANY.address}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-gray-500 text-sm mb-12">Last updated: {LAST_UPDATED}</p>
        </FadeIn>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <FadeIn key={section.title} delay={Math.min(0.03 * i, 0.3)}>
              <section className="pb-10 border-b border-white/5 last:border-0">
                <h2 className="text-lg font-bold mb-3">{section.title}</h2>
                <div className="text-gray-400 leading-relaxed text-sm">{section.body}</div>
              </section>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
