import Link from "next/link";
import { Calendar, Landmark } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_STYLES, formatCurrency } from "@/lib/accounts/ui";
import type { InvoiceWithClient } from "@/lib/accounts/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function InvoiceCard({ invoice }: { invoice: InvoiceWithClient }) {
  return (
    <Link href={`/accounts/invoices/${invoice.id}`} className="block h-full">
      <GlassCard className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-bold leading-snug mb-1 truncate">{invoice.invoiceNumber}</h3>
            <p className="text-sm text-gray-500 truncate">{invoice.client.companyName}</p>
          </div>
          <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border ${INVOICE_STATUS_STYLES[invoice.status]}`}
          >
            {INVOICE_STATUS_LABELS[invoice.status]}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <p className="text-2xl font-bold mb-3">{formatCurrency(invoice.total, invoice.currency)}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5" />
              {invoice.currency}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Due {formatDate(invoice.dueDate)}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
