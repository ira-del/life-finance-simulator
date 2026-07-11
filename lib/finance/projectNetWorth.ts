export interface FinancialInputs {
  epargne_actuelle: number;
  montant_epargne_mensuel: number;
  frequence_epargne: string;
  dettes: number;
  taux_interet_dettes: number; // en %
  montant_paiement_dettes: number;
  frequence_paiement_dettes: string;
  montant_investi_mensuel: number;
  rendement_annuel_estime: number; // en %
  salaire_mensuel: number;
  autres_revenus: number;
  depenses_mensuelles: number;
}

export interface YearProjection {
  annee: number;
  epargne: number;
  dettes: number;
  investissements: number;
  patrimoineNet: number;
}

// Convertit un montant selon sa fréquence réelle en équivalent mensuel
function montantMensuel(montant: number, frequence: string): number {
  switch (frequence) {
    case "hebdomadaire":
      return (montant * 52) / 12;
    case "aux_2_semaines":
      return (montant * 26) / 12;
    case "mensuel":
    default:
      return montant;
  }
}

export function projectNetWorth(
  inputs: FinancialInputs,
  years: number = 40
): YearProjection[] {
  const results: YearProjection[] = [];

  let epargne = inputs.epargne_actuelle;
  let dettes = inputs.dettes;
  let investissements = 0;

  const tauxDettesMensuel = inputs.taux_interet_dettes / 100 / 12;
  const rendementAnnuel = inputs.rendement_annuel_estime / 100;

  // Chaque flux est indépendant : dette, épargne et investissement se font EN PARALLÈLE,
  // pas l'un après l'autre. C'est à l'utilisateur de s'assurer que son budget le permet.
  const mensualiteDette = montantMensuel(
    inputs.montant_paiement_dettes,
    inputs.frequence_paiement_dettes
  );
  const epargneMensuelle = montantMensuel(
    inputs.montant_epargne_mensuel,
    inputs.frequence_epargne
  );

  for (let year = 0; year <= years; year++) {
    if (year > 0) {
      for (let month = 0; month < 12; month++) {
        // Dette : intérêts puis remboursement
        if (dettes > 0) {
          const interets = dettes * tauxDettesMensuel;
          const remboursementReel = Math.min(mensualiteDette, dettes + interets);
          dettes = Math.max(dettes + interets - remboursementReel, 0);
        }

        // Épargne : s'accumule chaque mois, indépendamment de la dette
        epargne += epargneMensuelle;

        // Investissements : versement mensuel
        investissements += inputs.montant_investi_mensuel;
      }
      // Croissance composée annuelle des investissements
      investissements = investissements * (1 + rendementAnnuel);
    }

    results.push({
      annee: year,
      epargne: Math.round(epargne),
      dettes: Math.round(dettes),
      investissements: Math.round(investissements),
      patrimoineNet: Math.round(epargne + investissements - dettes),
    });
  }

  return results;
}