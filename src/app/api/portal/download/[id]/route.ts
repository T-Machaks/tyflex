import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/portal/tokens";
import { getDocumentById } from "@/lib/portal/documents";
import { readLocalFile } from "@/lib/portal/storage";

interface RouteParams {
  params: { id: string };
}

/**
 * Local-storage fallback for document downloads — mirrors an S3 presigned
 * URL: a signed, expiring, capability-style link with no additional login
 * check (the token itself, created only for documents the requesting
 * session was already authorized to see, is the authorization).
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing download token." }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload || payload.docId !== params.id) {
    return NextResponse.json({ error: "This download link is invalid or has expired." }, { status: 401 });
  }

  const doc = getDocumentById(params.id);
  if (!doc) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  let fileBuffer: Buffer;
  try {
    fileBuffer = readLocalFile(doc.storageKey);
  } catch (err) {
    console.error("Failed to read local portal file:", err);
    return NextResponse.json({ error: "This file is unavailable right now." }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(fileBuffer), {
    headers: {
      "Content-Type": doc.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${doc.name}"`,
      "Cache-Control": "private, max-age=0, no-store",
    },
  });
}
