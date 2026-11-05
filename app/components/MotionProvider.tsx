"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * - LazyMotion + domAnimation : charge uniquement le sous-ensemble d'animations utile
 *   (composants `m.*` au lieu de `motion.*`), ce qui allège le bundle.
 * - reducedMotion="user" : respecte automatiquement `prefers-reduced-motion`
 *   (les transformations sont désactivées, seuls les fondus d'opacité restent).
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
