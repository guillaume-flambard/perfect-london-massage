import { ImageResponse } from "next/og";
import { findTreatment } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Perfect London Massage";

export default async function TreatmentOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = findTreatment(slug);

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
          padding: 80,
          background: "#1C3F34",
          color: "#FDFBF7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#C5A059", marginBottom: 24 }}>
          Perfect London Massage
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1, textAlign: "center", marginBottom: 16 }}>
          {t ? `${t.name} Massage` : "Mobile Massage"}
        </div>
        <div style={{ fontSize: 28, color: "#C2D6CD", textAlign: "center", maxWidth: 800 }}>
          {t ? `${t.duration} · ${t.price}` : "London · Home, hotel & office"}
        </div>
      </div>
    ),
    size
  );
}
