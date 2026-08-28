import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceGraphicsAmbient } from "@/app/components/ServiceGraphics";
import ServiceBackgroundSetter from "@/app/components/ServiceBackgroundSetter";
import { formatServicePrice } from "@/lib/formatPrice";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("slug, title, full_description, points, starting_price, price_period, note")
    .eq("slug", slug)
    .single();

  if (!service) notFound();

  const ambient = serviceGraphicsAmbient[service.slug] ?? {
    glow: "from-violet-200/60 via-purple-100/30 to-transparent",
    icon: null,
  };

  const priceLabel = formatServicePrice(service.starting_price, service.price_period, "long");

  return (
    <main className="relative overflow-hidden">
      <ServiceBackgroundSetter slug={service.slug} />
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br ${ambient.glow} blur-3xl -z-20 pointer-events-none`}
      />
      <div className="absolute left-16 top-4 w-[440px] h-[440px] text-slate-900/[0.30] -z-10 pointer-events-none animate-float-slow">
        {ambient.icon}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <Link
          href="/services"
          className="font-body text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 mb-8"
        >
          ← Tous les services
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {service.title}
          </h1>
          {priceLabel && (
            <span className="font-mono-jb text-sm font-medium text-violet-700 bg-violet-100 px-4 py-2 rounded-full whitespace-nowrap">
              {priceLabel}
            </span>
          )}
        </div>

        <p className="font-body mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
          {service.full_description}
        </p>

        {service.points && service.points.length > 0 && (
          <div className="mt-12 bg-white/75 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-violet-600 mb-6">
              Ce qui est inclus
            </h2>
            <ul className="space-y-4">
              {service.points.map((point: string, i: number) => (
                <li key={i} className="font-body flex items-start gap-3 text-slate-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.note && (
          <div className="mt-6 flex items-start gap-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-6">
            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="font-body text-sm text-amber-800 leading-relaxed">{service.note}</p>
          </div>
        )}

        <div className="mt-12">
          <Link
            href={`/devis?type=${service.slug}`}
            className="font-body inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-7 py-3.5 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5"
          >
            Demander un devis pour ce service
          </Link>
        </div>
      </div>
    </main>
  );
}