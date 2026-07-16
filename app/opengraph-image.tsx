import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "pickleball.ai — Every match has a story";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#fff" }}>
          pickleball<span style={{ color: "#bdff2f" }}>.ai</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
            Every match
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 96, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
            <span>has a</span>
            <span style={{ color: "#bdff2f" }}>story.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
          Log pickleball matches with your crew. Now in private beta on iOS.
        </div>
      </div>
    ),
    { ...size }
  );
}
