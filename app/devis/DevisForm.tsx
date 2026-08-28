"use client";

import { useActionState } from "react";
import { submitDevis, type DevisFormState } from "./actions";

type Service = { slug: string; title: string };

const budgetOptions = ["< 500 €", "500 – 1500 €", "1500 – 3000 €", "> 3000 €", "Je ne sais pas encore"];
const timelineOptions = ["Le plus vite possible", "Dans le mois", "Dans les 2-3 mois", "Pas de délai fixe"];

const initialState: DevisFormState = { success: false, error: null };

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
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-10 sm:p-14 shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Demande envoyée !</h2>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          Merci pour votre message. Je reviens vers vous sous 48h avec une proposition claire.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
      {/* Type de projet */}
      <div>
        <label htmlFor="project_type" className="block text-sm font-bold text-slate-900 mb-3">
          Type de projet <span className="text-violet-600">*</span>
        </label>
        <select
          id="project_type"
          name="project_type"
          required
          defaultValue={defaultType ?? ""}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-slate-900 mb-3">
          Décrivez votre besoin <span className="text-violet-600">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="Parlez-moi de votre activité, de ce que vous souhaitez pour votre site, de vos inspirations éventuelles..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-3">Budget estimé</label>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <label
              key={opt}
              className="cursor-pointer px-4 py-2 rounded-full border border-slate-200 text-sm text-slate-600 bg-white/60 hover:bg-white has-[:checked]:bg-violet-600 has-[:checked]:text-white has-[:checked]:border-violet-600 transition-colors"
            >
              <input type="radio" name="budget_range" value={opt} className="hidden" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Délai */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-3">Délai souhaité</label>
        <div className="flex flex-wrap gap-2">
          {timelineOptions.map((opt) => (
            <label
              key={opt}
              className="cursor-pointer px-4 py-2 rounded-full border border-slate-200 text-sm text-slate-600 bg-white/60 hover:bg-white has-[:checked]:bg-violet-600 has-[:checked]:text-white has-[:checked]:border-violet-600 transition-colors"
            >
              <input type="radio" name="timeline" value={opt} className="hidden" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Coordonnées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-3">
            Nom <span className="text-violet-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-3">
            Email <span className="text-violet-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-3">
          Téléphone <span className="text-slate-400 font-normal">(optionnel)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 font-medium">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300"
      >
        {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}