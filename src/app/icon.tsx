import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon, replacing the Create Next App default. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070a",
          color: "#e8e9f0",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -2,
          borderRadius: 14,
        }}
      >
        AJ
      </div>
    ),
    size,
  );
}
