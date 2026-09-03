"use client";

import { Check, Plus } from "lucide-react";
import { useQuoteCart } from "@/lib/quote-cart/QuoteCartContext";
import type { Product } from "@/lib/data/products";

interface Props {
  product: Pick<Product, "id" | "name" | "brand" | "category">;
  /** "card" = compact pill for the grid; "detail" = full-width button. */
  variant?: "card" | "detail";
  /** Open the cart drawer after adding (used on the product page). */
  openOnAdd?: boolean;
}

export default function AddToQuoteButton({ product, variant = "card", openOnAdd = false }: Props) {
  const { has, add, remove, open } = useQuoteCart();
  const inCart = has(product.id);

  function handleClick(e: React.MouseEvent) {
    // The card is wrapped in a <Link>; don't navigate when tapping the button.
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      remove(product.id);
      return;
    }
    add({ id: product.id, name: product.name, brand: product.brand, category: product.category });
    if (openOnAdd) open();
  }

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={inCart}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-colors ${
          inCart
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-brand-red hover:bg-brand-red-dark text-white"
        }`}
      >
        {inCart ? (
          <>
            <Check className="h-4 w-4" />
            Added to quote
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add to quote
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={inCart}
      aria-label={inCart ? `Remove ${product.name} from quote request` : `Add ${product.name} to quote request`}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
        inCart
          ? "bg-brand-red text-white"
          : "bg-brand-red/10 text-brand-red hover:bg-brand-red/20"
      }`}
    >
      {inCart ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
      {inCart ? "In quote" : "Add to quote"}
    </button>
  );
}
