import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "Terms of Service",
  description: "The rules for using Assistant Vie Canada.",
  alternates: {
    canonical: "/en/terms-of-service",
    languages: { fr: "/conditions-utilisation", en: "/en/terms-of-service" },
  },
};

export default function TermsOfServicePageEn() {
  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <HtmlLangSetter lang="en" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher
              locale="en"
              hrefFr="/conditions-utilisation"
              hrefEn="/en/terms-of-service"
            />
            <Link
              href="/en"
              className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-6 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <p className="text-xs opacity-70">Last updated: July 2026</p>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Purpose of the service
            </h2>
            <p>
              Assistant Vie Canada is an informational tool to support financial and personal
              planning. It provides projections, scores, and advice generated from the
              information you provide. <strong>This service does not constitute professional
              advice</strong> (financial, legal, tax, immigration, or health) and does not
              replace consultation with a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Your account
            </h2>
            <p>
              You are responsible for keeping your password confidential and for any activity on
              your account. The information you provide (income, expenses, etc.) should be as
              accurate as possible — the quality of the projections depends directly on it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Acceptable use
            </h2>
            <p>
              The service is intended for personal use. It is prohibited to attempt to bypass
              security measures, automate bulk requests, or use the service for illegal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Limitation of liability
            </h2>
            <p>
              The projections, scores, and advice generated (including by artificial
              intelligence) are provided for informational purposes only, without guarantee of
              accuracy. Assistant Vie Canada cannot be held liable for decisions made based on
              this information. Always consult a qualified professional for important financial,
              legal, tax, or immigration decisions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Changes and termination
            </h2>
            <p>
              The service may evolve, be temporarily unavailable, or be modified without notice
              during this development phase. You can delete your account at any time from the{" "}
              <Link href="/mes-donnees" className="text-[var(--color-secondary)] hover:underline">
                My Data
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws applicable in Canada and, where relevant, by
              the laws of the user&apos;s province of residence.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
