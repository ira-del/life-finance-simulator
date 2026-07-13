import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DataExportButton from "@/components/security/DataExportButton";
import DeleteAccountButton from "@/components/security/DeleteAccountButton";
import InactivityLogout from "@/components/security/InactivityLogout";

export default async function MesDonneesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <InactivityLogout />
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mes données</h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Consulte, exporte ou supprime tes données personnelles
            </p>
          </div>
          <Link
            href="/securite"
            className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
          >
            ← Sécurité
          </Link>
        </div>

        <div className="glass rounded-2xl p-6 mb-6">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">
            Ce que nous conservons
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Ton profil (âge, province, statut, situation familiale et professionnelle), ta
            situation financière (revenus, dépenses, épargne, dettes, objectifs), ta progression
            (badges, étapes complétées, historique de ton score), tes conversations avec
            l&apos;Assistant IA, et un journal des actions importantes sur ton compte. Rien de tout
            ça n&apos;est partagé avec des tiers.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 mb-6">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">
            Télécharger mes données
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Récupère une copie complète de tes données dans un document PDF lisible.
          </p>
          <DataExportButton />
        </div>

        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-semibold text-[var(--color-danger)] mb-2">
            Supprimer mon compte
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Supprime définitivement ton compte et toutes tes données. Cette action ne peut pas
            être annulée.
          </p>
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}
