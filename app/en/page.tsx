import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SiteHeader from "@/components/layout/SiteHeader";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";
import JsonLd from "@/components/seo/JsonLd";
import { FEATURES } from "@/lib/content/features";

export const metadata = {
  title: { absolute: "Assistant Vie Canada — Your financial life assistant for Canada" },
  description:
    "Simulate your financial future, get personalized AI advice, and discover the benefits you're entitled to in Canada.",
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
};

const ADVANTAGES = [
  "Personalized analysis, not generic advice",
  "Smart AI that understands your real situation",
  "Encrypted data, fully under your control",
  "Realistic simulations over 10 to 100 years",
  "Long-term vision of your financial future",
  "Recommendations tailored to your province and status",
];

export default async function HomeEn() {
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
    url: "https://assistantvie.com/en",
    description:
      "Simulate your financial future, get personalized AI advice, and discover the benefits you're entitled to in Canada.",
    inLanguage: "en-CA",
    publisher: {
      "@type": "Organization",
      name: "Assistant Vie Canada",
      url: "https://assistantvie.com",
    },
  };

  return (
    <main className="min-h-screen gradient-bg pt-[var(--header-height)]">
      <HtmlLangSetter lang="en" />
      <JsonLd data={jsonLd} />
      <SiteHeader locale="en" hrefFr="/" hrefEn="/en" />
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Hero */}
        <section className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Make the best decisions for your future, powered by AI
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-10">
              Simulate your financial future, get personalized AI advice, and discover the
              benefits you&apos;re entitled to — all tailored to your province and status in
              Canada.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <Link
                href="/register"
                className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
              >
                Start for free
              </Link>
              <Link
                href="/en/features"
                className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-3 px-8 text-base font-semibold"
              >
                Discover the features
              </Link>
            </div>
          </div>

          {/* Abstract illustration (inline SVG, no external image to load) */}
          <div className="hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 480 340" className="w-full h-auto">
              <defs>
                <linearGradient id="heroFillEn" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#heroFillEn)"
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

        {/* Features */}
        <section className="py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 leading-tight">
            Everything you need to steer your future
          </h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Eight tools designed to give you a complete, concrete view of your situation.
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
                <p className="font-semibold mb-2">{f.en.titre}</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {f.en.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/en/features"
              className="text-sm text-[var(--color-secondary)] hover:underline"
            >
              See the detail of each feature →
            </Link>
          </div>
        </section>

        {/* Why choose Assistant Vie Canada */}
        <section className="py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-tight">
            Why choose Assistant Vie Canada
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {ADVANTAGES.map((avantage) => (
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

        {/* Final call to action */}
        <section className="py-12 md:py-16">
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to discover your financial situation?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Create your free account and get your financial health score in a few minutes.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
              >
                Create a free account
              </Link>
              <Link
                href="/register"
                className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-3 px-8 text-base font-semibold"
              >
                Discover my financial score
              </Link>
            </div>
          </div>
        </section>

        <p className="pb-10 text-center text-xs text-[var(--color-text-secondary)] opacity-70">
          Assistant Vie Canada provides general information for educational purposes — it is not
          professional advice (financial, legal, tax, or immigration).
        </p>
      </div>
    </main>
  );
}
