import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { BlogPostMeta } from "@/lib/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/resources/blog/${post.slug}`} className="block h-full">
      <GlassCard className="h-full flex flex-col overflow-hidden">
        <div className="relative h-36 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] border-b border-white/5">
          <DynamicIcon name={post.icon} className="h-12 w-12 text-brand-red/40" strokeWidth={1.25} />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[11px] text-gray-200">
            {post.category}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs text-gray-500 mb-2">
            {formatDate(post.date)} &middot; {post.readingTime}
          </p>
          <h3 className="font-bold mb-2 leading-snug">{post.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{post.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-[11px] text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
