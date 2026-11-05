"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

/** Halo violet qui glisse en diagonale pendant que le bandeau traverse l'écran. */
export default function CtaGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", reduce ? "-20%" : "45%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["30%", reduce ? "30%" : "-30%"]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <m.div
        style={{ x, y }}
        className="absolute left-0 top-0 h-[140%] w-[80%] rounded-full"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(closest-side, rgba(109,93,211,0.55), rgba(109,93,211,0) 70%)" }}
        />
      </m.div>
    </div>
  );
}
