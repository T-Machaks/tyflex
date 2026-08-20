import { Mail, Phone, Receipt } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { formatCurrency } from "@/lib/accounts/ui";
import type { Client, InvoiceWithClient } from "@/lib/accounts/types";

export default function ClientCard({ client, invoices }: { client: Client; invoices: InvoiceWithClient[] }) {
  const totalsByCurrency = invoices.reduce<Record<string, number>>((acc, inv) => {
    acc[inv.currency] = (acc[inv.currency] || 0) + inv.total;
    return acc;
  }, {});

  return (
    <GlassCard interactive={false} className="p-6 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold leading-snug mb-1">{client.companyName}</h3>
        <p className="text-sm text-gray-500">{client.contactName}</p>
      </div>

      <div className="space-y-1.5 mb-4 text-sm text-gray-400">
        <p className="inline-flex items-center gap-1.5 truncate">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          {client.email}
        </p>
        <p className="inline-flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {client.phone}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5">
        <p className="inline-flex items-center gap-1.5 text-xs text-gray-500 mb-2">
          <Receipt className="h-3.5 w-3.5" />
          {invoices.length} invoice{invoices.length === 1 ? "" : "s"}
        </p>
        {Object.keys(totalsByCurrency).length === 0 ? (
          <p className="text-sm text-gray-600">No billing history yet</p>
        ) : (
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.entries(totalsByCurrency).map(([currency, total]) => (
              <span key={currency} className="text-sm font-semibold">
                {formatCurrency(total, currency as "USD" | "ZWL")}
              </span>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
