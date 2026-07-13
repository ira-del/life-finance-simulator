"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

// Rendu depuis le layout racine (une seule fois pour tout le site) — la
// langue ne peut donc pas venir d'une prop passée par la page, on la déduit
// du chemin courant (/en/... = anglais, sinon français).
const LIENS_FR = [
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

const LIENS_EN = [
  { href: "/en/features", label: "Features" },
  { href: "/en/blog", label: "Blog" },
  { href: "/en/about", label: "About" },
  { href: "/en/faq", label: "FAQ" },
  { href: "/en/contact", label: "Contact" },
  { href: "/en/privacy-policy", label: "Privacy Policy" },
  { href: "/en/terms-of-service", label: "Terms of Service" },
  { href: "/en/legal-notice", label: "Legal Notice" },
];

export default function Footer() {
  const pathname = usePathname();
  const estAnglais = pathname?.startsWith("/en");
  const liens = estAnglais ? LIENS_EN : LIENS_FR;

  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <Logo href={estAnglais ? "/en" : "/"} />
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xs">
              {estAnglais
                ? "Your financial life assistant, built for Canada."
                : "L'assistant de vie financier pensé pour le Canada."}
            </p>
          </div>

          <nav
            aria-label={estAnglais ? "Footer links" : "Liens du pied de page"}
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2"
          >
            {liens.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                {lien.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-xs text-[var(--color-text-secondary)] opacity-70">
          © {new Date().getFullYear()} Assistant Vie Canada.{" "}
          {estAnglais ? "All rights reserved." : "Tous droits réservés."}
        </div>
      </div>
    </footer>
  );
}
