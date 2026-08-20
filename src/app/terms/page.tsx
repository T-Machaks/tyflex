import FadeIn from "@/components/motion/FadeIn";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | Tyflex Investments",
  description:
    "Read the terms and conditions governing your use of the Tyflex Investments website, webstore, and client-facing services.",
  path: "/terms",
});

const LAST_UPDATED = "August 13, 2026";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: (
      <p>
        By using {COMPANY.url} (the &quot;Site&quot;), you agree to these
        Terms of Service. If you do not agree, please do not use the Site.
        These terms apply to all visitors, and to any business relationship
        that follows from a quote request or inquiry submitted through it.
      </p>
    ),
  },
  {
    title: "2. Use of the Website",
    body: (
      <p>
        You agree to use the Site only for lawful purposes and not to
        interfere with its operation, attempt unauthorized access to any
        systems, or submit false or misleading information through our forms.
      </p>
    ),
  },
  {
    title: "3. Products, Pricing & Quotes",
    body: (
      <>
        <p>
          Our webstore is inquiry-based — there is no online cart or
          checkout. Prices shown are indicative reference prices and are not
          a binding offer. Submitting a &quot;Request a Quote&quot; form does
          not create a contract; a quote becomes binding only once we confirm
          pricing, availability, and terms with you directly, in writing.
        </p>
        <p className="mt-3">
          Product specifications are provided for general guidance and may
          change without notice as manufacturers update their offerings.
        </p>
      </>
    ),
  },
  {
    title: "4. Intellectual Property",
    body: (
      <p>
        All content on this Site — including text, graphics, logos, and
        design — is the property of {COMPANY.legalName} or its licensors and
        is protected by applicable intellectual property laws. You may not
        reproduce or redistribute Site content without our prior written
        consent.
      </p>
    ),
  },
  {
    title: "5. Third-Party Brands & Partners",
    body: (
      <p>
        References to third-party brands, products, or trademarks on this
        Site (including partner and manufacturer names) are used to describe
        the products and services we supply and support, and remain the
        property of their respective owners.
      </p>
    ),
  },
  {
    title: "6. Third-Party Links & Services",
    body: (
      <p>
        The Site may link to or embed third-party services (such as Google
        Maps). We are not responsible for the content, accuracy, or practices
        of third-party sites or services.
      </p>
    ),
  },
  {
    title: "7. Warranties & Support",
    body: (
      <p>
        Products and installations we supply are covered by the warranty and
        support terms agreed at the time of quote or purchase, which may
        include manufacturer warranties in addition to any support plan you
        select. General information on this Site is provided &quot;as
        is&quot; without warranty of any kind.
      </p>
    ),
  },
  {
    title: "8. Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, {COMPANY.legalName} is not
        liable for any indirect, incidental, or consequential damages arising
        from your use of the Site. This does not limit any liability that
        cannot be excluded under applicable law.
      </p>
    ),
  },
  {
    title: "9. Governing Law",
    body: (
      <p>
        These Terms are governed by the laws of Zimbabwe. Any disputes
        arising from these Terms or use of the Site will be subject to the
        jurisdiction of the courts of Zimbabwe.
      </p>
    ),
  },
  {
    title: "10. Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. Continued use of the
        Site after changes are posted constitutes acceptance of the revised
        Terms.
      </p>
    ),
  },
  {
    title: "11. Contact Us",
    body: (
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${COMPANY.email}`} className="text-brand-red hover:underline">
          {COMPANY.email}
        </a>{" "}
        or {COMPANY.address}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
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
