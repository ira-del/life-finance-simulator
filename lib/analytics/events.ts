// Liste centrale des événements suivis dans l'app. Un seul endroit à
// modifier pour renommer/ajouter un événement — les composants appellent
// ces fonctions plutôt que trackEvent() directement.
import { trackEvent } from "./gtag";

export const Analytics = {
  inscription: () => trackEvent("sign_up", { method: "email" }),
  connexion: () => trackEvent("login", { method: "email" }),
  deconnexion: () => trackEvent("logout"),
  onboardingTermine: () => trackEvent("onboarding_complete"),
  objectifAjoute: () => trackEvent("goal_added"),
  objectifSupprime: () => trackEvent("goal_deleted"),
  simulationLancee: (params?: Record<string, unknown>) =>
    trackEvent("simulation_started", params),
  questionIA: () => trackEvent("ai_question_asked"),
  exportPdf: () => trackEvent("pdf_export"),
  erreurRencontree: (message: string, page?: string) =>
    trackEvent("error_encountered", { message, page }),
};
