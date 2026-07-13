import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SiteHeader from "@/components/layout/SiteHeader";
import JsonLd from "@/components/seo/JsonLd";
import { FEATURES } from "@/lib/content/features";

export const metadata = {
  alternates: { canonical: "/" },
};

const AVANTAGES = [
  "Analyse personnalisée, pas des conseils génériques",
  "IA intelligente qui comprend ta situation réelle",
  "Données chiffrées et sous ton contrôle total",
  "Simulations réalistes sur 10 à 100 ans",
  "Vision à long terme de ton avenir financier",
  "Recommandations adaptées à ta province et ton statut",
];

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Assistant Vie Canada",
    url: "https://assistantvie.com",
    description:
      "Simule ton avenir financier, obtiens des conseils personnalisés par IA, et découvre les aides auxquelles tu as droit au Canada.",
    inLanguage: "fr-CA",
    publisher: {
      "@type": "Organization",
      name: "Assistant Vie Canada",
      url: "https://assistantvie.com",
    },
  };

  return (
    <main className="min-h-screen gradient-bg pt-[var(--header-height)]">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Hero */}
        <section className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Prends les meilleures décisions pour ton avenir, grâce à l&apos;IA
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-10">
              Simule ton avenir financier, obtiens des conseils personnalisés par IA, et découvre
              les aides auxquelles tu as droit — le tout adapté à ta province et à ton statut au
              Canada.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <Link
                href="/register"
                className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/fonctionnalites"
                className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-3 px-8 text-base font-semibold"
              >
                Découvrir les fonctionnalités
              </Link>
            </div>
          </div>

          {/* Illustration abstraite (SVG inline, pas d'image externe à charger) */}
          <div className="hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 480 340" className="w-full h-auto">
              <defs>
                <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="480" height="340" rx="24" fill="white" fillOpacity="0.04" />
              <path
                d="M40 260 L120 200 L190 230 L260 130 L330 160 L440 70"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40 260 L120 200 L190 230 L260 130 L330 160 L440 70 L440 300 L40 300 Z"
                fill="url(#heroFill)"
              />
              {[
                { x: 40, y: 260, c: "var(--color-primary)" },
                { x: 120, y: 200, c: "var(--color-secondary)" },
                { x: 190, y: 230, c: "var(--color-primary)" },
                { x: 260, y: 130, c: "var(--color-accent)" },
                { x: 330, y: 160, c: "var(--color-secondary)" },
                { x: 440, y: 70, c: "var(--color-success)" },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="6" fill={p.c} />
              ))}
            </svg>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section className="py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Tout ce qu&apos;il te faut pour piloter ton avenir
          </h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Huit outils pensés pour te donner une vision complète et concrète de ta situation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.slug} className="glass rounded-2xl p-6">
                <svg
                  className="w-9 h-9 mb-4"
                  style={{ color: f.color }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {f.icon}
                </svg>
                <p className="font-semibold mb-2">{f.titre}</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/fonctionnalites"
              className="text-sm text-[var(--color-secondary)] hover:underline"
            >
              Voir le détail de chaque fonctionnalité →
            </Link>
          </div>
        </section>

        {/* Pourquoi choisir Assistant Vie Canada */}
        <section className="py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Pourquoi choisir Assistant Vie Canada
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {AVANTAGES.map((avantage) => (
              <div key={avantage} className="glass rounded-xl p-4 flex items-start gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-success)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-[var(--color-text-secondary)]">{avantage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Appel à l'action final */}
        <section className="py-12 md:py-16">
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt(e) à découvrir ta situation financière ?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Crée ton compte gratuitement et obtiens ton score de santé financière en quelques
              minutes.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
              >
                Créer un compte gratuitement
              </Link>
              <Link
                href="/register"
                className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-3 px-8 text-base font-semibold"
              >
                Découvrir mon score financier
              </Link>
            </div>
          </div>
        </section>

        {/* Avertissement — le pied de page complet (liens, copyright) est
            partagé sur tout le site via app/layout.tsx */}
        <p className="pb-10 text-center text-xs text-[var(--color-text-secondary)] opacity-70">
          Assistant Vie Canada fournit des informations générales à titre éducatif — ce n&apos;est
          pas un avis professionnel (financier, juridique, fiscal ou d&apos;immigration).
        </p>
      </div>
    </main>
  );
}
