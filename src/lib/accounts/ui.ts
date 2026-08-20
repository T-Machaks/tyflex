import type { Currency, InvoiceStatus } from "@/lib/accounts/types";

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
};

export const INVOICE_STATUS_STYLES: Record<InvoiceStatus, string> = {
  draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  overdue: "bg-red-500/10 text-red-400 border-red-500/20",
};

const CURRENCY_FORMATTERS: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  // Intl doesn't ship a symbol for ZWL — format the raw number and label the
  // code ourselves rather than let the formatter fall back to something misleading.
  ZWL: new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === "ZWL") return `ZWL ${CURRENCY_FORMATTERS.ZWL.format(amount)}`;
  return CURRENCY_FORMATTERS.USD.format(amount);
}
