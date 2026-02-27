import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposition Stratégique",
  description: "Proposition de refonte web pour les Éditions Tikoun Aolam — analyse, devis et solution V2.",
  robots: { index: false, follow: false },
};

export default function DirectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
