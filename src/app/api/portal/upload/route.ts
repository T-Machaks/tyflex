import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getPortalSession } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/portal/storage";
import { addDocument } from "@/lib/portal/documents";

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB

export async function POST(request: NextRequest) {
  const session = await getPortalSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  const file = formData.get("file");
  const folder = formData.get("folder");
  const company = formData.get("company");
  const displayName = formData.get("name");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose a file to upload." }, { status: 400 });
  }
  if (typeof folder !== "string" || !folder.trim()) {
    return NextResponse.json({ error: "Please choose or enter a folder." }, { status: 400 });
  }
  if (typeof company !== "string" || !company.trim()) {
    return NextResponse.json({ error: "Please choose a client company." }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File is too large (20MB max)." }, { status: 400 });
  }

  let storageResult: { storageKey: string; sizeBytes: number };
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    storageResult = await saveUploadedFile(buffer, file.name, file.type || "application/octet-stream");
  } catch (err) {
    console.error("Failed to save uploaded portal document:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }

  const document = {
    id: `doc_${crypto.randomUUID()}`,
    name: typeof displayName === "string" && displayName.trim() ? displayName.trim() : file.name,
    folder: folder.trim(),
    company: company.trim(),
    sizeBytes: storageResult.sizeBytes,
    uploadedAt: new Date().toISOString(),
    uploadedBy: session.user.name || session.user.email || "Admin",
    storageKey: storageResult.storageKey,
    contentType: file.type || "application/octet-stream",
  };

  addDocument(document);

  return NextResponse.json({ ok: true, document });
}
