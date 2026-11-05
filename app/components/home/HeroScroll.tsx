"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Effet de profondeur au scroll sur le hero : le contenu remonte plus lentement
 * que la page et s'estompe légèrement. Désactivé en mouvement réduit.
 */
export default function HeroScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Même structure de style côté serveur et client (pas d'erreur d'hydratation) :
  // en mouvement réduit, les plages deviennent simplement neutres.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y, opacity }} className="h-full">
        {children}
      </m.div>
    </div>
  );
}
