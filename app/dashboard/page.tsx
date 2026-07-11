import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import NetWorthChart from "@/components/charts/NetWorthChart";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Récupérer le profil général
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  // Récupérer le profil financier
  const { data: finances } = await supabase
    .from("financial_profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  // Si l'utilisateur n'a pas encore rempli son profil, on l'y envoie
  if (!profile) {
    redirect("/onboarding/profil");
  }
  if (!finances) {
    redirect("/onboarding/finances");
  }

  // Calculs financiers de base
  const revenuMensuelTotal =
    Number(finances.salaire_mensuel) + Number(finances.autres_revenus);
  const depenses = Number(finances.depenses_mensuelles);
  const epargne = Number(finances.epargne_actuelle);
  const dettes = Number(finances.dettes);
  const investiMensuel = Number(finances.montant_investi_mensuel);

  const patrimoineNet = epargne - dettes;
  const soldeMensuel = revenuMensuelTotal - depenses - investiMensuel;
const epargneReelleMensuelle =
    Number(finances.montant_epargne_mensuel) || 0;
  const montantMisDeCote =
    epargneReelleMensuelle + investiMensuel + (Number(finances.montant_paiement_dettes) || 0);
  const tauxEpargne =
    revenuMensuelTotal > 0
      ? Math.round((montantMisDeCote / revenuMensuelTotal) * 100)
      : 0;
const financialInputs = {
    epargne_actuelle: epargne,
    montant_epargne_mensuel: Number(finances.montant_epargne_mensuel) || 0,
    frequence_epargne: finances.frequence_epargne || "mensuel",
    dettes: dettes,
    taux_interet_dettes: Number(finances.taux_interet_dettes),
    montant_paiement_dettes: Number(finances.montant_paiement_dettes) || 0,
    frequence_paiement_dettes: finances.frequence_paiement_dettes || "mensuel",
    montant_investi_mensuel: investiMensuel,
    rendement_annuel_estime: Number(finances.rendement_annuel_estime),
    salaire_mensuel: Number(finances.salaire_mensuel),
    autres_revenus: Number(finances.autres_revenus),
    depenses_mensuelles: depenses,
  };
  // Progression vers l'objectif financier
  const montantObjectif = Number(finances.montant_objectif) || 0;
  const progressionObjectif =
    montantObjectif > 0
      ? Math.min(100, Math.round((epargne / montantObjectif) * 100))
      : 0;

  const formatMoney = (n: number) =>
    n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });

  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
<div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {user!.email} · {profile.province}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/onboarding/profil"
              className="rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-2 px-4 text-sm font-semibold"
            >
              Modifier mon profil
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </div>

        {/* Cartes principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Valeur nette
            </p>
            <p
              className={`text-2xl font-bold ${
                patrimoineNet >= 0
                  ? "text-[var(--color-success)]"
                  : "text-[var(--color-danger)]"
              }`}
            >
              {formatMoney(patrimoineNet)}
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Revenus mensuels
            </p>
            <p className="text-2xl font-bold">
              {formatMoney(revenuMensuelTotal)}
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Dépenses mensuelles
            </p>
            <p className="text-2xl font-bold">{formatMoney(depenses)}</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Épargne actuelle
            </p>
            <p className="text-2xl font-bold">{formatMoney(epargne)}</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Dettes
            </p>
            <p className="text-2xl font-bold text-[var(--color-danger)]">
              {formatMoney(dettes)}
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Taux d&apos;épargne
            </p>
            <p className="text-2xl font-bold">{tauxEpargne}%</p>
          </div>
        </div>

        {/* Solde mensuel */}
        <div className="glass rounded-2xl p-6 mb-8">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            Solde mensuel (après dépenses et investissements)
          </p>
          <p
            className={`text-3xl font-bold ${
              soldeMensuel >= 0
                ? "text-[var(--color-success)]"
                : "text-[var(--color-danger)]"
            }`}
          >
            {formatMoney(soldeMensuel)}
          </p>
        </div>
{/* Graphique d'évolution du patrimoine */}
        <div className="mb-8">
          <NetWorthChart inputs={financialInputs} />

 <details className="glass rounded-2xl p-6 mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-[var(--color-primary)]">
              Comment ce graphique est-il calculé ?
            </summary>
            <div className="mt-4 text-sm text-[var(--color-text-secondary)] space-y-4">
              <p>
                Cette projection suppose que ta situation actuelle (salaire, dépenses,
                épargne, investissements) reste la même chaque année, sans changement.
                C&apos;est un point de départ pour voir où tu en serais en continuant comme
                aujourd&apos;hui — pas une garantie, juste une estimation.
              </p>

              <div>
                <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                  Que représente chaque courbe ?
                </p>
                <ul className="space-y-2">
                  <li>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#06b6d4] mr-2" />
                    <span className="font-medium text-[var(--color-text-primary)]">Épargne</span> —
                    l&apos;argent que tu mets de côté régulièrement dans un compte classique
                    (celui que tu as renseigné dans &quot;Épargne régulière&quot;), sans
                    rendement. C&apos;est de l&apos;argent facilement accessible, en sécurité.
                  </li>
                  <li>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#a855f7] mr-2" />
                    <span className="font-medium text-[var(--color-text-primary)]">
                      Investissements
                    </span>{" "}
                    — l&apos;argent que tu places chaque mois (CELI, REER, actions...) et qui
                    croît avec le rendement annuel que tu as estimé. C&apos;est pour ça que
                    cette courbe peut monter plus vite avec le temps : les gains génèrent
                    eux-mêmes des gains (intérêts composés).
                  </li>
                  <li>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ef4444] mr-2" />
                    <span className="font-medium text-[var(--color-text-primary)]">Dettes</span> —
                    ce qu&apos;il te reste à rembourser, basé sur ton paiement réel et le taux
                    d&apos;intérêt renseignés. Cette courbe diminue jusqu&apos;à atteindre 0.
                  </li>
                  <li>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#6366f1] mr-2" />
                    <span className="font-medium text-[var(--color-text-primary)]">
                      Valeur nette
                    </span>{" "}
                    — la somme de tout ce que tu possèdes (épargne + investissements) moins
                    ce que tu dois (dettes restantes). C&apos;est la mesure globale de ta
                    situation financière.
                  </li>
                </ul>
              </div>

              <p className="text-xs opacity-70">
                Ces calculs sont fournis à titre informatif seulement et ne remplacent pas
                les conseils d&apos;un(e) planificateur(-trice) financier(-ère) agréé(e).
              </p>
            </div>
          </details>
        </div>
        {/* Objectif financier */}
        {finances.objectif_financier && (
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">
              Objectif : {finances.objectif_financier}
            </p>
            <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)] transition-all"
                style={{ width: `${progressionObjectif}%` }}
              />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {formatMoney(epargne)} / {formatMoney(montantObjectif)} (
              {progressionObjectif}%)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}