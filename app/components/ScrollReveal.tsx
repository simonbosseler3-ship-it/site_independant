"use client";

import { m } from "framer-motion";

/**
 * Révélation douce à l'entrée dans le viewport (une seule fois).
 * API inchangée par rapport à l'ancienne version (delay en ms, className, style),
 * mais animation plus sobre : translation + fondu, sans flou ni changement d'échelle.
 * En mouvement réduit, MotionConfig ne garde que le fondu.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  style = {},
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  as?: "div" | "li" | "section";
}) {
  const Component = m[as];

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </Component>
  );
}
