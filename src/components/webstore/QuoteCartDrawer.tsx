"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useQuoteCart } from "@/lib/quote-cart/QuoteCartContext";

export default function QuoteCartDrawer() {
  const { items, isOpen, close, remove, setQuantity, clear } = useQuoteCart();

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-[81] w-full max-w-md bg-brand-dark border-l border-white/10 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Quote request list"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="flex items-center gap-2 font-semibold">
                <ShoppingBag className="h-4 w-4 text-brand-red" />
                Your quote request
                {items.length > 0 && (
                  <span className="text-sm text-gray-500">({items.length})</span>
                )}
              </h2>
              <button
                onClick={close}
                aria-label="Close"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <ShoppingBag className="h-10 w-10 text-white/15 mb-4" strokeWidth={1.25} />
                <p className="text-gray-400 text-sm mb-6">
                  No products added yet. Browse the webstore and add items to
                  request pricing on all of them at once.
                </p>
                <Link
                  href="/webstore"
                  onClick={close}
                  className="text-sm text-brand-red hover:underline"
                >
                  Go to the webstore &rarr;
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-white/5">
                  {items.map((item) => (
                    <li key={item.id} className="p-5 flex gap-3">
                      <div className="min-w-0 flex-1">
                        {item.brand && (
                          <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-red">
                            {item.brand}
                          </span>
                        )}
                        <p className="text-sm text-white leading-snug">{item.name}</p>
                        {item.category && (
                          <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="inline-flex items-center rounded-lg border border-white/10">
                            <button
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="h-7 w-7 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="h-7 w-7 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="h-7 w-7 flex items-center justify-center text-gray-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 p-5 space-y-3">
                  <Link
                    href="/get-quote"
                    onClick={close}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors"
                  >
                    Request a quote for these
                  </Link>
                  <button
                    onClick={clear}
                    className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Clear list
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
