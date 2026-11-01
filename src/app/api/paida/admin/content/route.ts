import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { loadContent, saveContent } from "@/lib/paida/content";
import { EDITOR_CONTENT_FIELDS, FIELD_SECTION, atLeast } from "@/lib/paida/roles";

/** Which sections differ between two content documents, as readable names. */
function changedSections(prev: Record<string, unknown>, next: Record<string, unknown>): string[] {
  const out = new Set<string>();
  for (const [k, section] of Object.entries(FIELD_SECTION)) if (JSON.stringify(prev[k]) !== JSON.stringify(next[k])) out.add(section);
  return [...out];
}

export async function PUT(req: Request) {
  const gate = await requireRole("editor");
  if (!gate.ok) return gate.res;
  const { session } = gate;

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const current = await loadContent();
    // Editors may only change program, updates, her story and gallery: everything else (payment
    // details, contacts, hero, links) is taken from what is already saved, whatever the request says.
    const proposed = atLeast(session.role, "admin")
      ? body
      : { ...current, ...Object.fromEntries(EDITOR_CONTENT_FIELDS.filter((f) => f in body).map((f) => [f, body[f]])) };

    const content = await saveContent(proposed);
    const changed = changedSections(current as unknown as Record<string, unknown>, content as unknown as Record<string, unknown>);
    if (changed.length) await logActivity(session, `updated ${changed.join(", ")}`);

    revalidatePath("/paida");
    revalidatePath("/paida/program");
    return NextResponse.json({ ok: true, content });
  } catch (err) {
    if (err instanceof ZodError) {
      const first = err.issues[0];
      return NextResponse.json({ ok: false, message: `${first.path.join(" › ")}: ${first.message}` }, { status: 400 });
    }
    console.error("[paida] save failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save. Check storage (S3) settings." }, { status: 500 });
  }
}
