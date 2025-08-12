import type { Metadata, Viewport } from "next";
import { InvitationProvider } from "@/contexts/InvitationContext";
import { MusicProvider } from "@/contexts/MusicContext";
import MusicControlButton from "@/components/shared/MusicControlButton";
import { Great_Vibes, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-great-vibes",
});

const montserrat = Montserrat({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Johanna & Enrique - Nuestra Boda",
  description: "Te invitamos a celebrar nuestro amor el 25 de Octubre de 2025",
  keywords: "boda, wedding, Johanna, Enrique, octubre 2025, invitación",
  authors: [{ name: "Johanna & Enrique" }],
  metadataBase: new URL("https://johanna-enrique-2025.com"),
  openGraph: {
    title: "Johanna & Enrique - Save the Date",
    description: "25 de Octubre 2025 - Celebra con nosotros",
    type: "website",
    locale: "es_CO",
    url: "https://johanna-enrique-2025.com",
    siteName: "Johanna & Enrique Wedding",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Johanna & Enrique - Nuestra Boda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Johanna & Enrique - 25.10.2025",
    description: "Save the Date - Nuestra Boda",
    images: ["/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#7c9070",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${montserrat.variable} ${playfairDisplay.variable}`}
    >
      <body className="bg-[#7c9070] antialiased">
        <MusicProvider>
          <InvitationProvider>
            <main className="min-h-screen">{children}</main>
            <MusicControlButton />
          </InvitationProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
