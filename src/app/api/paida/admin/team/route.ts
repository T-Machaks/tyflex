import { NextResponse } from "next/server";
import { z } from "zod";
import { COMPANY } from "@/lib/constants";
import { requireRole } from "@/lib/paida/auth";
import { logActivity } from "@/lib/paida/activity";
import { ownerLoginEnabled } from "@/lib/paida/auth";
import {
  createInvite,
  createUser,
  deleteUser,
  findByIdentifier,
  getUser,
  listTeam,
  listUsers,
  normalizeIdentifier,
  resetAccess,
  updateUser,
} from "@/lib/paida/users";

// Owner only. Owners can add other Owners; the shared bootstrap login itself is never managed here.
const noStore = { "Cache-Control": "no-store" };
const ID = /^[0-9a-f-]{36}$/i;
const role = z.enum(["owner", "admin", "editor"]);

function inviteUrl(req: Request, token: string) {
  const origin = process.env.NODE_ENV === "production" ? COMPANY.url : new URL(req.url).origin;
  return `${origin}/paida/admin/invite/${token}`;
}

export async function GET() {
  const gate = await requireRole("owner");
  if (!gate.ok) return gate.res;
  return NextResponse.json({ ok: true, team: await listTeam() }, { headers: noStore });
}

/** Add a person and generate their one-time invite link (valid 48 hours). The link is shown once. */
export async function POST(req: Request) {
  const gate = await requireRole("owner");
  if (!gate.ok) return gate.res;

  const parsed = z
    .object({ name: z.string().trim().min(1).max(80), phone: z.string().trim().max(30).default(""), email: z.string().trim().max(120).default(""), role })
    .safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, message: "Please enter a name and choose a role." }, { status: 400 });
  const { name, phone, email } = parsed.data;

  if (!phone && !email) return NextResponse.json({ ok: false, message: "Add a phone number or an email — it is how they sign in." }, { status: 400 });
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ ok: false, message: "That email doesn't look right." }, { status: 400 });
  if (/^owner$/i.test(email) || /^owner$/i.test(phone)) return NextResponse.json({ ok: false, message: "That name is reserved." }, { status: 400 });

  for (const id of [phone, email].filter(Boolean)) {
    const n = normalizeIdentifier(id);
    if ((n.phone || n.email) && (await findByIdentifier(id))) {
      return NextResponse.json({ ok: false, message: "Someone with that phone or email already exists." }, { status: 409 });
    }
  }

  const user = await createUser({ name, phone, email, role: parsed.data.role });
  const invite = await createInvite(user.id);
  await logActivity(gate.session, `added ${user.name} as ${user.role === "owner" ? "an Owner" : user.role === "admin" ? "an Admin" : "an Editor"}`);
  return NextResponse.json({ ok: true, id: user.id, inviteUrl: inviteUrl(req, invite.token), expiresAt: invite.expiresAt });
}

/** Change a role, or reset access (clears the password, ends their sessions, issues a new invite link). */
export async function PATCH(req: Request) {
  const gate = await requireRole("owner");
  if (!gate.ok) return gate.res;
  const b = (await req.json().catch(() => ({}))) as { id?: string; role?: string; reset?: boolean };
  const user = b.id && ID.test(b.id) ? await getUser(b.id) : null;
  if (!user) return NextResponse.json({ ok: false, message: "Person not found." }, { status: 404 });

  if (user.id === gate.session.id) {
    return NextResponse.json({ ok: false, message: "You can't change or reset your own access here — ask another Owner." }, { status: 400 });
  }

  if (b.reset) {
    const invite = await resetAccess(user.id);
    if (!invite) return NextResponse.json({ ok: false, message: "Person not found." }, { status: 404 });
    await logActivity(gate.session, `reset access for ${user.name}`);
    return NextResponse.json({ ok: true, inviteUrl: inviteUrl(req, invite.token), expiresAt: invite.expiresAt });
  }

  const nextRole = role.safeParse(b.role);
  if (user.role === "owner") return NextResponse.json({ ok: false, message: "An Owner's role can't be changed. Remove them and add them again." }, { status: 400 });
  if (nextRole.success && nextRole.data === "owner") return NextResponse.json({ ok: false, message: "To make someone an Owner, invite them as an Owner." }, { status: 400 });
  if (!nextRole.success) return NextResponse.json({ ok: false, message: "Bad role." }, { status: 400 });
  await updateUser(user.id, { role: nextRole.data });
  await logActivity(gate.session, `changed ${user.name}'s role to ${nextRole.data === "admin" ? "Admin" : "Editor"}`);
  return NextResponse.json({ ok: true });
}

/** Remove someone. Their user record is deleted, so every session of theirs stops working at once. */
export async function DELETE(req: Request) {
  const gate = await requireRole("owner");
  if (!gate.ok) return gate.res;
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const user = ID.test(id) ? await getUser(id) : null;
  if (!user) return NextResponse.json({ ok: false, message: "Person not found." }, { status: 404 });
  if (user.id === gate.session.id) return NextResponse.json({ ok: false, message: "You can't remove yourself." }, { status: 400 });
  // Never remove the last personal Owner while the shared owner login is off, or nobody could manage the team.
  if (user.role === "owner" && !ownerLoginEnabled() && (await listUsers()).filter((u) => u.role === "owner" && u.passwordHash).length <= 1) {
    return NextResponse.json({ ok: false, message: "That's the last Owner. Add another Owner first." }, { status: 400 });
  }
  await deleteUser(user.id);
  await logActivity(gate.session, `removed ${user.name}`);
  return NextResponse.json({ ok: true });
}
