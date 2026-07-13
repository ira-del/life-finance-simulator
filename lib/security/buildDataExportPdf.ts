import { jsPDF } from "jspdf";
import type { DonneesExport } from "@/app/actions/dataPrivacy";

const LABELS_TABLES: Record<string, string> = {
  profiles: "Profil général",
  financial_profiles: "Situation financière",
  checklist_progress: "Étapes complétées",
  badges_earned: "Badges obtenus",
  dismissed_alerts: "Alertes ignorées",
  health_snapshots: "Historique du score de santé",
  assistant_conversations: "Conversations avec l'Assistant IA",
  assistant_messages: "Messages de l'Assistant IA",
  ai_usage_log: "Utilisation des fonctionnalités IA",
  activity_log: "Journal d'activité du compte",
};

// Les noms de colonnes en base sont des identifiants techniques sans accent
// (ex: "depenses_mensuelles") — on donne un vrai libellé français pour
// chaque champ connu plutôt que de simplement remplacer les "_" par des
// espaces, ce qui donnait des libellés incomplets ("Depenses mensuelles").
const LABELS_CHAMPS: Record<string, string> = {
  email: "Email",
  cree_le: "Créé le",
  derniere_connexion: "Dernière connexion",
  email_verifie: "Email vérifié",
  created_at: "Créé le",
  updated_at: "Mis à jour le",
  age: "Âge",
  province: "Province",
  statut_immigration: "Statut d'immigration",
  situation_familiale: "Situation familiale",
  situation_professionnelle: "Situation professionnelle",
  a_des_enfants: "A des enfants",
  langues_parlees: "Langues parlées",
  salaire_mensuel: "Salaire mensuel ($)",
  autres_revenus: "Autres revenus ($)",
  depenses_mensuelles: "Dépenses mensuelles ($)",
  epargne_actuelle: "Épargne actuelle ($)",
  dettes: "Dettes ($)",
  taux_interet_dettes: "Taux d'intérêt des dettes (%)",
  montant_paiement_dettes: "Paiement des dettes ($)",
  frequence_paiement_dettes: "Fréquence de paiement des dettes",
  montant_investi_mensuel: "Montant investi par mois ($)",
  rendement_annuel_estime: "Rendement annuel estimé (%)",
  objectif_financier: "Objectif financier",
  montant_objectif: "Montant de l'objectif ($)",
  montant_epargne_mensuel: "Épargne mensuelle ($)",
  frequence_epargne: "Fréquence d'épargne",
  chiffre_affaires_mensuel: "Chiffre d'affaires mensuel ($)",
  benefices_mensuels: "Bénéfices mensuels ($)",
  taxes_a_payer_estimees: "Taxes à payer estimées ($)",
  montant_bourse_mensuel: "Bourse mensuelle ($)",
  programme_etudes: "Programme d'études",
  progression_etudes: "Progression des études",
  montant_pension_mensuel: "Pension mensuelle ($)",
  age_retraite_prevu: "Âge de retraite prévu",
  step_id: "Étape",
  completed_at: "Complétée le",
  badge_id: "Badge",
  earned_at: "Obtenu le",
  alert_id: "Alerte",
  dismissed_at: "Ignorée le",
  snapshot_date: "Date",
  health_score: "Score de santé",
  patrimoine_net: "Valeur nette ($)",
  epargne: "Épargne ($)",
  title: "Titre",
  action: "Action",
  description: "Description",
  role: "Rôle",
  content: "Contenu",
  success: "Réussi",
};

// Champs techniques peu utiles à lire dans un export destiné à un humain.
const CLES_MASQUEES = new Set(["id", "user_id", "conversation_id"]);

