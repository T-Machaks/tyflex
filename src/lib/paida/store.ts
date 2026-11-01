import fs from "fs/promises";
import path from "path";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

/**
 * Byte store for the Paida page (content JSON, tributes, photos). Uses the
 * site's existing S3 bucket under the `paida/` prefix; without S3 configured
 * it falls back to a gitignored local `.paida-data/` directory in dev. Reads
 * soft-fail to "not found" in production without S3 (the page then serves the
 * bundled seed content); writes throw.
 */
const REGION = process.env.AWS_REGION;
const BUCKET = process.env.S3_BUCKET_NAME;
const PREFIX = "paida/";
const LOCAL_DIR = path.join(process.cwd(), ".paida-data");

const s3 = REGION && BUCKET ? new S3Client({ region: REGION }) : null;

export const canWrite = Boolean(s3) || process.env.NODE_ENV !== "production";

function localPath(key: string): string {
  const full = path.resolve(LOCAL_DIR, key);
  if (full !== LOCAL_DIR && !full.startsWith(LOCAL_DIR + path.sep)) throw new Error("Invalid key");
  return full;
}

function isMissing(err: unknown): boolean {
  const e = err as { name?: string; code?: string; $metadata?: { httpStatusCode?: number } };
  return e?.name === "NoSuchKey" || e?.code === "ENOENT" || e?.$metadata?.httpStatusCode === 404;
}

export async function getObject(key: string): Promise<Buffer | null> {
  try {
    if (s3) {
      const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: PREFIX + key }));
      return Buffer.from(await res.Body!.transformToByteArray());
    }
    if (process.env.NODE_ENV === "production") return null;
    return await fs.readFile(localPath(key));
  } catch (err) {
    if (isMissing(err)) return null;
    throw err;
  }
}

export async function putObject(key: string, body: Buffer | string, contentType: string): Promise<void> {
  if (s3) {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: PREFIX + key, Body: body, ContentType: contentType }));
    return;
  }
  if (!canWrite) throw new Error("S3 is not configured — set AWS_REGION and S3_BUCKET_NAME.");
  const file = localPath(key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body);
}

export async function deleteObject(key: string): Promise<void> {
  if (s3) {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: PREFIX + key }));
    return;
  }
  if (!canWrite) throw new Error("S3 is not configured — set AWS_REGION and S3_BUCKET_NAME.");
  await fs.rm(localPath(key), { force: true });
}

/** Keys (relative to the paida/ prefix) under a prefix. Needs s3:ListBucket in production. */
export async function listKeys(prefix: string): Promise<string[]> {
  if (s3) {
    const keys: string[] = [];
    let token: string | undefined;
    do {
      const res = await s3.send(
        new ListObjectsV2Command({ Bucket: BUCKET, Prefix: PREFIX + prefix, ContinuationToken: token })
      );
      for (const o of res.Contents ?? []) if (o.Key) keys.push(o.Key.slice(PREFIX.length));
      token = res.NextContinuationToken;
    } while (token);
    return keys;
  }
  if (process.env.NODE_ENV === "production") return [];
  try {
    const names = await fs.readdir(localPath(prefix.replace(/\/$/, "")));
    return names.map((n) => prefix + n);
  } catch {
    return [];
  }
}
