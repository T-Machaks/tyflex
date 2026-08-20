"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Plus, Trash2, X } from "lucide-react";
import { inputClass, selectOptionClass } from "@/lib/form-styles";
import { INVOICE_STATUS_LABELS } from "@/lib/accounts/ui";
import type { Client, Currency, InvoiceStatus } from "@/lib/accounts/types";

const STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "overdue"];
const CURRENCIES: Currency[] = ["USD", "ZWL"];

interface DraftItem {
  description: string;
  quantity: string;
  unitPrice: string;
}

function emptyItem(): DraftItem {
  return { description: "", quantity: "1", unitPrice: "" };
}

export default function NewInvoiceModal({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [items, setItems] = useState<DraftItem[]>([emptyItem()]);

  function updateItem(index: number, patch: Partial<DraftItem>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeItem(index: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const payload = {
      clientId: raw.clientId,
      status: raw.status,
      issueDate: raw.issueDate,
      dueDate: raw.dueDate,
      currency: raw.currency,
      notes: raw.notes,
      items: items.map((item) => ({
        description: item.description,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    };

    try {
      const res = await fetch("/api/accounts/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create invoice.");
      setOpen(false);
      window.location.reload();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to create invoice.");
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-medium rounded-lg transition-colors shrink-0"
      >
        <Plus className="h-4 w-4" />
        New Invoice
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-brand-dark border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">New Invoice</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Client</label>
                  <select name="clientId" required defaultValue="" className={inputClass}>
                    <option value="" disabled className={selectOptionClass}>
                      Select a client
                    </option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id} className={selectOptionClass}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Status</label>
                    <select name="status" defaultValue="draft" className={inputClass}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className={selectOptionClass}>
                          {INVOICE_STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Currency</label>
                    <select name="currency" defaultValue="USD" className={inputClass}>
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c} className={selectOptionClass}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Issue Date</label>
                    <input type="date" name="issueDate" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Due Date</label>
                    <input type="date" name="dueDate" required className={inputClass} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Line Items</label>
                    <button
                      type="button"
                      onClick={addItem}
                      className="inline-flex items-center gap-1 text-xs text-brand-red hover:text-red-400 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 items-center">
                        <input
                          value={item.description}
                          onChange={(e) => updateItem(i, { description: e.target.value })}
                          placeholder="Description"
                          required
                          className={`${inputClass} col-span-6 py-2 text-sm`}
                        />
                        <input
                          type="number"
                          min={0.01}
                          step="any"
                          value={item.quantity}
                          onChange={(e) => updateItem(i, { quantity: e.target.value })}
                          placeholder="Qty"
                          required
                          className={`${inputClass} col-span-2 py-2 text-sm`}
                        />
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(i, { unitPrice: e.target.value })}
                          placeholder="Unit Price"
                          required
                          className={`${inputClass} col-span-3 py-2 text-sm`}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          disabled={items.length === 1}
                          className="col-span-1 flex justify-center text-gray-500 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Remove line item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Notes (optional)</label>
                  <textarea name="notes" rows={2} className={inputClass} placeholder="Payment terms, memo, etc." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Invoice"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
