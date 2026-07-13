import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://assistant-vie-canada.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/progression",
        "/assistant",
        "/opportunites",
        "/immigration",
        "/securite",
        "/mes-donnees",
        "/onboarding",
        "/reset-password",
        "/compte-supprime",
        "/auth",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
