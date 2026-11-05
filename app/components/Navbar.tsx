import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NavbarClient from "@/app/components/NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Mon Profil", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    ...(user ? [{ label: "Admin", href: "/admin/devis" }] : []),
  ];

  return <NavbarClient navLinks={navLinks} isLoggedIn={!!user} logoutAction={logout} />;
}
