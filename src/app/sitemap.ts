import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";
import { solutions } from "@/lib/data/solutions";
import { awsSolutions } from "@/lib/data/aws-solutions";
import { brands } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import { getAllPostsMeta } from "@/lib/blog";

/**
 * Auto-generated sitemap covering every public marketing route plus each
 * dynamic detail page (solutions, webstore products, blog posts). Protected
 * app sections (/portal, /tracker, /accounts) and API routes are
 * intentionally excluded — see robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/webstore`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/brands`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/get-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/resources/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/resources/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${base}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const awsSolutionRoutes: MetadataRoute.Sitemap = awsSolutions.map((s) => ({
    url: `${base}/solutions/aws-cloud-solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${base}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/webstore/product/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${base}/resources/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...awsSolutionRoutes,
    ...brandRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
