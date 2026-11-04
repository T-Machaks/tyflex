// Minimal streaming ZIP writer (store-only, data descriptors) — no dependency, constant memory:
// one file is held in memory at a time, so a large archive can be streamed from a small server.

const TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export interface ZipEntry {
  name: string;
  /** Loaded lazily, one entry at a time. Return null to skip. */
  data: () => Promise<Uint8Array | null>;
}

const enc = new TextEncoder();
const safeName = (n: string) => n.replace(/[^A-Za-z0-9._\-\/]/g, "_").replace(/^\/+/, "");

function dosDateTime(d: Date) {
  return {
    time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
    date: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
  };
}

export function zipStream(entries: ZipEntry[]): ReadableStream<Uint8Array> {
  const { time, date } = dosDateTime(new Date());
  const central: Uint8Array[] = [];
  let offset = 0;
  let i = 0;

  const push = (c: ReadableStreamDefaultController<Uint8Array>, chunk: Uint8Array) => {
    c.enqueue(chunk);
    offset += chunk.length;
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      while (i < entries.length) {
        const e = entries[i++];
        const data = await e.data();
        if (!data) continue;
        const name = enc.encode(safeName(e.name));
        const crc = crc32(data);
        const start = offset;

        const lh = new DataView(new ArrayBuffer(30));
        lh.setUint32(0, 0x04034b50, true);
        lh.setUint16(4, 20, true);
        lh.setUint16(6, 0x0808, true); // sizes follow in a data descriptor; UTF-8 names
        lh.setUint16(10, time, true);
        lh.setUint16(12, date, true);
        lh.setUint16(26, name.length, true);
        push(controller, new Uint8Array(lh.buffer));
        push(controller, name);
        push(controller, data);

        const dd = new DataView(new ArrayBuffer(16));
        dd.setUint32(0, 0x08074b50, true);
        dd.setUint32(4, crc, true);
        dd.setUint32(8, data.length, true);
        dd.setUint32(12, data.length, true);
        push(controller, new Uint8Array(dd.buffer));

        const ch = new DataView(new ArrayBuffer(46));
        ch.setUint32(0, 0x02014b50, true);
        ch.setUint16(4, 20, true);
        ch.setUint16(6, 20, true);
        ch.setUint16(8, 0x0808, true);
        ch.setUint16(12, time, true);
        ch.setUint16(14, date, true);
        ch.setUint32(16, crc, true);
        ch.setUint32(20, data.length, true);
        ch.setUint32(24, data.length, true);
        ch.setUint16(28, name.length, true);
        ch.setUint32(42, start, true);
        central.push(new Uint8Array(ch.buffer), name);
        return; // one entry per pull keeps memory flat
      }

      const cdStart = offset;
      for (const part of central) push(controller, part);
      const end = new DataView(new ArrayBuffer(22));
      end.setUint32(0, 0x06054b50, true);
      end.setUint16(8, central.length / 2, true);
      end.setUint16(10, central.length / 2, true);
      end.setUint32(12, offset - cdStart, true);
      end.setUint32(16, cdStart, true);
      controller.enqueue(new Uint8Array(end.buffer));
      controller.close();
    },
  });
}
