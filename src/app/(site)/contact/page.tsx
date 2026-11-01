import ContactClient from "@/components/contact/ContactClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Tyflex | Harare, Zimbabwe",
  description:
    "Reach the Tyflex team in Bluffhill, Harare — phone, email, business hours, and a quick contact form for general enquiries and support requests.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{ subject?: string }>;
}

export default async function ContactPage(props: ContactPageProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <ContactClient initialSubject={searchParams.subject} />
      </div>
    </div>
  );
}
