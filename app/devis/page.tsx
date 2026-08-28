import { supabase } from "@/lib/supabase";
import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import DevisForm from "./DevisForm";

export default async function DevisPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  const { data: services } = await supabase
    .from("services")
    .select("slug, title")
    .order("display_order");

  return (
    <main className="relative max-w-3xl mx-auto px-6 py-16 sm:py-24">
      
      {/* HALOS D'ARRIÈRE-PLAN */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-violet-600/20 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-[30%] -right-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute -bottom-32 left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <BackgroundTrigger id="devis" />

      <section className="flex flex-col items-center text-center mb-16">
        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Parlons de{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              votre projet
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-6 max-w-xl mx-auto relative">
            <div className="absolute inset-0 bg-white/70 blur-xl rounded-2xl -z-10" />
            <p className="text-slate-700 text-lg font-medium leading-relaxed px-4 py-2">
              Décrivez votre besoin en quelques minutes — je reviens vers vous le plus vite possible avec une proposition claire et sans engagement.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal delay={300}>
        <DevisForm services={services ?? []} defaultType={type} />
      </ScrollReveal>
    </main>
  );
}