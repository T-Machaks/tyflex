import fs from "fs";
import path from "path";
import crypto from "crypto";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createToken } from "@/lib/portal/tokens";
import type { PortalDocument } from "@/lib/portal/types";

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.S3_BUCKET_NAME;

export const isS3Configured = Boolean(REGION && BUCKET);

const s3Client = isS3Configured ? new S3Client({ region: REGION }) : null;

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), ".portal-uploads");

/** Seed/fixture documents shipped with the repo — always served locally, never uploaded to S3. */
const SEED_STORAGE_PREFIX = "content/portal-seed/";

/** Matches the "presigned URLs expire after 1 hour" requirement, on both storage backends. */
const DOWNLOAD_URL_TTL_SECONDS = 60 * 60;

/**
 * Saves an admin-uploaded file. In production this requires S3
 * (AWS_REGION + S3_BUCKET_NAME); locally, without those set, files are
 * written to a gitignored .portal-uploads/ directory so the upload →
 * download flow is genuinely testable without live AWS credentials.
 */
export async function saveUploadedFile(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ storageKey: string; sizeBytes: number }> {
  const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const uniqueName = `${crypto.randomUUID()}-${safeName}`;

  if (s3Client && BUCKET) {
    const storageKey = `portal/${uniqueName}`;
    await s3Client.send(
      new PutObjectCommand({ Bucket: BUCKET, Key: storageKey, Body: buffer, ContentType: contentType })
    );
    return { storageKey, sizeBytes: buffer.byteLength };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("S3 is not configured — set AWS_REGION and S3_BUCKET_NAME to enable uploads.");
  }

  fs.mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
  const storageKey = `.portal-uploads/${uniqueName}`;
  fs.writeFileSync(path.join(process.cwd(), storageKey), buffer);
  return { storageKey, sizeBytes: buffer.byteLength };
}

/**
 * Returns a time-limited download URL for a document — a real S3 presigned
 * URL when S3 is configured, or a signed link to our own download route
 * otherwise. Seed/fixture documents are always served locally since they're
 * bundled with the app, not real uploaded objects.
 */
export async function getDownloadUrl(doc: PortalDocument): Promise<string> {
  const isSeedDocument = doc.storageKey.startsWith(SEED_STORAGE_PREFIX);

  if (s3Client && BUCKET && !isSeedDocument) {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: doc.storageKey,
      ResponseContentDisposition: `attachment; filename="${doc.name}"`,
    });
    return getSignedUrl(s3Client, command, { expiresIn: DOWNLOAD_URL_TTL_SECONDS });
  }

  const token = createToken({ docId: doc.id }, DOWNLOAD_URL_TTL_SECONDS);
  return `/api/portal/download/${doc.id}?token=${encodeURIComponent(token)}`;
}

/** Reads a locally-stored file (seed fixtures or the local-disk upload fallback) by its storageKey. */
export function readLocalFile(storageKey: string): Buffer {
  // storageKey values only ever come from our own seed data or saveUploadedFile
  // above — never from user input — so this join is safe from traversal.
  return fs.readFileSync(path.join(process.cwd(), storageKey));
}
