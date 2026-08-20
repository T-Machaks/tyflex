"use client";

import { useMemo, useState } from "react";
import { Inbox, Search } from "lucide-react";
import InvoiceCard from "@/components/accounts/InvoiceCard";
import { inputClass } from "@/lib/form-styles";
import type { InvoiceStatus, InvoiceWithClient } from "@/lib/accounts/types";

const FILTERS: Array<{ value: InvoiceStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

export default function InvoiceListClient({ invoices }: { invoices: InvoiceWithClient[] }) {
  const [filter, setFilter] = useState<InvoiceStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byStatus = filter === "all" ? invoices : invoices.filter((i) => i.status === filter);
    const q = query.trim().toLowerCase();
    if (!q) return byStatus;
    return byStatus.filter(
      (i) => i.invoiceNumber.toLowerCase().includes(q) || i.client.companyName.toLowerCase().includes(q)
    );
  }, [invoices, filter, query]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                filter === f.value ? "bg-brand-red text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search invoice or client..."
            className={`${inputClass} pl-10 py-2.5`}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
          <Inbox className="h-10 w-10 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No invoices here</h3>
          <p className="text-gray-400 text-sm">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </>
  );
}
