import fs from "fs";
import path from "path";
import type { PortalDocument, PortalUser } from "@/lib/portal/types";

function seedFileSize(relativePath: string): number {
  try {
    return fs.statSync(path.join(process.cwd(), relativePath)).size;
  } catch {
    return 0;
  }
}

function seedDoc(doc: Omit<PortalDocument, "sizeBytes">): PortalDocument {
  return { ...doc, sizeBytes: seedFileSize(doc.storageKey) };
}

/**
 * In-memory demo document store, seeded on module load. Stands in for a
 * real documents table (DynamoDB/Supabase) — admin uploads append to this
 * array for the lifetime of the server process; see src/lib/portal/users.ts
 * for the same caveat applied to the user store.
 */
const documents: PortalDocument[] = [
  seedDoc({
    id: "doc_hlg_proposal",
    name: "Network Upgrade Proposal.pdf",
    folder: "Proposals",
    company: "Harare Logistics Group",
    uploadedAt: "2026-03-04T09:00:00.000Z",
    uploadedBy: "Tyflex Admin",
    storageKey: "content/portal-seed/network-upgrade-proposal.txt",
    contentType: "text/plain",
  }),
  seedDoc({
    id: "doc_hlg_barcode_report",
    name: "Barcode Scanner Installation Report.pdf",
    folder: "Reports",
    company: "Harare Logistics Group",
    uploadedAt: "2026-04-18T09:00:00.000Z",
    uploadedBy: "Tyflex Admin",
    storageKey: "content/portal-seed/barcode-scanner-installation-report.txt",
    contentType: "text/plain",
  }),
  seedDoc({
    id: "doc_hlg_agreement",
    name: "Service Agreement 2026.pdf",
    folder: "Contracts",
    company: "Harare Logistics Group",
    uploadedAt: "2026-01-10T09:00:00.000Z",
    uploadedBy: "Tyflex Admin",
    storageKey: "content/portal-seed/service-agreement-2026-hlg.txt",
    contentType: "text/plain",
  }),
  seedDoc({
    id: "doc_zrd_3cx_summary",
    name: "3CX Rollout Summary.pdf",
    folder: "Reports",
    company: "Zimbank Retail Division",
    uploadedAt: "2026-05-02T09:00:00.000Z",
    uploadedBy: "Tyflex Admin",
    storageKey: "content/portal-seed/3cx-rollout-summary.txt",
    contentType: "text/plain",
  }),
  seedDoc({
    id: "doc_zrd_support_agreement",
    name: "Support Agreement.pdf",
    folder: "Contracts",
    company: "Zimbank Retail Division",
    uploadedAt: "2026-01-15T09:00:00.000Z",
    uploadedBy: "Tyflex Admin",
    storageKey: "content/portal-seed/support-agreement-zrd.txt",
    contentType: "text/plain",
  }),
];

/** Admins see every document; clients see only their own company's. */
export function getDocumentsForUser(user: Pick<PortalUser, "role" | "company">): PortalDocument[] {
  const scoped = user.role === "admin" ? documents : documents.filter((d) => d.company === user.company);
  return [...scoped].sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export function getDocumentById(id: string): PortalDocument | undefined {
  return documents.find((d) => d.id === id);
}

/** Whether `user` is allowed to access `doc` (admins: always; clients: same company only). */
export function canAccessDocument(user: Pick<PortalUser, "role" | "company">, doc: PortalDocument): boolean {
  return user.role === "admin" || doc.company === user.company;
}

export function addDocument(doc: PortalDocument): void {
  documents.unshift(doc);
}

export function getFoldersForDocuments(docs: PortalDocument[]): string[] {
  return Array.from(new Set(docs.map((d) => d.folder))).sort();
}
