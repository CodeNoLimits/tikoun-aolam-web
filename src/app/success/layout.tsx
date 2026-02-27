import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commande confirmée",
  description: "Votre commande a été enregistrée avec succès. Merci pour votre achat chez Tikoun Aolam.",
  robots: { index: false, follow: false },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
