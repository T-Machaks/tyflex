import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

/** A page-specific social-share image — see SeoInput.image. */
interface SeoImage {
  /** Site-root-relative path, e.g. "/images/blog/foo.jpg" — turned into an absolute URL via COMPANY.url, since og:image/twitter:image must be absolute. */
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

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
  /**
   * Optional page-specific social image (e.g. a blog post's own cover photo).
   * Omit to fall back to the shared root-level opengraph-image.tsx — Next's
   * file-convention fallback only kicks in when openGraph.images isn't set
   * at all, so this must stay undefined rather than empty/null for that to
   * keep working on every page that doesn't pass one.
   */
  image?: SeoImage;
}

/**
 * Builds a consistent Metadata object — canonical URL, Open Graph, and
 * Twitter Card — from a single title/description/path so every public page
 * gets full SEO coverage without repeating the same boilerplate. Without an
 * explicit `image`, the shared root-level opengraph-image.tsx supplies the
 * og:image (and, absent a twitter-image, doubles as the Twitter Card image
 * too) via Next's own file-convention fallback.
 */
export function buildMetadata({ title, description, path, noIndex, keywords, image }: SeoInput): Metadata {
  const url = `${COMPANY.url}${path}`;
  const absoluteImageUrl = image ? `${COMPANY.url}${image.url}` : undefined;

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
      ...(absoluteImageUrl
        ? { images: [{ url: absoluteImageUrl, width: image!.width, height: image!.height, alt: image!.alt ?? title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(absoluteImageUrl ? { images: [absoluteImageUrl] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
