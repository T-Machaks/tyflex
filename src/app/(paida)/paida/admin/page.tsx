import type { Metadata } from "next";
import { getSession, ownerLoginEnabled } from "@/lib/paida/auth";
import { loadContent } from "@/lib/paida/content";
import { canWrite } from "@/lib/paida/store";
import AdminApp from "@/components/paida/AdminApp";
import AdminLogin from "@/components/paida/AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Paida page — admin", robots: { index: false, follow: false } };

export default async function PaidaAdminPage() {
  const session = await getSession();
  if (!session) return <AdminLogin ownerLoginEnabled={ownerLoginEnabled()} />;
  return <AdminApp initial={await loadContent()} storageReady={canWrite} me={{ id: session.id, name: session.name, role: session.role, shared: session.id === "owner" }} />;
}
