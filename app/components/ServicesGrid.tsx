"use client";

import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

type Service = {
  slug: string;
  title: string;
  short_description: string;
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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

  if (!services || services.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {services.map((service, index) => (
        <div
          key={service.slug}
          style={{ transitionDelay: `${index * 100}ms` }}
          className={`transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );
}