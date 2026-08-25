"use client";

import { useEffect, useRef } from "react";
import { useBackground } from "@/app/context/BackgroundContext";

export default function BackgroundTrigger({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerTrigger } = useBackground();

  useEffect(() => {
    registerTrigger(id, ref.current);
    return () => registerTrigger(id, null);
  }, [id, registerTrigger]);

  return <div ref={ref} className="w-px h-px" aria-hidden="true" />;
}