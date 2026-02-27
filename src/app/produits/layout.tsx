import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique — Livres Breslev en Français",
  description:
    "Découvrez notre collection de 25 ouvrages Breslev : Likouté Moharan, Sidourim, Téhilim, Contes de Rabbi Na'hman, biographies. Livraison Israël et international.",
  keywords: [
    "livres Breslev",
    "Likouté Moharan français",
    "Sidour Breslev",
    "Téhilim",
    "Rabbi Nachman livres",
    "boutique juive en ligne",
  ],
  alternates: { canonical: "https://tikoun-aolam.vercel.app/produits" },
};

export default function ProduitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
