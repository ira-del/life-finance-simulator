import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-10 max-w-md w-full text-center">
        <p className="text-6xl font-bold text-[var(--color-primary)] mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Page introuvable</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          La page que tu cherches n&apos;existe pas ou a été déplacée.
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
