import Link from "next/link";

export default function CompteSupprimePage() {
  return (
    <main className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Compte supprimé</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Ton compte et toutes tes données ont été définitivement supprimés. Merci d&apos;avoir
          essayé Assistant Vie Canada.
        </p>
        <Link
          href="/"
          className="link-button inline-block rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-2 px-6 font-semibold"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
