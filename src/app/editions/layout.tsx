import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Éditions — L'Histoire de Tikoun Aolam",
  description:
    "Découvrez l'histoire des Éditions Tikoun Aolam, maison d'édition de référence pour les enseignements de Rabbi Na'hman de Breslev traduits en français.",
  alternates: { canonical: "https://tikoun-aolam.vercel.app/editions" },
};

export default function EditionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
