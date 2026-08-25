"use client";

import { useEffect } from "react";
import { useBackground } from "@/app/context/BackgroundContext";

export default function ServiceBackgroundSetter({ slug }: { slug: string }) {
  const { setOverrideBg } = useBackground();

  useEffect(() => {
    setOverrideBg(slug);
    return () => setOverrideBg(null); // on relâche l'override en quittant la page
  }, [slug, setOverrideBg]);

  return null;
}