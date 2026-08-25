"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

type BackgroundContextType = {
  activeBg: string;
  registerTrigger: (id: string, el: HTMLElement | null) => void;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [activeBg, setActiveBg] = useState("hero");
  const triggersRef = useRef<Map<string, HTMLElement>>(new Map());
  const orderRef = useRef<string[]>([]);
  const tickingRef = useRef(false);

  const registerTrigger = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      if (!triggersRef.current.has(id)) orderRef.current.push(id);
      triggersRef.current.set(id, el);
    } else {
      triggersRef.current.delete(id);
      orderRef.current = orderRef.current.filter((x) => x !== id);
    }
  }, []);

  useEffect(() => {
    const updateActive = () => {
      tickingRef.current = false;
      const centerY = window.innerHeight * 0.5;
      let current = orderRef.current[0];
      let bestTop = -Infinity;

      orderRef.current.forEach((id) => {
        const el = triggersRef.current.get(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= centerY && top > bestTop) {
          bestTop = top;
          current = id;
        }
      });

      if (current) {
        setActiveBg((prev) => (prev === current ? prev : current));
      }
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <BackgroundContext.Provider value={{ activeBg, registerTrigger }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground doit être utilisé dans un BackgroundProvider");
  return ctx;
}