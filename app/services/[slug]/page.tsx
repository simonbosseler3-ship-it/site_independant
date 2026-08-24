import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceGraphicsAmbient } from "@/app/components/ServiceGraphics";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("slug, title, full_description, points")
    .eq("slug", slug)
    .single();

  if (!service) notFound();

  const ambient = serviceGraphicsAmbient[service.slug] ?? {
    glow: "from-violet-200/60 via-purple-100/30 to-transparent",
    icon: null,
  };

  return (
    <main className="relative overflow-hidden">
      {/* Halo de couleur, plein écran, pas de bordure */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br ${ambient.glow} blur-3xl -z-20 pointer-events-none`}
      />
      <div className="absolute left-16 top-4 w-[440px] h-[440px] text-slate-900/[0.13] -z-10 pointer-events-none animate-float-slow">
        {ambient.icon}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <Link
          href="/services"
          className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 mb-8"
        >
          ← Tous les services
        </Link>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {service.title}
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
          {service.full_description}
        </p>

        {service.points && service.points.length > 0 && (
          <div className="mt-12 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-violet-600 mb-6">
              Ce qui est inclus
            </h2>
            <ul className="space-y-4">
              {service.points.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <Link
            href={`/devis?type=${service.slug}`}
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-7 py-3.5 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5"
          >
            Demander un devis pour ce service
          </Link>
        </div>
      </div>
    </main>
  );
}