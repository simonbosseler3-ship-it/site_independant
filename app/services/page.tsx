import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { serviceGraphics } from "@/app/components/ServiceGraphics";

export default async function ServicesPage() {
  const { data: services } = await supabase
    .from("services")
    .select("slug, title, short_description")
    .order("display_order");

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
        Tous mes services
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-xl">
        Découvre mes prestations en développement et modernisation web.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services?.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group relative overflow-hidden p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-violet-300 transition-all shadow-sm hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1"
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
        ))}
      </div>
    </main>
  );
}