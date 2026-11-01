import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/auth";
import { getAllInvoices } from "@/lib/accounts/invoices";
import { getAllClients } from "@/lib/accounts/clients";
import FadeIn from "@/components/motion/FadeIn";
import InvoiceListClient from "@/components/accounts/InvoiceListClient";
import NewInvoiceModal from "@/components/accounts/NewInvoiceModal";

export const metadata: Metadata = { title: "Invoices | Tyflex Billing" };

export default async function InvoicesPage() {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") redirect("/portal");

  const invoices = getAllInvoices();
  const clients = getAllClients();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Invoices</h1>
            <p className="text-gray-400">Every invoice, filterable by status.</p>
          </div>
          <NewInvoiceModal clients={clients} />
        </div>
      </FadeIn>

      <InvoiceListClient invoices={invoices} />
    </div>
  );
}