function formaterCle(cle: string): string {
  if (LABELS_CHAMPS[cle]) return LABELS_CHAMPS[cle];
  const texte = cle.replace(/_/g, " ");
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

function formaterValeur(valeur: unknown): string {
  if (valeur === null || valeur === undefined || valeur === "") return "—";
  if (typeof valeur === "boolean") return valeur ? "Oui" : "Non";
  if (typeof valeur === "string" && /^\d{4}-\d{2}-\d{2}/.test(valeur)) {
    const date = new Date(valeur);
    if (!isNaN(date.getTime())) {
      return date.toLocaleString("fr-CA", { dateStyle: "medium", timeStyle: "short" });
    }
  }
  return String(valeur);
}

export function buildDataExportPdf(donnees: DonneesExport): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margeGauche = 15;
  const largeurPage = doc.internal.pageSize.getWidth();
  const hauteurPage = doc.internal.pageSize.getHeight();
  const largeurTexte = largeurPage - margeGauche * 2;
  let y = 20;

  function sautDeLigne(hauteur = 6.5) {
    y += hauteur;
    if (y > hauteurPage - 20) {
      doc.addPage();
      y = 20;
    }
  }

  function titre(texte: string) {
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(texte, margeGauche, y);
    sautDeLigne(10);
  }

  function sousTitre(texte: string) {
    if (y > hauteurPage - 30) {
      doc.addPage();
      y = 20;
    }
    sautDeLigne(4);
    doc.setDrawColor(230, 230, 230);
    doc.line(margeGauche, y - 4, largeurPage - margeGauche, y - 4);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 60, 220);
    doc.text(texte, margeGauche, y);
    doc.setTextColor(20, 20, 20);
    sautDeLigne(8);
  }

  // Le décalage horizontal de la valeur doit être mesuré AVEC la police
  // grasse (celle utilisée pour dessiner l'étiquette) — sinon la valeur,
  // mesurée avec la police normale (plus étroite), empiète sur la fin de
  // l'étiquette puisque le texte réellement dessiné est plus large que
  // ce qui a été mesuré.
  function ligneCleValeur(cle: string, valeur: string) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const etiquette = `${cle} :  `;
    doc.text(etiquette, margeGauche, y);
    const decalage = doc.getTextWidth(etiquette);

    doc.setFont("helvetica", "normal");
    const texteValeur = doc.splitTextToSize(valeur, Math.max(20, largeurTexte - decalage));
    doc.text(texteValeur[0] ?? "", margeGauche + decalage, y);
    sautDeLigne();
    for (let i = 1; i < texteValeur.length; i++) {
      doc.text(texteValeur[i], margeGauche + decalage, y);
      sautDeLigne();
    }
  }

  function paragraphe(texte: string) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lignes = doc.splitTextToSize(texte, largeurTexte);
    for (const ligne of lignes) {
      doc.text(ligne, margeGauche, y);
      sautDeLigne(5.5);
    }
  }

  function numeroEnregistrement(n: number) {
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(140, 140, 140);
    doc.text(`Entrée ${n}`, margeGauche, y);
    doc.setTextColor(20, 20, 20);
    sautDeLigne(5.5);
  }

  titre("Mes données — Assistant Vie Canada");
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Généré le ${new Date(donnees.export_genere_le).toLocaleString("fr-CA", {
      dateStyle: "long",
      timeStyle: "short",
    })}`,
    margeGauche,
    y
  );
  doc.setTextColor(20, 20, 20);
  sautDeLigne(10);

  sousTitre("Compte");
  ligneCleValeur("Email", donnees.compte.email ?? "—");
  ligneCleValeur("Créé le", formaterValeur(donnees.compte.cree_le));
  ligneCleValeur("Dernière connexion", formaterValeur(donnees.compte.derniere_connexion));
  ligneCleValeur("Email vérifié", donnees.compte.email_verifie ? "Oui" : "Non");

  for (const [table, lignes] of Object.entries(donnees.tables)) {
    if (lignes.length === 0) continue;

    sousTitre(LABELS_TABLES[table] ?? formaterCle(table));

    // Les messages de l'assistant se lisent mieux comme une conversation
    // plutôt qu'une liste de champs techniques.
    if (table === "assistant_messages") {
      for (const ligne of lignes) {
        const role = ligne.role === "user" ? "Toi" : "Assistant";
        paragraphe(`${role} (${formaterValeur(ligne.created_at)}) :`);
        paragraphe(String(ligne.content ?? ""));
        sautDeLigne(4);
      }
      continue;
    }

    lignes.forEach((ligne, index) => {
      if (lignes.length > 1) numeroEnregistrement(index + 1);
      for (const [cle, valeur] of Object.entries(ligne)) {
        if (CLES_MASQUEES.has(cle)) continue;
        ligneCleValeur(formaterCle(cle), formaterValeur(valeur));
      }
      if (index < lignes.length - 1) sautDeLigne(4);
    });
  }

  return doc;
}
