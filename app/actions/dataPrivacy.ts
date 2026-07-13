"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enregistrerActivite } from "@/lib/auth/activityLog";

// Toutes les tables contenant des données personnelles rattachées à un
// utilisateur — utilisée à la fois pour l'export et la suppression, pour
// garder les deux en phase. Si une nouvelle table avec des données perso
// est ajoutée au projet, l'ajouter ici aussi.
const TABLES_DONNEES_PERSONNELLES = [
  "profiles",
  "financial_profiles",
  "checklist_progress",
  "badges_earned",
  "dismissed_alerts",
  "health_snapshots",
  "assistant_conversations",
  "assistant_messages",
  "ai_usage_log",
  "activity_log",
] as const;

export interface DonneesExport {
  export_genere_le: string;
  compte: {
    id: string;
    email: string | undefined;
    cree_le: string;
    derniere_connexion: string | undefined;
    email_verifie: boolean;
  };
  tables: Record<string, Record<string, unknown>[]>;
}

export async function exportUserData(): Promise<
  { ok: true; data: DonneesExport } | { ok: false; error: string }
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "not_authenticated" };

  const tables: Record<string, Record<string, unknown>[]> = {};
  for (const table of TABLES_DONNEES_PERSONNELLES) {
    const { data } = await supabase.from(table).select("*").eq("user_id", user.id);
    tables[table] = data ?? [];
  }

  await enregistrerActivite(supabase, user.id, "donnees_exportees");

  return {
    ok: true,
    data: {
      export_genere_le: new Date().toISOString(),
      compte: {
        id: user.id,
        email: user.email,
        cree_le: user.created_at,
        derniere_connexion: user.last_sign_in_at,
        email_verifie: user.email_confirmed_at !== null,
      },
      tables,
    },
  };
}

export async function deleteAccount(): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "not_authenticated" };

  const userId = user.id;
  const admin = createAdminClient();

  // Supprime explicitement chaque table plutôt que de compter uniquement
  // sur les contraintes "on delete cascade" — certaines tables plus
  // anciennes du projet n'ont pas forcément cette contrainte, donc on
  // s'assure que rien ne reste orphelin.
  for (const table of TABLES_DONNEES_PERSONNELLES) {
    await admin.from(table).delete().eq("user_id", userId);
  }

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) {
    console.error("deleteAccount: échec de la suppression du compte auth:", error);
    return { error: error.message };
  }

  await supabase.auth.signOut();
  redirect("/compte-supprime");
}
