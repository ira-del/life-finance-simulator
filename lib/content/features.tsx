// Contenu partagé entre la page d'accueil (aperçu condensé) et la page
// /fonctionnalites (description complète), en français ET en anglais — un
// seul endroit à modifier pour changer le texte ou l'icône d'une
// fonctionnalité, dans les deux langues à la fois.
export interface FeatureText {
  titre: string;
  description: string;
  descriptionLongue: string;
}

export interface Feature {
  slug: string;
  slugEn: string;
  color: string;
  icon: React.ReactNode;
  fr: FeatureText;
  en: FeatureText;
}

export const FEATURES: Feature[] = [
  {
    slug: "gestion-financiere",
    slugEn: "financial-management",
    color: "#6366f1",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z M7 15h4"
      />
    ),
    fr: {
      titre: "Gestion financière",
      description:
        "Centralise revenus, dépenses, épargne, dettes et investissements en un seul endroit clair.",
      descriptionLongue:
        "Renseigne ta situation une fois — salaire, autres revenus, dépenses mensuelles, épargne actuelle, dettes et investissements — et retrouve tout organisé sur ton tableau de bord. Modifie-la à tout moment, tes projections et ton score se recalculent automatiquement.",
    },
    en: {
      titre: "Financial Management",
      description:
        "Centralize income, expenses, savings, debts and investments in one clear place.",
      descriptionLongue:
        "Enter your situation once — salary, other income, monthly expenses, current savings, debts and investments — and find everything organized on your dashboard. Update it anytime and your projections and score recalculate automatically.",
    },
  },
  {
    slug: "assistant-ia",
    slugEn: "ai-assistant",
    color: "#10b981",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.5 0-2.91-.32-4.14-.9L3 20l1.1-3.6C3.4 15.1 3 13.6 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    ),
    fr: {
      titre: "Assistant IA",
      description:
        "Un assistant conversationnel pour réfléchir à tes décisions financières, professionnelles, administratives et personnelles.",
      descriptionLongue:
        "Décris librement ta situation — un choix de carrière, une question sur un programme d'immigration, une décision financière — et obtiens une réponse structurée : diagnostic, options avec avantages/inconvénients, démarches concrètes. Ton historique de conversations est conservé et consultable à tout moment.",
    },
    en: {
      titre: "AI Assistant",
      description:
        "A conversational assistant to help you think through financial, professional, administrative and personal decisions.",
      descriptionLongue:
        "Describe your situation freely — a career choice, a question about an immigration program, a financial decision — and get a structured answer: a diagnosis, options with pros/cons, and concrete next steps. Your conversation history is saved and available anytime.",
    },
  },
  {
    slug: "projection-financiere",
    slugEn: "financial-projection",
    color: "#06b6d4",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6"
      />
    ),
    fr: {
      titre: "Projection financière",
      description:
        "Visualise l'évolution de ton épargne, tes dettes et tes investissements sur 10 à 100 ans.",
      descriptionLongue:
        "Un graphique interactif projette ta valeur nette (épargne, investissements, dettes) sur la durée de ton choix — de quelques mois à un siècle. Compare plusieurs courbes en même temps et clique sur un point pour voir le détail exact à cette date.",
    },
    en: {
      titre: "Financial Projection",
      description:
        "Visualize how your savings, debts and investments evolve over 10 to 100 years.",
      descriptionLongue:
        "An interactive chart projects your net worth (savings, investments, debts) over the timeframe you choose — from a few months to a century. Compare several curves at once and click a point to see the exact detail for that date.",
    },
  },
  {
    slug: "objectifs-de-vie",
    slugEn: "life-goals",
    color: "#f59e0b",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    ),
    fr: {
      titre: "Objectifs de vie",
      description:
        "Fixe un objectif financier concret et suis en temps réel combien de temps il te faudra pour l'atteindre.",
      descriptionLongue:
        "Définis un montant cible (achat d'une maison, fonds d'urgence, projet personnel) et vois immédiatement combien de temps il te faudra à ton rythme d'épargne actuel — avec une alerte si l'objectif est irréaliste au rythme actuel, et des suggestions pour l'atteindre plus vite.",
    },
    en: {
      titre: "Life Goals",
      description:
        "Set a concrete financial goal and track in real time how long it'll take to reach it.",
      descriptionLongue:
        "Set a target amount (buying a home, an emergency fund, a personal project) and see right away how long it'll take at your current savings rate — with a warning if the goal is unrealistic at that pace, and suggestions to reach it faster.",
    },
  },
  {
    slug: "analyse-personnalisee",
    slugEn: "personalized-analysis",
    color: "#a855f7",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
      />
    ),
    fr: {
      titre: "Analyse personnalisée",
      description:
        "Un conseiller IA qui génère des conseils à partir de ta situation réelle, pas des généralités.",
      descriptionLongue:
        "À partir de ton profil complet, le conseiller IA identifie tes points forts et tes priorités, et propose des prochaines étapes concrètes — pas des conseils financiers génériques trouvés sur n'importe quel blog, mais une lecture de TA situation précise.",
    },
    en: {
      titre: "Personalized Analysis",
      description:
        "An AI advisor that generates advice from your real situation, not generic tips.",
      descriptionLongue:
        "Based on your full profile, the AI advisor identifies your strengths and priorities, and suggests concrete next steps — not generic financial advice found on any blog, but a read on YOUR specific situation.",
    },
  },
  {
    slug: "securite-des-donnees",
    slugEn: "data-security",
    color: "#ef4444",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zM9 12l2 2 4-4"
      />
    ),
    fr: {
      titre: "Sécurité des données",
      description:
        "Chiffrement, accès restreint et contrôle total : consulte, exporte ou supprime tes données à tout moment.",
      descriptionLongue:
        "Toutes les communications sont chiffrées, ton mot de passe n'est jamais stocké en clair, et des règles de sécurité au niveau de la base de données empêchent quiconque d'autre d'accéder à tes informations. Depuis la page Sécurité, suis un score de sécurité réel, consulte ton journal d'activité, exporte toutes tes données en PDF ou supprime ton compte définitivement.",
    },
    en: {
      titre: "Data Security",
      description:
        "Encryption, restricted access and full control: view, export or delete your data anytime.",
      descriptionLongue:
        "All communications are encrypted, your password is never stored in plain text, and database-level security rules prevent anyone else from accessing your information. From the Security page, track a real security score, review your activity log, export all your data as a PDF, or permanently delete your account.",
    },
  },
  {
    slug: "opportunites-adaptees",
    slugEn: "tailored-opportunities",
    color: "#eab308",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8M2 7h20v5H2V7zM12 22V7M12 7c0-1.657-1.343-4-3-4S6 5.343 6 7h6zm0 0c0-1.657 1.343-4 3-4s3 2.343 3 4h-6z"
      />
    ),
    fr: {
      titre: "Opportunités adaptées",
      description:
        "Découvre les aides, bourses et crédits d'impôt auxquels tu pourrais être admissible selon ta province.",
      descriptionLongue:
        "En fonction de ta province, ton statut d'immigration et ta situation (études, emploi, famille), une liste d'aides gouvernementales, bourses et crédits d'impôt potentiellement pertinents t'est proposée — avec des liens vers les vrais organismes officiels, jamais générés ou inventés.",
    },
    en: {
      titre: "Tailored Opportunities",
      description:
        "Discover the benefits, scholarships and tax credits you might be eligible for based on your province.",
      descriptionLongue:
        "Based on your province, immigration status and situation (studies, employment, family), you get a list of potentially relevant government benefits, scholarships and tax credits — with links to real official organizations, never invented or generated.",
    },
  },
  {
    slug: "scenarios-de-vie",
    slugEn: "life-scenarios",
    color: "#ec4899",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 3v12a3 3 0 003 3h9m-9-9a3 3 0 100-6 3 3 0 000 6zm12 6a3 3 0 11-6 0 3 3 0 016 0zm-6-9a3 3 0 116 0 3 3 0 01-6 0z"
      />
    ),
    fr: {
      titre: "Scénarios de vie",
      description:
        "Compare plusieurs rythmes d'épargne et scénarios pour voir leur impact concret sur ton avenir.",
      descriptionLongue:
        "Compare ton rythme d'épargne actuel à un effort modéré ou soutenu, ou entre un montant personnalisé, et vois immédiatement l'impact sur le temps nécessaire pour atteindre tes objectifs — utile pour décider si une augmentation de salaire ou une réduction de dépenses vaut la peine.",
    },
    en: {
      titre: "Life Scenarios",
      description:
        "Compare different savings paces and scenarios to see their real impact on your future.",
      descriptionLongue:
        "Compare your current savings pace to a moderate or strong effort, or a custom amount, and immediately see the impact on the time needed to reach your goals — useful for deciding whether a raise or lower expenses is worth it.",
    },
  },
];
