"use client";

import { useMemo, useState } from "react";
import { Inbox, Search, X } from "lucide-react";
import ProductCard from "@/components/webstore/ProductCard";
import { products, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data/products";
import { selectOptionClass } from "@/lib/form-styles";

type CategoryFilter = "All" | ProductCategory;

const categories: CategoryFilter[] = ["All", ...PRODUCT_CATEGORIES];

type SortValue = "featured" | "price-asc" | "price-desc" | "name-asc";

const sortOptions: { value: SortValue; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

export default function WebstoreClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState<SortValue>("featured");

  const filtered = useMemo(() => {
    let list = products;

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [query, category, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <>
      {/* Controls */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
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

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort" className="text-sm text-gray-400">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50 transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className={selectOptionClass}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
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

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>

      {/* Grid */}
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
    </>
  );
}
