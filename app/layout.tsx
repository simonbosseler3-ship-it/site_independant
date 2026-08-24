import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import SiteBackground from "@/app/components/SiteBackground";

export const metadata: Metadata = {
  title: "Simon Bosseler | Développement & Modernisation Web",
  description: "Création de sites web sur-mesure, modernisation et solutions web performantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <SiteBackground />
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}