import Link from "next/link";
import Logo from "@/components/ui/Logo";

// Fixe (hors du flux normal) pour rester visible pendant le défilement — la
// hauteur vient de --header-height (globals.css), seule source de vérité
// partagée avec le padding-top des pages qui l'utilisent, pour que le
// contenu ne se retrouve jamais caché derrière.
export default function SiteHeader() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-white/5"
      style={{ height: "var(--header-height)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-2 px-4 text-sm font-semibold"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </header>
  );
}
