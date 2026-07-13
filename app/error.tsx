"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Analytics } from "@/lib/analytics/events";

export default function ErrorPage({
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
    <main className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Quelque chose s&apos;est mal passé. Réessaie, ou reviens à l&apos;accueil si le problème
          persiste.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-2 px-4 text-sm font-semibold"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
