import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, FileText, FolderOpen } from "lucide-react";
import { getPortalSession } from "@/lib/auth";
import { getDocumentsForUser, getFoldersForDocuments } from "@/lib/portal/documents";
import { listCompanies } from "@/lib/portal/users";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/motion/FadeIn";
import AdminUploadPanel from "@/components/portal/AdminUploadPanel";
import DocumentRow from "@/components/portal/DocumentRow";

export const metadata: Metadata = { title: "Dashboard | Tyflex Document Portal" };

export default async function PortalDashboardPage() {
  const session = await getPortalSession();
  if (!session) redirect("/portal");

  const { user } = session;
  const documents = getDocumentsForUser(user);
  const folders = getFoldersForDocuments(documents);
  const recent = documents.slice(0, 5);
  const isAdmin = user.role === "admin";

  const stats = [
    { label: "Documents", value: documents.length, icon: FileText },
    { label: "Folders", value: folders.length, icon: FolderOpen },
    ...(isAdmin ? [{ label: "Client Companies", value: listCompanies().length, icon: Building2 }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, {user.name?.split(" ")[0]}</h1>
        <p className="text-gray-400 mb-8">
          {isAdmin ? "You have full access to every client's documents." : `Documents for ${user.company}.`}
        </p>
      </FadeIn>

      <div className={`grid grid-cols-1 ${isAdmin ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-6 mb-10`}>
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={0.05 * i}>
            <GlassCard interactive={false} className="p-6 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      {isAdmin && (
        <FadeIn>
          <div className="mb-10">
            <AdminUploadPanel companies={listCompanies()} folders={folders} />
          </div>
        </FadeIn>
      )}

      <FadeIn>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Documents</h2>
          <Link href="/portal/documents" className="text-sm text-brand-red hover:underline">
            View all
          </Link>
        </div>
        <GlassCard interactive={false} className="divide-y divide-white/5">
          {recent.length === 0 ? (
            <p className="text-sm text-gray-500 p-6 text-center">No documents yet.</p>
          ) : (
            recent.map((doc) => <DocumentRow key={doc.id} document={doc} />)
          )}
        </GlassCard>
      </FadeIn>
    </div>
  );
}
