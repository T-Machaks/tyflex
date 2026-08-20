import { COMPANY } from "@/lib/constants";

interface Crumb {
  name: string;
  path: string;
}

/** Renders a BreadcrumbList JSON-LD script for a page — helps Google show breadcrumb trails in search results. */
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${COMPANY.url}${item.path}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
