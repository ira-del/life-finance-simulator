import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://assistant-vie-canada.vercel.app";

const PAGES_PUBLIQUES = [
  "",
  "/fonctionnalites",
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
