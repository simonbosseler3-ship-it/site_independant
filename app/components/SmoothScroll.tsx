"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Accès à l'instance Lenis (ex. pour bloquer le scroll quand le menu mobile est ouvert). */
export function getLenis() {
  return lenisInstance;
}

/**
 * Défilement fluide sur desktop uniquement.
 * Désactivé sur écrans tactiles (le scroll natif y est déjà inertiel)
 * et quand l'utilisateur a demandé à réduire les animations.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 },
    });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // À chaque changement de page (pas au premier chargement) : retour immédiat en haut
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    lenisInstance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
