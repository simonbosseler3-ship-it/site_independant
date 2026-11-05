// app/admin/devis/StatusSelect.tsx
"use client";

import { updateStatus } from "./action";

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  in_discussion: "En discussion",
  in_progress: "En cours",
  completed: "Terminé",
  declined: "Refusé",
};

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <form action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.target.form?.requestSubmit()}
        aria-label="Statut de la demande"
        className="rounded-full border border-line-strong bg-paper/[0.06] px-4 py-2 text-sm text-fg cursor-pointer transition-colors hover:border-brand-glow/60 focus:outline-none focus:ring-4 focus:ring-brand/25"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </form>
  );
}