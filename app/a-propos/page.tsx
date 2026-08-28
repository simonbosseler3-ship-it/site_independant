import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";

export default async function AproposPage() {
  const { data: timeline } = await supabase
    .from("about_timeline")
    .select("year, title, description")
    .order("display_order");

  const { data: skills } = await supabase
    .from("about_skills")
    .select("category, items")
    .order("display_order");

  return (
    <main className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24">
      
      {/* 
        HALOS D'ARRIÈRE-PLAN
        Utilisation de "fixed" pour ne pas bloquer les animations ScrollReveal
      */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-violet-600/20 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-[30%] -right-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute -bottom-32 left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <BackgroundTrigger id="profile" />

      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-2xl leading-[1.15]">
            Simon Bosseler,{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              développeur web indépendant
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-8 max-w-2xl relative">
            <div className="absolute inset-0 bg-white/60 blur-xl rounded-2xl -z-10" />
            <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed px-4 py-2">
              Étudiant en master à l&apos;UCLouvain, diplômé en informatique à la HE Leonard de Vinci, je conçois des sites web sur mesure pour des indépendants, commerces et associations — avec une exigence technique héritée de ma formation.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="pt-10 flex flex-wrap justify-center gap-4">
            <Link href="/devis" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5">
              Discutons de votre projet
            </Link>
            <Link href="/contact" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-base px-8 py-4 rounded-full transition-all shadow-sm hover:border-slate-300">
              Me contacter
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Parcours */}
      <section className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-violet-600 tracking-wide uppercase mb-2">Parcours</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              D&apos;une formation solide à une activité indépendante
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timeline?.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 100}>
              <div className="h-full bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-violet-200">
                <span className="inline-block text-xs font-bold text-violet-600 tracking-wide uppercase mb-3">
                  {step.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-violet-600 tracking-wide uppercase mb-2">Compétences</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Une base technique large, pas seulement du code
            </h2>
            <div className="mt-4 max-w-xl mx-auto relative">
              <div className="absolute inset-0 bg-white/60 blur-xl rounded-2xl -z-10" />
              <p className="text-slate-600 px-4 py-2">
                Mon master couvre bien plus que le développement web : cette rigueur se retrouve dans chaque projet que je livre.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {skills?.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 100}>
              <div className="h-full bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-violet-200">
                <h3 className="text-base font-bold text-slate-900 mb-4">{group.category}</h3>
                <ul className="space-y-2.5">
                  {(group.items as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-5 shadow-sm text-slate-700 text-sm sm:text-base transition-all duration-300 hover:shadow-md hover:border-violet-200">
              <span className="font-semibold text-violet-600">À noter :</span> Je maîtrise également d’autres langages et technologies issus de ma formation en informatique, notamment Java, C et C++, qui me permettent d’avoir une compréhension plus large du développement logiciel.
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Ambitions / Valeurs */}
      <section className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <p className="text-xs font-bold text-violet-100 tracking-wide uppercase mb-3">Ma philosophie</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold max-w-2xl leading-snug">
              Je ne me contente pas de livrer un site — je m&apos;assure qu&apos;il réponde vraiment à vos objectifs.
            </h2>
            <p className="mt-6 text-violet-100 max-w-2xl leading-relaxed">
              Étant étudiant, je garde une grande flexibilité dans mes disponibilités et un vrai souci du détail : chaque projet est l&apos;occasion de mettre en pratique une exigence technique construite au fil de ma formation, au service de clients qui méritent un travail sérieux, pas un site générique.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA final */}
      <section className="mt-28 sm:mt-36 text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Un projet en tête ? Parlons-en.
          </h2>
          <div className="mt-4 max-w-lg mx-auto relative">
            <div className="absolute inset-0 bg-white/60 blur-xl rounded-2xl -z-10" />
            <p className="text-slate-600 px-4 py-2">
              Décrivez votre besoin en quelques minutes, je reviens vers vous rapidement avec une proposition claire.
            </p>
          </div>
          <div className="pt-8">
            <Link href="/devis" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5">
              Demander un devis
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}