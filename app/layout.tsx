import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavero — Equestrian Connect",
  description: "Le suivi premium de votre cheval, au quotidien.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`dark ${GeistSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
