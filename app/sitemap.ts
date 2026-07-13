import type { MetadataRoute } from "next";

// À mettre à jour avec le vrai domaine (ex: assistantvie.ca) une fois acheté
// — en attendant, on utilise l'URL Vercel actuelle par défaut.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://assistant-vie-canada.vercel.app";

const PAGES_PUBLIQUES = [
  "",
  "/a-propos",
  "/faq",
  "/contact",
  "/confidentialite",
  "/conditions-utilisation",
  "/mentions-legales",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES_PUBLIQUES.map((chemin) => ({
    url: `${BASE_URL}${chemin}`,
    lastModified: new Date(),
  }));
}
