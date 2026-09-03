"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Inbox, Search, Star, X } from "lucide-react";
import ProductCard from "@/components/webstore/ProductCard";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { products, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data/products";

type CategoryFilter = "All" | ProductCategory;

const categories: CategoryFilter[] = ["All", ...PRODUCT_CATEGORIES];

// Featured ("Hot selling") items get their own panel on the default view rather
// than floating to the top of every filtered/searched result set. Spread the
// picks across categories so the panel isn't all one product type.
const featuredPicks = (() => {
  const byCat = new Map<string, typeof products>();
  for (const p of products) {
    if (!p.featured) continue;
    const arr = byCat.get(p.category) ?? [];
    arr.push(p);
    byCat.set(p.category, arr);
  }
  const cols = [...byCat.values()];
  const out: typeof products = [];
  for (let i = 0; out.length < 8 && cols.some((c) => c[i]); i++) {
    for (const c of cols) if (c[i] && out.length < 8) out.push(c[i]);
  }
  return out;
})();

export default function WebstoreClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const q = query.trim().toLowerCase();
  const isDefaultView = category === "All" && q === "";

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    // Stable, predictable order — group by category (in the curated
    // PRODUCT_CATEGORIES order), then by name. Featured items are surfaced in
    // the side panel, not by floating to the top here.
    const catRank = (c: ProductCategory) => {
      const i = PRODUCT_CATEGORIES.indexOf(c);
      return i === -1 ? PRODUCT_CATEGORIES.length : i;
    };
    return [...list].sort(
      (a, b) => catRank(a.category) - catRank(b.category) || a.name.localeCompare(b.name),
    );
  }, [q, category]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <>
      {/* Controls */}
      <div className="mb-10 space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-all whitespace-nowrap ${
                category === cat
                  ? "bg-brand-red text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:flex lg:gap-8 lg:items-start">
        {/* Featured side panel — default view only */}
        {isDefaultView && featuredPicks.length > 0 && (
          <aside className="mb-10 lg:mb-0 lg:w-72 lg:shrink-0 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-red mb-4">
                <Star className="h-4 w-4" />
                Featured
              </h2>
              <ul className="space-y-3">
                {featuredPicks.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/webstore/product/${p.id}`}
                      className="group flex gap-3 items-center"
                    >
                      <div className="h-12 w-12 shrink-0 rounded-lg bg-white overflow-hidden flex items-center justify-center border border-white/10">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt="" className="h-full w-full object-contain p-1" />
                        ) : (
                          <DynamicIcon name={p.icon} className="h-5 w-5 text-brand-red/50" />
                        )}
                      </div>
                      <div className="min-w-0">
                        {p.brand && (
                          <span className="block text-[10px] font-semibold uppercase tracking-wide text-brand-red/90">
                            {p.brand}
                          </span>
                        )}
                        <span className="block text-xs text-gray-300 leading-snug line-clamp-2 group-hover:text-white">
                          {p.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
              <Inbox className="h-10 w-10 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products match your search</h3>
              <p className="text-gray-400 text-sm mb-6">Try a different keyword or clear your filters.</p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
