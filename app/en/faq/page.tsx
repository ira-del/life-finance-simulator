import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "FAQ",
  description: "Answers to frequently asked questions about Assistant Vie Canada.",
  alternates: { canonical: "/en/faq", languages: { fr: "/faq", en: "/en/faq" } },
};

const QUESTIONS = [
  {
    q: "What is Assistant Vie Canada?",
    r: "A life assistant that helps you understand and plan your financial situation in Canada — financial health score, projections, personalized advice, benefits and immigration guidance, tailored to your province and status.",
  },
  {
    q: "How does the AI work?",
    r: "Some features (advisor, assistant, opportunities, immigration) use an artificial intelligence model to generate personalized answers based on your profile. Responses are informational — they never replace the advice of a qualified professional, especially for legal, tax, health, or immigration topics.",
  },
  {
    q: "Is my data protected?",
    r: "Yes. All communications are encrypted (HTTPS), your password is hashed (never stored in plain text), and access to your data is restricted by database-level security rules — no one else can access it through the application. You can review our privacy policy for more details.",
  },
  {
    q: "Is the service free?",
    r: "Yes, Assistant Vie Canada is currently entirely free during its development phase. A freemium model may be introduced later, but core features will remain accessible.",
  },
  {
    q: "How are the projections calculated?",
    r: "From your current situation (income, expenses, savings, debts, investments), assuming it stays stable over time. Savings, investments (with compound interest) and debt repayment are modeled as independent flows. It's a starting point to visualize your financial future, not a guarantee.",
  },
  {
    q: "Can I delete my data or account?",
    r: "Yes, at any time. From the My Data page (accessible via Security in the menu), you can download a complete copy of your data or permanently delete your account — the latter action is immediate and irreversible.",
  },
];

export default function FaqPageEn() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUESTIONS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.r,
      },
    })),
  };

  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <HtmlLangSetter lang="en" />
      <JsonLd data={jsonLd} />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale="en" hrefFr="/faq" hrefEn="/en/faq" />
            <Link
              href="/en"
              className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="glass rounded-2xl p-6 group">
              <summary className="cursor-pointer text-sm font-semibold flex items-center justify-between gap-3">
                {item.q}
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.r}
              </p>
            </details>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-8">
          More questions?{" "}
          <Link href="/en/contact" className="text-[var(--color-secondary)] hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
