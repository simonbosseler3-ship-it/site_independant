"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBackground } from "@/app/context/BackgroundContext";

const sectionBackgrounds: Record<string, string> = {
  hero: "/images/workspace.jpg",
  services: "/images/workspace2.jpg",
  process: "/images/workspace3.jpg",
  cta: "/images/workspace4.jpg",
  profile: "/images/profil.jpg",
  devis: "/images/devis.jpg",
  contact: "/images/contact.jpg",
};

const serviceBackgrounds: Record<string, string> = {
  vitrine: "/images/vitrine.jpg",
  refonte: "/images/refonte.jpg",
  maintenance: "/images/maintenance.jpg",
  landing_page: "/images/landing_page.jpg",
  e_commerce: "/images/e_commerce.jpg",
};

const backgrounds: Record<string, string> = { ...sectionBackgrounds, ...serviceBackgrounds };

type Layer = { src: string; key: number; visible: boolean };

export default function SiteBackground() {
  const { activeBg } = useBackground();
  const currentSrc = backgrounds[activeBg] ?? backgrounds.hero;
  const keyCounter = useRef(1);
  const preloadedRef = useRef(false);

  const [layers, setLayers] = useState<Layer[]>([
    { src: currentSrc, key: 0, visible: true },
  ]);

  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    const timer = setTimeout(() => {
      Object.values(backgrounds).forEach((src) => {
        const img = new window.Image();
        img.fetchPriority = "low";
        img.src = src;
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLayers((prev) => {
      if (prev[prev.length - 1]?.src === currentSrc) return prev;
      return [...prev, { src: currentSrc, key: keyCounter.current++, visible: false }];
    });
  }, [currentSrc]);

  useEffect(() => {
    const last = layers[layers.length - 1];
    if (last && !last.visible) {
      const t = setTimeout(() => {
        setLayers((prev) =>
          prev.map((l) => (l.key === last.key ? { ...l, visible: true } : l))
        );
      }, 30);
      return () => clearTimeout(t);
    }
  }, [layers]);

  useEffect(() => {
    if (layers.length > 1) {
      const t = setTimeout(() => {
        setLayers((prev) => prev.slice(-1));
      }, 1300);
      return () => clearTimeout(t);
    }
  }, [layers]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {layers.map((layer) => (
        <Image
          key={layer.key}
          src={layer.src}
          alt=""
          fill
          quality={70}
          sizes="100vw"
          className="absolute inset-0 object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: layer.visible ? 0.8 : 0 }}
          priority={layer.key === 0}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(237,233,254,0.60) 0%, rgba(245,243,255,0.50) 22%, rgba(238,242,255,0.40) 45%, rgba(250,245,255,0.20) 68%, rgba(248,250,252,0.10) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76,70,224,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-violet-400/35 via-purple-300/20 to-transparent blur-[100px]" />
      <div className="hidden sm:block absolute top-10 right-[-200px] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-indigo-400/30 via-blue-300/15 to-transparent blur-[100px]" />
      <div className="hidden sm:block absolute bottom-[-250px] left-1/3 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fuchsia-300/25 via-violet-200/15 to-transparent blur-[100px]" />

      <svg className="absolute -bottom-16 -right-16 w-[560px] h-[560px] text-indigo-900/[0.06]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M92 8 L30 92 M92 26 L48 92 M92 44 L66 92" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <svg className="hidden sm:block absolute top-20 -right-6 w-72 h-72 text-indigo-900/[0.05]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 20 L10 50 L35 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 20 L90 50 L65 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="hidden sm:block absolute bottom-24 -left-10 w-56 h-56 text-violet-900/[0.045] rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 20 L10 50 L35 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 20 L90 50 L65 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}