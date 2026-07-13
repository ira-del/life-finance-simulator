// Stocke le choix de consentement cookies dans le navigateur (localStorage) —
// pas besoin de base de données pour ça, et ça évite d'exposer ce choix au
// serveur. Un événement custom prévient les composants intéressés (la
// bannière et le chargeur GA) quand le choix change, sans passer par un
// Context React.
const CLE_STOCKAGE = "consentement_analytics";
export const EVENEMENT_CONSENTEMENT = "consentement-cookies-modifie";

export type EtatConsentement = "accepted" | "refused" | null;

export function lireConsentement(): EtatConsentement {
  if (typeof window === "undefined") return null;
  const valeur = window.localStorage.getItem(CLE_STOCKAGE);
  return valeur === "accepted" || valeur === "refused" ? valeur : null;
}

export function ecrireConsentement(valeur: "accepted" | "refused") {
  window.localStorage.setItem(CLE_STOCKAGE, valeur);
  window.dispatchEvent(new Event(EVENEMENT_CONSENTEMENT));
}
