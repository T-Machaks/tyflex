import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/auth";
import { getAllClients } from "@/lib/accounts/clients";
import { getAllInvoices } from "@/lib/accounts/invoices";
import FadeIn from "@/components/motion/FadeIn";
import ClientCard from "@/components/accounts/ClientCard";
import NewClientModal from "@/components/accounts/NewClientModal";

export const metadata: Metadata = { title: "Clients | Tyflex Billing" };

export default async function ClientsPage() {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") redirect("/portal");

  const clients = getAllClients();
  const invoices = getAllInvoices();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Clients</h1>
            <p className="text-gray-400">Client records and billing history.</p>
          </div>
          <NewClientModal />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client, i) => (
          <FadeIn key={client.id} delay={0.04 * i}>
            <ClientCard client={client} invoices={invoices.filter((inv) => inv.clientId === client.id)} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
