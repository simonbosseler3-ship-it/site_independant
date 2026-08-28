import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import SiteBackground from "@/app/components/SiteBackground";
import Footer from "@/app/components/Footer";
import { BackgroundProvider } from "@/app/context/BackgroundContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
});

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
    <html
      lang="fr"
      className={`h-full ${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased font-body">
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