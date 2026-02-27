import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité des Éditions Tikoun Aolam.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-tikoun-white mb-4 uppercase tracking-wider">
          Politique de Confidentialité
        </h1>
        <div className="h-px w-24 bg-gradient-to-r from-tikoun-gold to-transparent mb-12" />

        <div className="space-y-8 text-tikoun-white/70 font-light leading-relaxed">
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">1. Données collectées</h2>
            <p>Les Éditions Tikoun Aolam collectent uniquement les données nécessaires au traitement des commandes&nbsp;: nom, adresse email, numéro de téléphone, et adresse de livraison. Aucune donnée bancaire n&apos;est stockée sur nos serveurs.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">2. Utilisation des données</h2>
            <p>Les données sont utilisées exclusivement pour&nbsp;: le traitement et le suivi des commandes, la communication relative à vos achats, et l&apos;envoi de notre newsletter (sur consentement explicite).</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">3. Partage des données</h2>
            <p>Aucune donnée personnelle n&apos;est vendue ou partagée avec des tiers, à l&apos;exception des prestataires strictement nécessaires (Stripe pour les paiements, services postaux pour la livraison).</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">4. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez&nbsp;: contact@tikoun-aolam.com</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">5. Cookies</h2>
            <p>Notre site utilise uniquement des cookies techniques indispensables au fonctionnement du panier. Aucun cookie publicitaire ou de traçage n&apos;est utilisé.</p>
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
