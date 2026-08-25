"use server";

import { supabase } from "@/lib/supabase";

export type DevisFormState = {
  success: boolean;
  error: string | null;
};

export async function submitDevis(
  _prevState: DevisFormState,
  formData: FormData
): Promise<DevisFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const project_type = formData.get("project_type")?.toString();
  const budget_range = formData.get("budget_range")?.toString();
  const timeline = formData.get("timeline")?.toString();
  const phone = formData.get("phone")?.toString().trim() || null;

  if (!name || !email || !description || !project_type) {
    return { success: false, error: "Merci de remplir tous les champs obligatoires." };
  }

  const { error } = await supabase.from("devis_requests").insert({
    name,
    email,
    phone,
    project_type,
    description,
    budget_range,
    timeline,
  });

  if (error) {
    console.error("Erreur envoi devis:", error.message);
    return { success: false, error: "Une erreur est survenue, réessaie dans un instant." };
  }

  return { success: true, error: null };
}