"use client";

import { useActionState } from "react";
import { m } from "framer-motion";
import { submitDevis, type DevisFormState } from "./actions";
import { buttonClasses, ArrowIcon } from "@/app/components/ui/Button";
import { STARTER_OFFER } from "@/lib/site";

type Service = { slug: string; title: string };

const budgetOptions = ["< 500 €", "500 – 1500 €", "1500 – 3000 €", "> 3000 €", "Je ne sais pas encore"];
const timelineOptions = ["Le plus vite possible", "Dans le mois", "Dans les 2-3 mois", "Pas de délai fixe"];

const initialState: DevisFormState = { success: false, error: null };

const ease = [0.16, 1, 0.3, 1] as const;

/* Styles partagés des champs */
const labelClass = "block text-sm font-semibold text-fg mb-3";
const fieldClass =
  "w-full rounded-xl border border-line-strong bg-paper/[0.06] px-4 py-3.5 text-fg placeholder:text-fg-subtle " +
  "transition-[border-color,background-color,box-shadow] duration-300 " +
  "hover:border-paper/35 focus:outline-none focus:border-brand-glow focus:bg-paper/[0.09] focus:ring-4 focus:ring-brand/25";

/* Puce radio : l'input reste dans le DOM (sr-only) pour la navigation clavier */
const chipClass =
  "cursor-pointer select-none rounded-full border border-line-strong bg-paper/[0.05] px-4 py-2.5 text-sm text-fg-muted " +
  "transition-all duration-300 hover:border-paper/35 hover:text-fg " +
  "has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:checked]:shadow-[0_8px_24px_-10px_rgba(109,93,211,0.9)] " +
  "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-glow/40";

function Required() {
  return (
    <span className="text-brand-glow" aria-hidden="true">
      *
    </span>
  );
}

export default function DevisForm({
  services,
  defaultType,
}: {
  services: Service[];
  defaultType?: string;
}) {
  const [state, formAction, isPending] = useActionState(submitDevis, initialState);

  if (state.success) {
    return (
      <m.div
        className="relative overflow-hidden rounded-[2rem] border border-paper/[0.16] bg-ink-2/85 backdrop-blur-xl p-10 sm:p-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease }}
        role="status"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(109,93,211,0.5), transparent 75%)" }}
          aria-hidden="true"
        />
        <m.div
          className="relative mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-[0_0_40px_rgba(109,93,211,0.7)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
          aria-hidden="true"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <m.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            />
          </svg>
        </m.div>
        <h2 className="relative font-display text-3xl sm:text-4xl font-semibold text-fg">Demande envoyée !</h2>
        <p className="relative mt-4 max-w-md mx-auto text-fg-muted leading-relaxed">
          Merci pour votre message. Je reviens vers vous sous 48h avec une proposition claire.
        </p>
      </m.div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative overflow-hidden rounded-[2rem] border border-paper/[0.16] bg-ink-2/85 backdrop-blur-xl p-6 sm:p-12 space-y-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_30px_80px_-40px_rgba(0,0,0,0.9)]"
    >
      {/* Halo d'angle */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(155,140,255,0.25), transparent 75%)" }}
        aria-hidden="true"
      />

      {/* Type de projet */}
      <div className="relative">
        <label htmlFor="project_type" className={labelClass}>
          Type de projet <Required />
        </label>
        <div className="relative">
          <select
            id="project_type"
            name="project_type"
            required
            defaultValue={defaultType ?? ""}
            className={`${fieldClass} appearance-none pr-12 cursor-pointer`}
          >
            <option value="" disabled>
              Choisissez un type de projet
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="autre">Autre / je ne sais pas encore</option>
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <div className="relative">
        <label htmlFor="description" className={labelClass}>
          Décrivez votre besoin <Required />
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="Parlez-moi de votre activité, de ce que vous souhaitez pour votre site, de vos inspirations éventuelles..."
          className={`${fieldClass} resize-none leading-relaxed`}
        />
      </div>

      {/* Budget */}
      <fieldset className="relative">
        <legend className={labelClass}>Budget estimé</legend>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <label key={opt} className={chipClass}>
              <input type="radio" name="budget_range" value={opt} className="sr-only" />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Délai */}
      <fieldset className="relative">
        <legend className={labelClass}>Délai souhaité</legend>
        <div className="flex flex-wrap gap-2">
          {timelineOptions.map((opt) => (
            <label key={opt} className={chipClass}>
              <input type="radio" name="timeline" value={opt} className="sr-only" />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Coordonnées */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-line pt-9">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom <Required />
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <Required />
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div className="relative">
        <label htmlFor="phone" className={labelClass}>
          Téléphone <span className="text-fg-subtle font-normal">(optionnel)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </div>

      {/* Offre jeunes indépendants */}
      <label className="relative flex cursor-pointer items-start gap-4 rounded-xl border border-brand-glow/30 bg-brand/10 p-4 sm:p-5 transition-colors hover:bg-brand/15 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-glow/40">
        <input
          type="checkbox"
          name="is_new_independent"
          value="1"
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand"
        />
        <span>
          <span className="block text-sm font-semibold text-fg">{STARTER_OFFER.checkboxLabel}</span>
          <span className="mt-1 block text-sm text-fg-muted">
            Activité lancée depuis moins de 2 ans : profitez de prix très avantageux, jusqu&apos;à -30 %.
          </span>
        </span>
      </label>

      {state.error && (
        <p
          role="alert"
          className="relative flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-950/60 px-4 py-3 text-sm font-medium text-red-200"
        >
          <svg className="mt-0.5 w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {state.error}
        </p>
      )}

      <div className="relative pt-1">
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={buttonClasses({ size: "lg", className: "w-full sm:w-auto" })}
        >
          {isPending && (
            <svg className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
              <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          <span>{isPending ? "Envoi en cours..." : "Envoyer ma demande"}</span>
          {!isPending && <ArrowIcon />}
        </button>
      </div>
    </form>
  );
}
