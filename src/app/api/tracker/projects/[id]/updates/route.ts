import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { addUpdateSchema } from "@/lib/tracker/validation";
import { addStatusUpdate, getProjectById } from "@/lib/tracker/projects";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  if (!getProjectById(params.id)) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = addUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid update." }, { status: 400 });
  }

  const update = addStatusUpdate(params.id, auth.session.user.name || "Admin", parsed.data.note);
  return NextResponse.json({ ok: true, update });
}
