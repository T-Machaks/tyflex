import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { isAdmin } from "@/lib/paida/auth";
import {
  contributionFields,
  parsePatch,
  createContribution,
  deleteContribution,
  listContributions,
  toCsv,
  updateContribution,
} from "@/lib/paida/contributions";

const deny = () => NextResponse.json({ ok: false, message: "Please sign in again." }, { status: 401 });
const ID = /^[0-9a-f-]{36}$/i;
const noStore = { "Cache-Control": "no-store" };

function zodMessage(err: ZodError) {
  const i = err.issues[0];
  return `${i.path.join(" › ") || "form"}: ${i.message}`;
}

export async function GET(req: Request) {
  if (!(await isAdmin())) return deny();
  const items = await listContributions();
  if (new URL(req.url).searchParams.get("format") === "csv") {
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(toCsv(items), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="paida-contributions-${stamp}.csv"`,
        ...noStore,
      },
    });
  }
  return NextResponse.json({ ok: true, contributions: items }, { headers: noStore });
}

/** Add a contribution by hand (e.g. cash handed over in person). Confirmed by default. */
export async function POST(req: Request) {
  if (!(await isAdmin())) return deny();
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const input = contributionFields.parse(body);
    const status = ["pending", "confirmed", "rejected"].includes(String(body.status)) ? (body.status as "pending" | "confirmed" | "rejected") : "confirmed";
    const note = typeof body.note === "string" ? body.note.slice(0, 300) : "";
    const created = await createContribution(input, { source: "manual", status, note });
    revalidatePath("/paida");
    return NextResponse.json({ ok: true, contribution: created });
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json({ ok: false, message: zodMessage(err) }, { status: 400 });
    console.error("[paida] add contribution failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return deny();
  try {
    const { id, patch } = (await req.json()) as { id?: string; patch?: unknown };
    if (!id || !ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
    const updated = await updateContribution(id, parsePatch(patch));
    revalidatePath("/paida");
    return NextResponse.json({ ok: Boolean(updated), contribution: updated });
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json({ ok: false, message: zodMessage(err) }, { status: 400 });
    console.error("[paida] update contribution failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return deny();
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  await deleteContribution(id);
  revalidatePath("/paida");
  return NextResponse.json({ ok: true });
}
