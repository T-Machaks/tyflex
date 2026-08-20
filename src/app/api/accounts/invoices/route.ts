import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { createInvoiceSchema } from "@/lib/accounts/validation";
import { createInvoice } from "@/lib/accounts/invoices";
import { getClientById } from "@/lib/accounts/clients";

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createInvoiceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid invoice." }, { status: 400 });
  }

  if (!getClientById(parsed.data.clientId)) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  const invoice = createInvoice(parsed.data);
  return NextResponse.json({ ok: true, invoice });
}
