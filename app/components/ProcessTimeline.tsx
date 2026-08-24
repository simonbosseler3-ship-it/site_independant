"use client";

import { useEffect, useState, useRef } from "react";

type Step = {
  step_number: string;
  title: string;
  description: string;
};

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Vérification immédiate : si l'élément est déjà visible au chargement,
    // pas besoin d'attendre l'observer (évite toute dépendance à un timing fragile).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  if (!steps || steps.length === 0) return null;

  return (
    <div ref={containerRef} className="relative py-4">
      {/* Ligne verticale de fond (grise) */}
      <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 sm:-translate-x-1/2 z-0" />

      {/* Ligne verticale animée (dégradé violet) */}
      <div
        className={`absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 to-indigo-600 sm:-translate-x-1/2 origin-top transition-transform duration-1000 ease-out z-0 ${
          isVisible ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <div className="space-y-8 sm:space-y-12 relative z-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={step.step_number || index}
              className="relative flex flex-col sm:grid sm:grid-cols-2 sm:gap-12 items-center"
            >
              <div
                style={{ transitionDelay: `${150 + index * 100}ms` }}
                className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-0 sm:top-1/2 sm:-translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white border-2 border-violet-600 flex items-center justify-center font-extrabold text-violet-600 shadow-sm transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              >
                {step.step_number}
              </div>

              <div
                style={{ transitionDelay: `${100 + index * 100}ms` }}
                className={`pl-20 sm:pl-0 w-full transition-all duration-500 ease-out ${
                  isEven ? "sm:col-start-1" : "sm:col-start-2"
                } ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : isEven
                    ? "opacity-0 -translate-x-8"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}