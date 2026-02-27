import type { MetadataRoute } from "next";
import { ALL_PRODUCTS } from "@/lib/products";

const BASE = "https://tikoun-aolam.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/produits`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/editions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/maitres`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/maitres/rabbi-nahman`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/maitres/rabbi-israel-ber-odesser`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/hiloula-de-rabbi-israel-ber-odesser`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = ALL_PRODUCTS.map((p) => ({
    url: `${BASE}/produits/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
