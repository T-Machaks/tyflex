import type { Metadata } from "next";
import InviteAccept from "@/components/paida/InviteAccept";
import { ROLE_LABEL } from "@/lib/paida/roles";
import { lookupInvite } from "@/lib/paida/users";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Join the Paida page team", robots: { index: false, follow: false } };

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const found = await lookupInvite(token);

  return (
    <div className="admin">
      <div className="card" style={{ maxWidth: 440, margin: "3rem auto" }}>
        {found ? (
          <>
            <h1 style={{ fontSize: "1.6rem" }}>Welcome, {found.user.name}</h1>
            <p className="muted" style={{ margin: "0.4rem 0 0" }}>
              You&apos;ve been invited to help look after Paida&apos;s page as {found.user.role === "admin" ? "an" : "an"} <strong>{ROLE_LABEL[found.user.role]}</strong>. Choose
              your own password to get started. You&apos;ll sign in with your {found.user.email ? "email" : "phone number"}.
            </p>
            <InviteAccept token={token} />
          </>
        ) : (
          <>
            <h1 style={{ fontSize: "1.6rem" }}>This link can&apos;t be used</h1>
            <p className="muted">It may have expired (links last 48 hours) or already been used. Please ask the owner to send you a new one.</p>
          </>
        )}
      </div>
    </div>
  );
}
