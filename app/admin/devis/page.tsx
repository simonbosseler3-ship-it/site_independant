// app/admin/devis/page.tsx
import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/app/admin/devis/StatusSelected";

export default async function AdminDevisPage() {
  const supabase = await createClient();
  const { data: devis } = await supabase
    .from("devis_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="container-site max-w-4xl pt-32 sm:pt-40 pb-16">
      <h1 className="font-display text-display-md font-semibold text-fg mb-10">Demandes de devis</h1>
      <div className="space-y-4">
        {devis?.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl border border-paper/[0.16] bg-ink-2/85 backdrop-blur-xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-fg [overflow-wrap:anywhere]">
                  {d.name} — {d.email}
                </p>
                <p className="mt-1 text-sm text-fg-subtle">
                  {d.project_type} · {d.budget_range} · {d.timeline}
                </p>
              </div>
              <StatusSelect id={d.id} status={d.status} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted whitespace-pre-line">{d.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
