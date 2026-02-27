import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales des Éditions Tikoun Aolam.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-tikoun-white mb-4 uppercase tracking-wider">
          Mentions Légales
        </h1>
        <div className="h-px w-24 bg-gradient-to-r from-tikoun-gold to-transparent mb-12" />

        <div className="space-y-8 text-tikoun-white/70 font-light leading-relaxed">
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">Éditeur du site</h2>
            <p>
              <strong className="text-tikoun-white">Éditions Tikoun Aolam</strong><br />
              Maison d&apos;édition de livres religieux Breslev<br />
              Jérusalem, Israël<br />
              Email&nbsp;: contact@tikoun-aolam.com<br />
              Téléphone&nbsp;: +972 55 975 9155
            </p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">Hébergement</h2>
            <p>
              Ce site est hébergé par <strong className="text-tikoun-white">Vercel Inc.</strong><br />
              340 Pine Street, Suite 701, San Francisco, CA 94104, USA<br />
              <a href="https://vercel.com" className="text-tikoun-gold hover:text-tikoun-white transition-colors">vercel.com</a>
            </p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">Propriété intellectuelle</h2>
            <p>L&apos;ensemble des contenus présents sur ce site (textes, images, traductions) sont la propriété exclusive des Éditions Tikoun Aolam. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">Responsabilité</h2>
            <p>Les Éditions Tikoun Aolam s&apos;efforcent d&apos;assurer l&apos;exactitude des informations diffusées sur ce site. Toutefois, elles ne sauraient être tenues responsables des erreurs ou omissions, ni des résultats qui pourraient être obtenus par un mauvais usage de ces informations.</p>
          </section>
          <section>
            <h2 className="font-cinzel text-xl text-tikoun-gold mb-4 tracking-wide">Droit applicable</h2>
            <p>Les présentes mentions légales sont régies par le droit israélien. Tout litige sera soumis à la juridiction compétente de Jérusalem, Israël.</p>
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
