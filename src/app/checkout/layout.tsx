import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement",
  description:
    "Finalisez votre commande de livres Breslev. Paiement sécurisé par carte bancaire (Stripe), PayPal ou WhatsApp.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
