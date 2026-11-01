import type { Metadata } from "next";
import { adminConfigured, getSession } from "@/lib/paida/auth";
import { loadContent } from "@/lib/paida/content";
import { canWrite } from "@/lib/paida/store";
import AdminApp from "@/components/paida/AdminApp";
import AdminLogin from "@/components/paida/AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Paida page — admin", robots: { index: false, follow: false } };

export default async function PaidaAdminPage() {
  const session = await getSession();
  if (!session) return <AdminLogin configured={adminConfigured()} />;
  return <AdminApp initial={await loadContent()} storageReady={canWrite} me={{ name: session.name, role: session.role }} />;
}
