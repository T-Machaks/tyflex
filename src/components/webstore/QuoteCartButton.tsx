"use client";

import { ShoppingBag } from "lucide-react";
import { useQuoteCart } from "@/lib/quote-cart/QuoteCartContext";

interface Props {
  variant?: "icon" | "row";
  onActivate?: () => void;
}

/**
 * Header entry point to the quote-request cart. `icon` for the desktop nav,
 * `row` for the mobile menu.
 */
export default function QuoteCartButton({ variant = "icon", onActivate }: Props) {
  const { count, toggle, hydrated } = useQuoteCart();

  function handleClick() {
    onActivate?.();
    toggle();
  }

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center justify-between py-2 text-gray-300 hover:text-white"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          Quote request
        </span>
        {hydrated && count > 0 && (
          <span className="min-w-[20px] rounded-full bg-brand-red px-1.5 text-center text-xs font-semibold text-white">
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Open quote request${hydrated && count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
      className="relative text-gray-300 hover:text-white transition-colors"
    >
      <ShoppingBag className="h-5 w-5" />
      {hydrated && count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
