import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { updateInvoiceSchema } from "@/lib/accounts/validation";
import { getInvoiceById, updateInvoice } from "@/lib/accounts/invoices";

interface RouteParams {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!getInvoiceById(params.id)) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = updateInvoiceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid update." }, { status: 400 });
  }

  const invoice = updateInvoice(params.id, parsed.data);
  return NextResponse.json({ ok: true, invoice });
}
