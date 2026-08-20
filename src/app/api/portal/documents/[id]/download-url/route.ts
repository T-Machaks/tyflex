import { NextRequest, NextResponse } from "next/server";
import { getPortalSession } from "@/lib/auth";
import { canAccessDocument, getDocumentById } from "@/lib/portal/documents";
import { getDownloadUrl } from "@/lib/portal/storage";

interface RouteParams {
  params: { id: string };
}

/** Mints a time-limited download URL for a document the session is authorized to see. */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const doc = getDocumentById(params.id);
  if (!doc || !canAccessDocument(session.user, doc)) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  try {
    const url = await getDownloadUrl(doc);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Failed to generate document download URL:", err);
    return NextResponse.json({ error: "Couldn't prepare this download. Please try again." }, { status: 502 });
  }
}
