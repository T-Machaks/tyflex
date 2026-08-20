import FadeIn from "@/components/motion/FadeIn";
import BlogListClient from "@/components/resources/BlogListClient";
import { getAllCategories, getAllPostsMeta, getAllTags } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog | Tyflex Investments Insights",
  description:
    "Insights, guides, and practical advice from the Tyflex Investments team on VoIP, networking, retail technology, business messaging, and cloud infrastructure.",
  path: "/resources/blog",
});

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Insights, guides, and news from the Tyflex team on technology
              trends in Zimbabwe.
            </p>
          </FadeIn>
        </div>

        <BlogListClient posts={posts} categories={categories} tags={tags} />
      </div>
    </div>
  );
}
