"use client";

import { useMemo, useState } from "react";
import { Inbox, Search, X } from "lucide-react";
import BlogCard from "@/components/resources/BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogListClientProps {
  posts: BlogPostMeta[];
  categories: string[];
  tags: string[];
}

export default function BlogListClient({ posts, categories, tags }: BlogListClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = posts;

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (tag) {
      list = list.filter((p) => p.tags.includes(tag));
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [posts, query, category, tag]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setTag(null);
  };

  return (
    <>
      <div className="mb-10 space-y-5">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-all whitespace-nowrap ${
                category === cat ? "bg-brand-red text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? null : t)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                tag === t ? "bg-brand-red/20 text-brand-red border border-brand-red/40" : "bg-white/5 text-gray-500 hover:text-gray-300 border border-transparent"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} article{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
          <Inbox className="h-10 w-10 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No articles match your search</h3>
          <p className="text-gray-400 text-sm mb-6">Try a different keyword or clear your filters.</p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
