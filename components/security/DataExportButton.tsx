"use client";

import { useState, useTransition } from "react";
import { exportUserData } from "@/app/actions/dataPrivacy";
import { buildDataExportPdf } from "@/lib/security/buildDataExportPdf";
import { useToast } from "@/components/ui/ToastProvider";
import { Analytics } from "@/lib/analytics/events";

export default function DataExportButton() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  function handleExport() {
    setError(null);
    startTransition(async () => {
      const result = await exportUserData();
      if (!result.ok) {
        setError("Impossible de générer l'export pour le moment. Réessaie dans un instant.");
        showToast("Échec de l'export de tes données.", "error");
        return;
      }
      const doc = buildDataExportPdf(result.data);
      doc.save(`mes-donnees-${new Date().toISOString().slice(0, 10)}.pdf`);
      Analytics.exportPdf();
      showToast("Tes données ont été téléchargées.", "success");
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleExport}
        disabled={isPending}
        className="rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold disabled:opacity-50"
      >
        {isPending ? "Génération en cours..." : "Télécharger mes données (PDF)"}
      </button>
      {error && <p className="text-sm text-[var(--color-danger)] mt-2">{error}</p>}
    </div>
  );
}
