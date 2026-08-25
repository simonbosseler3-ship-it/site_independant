import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { serviceGraphics } from "@/app/components/ServiceGraphics";
import ScrollReveal from "@/app/components/ScrollReveal";

export default async function ServicesPage() {
  const { data: services } = await supabase
    .from("services")
    .select("slug, title, short_description")
    .order("display_order");

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      {/* En-tête de page animé */}
      <ScrollReveal>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Tous mes services
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-xl">
          Découvre mes prestations en développement et modernisation web.
        </p>
      </ScrollReveal>

      {/* Grille de cartes */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services?.map((service, index) => {
          
          // 💡 ASTUCE : On vérifie si c'est le tout dernier élément ET s'il est orphelin (nombre total impair)
          const isLastAndOdd = services && index === services.length - 1 && services.length % 2 !== 0;

          return (
            <ScrollReveal
              key={service.slug}
              delay={index * 100}
              // Si orphelin : prend toute la ligne (col-span-2) et permet le centrage
              className={isLastAndOdd ? "md:col-span-2 md:flex md:justify-center" : ""}
            >
              <Link
                href={`/services/${service.slug}`}
                // Si orphelin : on restreint sa largeur à exactement 50% moins la moitié du gap (0.75rem = 12px) pour matcher les autres
                className={`group relative overflow-hidden p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-violet-300 transition-all shadow-sm hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 block h-full w-full ${
                  isLastAndOdd ? "md:max-w-[calc(50%-0.75rem)]" : ""
                }`}
              >
                {serviceGraphics[service.slug]}
                <div className="relative z-10">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-violet-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {service.short_description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </main>
  );
}