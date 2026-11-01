import sharp from "sharp";

export interface Processed {
  buffer: Buffer;
  width: number;
  height: number;
}

/** Auto-rotates, downsizes and re-encodes as WebP — strips EXIF/GPS and keeps files small for mobile data. */
export async function toWebp(input: Buffer, maxWidth: number, quality: number): Promise<Processed> {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer({ resolveWithObject: true });
  return { buffer: data, width: info.width, height: info.height };
}

/** 1200×630 JPEG for link previews (WhatsApp/Facebook prefer JPEG under ~300 KB). */
export async function toOgJpeg(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
}
