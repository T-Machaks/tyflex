import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Clock, FileText, TrendingUp, Wallet } from "lucide-react";
import { getPortalSession } from "@/lib/auth";
import { getAllInvoices, getRevenueStats } from "@/lib/accounts/invoices";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import InvoiceCard from "@/components/accounts/InvoiceCard";
import { INVOICE_STATUS_LABELS, formatCurrency } from "@/lib/accounts/ui";
import type { Currency } from "@/lib/accounts/types";

export const metadata: Metadata = { title: "Dashboard | Tyflex Billing" };

export default async function AccountsPage() {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") redirect("/portal");

  const invoices = getAllInvoices();
  const stats = getRevenueStats(invoices);
  const recent = invoices.slice(0, 6);
  const currencies = Object.keys(stats.byCurrency) as Currency[];

  const statusCards = [
    { status: "draft" as const, value: stats.counts.draft, icon: FileText },
    { status: "sent" as const, value: stats.counts.sent, icon: Clock },
    { status: "paid" as const, value: stats.counts.paid, icon: Wallet },
    { status: "overdue" as const, value: stats.counts.overdue, icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Billing & Accounts</h1>
            <p className="text-gray-400">Revenue overview and invoice status across every client.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/accounts/clients"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-sm font-medium rounded-lg transition-colors"
            >
              Clients
            </Link>
            <Link
              href="/accounts/invoices"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-medium rounded-lg transition-colors"
            >
              All Invoices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Revenue by currency — never summed across currencies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {currencies.length === 0 ? (
          <GlassCard interactive={false} className="p-6 sm:col-span-2">
            <p className="text-gray-500 text-sm">No invoices yet.</p>
          </GlassCard>
        ) : (
          currencies.map((currency, i) => (
            <FadeIn key={currency} delay={0.05 * i}>
              <GlassCard interactive={false} className="p-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">{currency} Revenue</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-lg font-bold text-emerald-400">
                      {formatCurrency(stats.byCurrency[currency].paid, currency)}
                    </p>
                    <p className="text-xs text-gray-500">Paid</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-400">
                      {formatCurrency(stats.byCurrency[currency].outstanding, currency)}
                    </p>
                    <p className="text-xs text-gray-500">Outstanding</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-400">
                      {formatCurrency(stats.byCurrency[currency].overdue, currency)}
                    </p>
                    <p className="text-xs text-gray-500">Overdue</p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statusCards.map((stat, i) => (
          <FadeIn key={stat.status} delay={0.05 * i}>
            <GlassCard interactive={false} className="p-6 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{INVOICE_STATUS_LABELS[stat.status]}</p>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Invoices</h2>
          <Link href="/accounts/invoices" className="text-sm text-brand-red hover:text-red-400 transition-colors">
            View all
          </Link>
        </div>
      </FadeIn>

      {recent.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
          <FileText className="h-10 w-10 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
          <p className="text-gray-400 text-sm">Create your first invoice to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}
