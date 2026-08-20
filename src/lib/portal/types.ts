export type PortalRole = "admin" | "client";

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: PortalRole;
  /** The client company this user belongs to. Admins see every company's documents. */
  company: string | null;
}

export interface PortalDocument {
  id: string;
  name: string;
  folder: string;
  /** Company this document is scoped to — admins see all, clients see only their own. */
  company: string;
  sizeBytes: number;
  uploadedAt: string;
  uploadedBy: string;
  /** Storage backend key/path — meaning depends on which storage backend is active. */
  storageKey: string;
  /** MIME-ish content type, best effort — used for the icon/label in the UI. */
  contentType: string;
}
