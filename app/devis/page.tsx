import { supabase } from "@/lib/supabaseClient";
import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageHeader from "@/app/components/ui/PageHeader";
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
    <main className="relative overflow-x-clip">
      <BackgroundTrigger id="devis" />

      <div className="container-site max-w-4xl">
        <PageHeader
          align="center"
          title={
            <>
              Parlons de <span className="accent-serif text-gradient-brand">votre projet</span>
            </>
          }
          description={
            <p>
              Décrivez votre besoin en quelques minutes — je reviens vers vous le plus vite possible avec une
              proposition claire et sans engagement.
            </p>
          }
        />

        <ScrollReveal delay={250}>
          <DevisForm services={services ?? []} defaultType={type} />
        </ScrollReveal>
      </div>
    </main>
  );
}
