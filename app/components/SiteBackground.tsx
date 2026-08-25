"use client";

import Image from "next/image";
import { useBackground } from "@/app/context/BackgroundContext";

const backgrounds: Record<string, string> = {
  hero: "/images/workspace.jpg",
  services: "/images/workspace2.jpg",
  process: "/images/workspace3.jpg",
  cta: "/images/workspace4.jpg",
};

export default function SiteBackground() {
  const { activeBg } = useBackground();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Une couche par image, superposées, fondu géré par transition d'opacité */}
      {Object.entries(backgrounds).map(([key, src]) => (
        <Image
          key={key}
          src={src}
          alt=""
          fill
          quality={90}
          className="object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: activeBg === key ? 0.80 : 0 }}
          priority={key === "hero"}
        />
      ))}

      {/* Voile clair dégradé, dans les teintes du site — garantit la lisibilité partout */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(237,233,254,0.70) 0%, rgba(245,243,255,0.60) 22%, rgba(238,242,255,0.40) 45%, rgba(250,245,255,0.20) 68%, rgba(248,250,252,0.10) 100%)",
        }}
      />

      {/* Texture de points, identité "code" */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76,70,224,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Halos de couleur */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-violet-400/35 via-purple-300/20 to-transparent blur-[100px]" />
      <div className="absolute top-10 right-[-200px] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-indigo-400/30 via-blue-300/15 to-transparent blur-[100px]" />
      <div className="absolute bottom-[-250px] left-1/3 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fuchsia-300/25 via-violet-200/15 to-transparent blur-[100px]" />

      {/* Motif "lignes de vitesse" du logo */}
      <svg className="absolute -bottom-16 -right-16 w-[560px] h-[560px] text-indigo-900/[0.06]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M92 8 L30 92 M92 26 L48 92 M92 44 L66 92" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* Accent "chevrons de code" */}
      <svg className="absolute top-20 -right-6 w-72 h-72 text-indigo-900/[0.05]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 20 L10 50 L35 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 20 L90 50 L65 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <svg className="absolute bottom-24 -left-10 w-56 h-56 text-violet-900/[0.045] rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 20 L10 50 L35 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 20 L90 50 L65 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}