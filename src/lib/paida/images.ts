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

/**
 * Fits a photo to a page-friendly size: at most `maxWidth` wide and roughly `maxBytes`, lowering
 * quality first and then width until it fits. The untouched original is kept separately.
 */
export async function toWebpTarget(input: Buffer, maxWidth = 1600, maxBytes = 300 * 1024): Promise<Processed> {
  let width = maxWidth;
  let quality = 82;
  for (;;) {
    const out = await toWebp(input, width, quality);
    if (out.buffer.length <= maxBytes || (quality <= 50 && width <= 900)) return out;
    if (quality > 50) quality -= 8;
    else width = Math.round(width * 0.85);
  }
}
