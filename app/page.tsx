import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { serviceGraphics } from "@/app/components/ServiceGraphics";
import ProcessTimeline from "@/app/components/ProcessTimeline";
import ScrollReveal from "@/app/components/ScrollReveal";
import ServiceCard from "@/app/components/ServiceCard";

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

  console.log("steps:", steps)

  return (
    <main className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 space-y-24 sm:space-y-32 py-12 sm:py-20">

        <section className="space-y-8 pt-4 sm:pt-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.15]">
            Un site web <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">sur-mesure & performant</span> pour booster votre présence.
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed">
            De la création complète à la modernisation de vos pages actuelles, offrez à vos clients une expérience moderne, rapide et rassurante.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/devis" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-7 py-3.5 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5">
              Lancer mon devis gratuit
            </Link>
            <Link href="#services" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-base px-7 py-3.5 rounded-full transition-all shadow-sm hover:border-slate-300">
              Découvrir mes services
            </Link>
          </div>
        </section>

        <section id="services" className="space-y-10 scroll-mt-28">
  <ScrollReveal>
    <div className="space-y-2">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Mes Prestations</h2>
      <p className="text-slate-600 text-base">Cliquez sur un service pour explorer tous les détails et fonctionnalités incluses.</p>
    </div>
  </ScrollReveal>

  {/* Mobile/tablette : liste simple empilée */}
  <div className="flex flex-col gap-6 md:hidden">
    {services?.map((service, index) => (
      <ScrollReveal key={service.slug} delay={index * 100}>
        <ServiceCard service={service} />
      </ScrollReveal>
    ))}
  </div>

  {/* Desktop : grille en quinconce, 3 en haut / 2 en bas décalées */}
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

        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Comment ça se passe ?</h2>
            <p className="text-slate-600 text-base">Une méthodologie en 4 étapes simples pour avancer en toute confiance.</p>
          </div>
          {steps && <ProcessTimeline steps={steps} />}
        </section>

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
    </main>
  );
}