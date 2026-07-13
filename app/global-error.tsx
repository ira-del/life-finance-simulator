"use client";

import { useEffect } from "react";
import { Analytics } from "@/lib/analytics/events";

// Filet de sécurité pour les erreurs qui cassent la mise en page racine
// elle-même (app/error.tsx ne peut pas les intercepter) — doit fournir ses
// propres balises <html>/<body> puisqu'il remplace tout le layout.
export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Analytics.erreurRencontree(error.message, window.location.pathname);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#0a0e17", color: "#f8fafc" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
              Une erreur est survenue
            </h1>
            <button
              type="button"
              onClick={reset}
              style={{
                borderRadius: "0.5rem",
                background: "#6366f1",
                color: "white",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              Réessayer
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
