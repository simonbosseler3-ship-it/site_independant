"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/login/action";
import { buttonClasses } from "@/app/components/ui/Button";

const initialState: LoginState = { error: null };

const fieldClass =
  "w-full rounded-xl border border-line-strong bg-paper/[0.06] px-4 py-3.5 text-fg placeholder:text-fg-subtle " +
  "transition-[border-color,background-color,box-shadow] duration-300 " +
  "focus:outline-none focus:border-brand-glow focus:bg-paper/[0.09] focus:ring-4 focus:ring-brand/25";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className="container-site max-w-md pt-36 sm:pt-44 pb-16">
      <div className="rounded-[2rem] border border-paper/[0.16] bg-ink-2/85 backdrop-blur-xl p-8 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <h1 className="font-display text-3xl font-semibold text-fg mb-8">Connexion admin</h1>
        <form action={formAction} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            aria-label="Email"
            autoComplete="username"
            className={fieldClass}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            autoComplete="current-password"
            className={fieldClass}
          />
          {state.error && (
            <p role="alert" className="text-sm text-red-300">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className={buttonClasses({ size: "lg", className: "w-full mt-2" })}
          >
            {isPending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
