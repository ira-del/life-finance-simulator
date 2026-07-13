import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "About",
  description: "The mission and features of Assistant Vie Canada.",
  alternates: { canonical: "/en/about", languages: { fr: "/a-propos", en: "/en/about" } },
};

export default function AboutPageEn() {
  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <HtmlLangSetter lang="en" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">About</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale="en" hrefFr="/a-propos" hrefEn="/en/about" />
            <Link
              href="/en"
              className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
              Our mission
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Help everyone in Canada understand their financial situation and make informed
              decisions — regardless of status, province, or background. We believe personalized
              advice and a clear view of your financial future shouldn&apos;t be reserved for
              those who can afford an advisor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
              What we offer
            </h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <li>• A clear financial health score, with your strengths and priorities.</li>
              <li>• Net worth projections over 10 to 100 years, tailored to your real situation.</li>
              <li>• An AI advisor and assistant to answer your financial, professional,
                administrative and personal questions.</li>
              <li>• Personalized opportunities (benefits, scholarships, tax credits) based on
                your province and status.</li>
              <li>• Guidance on immigration matters in Canada.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
              Our values
            </h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <li>
                <span className="font-medium text-[var(--color-text-primary)]">Transparency</span>{" "}
                — we always explain how our calculations and projections work.
              </li>
              <li>
                <span className="font-medium text-[var(--color-text-primary)]">Honesty</span> —
                our AI responses never guarantee a result and remind you when to consult a
                qualified professional.
              </li>
              <li>
                <span className="font-medium text-[var(--color-text-primary)]">
                  Respect for your data
                </span>{" "}
                — your financial information is sensitive; it is never sold or shared for
                advertising purposes.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
