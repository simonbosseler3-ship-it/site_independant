"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/login/action";

const initialState: LoginState = { error: null };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className="max-w-sm mx-auto px-6 py-24">
      <h1 className="text-2xl font-bold mb-6">Connexion admin</h1>
      <form action={formAction} className="space-y-4">
        <input name="email" type="email" required placeholder="Email"
          className="w-full rounded-xl border border-slate-200 px-4 py-3" />
        <input name="password" type="password" required placeholder="Mot de passe"
          className="w-full rounded-xl border border-slate-200 px-4 py-3" />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button type="submit" disabled={isPending}
          className="w-full bg-violet-600 text-white font-semibold py-3 rounded-full">
          {isPending ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}