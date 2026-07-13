// Point d'entrée unique vers Google Analytics 4 (gtag.js). Toute la config
// passe par cette variable d'env — pour brancher un autre outil plus tard
// (Mixpanel, PostHog, Clarity...), ajouter un fichier voisin du même genre
// plutôt que de modifier celui-ci.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
