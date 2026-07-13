import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { calculateSecurityScore } from "@/lib/security/calculateSecurityScore";
import InactivityLogout from "@/components/security/InactivityLogout";

export const metadata = { title: "Sécurité" };

const LABELS_ACTIVITE: Record<string, string> = {
  connexion: "Connexion réussie",
  inscription: "Compte créé",
  deconnexion: "Déconnexion",
  mot_de_passe_modifie: "Mot de passe modifié",
  profil_modifie: "Profil général modifié",
  finances_modifiees: "Profil financier modifié",
  donnees_exportees: "Données personnelles exportées",
  compte_supprime: "Compte supprimé",
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Jamais";
  return new Date(iso).toLocaleString("fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function SecuritePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: dernierChangement }, { data: activitesRecentes }] = await Promise.all([
    supabase
      .from("activity_log")
      .select("created_at")
      .eq("user_id", user!.id)
      .eq("action", "mot_de_passe_modifie")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("activity_log")
      .select("action, description, created_at")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const resultat = calculateSecurityScore({
    emailVerifie: user!.email_confirmed_at !== null && user!.email_confirmed_at !== undefined,
    derniereConnexion: user!.last_sign_in_at ?? null,
    dernierChangementMotDePasse: dernierChangement?.created_at ?? user!.created_at,
  });

  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <InactivityLogout />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Sécurité</h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              L&apos;état de protection de ton compte
            </p>
          </div>
          <Link
            href="/dashboard"
            className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
          >
            ← Tableau de bord
          </Link>
        </div>

        {/* Score de sécurité */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-shrink-0 flex flex-col items-center mx-auto md:mx-0">
              <div
                className="relative w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(${resultat.couleur} ${resultat.score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                }}
              >
                <div className="absolute inset-2 rounded-full bg-[var(--color-surface)] flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{resultat.score}</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">/ 100</span>
                </div>
              </div>
              <p className="text-sm mt-3 text-center max-w-[160px]">
                <span style={{ color: resultat.couleur }} className="font-medium">
                  Protection : {resultat.niveau}
                </span>
              </p>
            </div>

            <div className="flex-1 w-full">
              <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">
                Critères évalués
              </p>
              <ul className="space-y-2 mb-4">
                {resultat.criteres.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-sm">
                    <span
                      className={c.ok ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"}
                    >
                      {c.ok ? "✓" : "!"}
                    </span>
                    <span className="text-[var(--color-text-secondary)]">{c.label}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Recommandations
              </p>
              <ul className="space-y-1.5">
                {resultat.recommandations.map((r, i) => (
                  <li key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    • {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Infos du compte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">Dernière connexion</p>
            <p className="text-lg font-semibold">{formatDate(user!.last_sign_in_at)}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Dernière modification du mot de passe
            </p>
            <p className="text-lg font-semibold">
              {dernierChangement?.created_at
                ? formatDate(dernierChangement.created_at)
                : "Depuis la création du compte"}
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Adresse email vérifiée
            </p>
            <p className="text-lg font-semibold">
              {user!.email_confirmed_at ? "Oui" : "Non"}
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Authentification à deux facteurs
            </p>
            <p className="text-lg font-semibold text-[var(--color-text-secondary)]">
              Bientôt disponible
            </p>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="glass rounded-2xl p-6 mb-8">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-4">
            Activités récentes
          </p>
          {activitesRecentes && activitesRecentes.length > 0 ? (
            <ul className="space-y-3">
              {activitesRecentes.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <span>{a.description || LABELS_ACTIVITE[a.action] || a.action}</span>
                  <span className="text-[var(--color-text-secondary)] text-xs">
                    {formatDate(a.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">
              Aucune activité enregistrée pour l&apos;instant.
            </p>
          )}
        </div>

        {/* Mes données */}
        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">Mes données</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Télécharge une copie de tes données ou supprime définitivement ton compte.
          </p>
          <Link
            href="/mes-donnees"
            className="link-button inline-block rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
          >
            Gérer mes données →
          </Link>
        </div>
      </div>
    </main>
  );
}
