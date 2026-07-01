import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
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
