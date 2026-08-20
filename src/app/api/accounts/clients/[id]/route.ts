import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { updateClientSchema } from "@/lib/accounts/validation";
import { getClientById, updateClient } from "@/lib/accounts/clients";

interface RouteParams {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!getClientById(params.id)) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = updateClientSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid update." }, { status: 400 });
  }

  const client = updateClient(params.id, parsed.data);
  return NextResponse.json({ ok: true, client });
}
