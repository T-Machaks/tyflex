import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { isAdmin } from "@/lib/paida/auth";
import { saveContent } from "@/lib/paida/content";

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false, message: "Please sign in again." }, { status: 401 });

  try {
    const content = await saveContent(await req.json());
    revalidatePath("/paida");
    revalidatePath("/paida/program");
    return NextResponse.json({ ok: true, content });
  } catch (err) {
    if (err instanceof ZodError) {
      const first = err.issues[0];
      return NextResponse.json(
        { ok: false, message: `${first.path.join(" › ")}: ${first.message}` },
        { status: 400 }
      );
    }
    console.error("[paida] save failed:", err);
    return NextResponse.json({ ok: false, message: "Could not save. Check storage (S3) settings." }, { status: 500 });
  }
}
