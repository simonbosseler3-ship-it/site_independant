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
    <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
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
          <p className="text-slate-600 text-lg font-normal max-w-xl leading-relaxed mt-6">
            Décrivez votre besoin en quelques minutes — je reviens vers vous le plus vite possible avec une proposition claire et sans engagement.
          </p>
        </ScrollReveal>
      </section>

      <ScrollReveal delay={300}>
        <DevisForm services={services ?? []} defaultType={type} />
      </ScrollReveal>
    </main>
  );
}