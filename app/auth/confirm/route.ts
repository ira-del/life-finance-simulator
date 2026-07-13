import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Gère les liens envoyés par email (réinitialisation de mot de passe,
// confirmation d'inscription) — établit la session puis redirige vers la
// page suivante (ex: /reset-password). Supporte les deux façons dont
// Supabase peut renvoyer l'utilisateur ici :
// - `code` (flux PKCE) : c'est le cas avec le modèle d'email PAR DÉFAUT de
//   Supabase, sans rien avoir à configurer côté tableau de bord.
// - `token_hash` + `type` : uniquement si le modèle d'email a été
//   personnalisé pour pointer directement vers cette route (nécessite un
//   SMTP personnalisé sur Supabase, donc pas utilisé ici).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next");
  // N'accepte qu'un chemin relatif de notre propre site — "//evil.com" est
  // interprété par certains navigateurs comme une redirection vers un autre
  // hôte (URL relative au protocole), donc explicitement rejeté ici.
  const next = nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
    ? nextParam
    : "/dashboard";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent(
      "Ce lien est invalide ou a expiré. Réessaie."
    )}`
  );
}
