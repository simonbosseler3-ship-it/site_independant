"use client";

import { useState } from "react";
import { useBackground } from "@/app/context/BackgroundContext";

/**
 * Fonds photo plein écran qui changent selon la section / la page.
 *
 * Performance : les photos d'origine (public/images/*.jpg, jusqu'à 1,3 Mo) ont été
 * déclinées en WebP 828 / 1440 / 2048 px dans public/images/bg/ (~30 à 110 Ko).
 * Une image n'est montée dans le DOM qu'au moment où elle devient active, puis reste
 * en cache : le visiteur ne télécharge que les fonds qu'il voit réellement.
 * Le fondu ne démarre qu'une fois l'image chargée (pas de flash de fond vide).
 */

const backgrounds: Record<string, string> = {
  // Sections / pages
  hero: "workspace",
  services: "workspace2",
  process: "workspace3",
  cta: "workspace4",
  profile: "profil",
  devis: "devis",
  contact: "contact",
  // Pages services
  vitrine: "vitrine",
  refonte: "refonte",
  maintenance: "maintenance",
  landing_page: "landing_page",
  e_commerce: "e_commerce",
};

const WIDTHS = [828, 1440, 2048];

function srcSetFor(name: string) {
  return WIDTHS.map((w) => `/images/bg/${name}-${w}.webp ${w}w`).join(", ");
}

export default function SiteBackground() {
  const { activeBg, ready } = useBackground();
  const [mounted, setMounted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const [lastShown, setLastShown] = useState<string | null>(null);

  // Côté client uniquement (le fond réel de la page n'est connu qu'après l'enregistrement
  // des BackgroundTrigger) : on monte l'image active si elle ne l'est pas encore.
  const isValid = ready && !!backgrounds[activeBg];
  if (isValid && !mounted.includes(activeBg)) {
    setMounted([...mounted, activeBg]);
  }

  // L'image active n'est affichée qu'une fois chargée ; en attendant, la précédente reste visible.
  const shown = isValid && loaded.has(activeBg) ? activeBg : lastShown;
  if (shown !== lastShown) {
    setLastShown(shown);
  }

  const handleLoad = (key: string) => {
    setLoaded((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-ink transform-gpu"
      aria-hidden="true"
    >
      {mounted.map((key) => (
        // eslint-disable-next-line @next/next/no-img-element -- srcset WebP pré-optimisé (images.unoptimized)
        <img
          key={key}
          src={`/images/bg/${backgrounds[key]}-1440.webp`}
          srcSet={srcSetFor(backgrounds[key])}
          sizes="100vw"
          alt=""
          decoding="async"
          fetchPriority={key === "hero" ? "high" : "auto"}
          ref={(el) => {
            // Image déjà complète (cache navigateur) avant l'hydratation de onLoad
            if (el?.complete && el.naturalWidth > 0) handleLoad(key);
          }}
          onLoad={() => handleLoad(key)}
          className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity]"
          style={{
            opacity: shown === key ? "var(--photo-opacity)" : 0,
            transform: shown === key ? "scale(1)" : "scale(1.06)",
          }}
        />
      ))}

      {/* Voile teinté (couleur et densité pilotées par le thème) : lisibilité garantie quelle que soit la photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--overlay-rgb) / var(--overlay-a)) 0%, rgb(var(--overlay-rgb) / var(--overlay-b)) 45%, rgb(var(--overlay-rgb) / var(--overlay-c)) 100%)",
        }}
      />

      {/* Halos de couleur (dégradés radiaux, pas de filtre blur : léger pour le GPU mobile) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgb(var(--glow-1) / var(--glow-strength)) 0%, transparent 70%), radial-gradient(50% 45% at 95% 30%, rgb(var(--glow-2) / var(--glow-strength)) 0%, transparent 70%)",
        }}
      />

      {/* Motif « lignes de vitesse » du logo */}
      <svg
        className="absolute -bottom-24 -right-24 w-[620px] h-[620px] text-paper/[0.035]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M92 8 L30 92 M92 26 L48 92 M92 44 L66 92"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Grain photographique */}
      <div className="absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
