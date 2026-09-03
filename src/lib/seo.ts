import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

interface SeoInput {
  /** Full, page-specific title — already includes the "| Tyflex" suffix where relevant. */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/about" or "/solutions/3cx". */
  path: string;
  /** Set true for utility pages (password reset, etc.) that shouldn't be indexed. */
  noIndex?: boolean;
  /** Optional keyword list — used on brand/product pages that target specific search terms. */
  keywords?: string[];
}

/**
 * Builds a consistent Metadata object — canonical URL, Open Graph, and
 * Twitter Card — from a single title/description/path so every public page
 * gets full SEO coverage without repeating the same boilerplate. The shared
 * root-level opengraph-image.tsx supplies the og:image (and, absent a
 * twitter-image, doubles as the Twitter Card image too), so callers only
 * need to supply text.
 */
export function buildMetadata({ title, description, path, noIndex, keywords }: SeoInput): Metadata {
  const url = `${COMPANY.url}${path}`;

  return {
    title,
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      type: "website",
      locale: "en_ZW",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
