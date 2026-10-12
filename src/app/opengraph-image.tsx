import { ImageResponse } from "next/og";

import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card. Rendered at build time; no network fonts required. */
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
          background: "#05070a",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Accent blooms */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(129,140,248,0.55) 0%, rgba(129,140,248,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(123,208,255,0.42) 0%, rgba(123,208,255,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#7bd0ff",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9ba0b4",
            }}
          >
            Open to SDE roles
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1,
              color: "#e8e9f0",
              display: "flex",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 34,
              color: "#9ba0b4",
              display: "flex",
            }}
          >
            {profile.role} · {profile.discipline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 30,
            fontSize: 24,
            color: "#5a6075",
          }}
        >
          <div style={{ display: "flex" }}>B.Tech CSE · IIIT Kota</div>
          <div style={{ display: "flex" }}>github.com/Ayush-1812</div>
        </div>
      </div>
    ),
    size,
  );
}
