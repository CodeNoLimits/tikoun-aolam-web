import { CheckCircle2, AlertTriangle, FileSpreadsheet, Camera, Zap, ShieldCheck } from "lucide-react";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-tikoun-copper/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-tikoun-gold/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 animate-[fadeIn_1s_ease-out]">
          <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-6 block">
            Espace Direction Confidentiel
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-tikoun-white mb-6 leading-tight">
            Proposition Stratégique<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              Tikoun Aolam V2
            </span>
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-tikoun-gold to-transparent mx-auto mb-8" />
          <p className="text-tikoun-white/70 text-lg font-light max-w-2xl mx-auto">
            À l&apos;attention exclusive de <strong className="text-tikoun-white">Avraham Ghezi</strong> et <strong className="text-tikoun-white">Michael Bensoussan</strong>.<br/> Présentation de la refonte e-commerce Premium et des prochaines étapes.
          </p>
        </div>

        {/* Audit Recap */}
        <section className="mb-20 bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-tikoun-copper/20 flex items-center justify-center text-tikoun-copper">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl text-tikoun-white">Résumé de l&apos;Audit (Ancien Site)</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-tikoun-white/70 font-light leading-relaxed">
            <div>
              <p className="mb-4">
                La plateforme WordPress/Divi actuelle présente des faiblesses techniques et ergonomiques empêchant une accélération des ventes à l&apos;international :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span>Une page d&apos;accueil <strong className="text-tikoun-white">monolithique trop lourde</strong>, forçant le chargement de tout le catalogue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span><strong className="text-tikoun-white">Performances lentes</strong> liées à la surcharge de code et plugins (Jetpack, Divi).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span>Absence de barre de recherche, de filtres, ou de compte client dédié.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span><strong className="text-tikoun-white">Paiement limité</strong> (Carte Bleue uniquement, pas de PayPal/Apple Pay).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span>Design template daté, typographie standardisée (Montserrat), pas d&apos;animations modernes.</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-tikoun-gold font-medium">La Solution V2 :</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Architecture <strong className="text-tikoun-white">Next.js ultra-rapide</strong> (chargement 10x plus rapide que WordPress)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Design <strong className="text-tikoun-white">&quot;State of the Art&quot;</strong> digne des plus grandes maisons d&apos;édition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Tunnel d&apos;achat optimisé <strong className="text-tikoun-white">Stripe + PayPal</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Conseiller IA natif propulsé par <strong className="text-tikoun-white">Google Gemini</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Responsive <strong className="text-tikoun-white">parfait sur mobile</strong> (iPhone, iPad, Android)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <section className="bg-gradient-to-br from-tikoun-darkgray to-tikoun-black border border-tikoun-gold/20 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-full bg-tikoun-gold/10 flex items-center justify-center text-tikoun-gold mb-6">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-tikoun-white mb-4">Photos Originales Haute Définition</h3>
            <p className="text-tikoun-white/60 font-light mb-4">
              Afin de rendre hommage à la beauté des reliures, nous avons besoin des fichiers photographiques originaux. Les images actuelles extraites du WordPress contiennent des artefacts, des ombres artificielles et des incrustations de texte (&quot;Coloris&quot;).
            </p>
            <p className="text-tikoun-gold text-sm tracking-wide font-medium">⚡ ACTION REQUISE : Dépôt Drive / WeTransfer</p>
          </section>

          <section className="bg-gradient-to-br from-tikoun-darkgray to-tikoun-black border border-tikoun-gold/20 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-full bg-tikoun-gold/10 flex items-center justify-center text-tikoun-gold mb-6">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-tikoun-white mb-4">Base de Données Catalogue</h3>
            <p className="text-tikoun-white/60 font-light mb-4">
              Pour migrer l&apos;intégralité du catalogue sans aucune erreur, nous nécessitons un export Excel complet de tous vos produits actuels incluant : Noms, Prix, SKUs, Stocks, et Variantes réelles de reliures par livre.
            </p>
            <p className="text-tikoun-gold text-sm tracking-wide font-medium">⚡ ACTION REQUISE : Fichier Excel / CSV</p>
          </section>
        </div>

        {/* Proposal Pricing */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-center text-tikoun-white mb-12">Devis d&apos;Intervention</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-tikoun-black border border-tikoun-white/10 rounded-2xl p-8 hover:border-tikoun-white/30 transition-all flex flex-col">
              <h3 className="text-xl font-bold text-tikoun-white mb-2">Refonte V2</h3>
              <p className="text-tikoun-white/50 text-sm mb-6 flex-grow">Création unique &quot;State of the Art&quot;, intégration IA, tunnel Stripe/PayPal, optimisation mobile absolue.</p>
              <div className="mb-6">
                <span className="text-4xl font-serif text-tikoun-white">6 000</span>
                <span className="text-tikoun-gold ml-2 font-medium">₪</span>
                <span className="text-tikoun-white/40 text-xs block mt-1">Paiement unique</span>
              </div>
              <ul className="space-y-3 text-sm text-tikoun-white/70">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Design System &quot;Nano Banana&quot;</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Paiement Stripe/PayPal ultra-rapide</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Agent IA Conversationnel Vocal</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> 28 fiches produits migrées</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Blog éditorial complet</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-tikoun-black border border-tikoun-white/10 rounded-2xl p-8 hover:border-tikoun-white/30 transition-all flex flex-col">
              <h3 className="text-xl font-bold text-tikoun-white mb-2">Gestion Modulaire</h3>
              <p className="text-tikoun-white/50 text-sm mb-6 flex-grow">Hébergement, correctifs, sécurité, et intégration des futures modifications catalogue.</p>
              <div className="mb-6">
                <span className="text-4xl font-serif text-tikoun-white">500</span>
                <span className="text-tikoun-gold ml-2 font-medium">₪ / mois</span>
              </div>
              <ul className="space-y-3 text-sm text-tikoun-white/70">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Maintenance technique</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Mises à jour du catalogue</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-tikoun-gold shrink-0" /> Surveillance serveurs Vercel</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-tikoun-gold/10 to-tikoun-copper/5 border border-tikoun-gold/40 rounded-2xl p-8 transform md:-translate-y-4 shadow-2xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-tikoun-gold to-tikoun-copper" />
              <div className="absolute top-4 right-4 bg-tikoun-gold text-tikoun-black text-[10px] uppercase tracking-widest px-2 py-1 font-bold rounded">
                Recommandé
              </div>
              <h3 className="text-xl font-bold text-tikoun-white mb-2">Pack Croissance Absolue</h3>
              <p className="text-tikoun-white/70 text-sm mb-6 flex-grow">La maintenance du site V2 + Une gestion offensive de vos réseaux sociaux avec production de vidéos professionnelles.</p>
              <div className="mb-6">
                <span className="text-4xl font-serif text-tikoun-gold">3 000</span>
                <span className="text-tikoun-white/80 ml-2 font-medium">₪ / mois</span>
                <span className="text-tikoun-white/40 text-xs block mt-1 line-through">Au lieu de 3 100 ₪ (2600 + 500)</span>
              </div>
              <ul className="space-y-3 text-sm text-tikoun-white/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Inclus : <strong>Maintenance Site V2</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Gestion Réseaux Sociaux</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Création Vidéos Professionnelles</li>
                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-tikoun-gold shrink-0" /> Boost de l&apos;acquisition client</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Not Shopify — Competitive Analysis */}
        <section className="mb-20 bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8 md:p-10">
          <h2 className="font-serif text-3xl md:text-4xl text-tikoun-white mb-3">Pourquoi pas Shopify ?</h2>
          <p className="text-tikoun-white/50 text-sm mb-10 max-w-2xl">Analyse comparative objective basée sur les données du marché 2025-2026.</p>

          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-tikoun-white/10">
                  <th className="py-3 pr-4 text-tikoun-white/50 font-medium w-1/3">Critère</th>
                  <th className="py-3 px-4 text-tikoun-gold font-bold">Notre Solution (Next.js)</th>
                  <th className="py-3 pl-4 text-tikoun-white/40 font-medium">Shopify</th>
                </tr>
              </thead>
              <tbody className="text-tikoun-white/70 font-light">
                <tr className="border-b border-tikoun-white/5">
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">Vitesse de chargement</td>
                  <td className="py-4 px-4 text-tikoun-gold">SSR/SSG : pages en &lt;1s, score Lighthouse &gt;95</td>
                  <td className="py-4 pl-4">&lt;50% des boutiques Shopify atteignent les Core Web Vitals en 2025</td>
                </tr>
                <tr className="border-b border-tikoun-white/5">
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">Frais de transaction</td>
                  <td className="py-4 px-4 text-tikoun-gold">0% — Stripe/PayPal uniquement (2.9% bancaire standard)</td>
                  <td className="py-4 pl-4">+0.5% à 2% de frais Shopify en plus des frais bancaires</td>
                </tr>
                <tr className="border-b border-tikoun-white/5">
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">Coût mensuel réel</td>
                  <td className="py-4 px-4 text-tikoun-gold">Hébergement Vercel gratuit (jusqu&apos;à 100Go/mois)</td>
                  <td className="py-4 pl-4">29$-399$/mois + apps payantes (50-350$/mois en moyenne)</td>
                </tr>
                <tr className="border-b border-tikoun-white/5">
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">SEO (Référencement)</td>
                  <td className="py-4 px-4 text-tikoun-gold">URLs 100% personnalisables, HTML parfait pour Google</td>
                  <td className="py-4 pl-4">URLs rigides imposées (/collections/, /products/)</td>
                </tr>
                <tr className="border-b border-tikoun-white/5">
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">Design sur-mesure</td>
                  <td className="py-4 px-4 text-tikoun-gold">Liberté totale — animations 3D, vidéos, effets physiques</td>
                  <td className="py-4 pl-4">Limité aux thèmes Liquid — modifications profondes coûteuses</td>
                </tr>
                <tr className="border-b border-tikoun-white/5">
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">Agent IA conversationnel</td>
                  <td className="py-4 px-4 text-tikoun-gold">Intégré nativement (Gemini, vocal + texte)</td>
                  <td className="py-4 pl-4">Impossible nativement — nécessite app tierce limitée</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-tikoun-white/80">Hébreu / Français RTL</td>
                  <td className="py-4 px-4 text-tikoun-gold">Support natif complet (CSS `dir=rtl`)</td>
                  <td className="py-4 pl-4">Support RTL limité, dépend du thème choisi</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-tikoun-black rounded-xl border border-tikoun-white/5">
              <span className="text-3xl font-serif text-tikoun-gold block mb-2">10x</span>
              <span className="text-tikoun-white/50 text-xs uppercase tracking-widest">Plus rapide que WordPress/Shopify</span>
            </div>
            <div className="text-center p-6 bg-tikoun-black rounded-xl border border-tikoun-white/5">
              <span className="text-3xl font-serif text-tikoun-gold block mb-2">0%</span>
              <span className="text-tikoun-white/50 text-xs uppercase tracking-widest">Frais de plateforme supplémentaires</span>
            </div>
            <div className="text-center p-6 bg-tikoun-black rounded-xl border border-tikoun-white/5">
              <span className="text-3xl font-serif text-tikoun-gold block mb-2">∞</span>
              <span className="text-tikoun-white/50 text-xs uppercase tracking-widest">Personnalisation sans limites</span>
            </div>
          </div>
        </section>

        {/* Stripe/PayPal Integration Note */}
        <section className="text-center mb-16 bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8">
          <h3 className="font-serif text-2xl text-tikoun-white mb-4">Prochaines Étapes : Paiement en Ligne</h3>
          <p className="text-tikoun-white/60 font-light max-w-2xl mx-auto">
            Une fois les photos et le catalogue Excel reçus, nous procéderons à l&apos;intégration complète de <strong className="text-tikoun-white">Stripe</strong> et <strong className="text-tikoun-white">PayPal</strong> pour que vos clients puissent commander et payer directement sur le nouveau site, en toute sécurité.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-tikoun-white/30 text-xs tracking-widest uppercase">
          Document confidentiel — DreamNova © 2026
        </div>
      </div>
    </div>
  );
}
