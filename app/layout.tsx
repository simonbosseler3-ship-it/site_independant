import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import SiteBackground from "@/app/components/SiteBackground";
import Footer from "@/app/components/Footer";
import { BackgroundProvider } from "@/app/context/BackgroundContext";

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
        <BackgroundProvider>
          <SiteBackground />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer /> 
        </BackgroundProvider>
      </body>
    </html>
  );
}