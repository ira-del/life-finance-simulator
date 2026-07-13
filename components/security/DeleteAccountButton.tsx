"use client";

import { useState, useTransition } from "react";
import { deleteAccount } from "@/app/actions/dataPrivacy";

export default function DeleteAccountButton() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteAccount();
      if (result.error) {
        setError("Impossible de supprimer le compte pour le moment. Réessaie dans un instant.");
      }
    });
  }

  if (!confirmOpen) {
    return (
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="rounded-lg bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/40 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20 transition py-2 px-4 text-sm font-semibold"
      >
        Supprimer mon compte
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/5 p-4">
      <p className="text-sm text-[var(--color-text-primary)] font-semibold mb-1">
        Cette action est définitive et irréversible.
      </p>
      <p className="text-sm text-[var(--color-text-secondary)] mb-3">
        Toutes tes données (profil, finances, historique, conversations) seront supprimées pour
        toujours. Pour confirmer, écris <span className="font-mono font-semibold">SUPPRIMER</span>{" "}
        ci-dessous.
      </p>
      <label htmlFor="confirmation-suppression" className="sr-only">
        Tape SUPPRIMER pour confirmer la suppression du compte
      </label>
      <input
        id="confirmation-suppression"
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-[var(--color-danger)] transition mb-3"
        placeholder="SUPPRIMER"
      />
      {error && <p className="text-sm text-[var(--color-danger)] mb-3">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={confirmText !== "SUPPRIMER" || isPending}
          className="rounded-lg bg-[var(--color-danger)] hover:opacity-90 transition py-2 px-4 text-sm font-semibold disabled:opacity-40"
        >
          {isPending ? "Suppression en cours..." : "Confirmer la suppression"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirmOpen(false);
            setConfirmText("");
            setError(null);
          }}
          disabled={isPending}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
