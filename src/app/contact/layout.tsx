import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description:
    "Contactez les Éditions Tikoun Aolam par WhatsApp, email ou téléphone. Questions sur une commande, un livre ou un envoi — nous vous répondons sous 24h.",
  alternates: { canonical: "https://tikoun-aolam.vercel.app/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
