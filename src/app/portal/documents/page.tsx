import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/auth";
import { getDocumentsForUser } from "@/lib/portal/documents";
import DocumentBrowser from "@/components/portal/DocumentBrowser";
import FadeIn from "@/components/motion/FadeIn";

export const metadata: Metadata = { title: "Documents | Tyflex Document Portal" };

export default async function PortalDocumentsPage() {
  const session = await getPortalSession();
  if (!session) redirect("/portal");

  const documents = getDocumentsForUser(session.user);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <FadeIn>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Documents</h1>
        <p className="text-gray-400 mb-8">
          {session.user.role === "admin"
            ? "All client documents across Tyflex."
            : `Documents shared with ${session.user.company}.`}
        </p>
      </FadeIn>
      <DocumentBrowser documents={documents} />
    </div>
  );
}
