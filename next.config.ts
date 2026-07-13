import path from "path";
import type { NextConfig } from "next";

// L'app charge Google Analytics 4 côté client (uniquement après consentement
// cookies, voir components/analytics/) — googletagmanager.com et
// google-analytics.com doivent donc être autorisés dans la CSP. Le reste
// reste strict. 'unsafe-inline' reste nécessaire sur script-src car
// Next.js (App Router) injecte des scripts inline pour l'hydratation en
// streaming (__next_f) ; une CSP par nonce serait plus stricte mais demande
// une configuration par requête plus fragile — à envisager plus tard si
// besoin d'un niveau de sécurité supérieur.
// React/Turbopack ont besoin de eval() en développement pour le rechargement
// à chaud et les outils de debug — jamais en production (React ne l'utilise
// plus une fois compilé), donc on ne relâche cette règle qu'en dev local.
const isDev = process.env.NODE_ENV !== "production";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
