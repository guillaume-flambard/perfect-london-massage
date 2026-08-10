import { ImageResponse } from "next/og";
import { findTherapist } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Perfect London Massage";

export default async function TherapistOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = findTherapist(slug);

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
          {t ? t.name : "Massage Therapist"}
        </div>
        <div style={{ fontSize: 28, color: "#C2D6CD", textAlign: "center", maxWidth: 800 }}>
          {t ? `Qualified mobile massage therapist · ${t.services.slice(0, 3).join(" · ")}` : "Qualified therapist in London"}
        </div>
      </div>
    ),
    size
  );
}
