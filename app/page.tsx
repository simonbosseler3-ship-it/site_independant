import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import ProcessTimeline from "@/app/components/ProcessTimeline";
import ScrollReveal from "@/app/components/ScrollReveal";
import ServiceCard from "@/app/components/ServiceCard";
import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import Hero from "@/app/components/home/Hero";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home() {
  const { data: services, error } = await supabase
    .from("services")
    .select("slug, title, short_description, display_order")
    .order("display_order");

  const { data: steps, error: stepsError } = await supabase
    .from("process_steps")
    .select("step_number, title, description, display_order")
    .order("display_order");

  if (error) {
    console.error("Erreur chargement services:", error.message);
  }
  if (stepsError) {
    console.error("Erreur chargement étapes:", stepsError.message);
  }

  return (
    <main className="relative overflow-hidden">
      {/* --- SECTION HERO --- */}
      <Hero />

      <div className="max-w-6xl mx-auto px-6 space-y-16 sm:space-y-24 py-12 sm:py-20">

        {/* --- SECTION SERVICES --- */}
        <div>
          <BackgroundTrigger id="services" />
          <section id="services" className="space-y-10 scroll-mt-28">
            <ScrollReveal>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Mes Prestations</h2>
                <p className="text-slate-600 text-base">Cliquez sur un service pour explorer tous les détails et fonctionnalités incluses.</p>
              </div>
            </ScrollReveal>

            {/* Mobile/tablette */}
            <div className="flex flex-col gap-6 md:hidden">
              {services?.map((service, index) => (
                <ScrollReveal key={service.slug} delay={index * 100}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </div>

            {/* Desktop */}
            <div
              className="hidden md:grid gap-6"
              style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
            >
              {services?.map((service, index) => {
                const posInGroup = index % 5;
                const groupNumber = Math.floor(index / 5);
                const isTopRow = posInGroup < 3;

                const colStart = isTopRow
                  ? posInGroup * 2 + 1
                  : (posInGroup - 3) * 2 + 2;

                const rowStart = groupNumber * 2 + (isTopRow ? 1 : 2);

                return (
                  <ScrollReveal
                    key={service.slug}
                    delay={index * 100}
                    className=""
                    style={{
                      gridColumn: `${colStart} / span 2`,
                      gridRow: rowStart,
                    }}
                  >
                    <ServiceCard service={service} />
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        </div>

        {/* --- SECTION PROCESS --- */}
        <div>
          <BackgroundTrigger id="process" />
          <section className="space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Comment ça se passe ?</h2>
              <p className="text-slate-600 text-base">Une méthodologie en 4 étapes simples pour avancer en toute confiance.</p>
            </div>
            {steps && <ProcessTimeline steps={steps} />}
          </section>
        </div>

        {/* --- SECTION CTA --- */}
        <div>
          <BackgroundTrigger id="cta" />
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 shadow-xl shadow-violet-200">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold">Prêt à concrétiser votre projet web ?</h3>
              <p className="text-violet-100 text-base font-normal">Obtenez une estimation personnalisée ou posez vos questions en quelques clics.</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <Link href="/devis" className="w-full sm:w-auto text-center bg-white text-violet-700 hover:bg-slate-100 font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-md">
                Demander un devis
              </Link>
              <Link href="/contact" className="w-full sm:w-auto text-center bg-violet-700/60 hover:bg-violet-700 text-white border border-white/20 font-semibold text-sm px-7 py-3.5 rounded-full transition-all">
                Me contacter
                            </Link>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}