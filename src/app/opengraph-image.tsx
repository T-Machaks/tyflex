import { ImageResponse } from "next/og";

// No runtime override — this image is identical on every render, so it's
// left on the default Node.js runtime to be statically generated once at
// build time rather than re-rendered per-request on the edge.
export const alt = "Tyflex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share image for every page that doesn't define its own —
// Next.js falls back to this for both og:image and (absent a twitter-image)
// twitter:image, so this is the one branded image the whole site shares.
// Built entirely from vector/text primitives (no embedded raster) so it
// renders reliably during static generation.
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
            width: 176,
            height: 176,
            borderRadius: 40,
            background: "linear-gradient(135deg, #DC2626, #7f1d1d)",
            marginBottom: 44,
            boxShadow: "0 20px 60px rgba(220,38,38,0.35)",
          }}
        >
          <div style={{ display: "flex", color: "white", fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>
            Ti
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -3 }}>
          <span style={{ color: "white" }}>Tyflex</span>
          <span style={{ color: "#DC2626" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a3a3a3", marginTop: 18 }}>
          Enterprise Technology Solutions in Zimbabwe
        </div>
      </div>
    ),
    { ...size }
  );
}
