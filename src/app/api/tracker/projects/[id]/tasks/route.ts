import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
import { addTaskSchema } from "@/lib/tracker/validation";
import { addTask, getProjectById } from "@/lib/tracker/projects";

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

  const parsed = addTaskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid task." }, { status: 400 });
  }

  const task = addTask(params.id, parsed.data);
  return NextResponse.json({ ok: true, task });
}
