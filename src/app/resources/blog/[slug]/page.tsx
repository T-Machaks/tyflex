import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import BlogCard from "@/components/resources/BlogCard";
import GradientButton from "@/components/ui/GradientButton";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getAllPostsMeta, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.meta.title} | Tyflex Blog`,
    description: post.meta.description,
    path: `/resources/blog/${post.meta.slug}`,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-white mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-white mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-300 leading-relaxed mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-5 list-disc list-inside text-gray-300" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="text-white font-semibold" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-brand-red hover:underline" {...props} />
  ),
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.meta);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Person", name: post.meta.author },
    publisher: { "@type": "Organization", name: "Tyflex Investments" },
  };

  return (
    <div className="pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/resources/blog" },
          { name: post.meta.title, path: `/resources/blog/${post.meta.slug}` },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <Link
            href="/resources/blog"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <span className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-medium mb-4">
            {post.meta.category}
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">{post.meta.title}</h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-10 pb-10 border-b border-white/5">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.meta.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.meta.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.meta.readingTime}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="h-48 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/5 flex items-center justify-center mb-10">
            <DynamicIcon name={post.meta.icon} className="h-16 w-16 text-brand-red/30" strokeWidth={1} />
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <article>
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-white/5">
            {post.meta.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-10 p-8 rounded-2xl bg-brand-card border border-white/5 text-center">
            <h3 className="font-bold mb-2">Have a project in mind?</h3>
            <p className="text-gray-400 text-sm mb-6">Get a tailored quote for your business needs.</p>
            <GradientButton href="/get-quote">Get a Free Quote</GradientButton>
          </div>
        </FadeIn>
      </div>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-16 border-t border-white/5">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8 text-center">More on {post.meta.category}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {related.map((p, i) => (
              <FadeIn key={p.slug} delay={0.05 * i}>
                <BlogCard post={p} />
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <div className="text-center mt-10">
              <Link
                href="/resources/blog"
                className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Browse all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  );
}
