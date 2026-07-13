import { createClient } from "@supabase/supabase-js";

// Client "admin" — utilise la clé service_role, qui ignore les Row Level
// Security. Nécessaire uniquement pour des opérations que la clé anon ne
// peut jamais faire (ex: supprimer le compte auth.users d'un utilisateur).
//
// RÈGLES STRICTES :
// - Ne JAMAIS importer ce fichier depuis un composant "use client".
// - Ne JAMAIS préfixer SUPABASE_SERVICE_ROLE_KEY par NEXT_PUBLIC_.
// - N'utiliser que dans des Server Actions ("use server"), au cas par cas,
//   jamais comme client par défaut de l'app.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
