import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { getInvoiceById, updateInvoice } from "@/lib/accounts/invoices";
import { renderInvoicePdf } from "@/lib/accounts/pdf";
import { sendMailWithAttachment, renderKeyValueHtml, renderKeyValueText } from "@/lib/email";
import { formatCurrency } from "@/lib/accounts/ui";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  const invoice = getInvoiceById(params.id);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }

  const pdf = await renderInvoicePdf(invoice);
  const rows: [string, string][] = [
    ["Invoice", invoice.invoiceNumber],
    ["Amount Due", formatCurrency(invoice.total, invoice.currency)],
    ["Due Date", invoice.dueDate],
  ];

  try {
    await sendMailWithAttachment({
      to: invoice.client.email,
      subject: `Tyflex Investments — Invoice ${invoice.invoiceNumber}`,
      html: `<p>Dear ${invoice.client.contactName},</p><p>Please find attached invoice ${invoice.invoiceNumber} from Tyflex Investments.</p>${renderKeyValueHtml(rows)}<p>Thank you for your business.</p>`,
      text: `Dear ${invoice.client.contactName},\n\nPlease find attached invoice ${invoice.invoiceNumber} from Tyflex Investments.\n\n${renderKeyValueText(rows)}\n\nThank you for your business.`,
      attachment: {
        filename: `${invoice.invoiceNumber}.pdf`,
        contentType: "application/pdf",
        content: pdf,
      },
    });
  } catch (error) {
    console.error("Failed to send invoice email:", error);
    return NextResponse.json({ error: "Failed to send invoice email." }, { status: 502 });
  }

  const updated = invoice.status === "draft" ? updateInvoice(invoice.id, { status: "sent" }) : invoice;
  return NextResponse.json({ ok: true, invoice: updated });
}
