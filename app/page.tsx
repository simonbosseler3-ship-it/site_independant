import { supabase } from "@/lib/supabaseClient";
import Hero from "@/app/components/home/Hero";
import ServicesSection from "@/app/components/home/ServicesSection";
import ProcessSection from "@/app/components/home/ProcessSection";
import CtaSection from "@/app/components/home/CtaSection";

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
    <main className="relative overflow-x-clip">
      <Hero />
      <ServicesSection services={services} />
      <ProcessSection steps={steps} />
      <CtaSection />
    </main>
  );
}
