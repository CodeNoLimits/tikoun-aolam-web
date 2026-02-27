import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente des Éditions Tikoun Aolam.",
};

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-tikoun-white mb-4 uppercase tracking-wider">
          Conditions Générales de Vente
        </h1>
        <div className="h-px w-24 bg-gradient-to-r from-tikoun-gold to-transparent mb-12" />

        <div className="space-y-8 text-tikoun-white/70 font-light leading-relaxed">
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">1. Objet</h2>
            <p>Les présentes conditions générales de vente régissent les relations entre les Éditions Tikoun Aolam (ci-après «&nbsp;l&apos;Éditeur&nbsp;») et tout acheteur de livres via notre boutique en ligne ou par WhatsApp.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">2. Produits</h2>
            <p>Les livres proposés sont des éditions originales en français et hébreu des enseignements de Rabbi Na&apos;hman de Breslev et Rabbi Israël Ber Odesser. Les prix sont indiqués en shekel israélien (₪) toutes taxes comprises (TVA 17%).</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">3. Commande</h2>
            <p>La commande est validée après confirmation écrite par WhatsApp ou email de l&apos;Éditeur. Le paiement s&apos;effectue par virement bancaire, PayPal ou carte bancaire via Stripe. Les commandes sont traitées dans un délai de 2 à 5 jours ouvrables.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">4. Livraison</h2>
            <p>Livraison en Israël (3–7 jours) et en France/Europe (10–21 jours) via services postaux standard. Les frais de livraison sont indiqués lors de la confirmation de commande.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">5. Retours</h2>
            <p>Tout retour doit être signalé dans les 14 jours suivant la réception. Les livres doivent être en parfait état, non ouverts. Le remboursement est effectué dans les 14 jours suivant la réception du retour.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">6. Contact</h2>
            <p>Pour toute réclamation&nbsp;: contact@tikoun-aolam.com — +972 55 975 9155</p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-tikoun-gold text-sm tracking-widest uppercase hover:text-tikoun-white transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
