"use server";

import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export type DevisFormState = {
  success: boolean;
  error: string | null;
};

const ADMIN_EMAIL = "simonbosseler3@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // ← à remplacer par une adresse @ton-domaine.com une fois vérifié

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

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Nouvelle demande de devis — ${name}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone ?? "Non renseigné"}</p>
        <p><strong>Type de projet :</strong> ${project_type}</p>
        <p><strong>Budget :</strong> ${budget_range ?? "Non précisé"}</p>
        <p><strong>Délai :</strong> ${timeline ?? "Non précisé"}</p>
        <p><strong>Description :</strong></p>
        <p>${description.replace(/\n/g, "<br>")}</p>
      `,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Votre demande de devis a bien été reçue",
      html: `
        <h2>Merci ${name} !</h2>
        <p>Votre demande concernant votre projet a bien été reçue. Je reviens vers vous sous 48h avec une proposition claire.</p>
        <p>À très vite,<br>Simon Bosseler</p>
      `,
    });
  } catch (emailError) {
    console.error("Erreur envoi email:", emailError);
  }

  return { success: true, error: null };
}