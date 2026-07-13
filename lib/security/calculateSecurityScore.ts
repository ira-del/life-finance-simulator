export interface SecurityScoreInputs {
  emailVerifie: boolean;
  derniereConnexion: string | null;
  dernierChangementMotDePasse: string | null;
}

export interface SecurityCritere {
  label: string;
  ok: boolean;
}

export interface SecurityScoreResult {
  score: number;
  niveau: "Faible" | "Moyen" | "Bon" | "Excellent";
  couleur: string;
  criteres: SecurityCritere[];
  recommandations: string[];
}

const UN_JOUR_MS = 1000 * 60 * 60 * 24;

// Score basé uniquement sur des signaux qu'on peut réellement vérifier
// aujourd'hui — pas de fausse précision sur des protections qui n'existent
// pas encore (2FA, appareils, etc. arriveront dans une prochaine itération
// et pourront s'ajouter ici sans tout recalculer).
export function calculateSecurityScore(inputs: SecurityScoreInputs): SecurityScoreResult {
  let score = 0;
  const criteres: SecurityCritere[] = [];
  const recommandations: string[] = [];

  if (inputs.emailVerifie) {
    score += 40;
    criteres.push({ label: "Adresse email vérifiée", ok: true });
  } else {
    criteres.push({ label: "Adresse email non vérifiée", ok: false });
    recommandations.push("Vérifie ton adresse email pour sécuriser la récupération de ton compte.");
  }

  const joursDepuisConnexion = inputs.derniereConnexion
    ? (Date.now() - new Date(inputs.derniereConnexion).getTime()) / UN_JOUR_MS
    : Infinity;
  if (joursDepuisConnexion <= 30) {
    score += 30;
    criteres.push({ label: "Connexion récente au compte", ok: true });
  } else {
    criteres.push({ label: "Pas de connexion récente", ok: false });
  }

  const joursDepuisMdp = inputs.dernierChangementMotDePasse
    ? (Date.now() - new Date(inputs.dernierChangementMotDePasse).getTime()) / UN_JOUR_MS
    : Infinity;
  if (joursDepuisMdp <= 365) {
    score += 30;
    criteres.push({ label: "Mot de passe modifié dans la dernière année", ok: true });
  } else {
    criteres.push({ label: "Mot de passe inchangé depuis plus d'un an", ok: false });
    recommandations.push("Envisage de changer ton mot de passe régulièrement.");
  }

  score = Math.max(0, Math.min(100, score));

  let niveau: SecurityScoreResult["niveau"] = "Faible";
  let couleur = "#ef4444";
  if (score >= 90) {
    niveau = "Excellent";
    couleur = "#10b981";
  } else if (score >= 70) {
    niveau = "Bon";
    couleur = "#10b981";
  } else if (score >= 40) {
    niveau = "Moyen";
    couleur = "#f59e0b";
  }

  if (recommandations.length === 0) {
    recommandations.push("Continue comme ça — ton compte est bien protégé.");
  }

  return { score, niveau, couleur, criteres, recommandations };
}
