"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  Mail,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { inputClass, selectOptionClass } from "@/lib/form-styles";
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_STYLES, formatCurrency } from "@/lib/accounts/ui";
import type { InvoiceStatus, InvoiceWithClient, LineItem } from "@/lib/accounts/types";

const STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "overdue"];

interface DraftItem {
  id?: string;
  description: string;
  quantity: string;
  unitPrice: string;
}

function toDraftItems(items: LineItem[]): DraftItem[] {
  return items.map((i) => ({ id: i.id, description: i.description, quantity: String(i.quantity), unitPrice: String(i.unitPrice) }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function InvoiceDetailClient({ invoice: initialInvoice }: { invoice: InvoiceWithClient }) {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState<DraftItem[]>(toDraftItems(initialInvoice.items));
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [statusSaving, setStatusSaving] = useState(false);
  const [statusError, setStatusError] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  function updateItem(index: number, patch: Partial<DraftItem>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: "1", unitPrice: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  async function patchInvoice(body: Record<string, unknown>) {
    const res = await fetch(`/api/accounts/invoices/${invoice.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to save changes.");
    return json.invoice as InvoiceWithClient;
  }

  async function handleStatusChange(status: InvoiceStatus) {
    setStatusSaving(true);
    setStatusError("");
    try {
      const updated = await patchInvoice({ status });
      setInvoice(updated);
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setStatusSaving(false);
    }
  }

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");

    const raw = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    try {
      const updated = await patchInvoice({
        issueDate: raw.issueDate,
        dueDate: raw.dueDate,
        currency: raw.currency,
        notes: raw.notes,
        items: items.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
        })),
      });
      setInvoice(updated);
      setItems(toDraftItems(updated.items));
      setEditing(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSendInvoice() {
    setIsSending(true);
    setSendError("");
    setSendSuccess(false);
    try {
      const res = await fetch(`/api/accounts/invoices/${invoice.id}/send`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send invoice.");
      if (json.invoice) setInvoice(json.invoice);
      setSendSuccess(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to send invoice.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-brand-card p-6 mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{invoice.invoiceNumber}</h1>
            <p className="text-gray-400">
              {invoice.client.companyName} &middot; {invoice.client.contactName}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`/api/accounts/invoices/${invoice.id}/pdf`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
            <button
              onClick={handleSendInvoice}
              disabled={isSending}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white rounded-lg text-xs font-medium transition-colors"
            >
              {isSending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Mail className="h-3.5 w-3.5" />}
              Send Invoice
            </button>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
            )}
          </div>
        </div>

        {sendSuccess && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300 mb-4">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Invoice emailed to {invoice.client.email}.
          </div>
        )}
        {sendError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {sendError}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Status</span>
            <select
              value={invoice.status}
              disabled={statusSaving}
              onChange={(e) => handleStatusChange(e.target.value as InvoiceStatus)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border bg-transparent ${INVOICE_STATUS_STYLES[invoice.status]}`}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className={selectOptionClass}>
                  {INVOICE_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <span className="text-gray-500">
            Issued <span className="text-gray-300">{formatDate(invoice.issueDate)}</span>
          </span>
          <span className="text-gray-500">
            Due <span className="text-gray-300">{formatDate(invoice.dueDate)}</span>
          </span>
        </div>
        {statusError && <p className="text-sm text-red-400 mt-2">{statusError}</p>}
      </div>

      {/* Line items / totals */}
      {editing ? (
        <form onSubmit={handleSave} className="rounded-2xl border border-white/10 bg-brand-card p-6 mb-8 space-y-4">
          {saveError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              {saveError}
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Issue Date</label>
              <input type="date" name="issueDate" defaultValue={invoice.issueDate} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Due Date</label>
              <input type="date" name="dueDate" defaultValue={invoice.dueDate} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Currency</label>
              <select name="currency" defaultValue={invoice.currency} className={inputClass}>
                <option value="USD" className={selectOptionClass}>
                  USD
                </option>
                <option value="ZWL" className={selectOptionClass}>
                  ZWL
                </option>
              </select>
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
                <div key={item.id ?? i} className="grid grid-cols-12 gap-2 items-center">
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
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Notes</label>
            <textarea name="notes" rows={2} defaultValue={invoice.notes} className={inputClass} />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setItems(toDraftItems(invoice.items));
                setEditing(false);
              }}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-brand-card overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium text-right">Qty</th>
                <th className="px-6 py-3 font-medium text-right">Unit Price</th>
                <th className="px-6 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-3">{item.description}</td>
                  <td className="px-6 py-3 text-right text-gray-400">{item.quantity}</td>
                  <td className="px-6 py-3 text-right text-gray-400">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                  <td className="px-6 py-3 text-right font-medium">{formatCurrency(item.total, invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end px-6 py-4 border-t border-white/10">
            <div className="w-full max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax ({invoice.taxRate}%)</span>
                <span>{formatCurrency(invoice.tax, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-1.5 border-t border-white/10">
                <span>Total Due</span>
                <span className="text-brand-red">{formatCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="px-6 py-4 border-t border-white/10 text-sm text-gray-400">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Notes</p>
              {invoice.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
