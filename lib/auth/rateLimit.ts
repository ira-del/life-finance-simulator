import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

// Limites de tentatives avant/pendant l'authentification — s'ajoutent à la
// limite déjà native de Supabase Auth, pour ralentir le brute-force au
// niveau de l'app aussi.
const LIMITES = {
  login: { maxTentatives: 10, fenetreMinutes: 15 },
  signup: { maxTentatives: 5, fenetreMinutes: 60 },
} as const;

export type ActionAuth = keyof typeof LIMITES;

// L'email n'est jamais stocké en clair dans login_attempts — cette table
// est accessible avec la clé anon (nécessaire puisqu'on vérifie AVANT que
// l'utilisateur soit authentifié), donc on hache l'identifiant pour éviter
// qu'elle serve de liste d'emails interrogeable.
function hacherIdentifiant(identifiant: string): string {
  return crypto.createHash("sha256").update(identifiant.toLowerCase().trim()).digest("hex");
}

export async function verifierLimiteAuth(
  supabase: SupabaseServerClient,
  identifiant: string,
  action: ActionAuth
): Promise<boolean> {
  const { maxTentatives, fenetreMinutes } = LIMITES[action];
  const hachage = hacherIdentifiant(identifiant);
  const depuis = new Date(Date.now() - fenetreMinutes * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("login_attempts")
    .select("id", { count: "exact", head: true })
    .eq("identifier_hash", hachage)
    .eq("action", action)
    .gte("created_at", depuis);

  return (count ?? 0) < maxTentatives;
}

export async function enregistrerTentativeAuth(
  supabase: SupabaseServerClient,
  identifiant: string,
  action: ActionAuth,
  succes: boolean
): Promise<void> {
  const hachage = hacherIdentifiant(identifiant);
  await supabase.from("login_attempts").insert({
    identifier_hash: hachage,
    action,
    success: succes,
  });
}
