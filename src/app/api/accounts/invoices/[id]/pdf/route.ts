import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { getInvoiceById } from "@/lib/accounts/invoices";
import { renderInvoicePdf } from "@/lib/accounts/pdf";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  const invoice = getInvoiceById(params.id);
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }

  const pdf = await renderInvoicePdf(invoice);

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.invoiceNumber}.pdf"`,
      "Content-Length": String(pdf.length),
    },
  });
}
