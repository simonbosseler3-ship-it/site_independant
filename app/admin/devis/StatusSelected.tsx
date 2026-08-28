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
        className="rounded-full border border-slate-200 px-3 py-1 text-sm bg-white cursor-pointer"
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