import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import SiteBackground from "@/app/components/SiteBackground";
import Footer from "@/app/components/Footer";
import MotionProvider from "@/app/components/MotionProvider";
import SmoothScroll from "@/app/components/SmoothScroll";
import { BackgroundProvider } from "@/app/context/BackgroundContext";

// Titres : grotesque à fort caractère (variable, un seul fichier)
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
});

// Accents : italique serif, utilisée avec parcimonie dans les titres
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Simon Bosseler | Développement & Modernisation Web",
  description: "Création de sites web sur-mesure, modernisation et solutions web performantes.",
};

export const viewport: Viewport = {
  themeColor: "#0d0b14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${instrument.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="text-fg min-h-screen flex flex-col antialiased font-body">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-ink focus:font-semibold"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <SmoothScroll />
          <BackgroundProvider>
            <SiteBackground />
            <Navbar />
            <div id="contenu" className="flex-1">
              {children}
            </div>
            <Footer />
          </BackgroundProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
