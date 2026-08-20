import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPortalSession } from "@/lib/auth";
import { getInvoiceById } from "@/lib/accounts/invoices";
import InvoiceDetailClient from "@/components/accounts/InvoiceDetailClient";
import FadeIn from "@/components/motion/FadeIn";

interface InvoicePageProps {
  params: { id: string };
}

export function generateMetadata({ params }: InvoicePageProps): Metadata {
  const invoice = getInvoiceById(params.id);
  return {
    title: invoice ? `${invoice.invoiceNumber} | Tyflex Billing` : "Invoice | Tyflex Billing",
  };
}

export default async function InvoiceDetailPage({ params }: InvoicePageProps) {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") redirect("/portal");

  const invoice = getInvoiceById(params.id);
  if (!invoice) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <FadeIn>
        <Link
          href="/accounts/invoices"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Invoices
        </Link>
      </FadeIn>

      <FadeIn delay={0.05}>
        <InvoiceDetailClient invoice={invoice} />
      </FadeIn>
    </div>
  );
}
