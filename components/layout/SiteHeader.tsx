import Link from "next/link";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const TEXTES = {
  fr: { connexion: "Connexion", inscription: "S'inscrire" },
  en: { connexion: "Log in", inscription: "Sign up" },
};

// Fixe (hors du flux normal) pour rester visible pendant le défilement — la
// hauteur vient de --header-height (globals.css), seule source de vérité
// partagée avec le padding-top des pages qui l'utilisent, pour que le
// contenu ne se retrouve jamais caché derrière.
//
// hrefFr/hrefEn : URL de la page équivalente dans l'autre langue, pour le
// sélecteur FR/EN — l'inscription/connexion elles-mêmes restent en français
// pour l'instant (seules les pages publiques sont traduites).
export default function SiteHeader({
  locale = "fr",
  hrefFr = "/",
  hrefEn = "/en",
}: {
  locale?: "fr" | "en";
  hrefFr?: string;
  hrefEn?: string;
}) {
  const t = TEXTES[locale];

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-white/5"
      style={{ height: "var(--header-height)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} hrefFr={hrefFr} hrefEn={hrefEn} />
          <Link
            href="/login"
            className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
          >
            {t.connexion}
          </Link>
          <Link
            href="/register"
            className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-2 px-4 text-sm font-semibold"
          >
            {t.inscription}
          </Link>
        </div>
      </div>
    </header>
  );
}
