import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/paida/auth";
import { deleteTribute, listAll, setTributeStatus } from "@/lib/paida/tributes";

const deny = () => NextResponse.json({ ok: false, message: "Please sign in again." }, { status: 401 });
const ID = /^[0-9a-f-]{36}$/i;

export async function GET() {
  if (!(await isAdmin())) return deny();
  return NextResponse.json({ ok: true, tributes: await listAll() });
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return deny();
  const { id, status } = (await req.json().catch(() => ({}))) as { id?: string; status?: string };
  if (!id || !ID.test(id) || !["pending", "approved", "hidden"].includes(String(status))) {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
  const found = await setTributeStatus(id, status as "pending" | "approved" | "hidden");
  revalidatePath("/paida");
  return NextResponse.json({ ok: found });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return deny();
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!ID.test(id)) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  await deleteTribute(id);
  revalidatePath("/paida");
  return NextResponse.json({ ok: true });
}
