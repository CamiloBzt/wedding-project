import type { Metadata, Viewport } from "next";
import { InvitationProvider } from "@/contexts/InvitationContext";
import { MusicProvider } from "@/contexts/MusicContext";
import MusicControlButton from "@/components/shared/MusicControlButton";
import "./globals.css";

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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;600;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
