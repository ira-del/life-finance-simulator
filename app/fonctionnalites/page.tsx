import Link from "next/link";
import Logo from "@/components/ui/Logo";
import JsonLd from "@/components/seo/JsonLd";
import { FEATURES } from "@/lib/content/features";

export const metadata = {
  title: "Fonctionnalités",
  description:
    "Découvre en détail les 8 fonctionnalités d'Assistant Vie Canada : gestion financière, assistant IA, projections, objectifs, sécurité et plus.",
  alternates: { canonical: "/fonctionnalites" },
};

export default function FonctionnalitesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: FEATURES.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.titre,
      description: f.description,
    })),
  };

  return (
    <main className="min-h-screen gradient-bg">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <header className="flex items-center justify-between py-6">
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
        </header>

        <section className="text-center py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Huit outils pour piloter ta vie financière
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Chaque module d&apos;Assistant Vie Canada répond à un besoin précis. Voici comment ils
            fonctionnent concrètement.
          </p>
        </section>

        {/* Navigation rapide vers chaque module */}
        <nav
          aria-label="Navigation des fonctionnalités"
          className="flex flex-wrap justify-center gap-2 pb-12"
        >
          {FEATURES.map((f) => (
            <a
              key={f.slug}
              href={`#${f.slug}`}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition py-1.5 px-4 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              {f.titre}
            </a>
          ))}
        </nav>

        <div className="space-y-6 pb-16">
          {FEATURES.map((f) => (
            <section
              key={f.slug}
              id={f.slug}
              className="glass rounded-2xl p-6 md:p-8 scroll-mt-20"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${f.color}22` }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: f.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {f.icon}
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{f.titre}</h2>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                    {f.description}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed opacity-90">
                    {f.descriptionLongue}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="pb-16">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Prêt(e) à essayer ?</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Crée ton compte gratuitement et commence ta première simulation en quelques minutes.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
              >
                Essayer maintenant
              </Link>
              <Link
                href="/register"
                className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-3 px-8 text-base font-semibold"
              >
                Faire ma première simulation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
