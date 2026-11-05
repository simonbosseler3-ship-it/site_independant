import ButtonLink from "@/app/components/ui/Button";

/** Page 404 aux couleurs du site (URL inconnues et appels à notFound()). */
export default function NotFound() {
  return (
    <main className="container-site relative flex min-h-[80svh] flex-col items-center justify-center pt-32 pb-16 text-center">
      <p
        className="animate-rise select-none font-display text-[clamp(7rem,28vw,16rem)] font-bold leading-none tracking-[-0.06em] text-transparent bg-clip-text bg-gradient-to-b from-brand-glow to-brand-glow/0"
        aria-hidden="true"
      >
        404
      </p>
      <h1
        className="animate-rise -mt-4 font-display text-display-md font-semibold text-fg"
        style={{ animationDelay: "100ms" }}
      >
        Page <span className="accent-serif text-gradient-brand">introuvable</span>
      </h1>
      <p className="animate-rise mt-5 max-w-md text-fg-muted" style={{ animationDelay: "180ms" }}>
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="animate-rise mt-10" style={{ animationDelay: "260ms" }}>
        <ButtonLink href="/" size="lg" arrow magnetic>
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    </main>
  );
}
