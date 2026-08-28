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
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Demandes de devis</h1>
      <div className="space-y-4">
        {devis?.map((d) => (
          <div key={d.id} className="border border-slate-200 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{d.name} — {d.email}</p>
                <p className="text-sm text-slate-500">
                  {d.project_type} · {d.budget_range} · {d.timeline}
                </p>
              </div>
              <StatusSelect id={d.id} status={d.status} />
            </div>
            <p className="mt-3 text-slate-700 text-sm">{d.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}