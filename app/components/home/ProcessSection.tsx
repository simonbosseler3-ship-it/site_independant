import BackgroundTrigger from "@/app/components/BackgroundTrigger";
import ProcessTimeline from "@/app/components/ProcessTimeline";
import SectionHeading from "@/app/components/ui/SectionHeading";

type Step = { step_number: string; title: string; description: string };

export default function ProcessSection({ steps }: { steps: Step[] | null }) {
  return (
    <div className="relative">
      <BackgroundTrigger id="process" />
      <section className="container-site py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Titre collant pendant le défilement des étapes (desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <SectionHeading
                index="02"
                title="Comment ça se passe ?"
                description="Une méthodologie en 4 étapes simples pour avancer en toute confiance."
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">{steps && <ProcessTimeline steps={steps} />}</div>
        </div>
      </section>
    </div>
  );
}
