import Link from "next/link";
import { BookOpen, FileText, TrendingUp } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import BlogCard from "@/components/resources/BlogCard";
import { getAllPostsMeta } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources & Insights | Tyflex",
  description:
    "Guides, case studies, and technical documentation to help Zimbabwean businesses get the most out of Tyflex' technology solutions.",
  path: "/resources",
});

const sections = [
  {
    name: "Blog",
    description: "Insights, guides, and news from the Tyflex team on technology trends in Zimbabwe.",
    href: "/resources/blog",
    icon: BookOpen,
  },
  {
    name: "Case Studies",
    description: "See how our solutions have helped businesses across Zimbabwe achieve their goals.",
    href: "/resources/case-studies",
    icon: TrendingUp,
  },
  {
    name: "Documentation",
    description: "Technical documentation, setup guides, and where to go for product support.",
    href: "/resources/docs",
    icon: FileText,
  },
];

export default function ResourcesPage() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Resources</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Guides, case studies, and documentation to help you get the most
              out of our technology solutions.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {sections.map((sec, i) => (
            <FadeIn key={sec.name} delay={0.05 * i}>
              <Link href={sec.href} className="block h-full">
                <GlassCard className="p-8 h-full text-center">
                  <div className="h-12 w-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5 mx-auto">
                    <sec.icon className="h-6 w-6 text-brand-red" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{sec.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{sec.description}</p>
                </GlassCard>
              </Link>
            </FadeIn>
          ))}
        </div>

        {latestPosts.length > 0 && (
          <div>
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 text-center">Latest from the Blog</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => (
                <FadeIn key={post.slug} delay={0.05 * i}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
