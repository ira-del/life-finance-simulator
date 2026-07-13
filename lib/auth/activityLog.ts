import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export type ActiviteType =
  | "connexion"
  | "inscription"
  | "deconnexion"
  | "mot_de_passe_modifie"
  | "profil_modifie"
  | "finances_modifiees"
  | "donnees_exportees"
  | "compte_supprime";

const LABELS: Record<ActiviteType, string> = {
  connexion: "Connexion réussie",
  inscription: "Compte créé",
  deconnexion: "Déconnexion",
  mot_de_passe_modifie: "Mot de passe modifié",
  profil_modifie: "Profil général modifié",
  finances_modifiees: "Profil financier modifié",
  donnees_exportees: "Données personnelles exportées",
  compte_supprime: "Compte supprimé définitivement",
};

// N'échoue jamais bruyamment — un souci de journalisation ne doit jamais
// bloquer l'action réelle de l'utilisateur (connexion, modification, etc.).
export async function enregistrerActivite(
  supabase: SupabaseServerClient,
  userId: string,
  type: ActiviteType
): Promise<void> {
  try {
    await supabase.from("activity_log").insert({
      user_id: userId,
      action: type,
      description: LABELS[type],
    });
  } catch (err) {
    console.error("enregistrerActivite failed:", err);
  }
}
