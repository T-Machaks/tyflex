import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { createClientSchema } from "@/lib/accounts/validation";
import { createClient } from "@/lib/accounts/clients";

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createClientSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid client." }, { status: 400 });
  }

  const client = createClient(parsed.data);
  return NextResponse.json({ ok: true, client });
}
