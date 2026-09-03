"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * A lightweight "request a quote" cart. The webstore is inquiry-based (no
 * checkout, no prices), so this just collects the products a visitor is
 * interested in and hands the list to the /get-quote form. State is kept in
 * localStorage so it survives navigation and refreshes.
 */
export interface QuoteCartItem {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  quantity: number;
}

interface QuoteCartValue {
  items: QuoteCartItem[];
  /** Number of distinct line items. */
  count: number;
  hydrated: boolean;
  isOpen: boolean;
  has: (id: string) => boolean;
  add: (item: Omit<QuoteCartItem, "quantity"> & { quantity?: number }) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const STORAGE_KEY = "tyflex.quote-cart.v1";

const QuoteCartContext = createContext<QuoteCartValue | null>(null);

function readStored(): QuoteCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x): x is QuoteCartItem => x && typeof x.id === "string" && typeof x.name === "string")
      .map((x) => ({ ...x, quantity: Math.max(1, Math.min(9999, Math.round(x.quantity) || 1)) }));
  } catch {
    return [];
  }
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load once on mount (client only).
  useEffect(() => {
    setItems(readStored());
    setHydrated(true);
  }, []);

  // Persist on change, but only after the initial load so we don't clobber
  // stored state with the empty starting value.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode, quota) — cart still works for the session */
    }
  }, [items, hydrated]);

  // Sync across tabs.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setItems(readStored());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback<QuoteCartValue["add"]>((item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: Math.min(9999, p.quantity + (item.quantity ?? 1)) } : p
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          brand: item.brand,
          category: item.category,
          quantity: Math.max(1, item.quantity ?? 1),
        },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    const q = Math.round(quantity);
    setItems((prev) =>
      q <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, quantity: Math.min(9999, q) } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  const value = useMemo<QuoteCartValue>(
    () => ({
      items,
      count: items.length,
      hydrated,
      isOpen,
      has: (id) => items.some((p) => p.id === id),
      add,
      remove,
      setQuantity,
      clear,
      open,
      close,
      toggle,
    }),
    [items, hydrated, isOpen, add, remove, setQuantity, clear, open, close, toggle]
  );

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>;
}

export function useQuoteCart(): QuoteCartValue {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within a QuoteCartProvider");
  return ctx;
}
