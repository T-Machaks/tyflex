import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { IconName } from "@/lib/icon-map";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  icon: IconName;
  readingTime: string;
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
      author: data.author ?? "Tyflex Team",
      category: data.category,
      tags: data.tags ?? [],
      icon: (data.icon ?? "FileText") as IconName,
      readingTime: readingTime(content).text,
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
