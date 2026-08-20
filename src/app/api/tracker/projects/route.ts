import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { createProjectSchema } from "@/lib/tracker/validation";
import { createProject } from "@/lib/tracker/projects";

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if ("response" in auth) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid project." }, { status: 400 });
  }

  const project = createProject(parsed.data);
  return NextResponse.json({ ok: true, project });
}
