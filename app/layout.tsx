import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://perfectlondonmassage.co.uk"),
  title: {
    default: "Perfect London Massage — Mobile Massage London",
    template: "%s — Perfect London Massage",
  },
  description:
    "Professional mobile massage in London. Qualified therapists deliver deep tissue, Thai, sports, Swedish and more to your home, hotel or office. Book now.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Perfect London Massage — Mobile Massage London",
    description: "Professional mobile massage delivered to your home, hotel or office across London. From £65/hr.",
    type: "website",
    siteName: "Perfect London Massage",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
