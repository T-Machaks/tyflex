import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

// No runtime override — this image is identical on every render, so it's
// left on the default Node.js runtime to be statically generated once at
// build time rather than re-rendered per-request on the edge.
export const alt = "Tyflex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The Tyflex "Ti" logomark (same asset as the favicon), inlined so
// ImageResponse can draw it without a network fetch during static generation.
const logoSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "favicon.png")
).toString("base64")}`;

// Default social-share image for every page that doesn't define its own —
// Next.js falls back to this for both og:image and (absent a twitter-image)
// twitter:image, so this is the one branded image the whole site shares.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(220,38,38,0.35), transparent 55%), radial-gradient(circle at 80% 75%, rgba(220,38,38,0.18), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            height: 200,
            borderRadius: 44,
            backgroundColor: "#ffffff",
            marginBottom: 44,
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={150} height={150} />
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -3 }}>
          <span style={{ color: "white" }}>Tyflex</span>
          <span style={{ color: "#DC2626" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 16,
            maxWidth: 860,
            textAlign: "center",
          }}
        >
          Technology that drives efficiency and growth
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            padding: "18px 40px",
            borderRadius: 999,
            backgroundColor: "#DC2626",
            color: "white",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Get a Free Quote  →
        </div>
      </div>
    ),
    { ...size }
  );
}
