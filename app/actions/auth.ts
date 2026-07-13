"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { verifierLimiteAuth, enregistrerTentativeAuth } from "@/lib/auth/rateLimit";
import { enregistrerActivite } from "@/lib/auth/activityLog";

// Reconstruit l'origine du site (protocole + hôte) à partir des en-têtes de
// la requête — fonctionne aussi bien en local qu'une fois déployé, sans
// avoir besoin de coder l'URL en dur ou d'ajouter une variable d'env.
async function getSiteOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

// Fonction appelée par le formulaire de connexion
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const autorise = await verifierLimiteAuth(supabase, email, "login");
  if (!autorise) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Trop de tentatives de connexion. Réessaie dans quelques minutes."
      )}`
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  await enregistrerTentativeAuth(supabase, email, "login", !error);

  if (error) {
    // Pour l'instant on redirige simplement vers la page de login avec une erreur en query
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    await enregistrerActivite(supabase, data.user.id, "connexion");
  }

  redirect("/dashboard");
}

// Fonction appelée par le formulaire d'inscription
export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const autorise = await verifierLimiteAuth(supabase, email, "signup");
  if (!autorise) {
    redirect(
      `/register?error=${encodeURIComponent(
        "Trop de tentatives d'inscription. Réessaie plus tard."
      )}`
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  await enregistrerTentativeAuth(supabase, email, "signup", !error);

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    await enregistrerActivite(supabase, data.user.id, "inscription");
  }

  redirect("/dashboard");
}

// Fonction pour se déconnecter
export async function logout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await enregistrerActivite(supabase, user.id, "deconnexion");
  }
  await supabase.auth.signOut();
  redirect("/login");
}

// Envoie l'email de réinitialisation de mot de passe
export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const origin = await getSiteOrigin();

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  });

  // Toujours le même message, que l'email existe ou non dans la base —
  // évite de révéler quels emails sont déjà inscrits (énumération de comptes).
  redirect("/forgot-password?envoye=1");
}

// Enregistre le nouveau mot de passe — appelée depuis /reset-password,
// où l'utilisateur arrive avec une session de récupération déjà active
// (établie par app/auth/confirm/route.ts après clic sur le lien de l'email)
export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await enregistrerActivite(supabase, user.id, "mot_de_passe_modifie");
  }

  redirect("/dashboard");
}