import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, guides, and news from the Tyflex team on technology trends in Zimbabwe.
          </p>
        </div>
        <div className="text-center py-20 rounded-2xl bg-brand-card border border-white/5">
          <div className="text-5xl mb-6">&#x270D;</div>
          <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            We&#8217;re working on our first articles. Check back soon for
            technology insights and business guides.
          </p>
        </div>
      </div>
    </div>
  );
}
