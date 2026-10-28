import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { IconName } from "@/lib/icon-map";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFaqEntry {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Optional last-updated date (ISO), for BlogPosting's dateModified — falls back to `date` when absent. */
  dateModified?: string;
  author: string;
  category: string;
  tags: string[];
  icon: IconName;
  readingTime: string;
  /** Optional photo gallery — public paths, rendered as a grid on the post. */
  gallery?: string[];
  /** Optional per-image alt text, parallel to `gallery` by index — a missing or short entry falls back to the post title at render time (see BlogCard/[slug]/page.tsx), never to an empty string. */
  galleryAlt?: string[];
  /** Optional FAQ entries, mirrored into the post's FAQPage JSON-LD — keep this in sync with any FAQ section written in the MDX body, since it isn't derived from the content automatically. */
  faq?: BlogFaqEntry[];
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    content,
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      dateModified: typeof data.dateModified === "string" ? data.dateModified : undefined,
      author: data.author ?? "Tyflex Team",
      category: data.category,
      tags: data.tags ?? [],
      icon: (data.icon ?? "FileText") as IconName,
      readingTime: readingTime(content).text,
      gallery: Array.isArray(data.gallery) ? (data.gallery as string[]) : undefined,
      galleryAlt: Array.isArray(data.galleryAlt) ? (data.galleryAlt as string[]) : undefined,
      faq: Array.isArray(data.faq) ? (data.faq as BlogFaqEntry[]) : undefined,
    },
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map(readPostFile)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map((p) => p.meta);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.meta.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPostsMeta().map((p) => p.category)));
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPostsMeta().flatMap((p) => p.tags)));
}

export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}
