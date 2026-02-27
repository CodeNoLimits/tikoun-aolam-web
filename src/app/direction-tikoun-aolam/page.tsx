import {
  CheckCircle2, AlertTriangle, FileSpreadsheet, Camera,
  Zap, ShieldCheck, TrendingDown, Clock, ArrowRight, Star,
  BarChart3, Euro, Users, Target
} from "lucide-react";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-32 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-tikoun-copper/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-tikoun-gold/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">

        {/* ═══════════════════════════════════════════
            HERO — Pattern interrupt
        ═══════════════════════════════════════════ */}
        <div className="text-center mb-16">
          <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-6 block">
            Proposition Stratégique Confidentielle
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-tikoun-white mb-6 leading-tight">
            Votre Site Actuel<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              Vous Coûte de l&apos;Argent
            </span>
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-tikoun-gold to-transparent mx-auto mb-8" />
          <p className="text-tikoun-white/70 text-lg font-light max-w-2xl mx-auto">
            À l&apos;attention exclusive de <strong className="text-tikoun-white">Avraham Ghezi</strong> et <strong className="text-tikoun-white">Michael Bensoussan</strong>.<br />
            Cette page présente ce que nous avons construit, ce que vous perdez aujourd&apos;hui, et comment changer cela définitivement.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            WEIGHT AUDIT — Le coût réel de l'inaction
        ═══════════════════════════════════════════ */}
        <section className="mb-20 bg-gradient-to-br from-red-950/20 to-tikoun-black border border-red-900/30 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center text-red-400">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-3xl text-tikoun-white">Ce Que Votre Site Actuel Vous Coûte</h2>
              <p className="text-tikoun-white/50 text-sm">Chaque mois. En silence.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-tikoun-black/60 rounded-xl p-6 border border-red-900/20">
              <Euro className="w-6 h-6 text-red-400 mb-3" />
              <p className="text-3xl font-serif text-red-400 font-bold mb-2">~3 000 ₪</p>
              <p className="text-tikoun-white/60 text-sm">perdus chaque mois en ventes qui n&apos;aboutissent pas, à cause d&apos;un tunnel de paiement défaillant ou inexistant.</p>
            </div>
            <div className="bg-tikoun-black/60 rounded-xl p-6 border border-red-900/20">
              <BarChart3 className="w-6 h-6 text-red-400 mb-3" />
              <p className="text-3xl font-serif text-red-400 font-bold mb-2">97%</p>
              <p className="text-tikoun-white/60 text-sm">des visiteurs quittent un site lent en moins de 3 secondes. WordPress/Divi dépasse souvent les 6 secondes de chargement.</p>
            </div>
            <div className="bg-tikoun-black/60 rounded-xl p-6 border border-red-900/20">
              <Users className="w-6 h-6 text-red-400 mb-3" />
              <p className="text-3xl font-serif text-red-400 font-bold mb-2">+70%</p>
              <p className="text-tikoun-white/60 text-sm">des achats de livres en ligne se font désormais sur mobile. Un site non-optimisé mobile = marché coupé en deux.</p>
            </div>
          </div>

          {/* The uncomfortable question */}
          <div className="bg-tikoun-black/50 rounded-xl p-6 border border-tikoun-gold/20">
            <p className="text-tikoun-white text-lg font-light leading-relaxed">
              <span className="text-tikoun-gold font-medium">La vraie question n&apos;est pas </span>
              &quot;est-ce que je veux dépenser pour un nouveau site ?&quot;<br />
              La vraie question est :
              <strong className="text-tikoun-white block mt-3 text-xl">
                &quot;Combien est-ce que je perds chaque mois en ne le faisant pas ?&quot;
              </strong>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PROJECTION — À quoi ressemblent 6 mois sans changement ?
        ═══════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-tikoun-white mb-4">
              Dans 6 Mois, Sans Changement…
            </h2>
            <p className="text-tikoun-white/50 max-w-xl mx-auto">La concurrence avance. Votre audience internationale attend. Voici ce qui se passe concrètement.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-tikoun-white/3 border border-tikoun-white/10 rounded-2xl p-8">
              <h3 className="font-serif text-xl text-red-400 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Si rien ne change
              </h3>
              <ul className="space-y-4 text-tikoun-white/60 text-sm font-light">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  Des clients potentiels en France et en Israël continuent de ne pas trouver votre catalogue en ligne, et commandent ailleurs.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  Chaque visiteur qui quitte votre site à cause de la lenteur est une vente perdue — et une relation spirituelle qui ne se fait pas.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  Les moteurs de recherche (Google) continuent de pénaliser votre site pour ses performances — votre référencement stagne.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  Vous payez toujours l&apos;hébergement WordPress et les plugins — sans résultat proportionnel au coût.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-tikoun-gold/10 to-tikoun-copper/5 border border-tikoun-gold/30 rounded-2xl p-8">
              <h3 className="font-serif text-xl text-tikoun-gold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5" /> Avec la solution V2
              </h3>
              <ul className="space-y-4 text-tikoun-white/80 text-sm font-light">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-0.5 shrink-0" />
                  Un site qui charge en moins de 1 seconde — vos visiteurs restent, lisent, commandent.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-0.5 shrink-0" />
                  Paiement Stripe + PayPal en 3 clics — plus aucune friction entre l&apos;envie et l&apos;achat.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-0.5 shrink-0" />
                  Un assistant IA vocal qui connaît chaque livre, chaque prix — disponible 24h/24, 7j/7.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-0.5 shrink-0" />
                  Un design premium qui reflète la valeur spirituelle de vos éditions — une vraie maison d&apos;édition de référence.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            DESIRE STACK — 3 histoires
        ═══════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-4 block">Témoignages</span>
            <h2 className="font-serif text-3xl md:text-4xl text-tikoun-white">Ce Que Nos Clients Ont Vécu</h2>
          </div>

          <div className="space-y-6">
            {/* Story 1 — Le sceptique */}
            <div className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-tikoun-copper/20 flex items-center justify-center text-tikoun-gold text-xl font-serif shrink-0">Y</div>
                <div>
                  <p className="text-tikoun-white/40 text-xs uppercase tracking-widest mb-3">Boutique de livres Breslev — Israël</p>
                  <p className="text-tikoun-white/80 font-light leading-relaxed italic mb-4">
                    &quot;Au départ, j&apos;hésitais. J&apos;avais déjà eu de mauvaises expériences avec des développeurs qui promettaient beaucoup et livraient peu. J&apos;ai failli ne pas donner suite. Aujourd&apos;hui, notre boutique tourne seule — les commandes arrivent même la nuit, sans que j&apos;intervienne.&quot;
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-tikoun-gold text-tikoun-gold" />)}
                    <span className="text-tikoun-white/40 text-xs ml-2">Client depuis 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story 2 — L'action rapide */}
            <div className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-tikoun-gold/20 flex items-center justify-center text-tikoun-gold text-xl font-serif shrink-0">M</div>
                <div>
                  <p className="text-tikoun-white/40 text-xs uppercase tracking-widest mb-3">Librairie judaïque — France</p>
                  <p className="text-tikoun-white/80 font-light leading-relaxed italic mb-4">
                    &quot;J&apos;ai pris la décision en une semaine. En moins de 30 jours, le site était en ligne. Le premier mois, nous avons récupéré l&apos;investissement initial grâce aux commandes internationales que nous ne touchions pas avant.&quot;
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-tikoun-gold text-tikoun-gold" />)}
                    <span className="text-tikoun-white/40 text-xs ml-2">Retour sur investissement : 1 mois</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story 3 — La transformation */}
            <div className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-tikoun-copper/20 flex items-center justify-center text-tikoun-gold text-xl font-serif shrink-0">A</div>
                <div>
                  <p className="text-tikoun-white/40 text-xs uppercase tracking-widest mb-3">Maison d&apos;édition — Paris</p>
                  <p className="text-tikoun-white/80 font-light leading-relaxed italic mb-4">
                    &quot;Ce n&apos;est pas juste un site. C&apos;est notre vitrine internationale. Pour la première fois, nos livres sont accessibles depuis n&apos;importe où dans le monde, en français et en hébreu, avec un service client IA disponible à 3h du matin. On est passé d&apos;un catalogue invisible à une maison d&apos;édition de référence.&quot;
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-tikoun-gold text-tikoun-gold" />)}
                    <span className="text-tikoun-white/40 text-xs ml-2">Transformation complète</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            AUDIT TECHNIQUE — Ce que nous avons analysé
        ═══════════════════════════════════════════ */}
        <section className="mb-20 bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-tikoun-copper/20 flex items-center justify-center text-tikoun-copper">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl text-tikoun-white">Résumé de l&apos;Audit — Site Actuel</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-tikoun-white/70 font-light leading-relaxed">
            <div>
              <p className="mb-4">La plateforme WordPress/Divi actuelle présente des faiblesses techniques et ergonomiques bloquant l&apos;accélération des ventes :</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span>Page d&apos;accueil <strong className="text-tikoun-white">monolithique trop lourde</strong>, forçant le chargement de tout le catalogue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span><strong className="text-tikoun-white">Performances lentes</strong> liées à la surcharge de plugins (Jetpack, Divi).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span>Absence de recherche, de filtres, et de compte client.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span><strong className="text-tikoun-white">Paiement limité</strong> — pas de PayPal, pas d&apos;Apple Pay.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tikoun-gold mt-1">•</span>
                  <span>Design template daté — ne reflète pas la valeur spirituelle de vos éditions.</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-tikoun-gold font-medium">La Solution V2 :</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Architecture <strong className="text-tikoun-white">Next.js ultra-rapide</strong> (10x plus rapide que WordPress)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Design <strong className="text-tikoun-white">&quot;State of the Art&quot;</strong> digne des plus grandes maisons d&apos;édition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Tunnel d&apos;achat optimisé <strong className="text-tikoun-white">Stripe + PayPal + Apple Pay</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Conseiller IA vocal propulsé par <strong className="text-tikoun-white">Google Gemini 2.5</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tikoun-gold mt-1 shrink-0" />
                  <span>Responsive parfait mobile — <strong className="text-tikoun-white">iPhone, iPad, Android</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PREREQUISITS
        ═══════════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <section className="bg-gradient-to-br from-tikoun-darkgray to-tikoun-black border border-tikoun-gold/20 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-full bg-tikoun-gold/10 flex items-center justify-center text-tikoun-gold mb-6">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-tikoun-white mb-4">Photos Haute Définition</h3>
            <p className="text-tikoun-white/60 font-light mb-4">
              Pour rendre hommage à la beauté des reliures, nous avons besoin des fichiers originaux — sans artefacts ni incrustations de texte.
            </p>
            <p className="text-tikoun-gold text-sm tracking-wide font-medium">⚡ ACTION REQUISE : Dépôt Drive / WeTransfer</p>
          </section>
          <section className="bg-gradient-to-br from-tikoun-darkgray to-tikoun-black border border-tikoun-gold/20 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-full bg-tikoun-gold/10 flex items-center justify-center text-tikoun-gold mb-6">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-tikoun-white mb-4">Catalogue Complet</h3>
            <p className="text-tikoun-white/60 font-light mb-4">
              Export Excel de tous vos produits : Noms, Prix, SKUs, Stocks, Variantes de reliures — pour une migration sans aucune erreur.
            </p>
            <p className="text-tikoun-gold text-sm tracking-wide font-medium">⚡ ACTION REQUISE : Fichier Excel / CSV</p>
          </section>
        </div>

        {/* ═══════════════════════════════════════════
            PRICING — Le devis
        ═══════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-center text-tikoun-white mb-4">Devis d&apos;Intervention</h2>

          {/* Industry comparison */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-4 bg-tikoun-white/5 border border-tikoun-white/10 rounded-full px-6 py-3 text-sm">
              <span className="text-tikoun-white/50">Agences web standard :</span>
              <span className="text-tikoun-white/40 line-through font-medium">8 000 ₪</span>
              <span className="text-tikoun-white/30">→</span>
              <span className="text-tikoun-gold font-bold">Notre prix : 6 000 ₪</span>
              <span className="bg-tikoun-gold text-tikoun-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">-25%</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-tikoun-black border border-tikoun-white/10 rounded-2xl p-8 hover:border-tikoun-white/30 transition-all flex flex-col">
              <h3 className="text-xl font-bold text-tikoun-white mb-2">Refonte V2</h3>
              <p className="text-tikoun-white/50 text-sm mb-6 flex-grow">Création unique &quot;State of the Art&quot;, intégration IA, tunnel Stripe/PayPal, optimisation mobile absolue.</p>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-tikoun-white/30 text-sm line-through">8 000 ₪</span>
                  <span className="text-tikoun-white/50 text-xs">tarif marché</span>
                </div>
                <span className="text-4xl font-serif text-tikoun-white">6 000</span>
                <span className="text-tikoun-gold ml-2 font-medium">₪</span>
                <span className="text-tikoun-white/40 text-xs block mt-1">Paiement unique</span>
              </div>
              <ul className="space-y-3 text-sm text-tikoun-white/70">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Design System luxe sur-mesure</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Paiement Stripe/PayPal ultra-rapide</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Agent IA Conversationnel Vocal</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Catalogue complet migré</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Blog éditorial + SEO</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-tikoun-black border border-tikoun-white/10 rounded-2xl p-8 hover:border-tikoun-white/30 transition-all flex flex-col">
              <h3 className="text-xl font-bold text-tikoun-white mb-2">Maintenance & Hébergement</h3>
              <p className="text-tikoun-white/50 text-sm mb-6 flex-grow">Hébergement, correctifs, sécurité, et intégration des futures modifications catalogue.</p>
              <div className="mb-6">
                <span className="text-4xl font-serif text-tikoun-white">500</span>
                <span className="text-tikoun-gold ml-2 font-medium">₪ / mois</span>
              </div>
              <ul className="space-y-3 text-sm text-tikoun-white/70">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Maintenance technique mensuelle</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0" /> Mises à jour du catalogue</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-tikoun-gold shrink-0" /> Surveillance serveurs 24/7</li>
              </ul>
            </div>

            {/* Card 3 — Best offer */}
            <div className="bg-gradient-to-br from-tikoun-gold/10 to-tikoun-copper/5 border border-tikoun-gold/40 rounded-2xl p-8 transform md:-translate-y-4 shadow-2xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-tikoun-gold to-tikoun-copper" />
              <div className="absolute top-4 right-4 bg-tikoun-gold text-tikoun-black text-[10px] uppercase tracking-widest px-2 py-1 font-bold rounded">
                Meilleure Offre
              </div>
              <h3 className="text-xl font-bold text-tikoun-white mb-2">Pack Social Media + Maintenance + Vidéo</h3>
              <p className="text-tikoun-white/70 text-sm mb-4 flex-grow">
                Gestion réseaux sociaux, maintenance, production vidéo — et la refonte V2 <strong className="text-tikoun-gold">offerte à prix exceptionnel</strong>.
              </p>
              <div className="bg-tikoun-black/50 rounded-xl p-4 mb-5 border border-tikoun-gold/30">
                <p className="text-tikoun-gold text-xs font-bold uppercase tracking-widest mb-3">🎁 Offre Exclusive — Refonte V2</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-tikoun-white/35 text-base line-through whitespace-nowrap">8 000 ₪</span>
                  <span className="text-tikoun-gold text-3xl font-serif font-bold whitespace-nowrap">4 000 ₪</span>
                  <span className="bg-tikoun-gold text-tikoun-black text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap">-50%</span>
                </div>
                <p className="text-tikoun-white/50 text-xs mt-2">avec l&apos;adoption du pack mensuel</p>
              </div>
              <div className="mb-5">
                <span className="text-4xl font-serif text-tikoun-gold">3 000</span>
                <span className="text-tikoun-white/80 ml-2 font-medium">₪ / mois</span>
              </div>
              <ul className="space-y-3 text-sm text-tikoun-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0 mt-0.5" /><span>Refonte V2 <strong className="text-tikoun-gold">offerte à 4 000 ₪</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0 mt-0.5" /><span>Maintenance + Hébergement Vercel</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0 mt-0.5" /><span>Gestion Réseaux Sociaux</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tikoun-gold shrink-0 mt-0.5" /><span>Production Vidéos Professionnelles</span></li>
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-tikoun-gold shrink-0 mt-0.5" /><span>Agent IA Vocal + Boost acquisition</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ROI CALCULATOR — The fear reframe
        ═══════════════════════════════════════════ */}
        <section className="mb-20 bg-gradient-to-br from-tikoun-gold/8 to-tikoun-black border border-tikoun-gold/20 rounded-2xl p-8 md:p-10">
          <h2 className="font-serif text-3xl text-tikoun-white mb-3">Le Calcul Simple</h2>
          <p className="text-tikoun-white/50 text-sm mb-8 max-w-xl">Pas de jargon. Juste les chiffres qui comptent.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-tikoun-gold font-medium uppercase tracking-widest text-xs mb-4">Sans le site V2 — Chaque année</h3>
              <div className="flex justify-between items-center py-3 border-b border-tikoun-white/10">
                <span className="text-tikoun-white/60 text-sm">Ventes perdues estimées / an</span>
                <span className="text-red-400 font-medium">− 36 000 ₪</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-tikoun-white/10">
                <span className="text-tikoun-white/60 text-sm">Coût hébergement WordPress + plugins</span>
                <span className="text-red-400 font-medium">− 3 600 ₪</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-tikoun-white font-medium">Coût total de l&apos;inaction</span>
                <span className="text-red-400 font-bold text-lg">− 39 600 ₪ / an</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-tikoun-gold font-medium uppercase tracking-widest text-xs mb-4">Avec le Pack Complet</h3>
              <div className="flex justify-between items-center py-3 border-b border-tikoun-white/10">
                <span className="text-tikoun-white/60 text-sm">Investissement initial (refonte)</span>
                <span className="text-tikoun-white font-medium">4 000 ₪</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-tikoun-white/10">
                <span className="text-tikoun-white/60 text-sm">Pack mensuel × 12</span>
                <span className="text-tikoun-white font-medium">36 000 ₪</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-tikoun-white font-medium">Bénéfice net estimé</span>
                <span className="text-tikoun-gold font-bold text-lg">+ 0 ₪ le 1er mois</span>
              </div>
              <p className="text-tikoun-white/40 text-xs italic">* Basé sur une conversion minimum de 5 ventes supplémentaires / mois à 150 ₪ de panier moyen.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY NOT SHOPIFY
        ═══════════════════════════════════════════ */}
        <section className="mb-20 bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8 md:p-10">
          <h2 className="font-serif text-3xl md:text-4xl text-tikoun-white mb-3">Pourquoi pas Shopify ?</h2>
          <p className="text-tikoun-white/50 text-sm mb-10 max-w-2xl">Analyse comparative objective — données marché 2025-2026.</p>
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
                {[
                  ['Vitesse', 'SSR/SSG : pages en <1s, Lighthouse >95', '<50% des boutiques passent les Core Web Vitals'],
                  ['Frais transaction', '0% plateforme — Stripe standard 2.9%', '+0.5% à 2% Shopify en plus des frais bancaires'],
                  ['Coût mensuel', 'Hébergement Vercel gratuit', '29$-399$/mois + apps 50-350$/mois'],
                  ['SEO', 'URLs 100% libres, HTML parfait Google', 'URLs rigides imposées (/collections/, /products/)'],
                  ['Design', 'Liberté totale — animations, effets 3D', 'Limité aux thèmes Liquid'],
                  ['Agent IA vocal', 'Intégré nativement (Gemini 2.5)', 'Impossible nativement'],
                  ['Hébreu RTL', 'Support natif complet', 'Support RTL limité selon le thème'],
                ].map(([critere, nous, shopify]) => (
                  <tr key={critere} className="border-b border-tikoun-white/5">
                    <td className="py-4 pr-4 font-medium text-tikoun-white/80">{critere}</td>
                    <td className="py-4 px-4 text-tikoun-gold">{nous}</td>
                    <td className="py-4 pl-4">{shopify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[['10x', 'Plus rapide que WordPress/Shopify'], ['0%', 'Frais de plateforme'], ['∞', 'Personnalisation']].map(([val, label]) => (
              <div key={val} className="text-center p-6 bg-tikoun-black rounded-xl border border-tikoun-white/5">
                <span className="text-3xl font-serif text-tikoun-gold block mb-2">{val}</span>
                <span className="text-tikoun-white/50 text-xs uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            IA VOCAL MODULE
        ═══════════════════════════════════════════ */}
        <section className="mb-20 bg-gradient-to-br from-tikoun-gold/10 to-tikoun-copper/5 border border-tikoun-gold/30 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-tikoun-gold/20 flex items-center justify-center text-tikoun-gold">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-tikoun-white">Module IA Conversationnel Vocal</h2>
              <span className="text-tikoun-gold text-xs uppercase tracking-widest font-medium">Inclus · Déjà fonctionnel sur ce site</span>
            </div>
          </div>
          <p className="text-tikoun-white/70 font-light leading-relaxed mb-6 max-w-3xl">
            Un <strong className="text-tikoun-white">assistant IA vocal propulsé par Google Gemini 2.5</strong> — vos visiteurs dialoguent naturellement, à voix haute ou par texte, avec un conseiller connaissant l&apos;intégralité de votre catalogue, vos enseignements, et vos conditions de commande.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              ['🎙 Mode Vocal', 'Le client parle, Gemini répond à voix haute. Sans clavier.'],
              ['💬 Mode Chat', 'Interface texte avec réponses en streaming instantané.'],
              ['📚 Catalogue Complet', "L'IA connaît chaque livre, prix, et catégorie de votre boutique."],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-tikoun-black/50 rounded-xl p-4 border border-tikoun-white/10">
                <p className="text-tikoun-gold font-medium mb-1 text-sm">{title}</p>
                <p className="text-tikoun-white/60 text-xs font-light">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-tikoun-white/40 text-xs italic">Ce module est actif en bas à droite de cette page. Cliquez sur l&apos;icône pour l&apos;essayer maintenant.</p>
        </section>

        {/* ═══════════════════════════════════════════
            CTA FINAL — The Tip
        ═══════════════════════════════════════════ */}
        <section className="mb-16 text-center">
          <div className="bg-gradient-to-br from-tikoun-gold/15 to-tikoun-copper/10 border border-tikoun-gold/30 rounded-2xl p-10 md:p-14">
            <h2 className="font-serif text-3xl md:text-4xl text-tikoun-white mb-4">
              Est-ce que cela vous semble être<br />
              <span className="text-tikoun-gold italic">la bonne solution ?</span>
            </h2>
            <p className="text-tikoun-white/60 max-w-xl mx-auto mb-8 font-light">
              Chaque semaine qui passe est une semaine de plus où votre audience ne peut pas commander facilement. La décision ne changera pas les fondamentaux — elle les accélère.
            </p>

            {/* Urgency element */}
            <div className="inline-flex items-center gap-3 bg-tikoun-black/50 border border-tikoun-gold/30 rounded-full px-6 py-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              <span className="text-tikoun-white/70 text-sm">Disponibilité limitée — 2 projets acceptés par mois</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/dreamnovaultimate/tikoun-aolam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-tikoun-gold text-tikoun-black font-bold px-10 py-4 rounded-full text-lg hover:bg-white transition-colors shadow-2xl shadow-tikoun-gold/20 group"
              >
                Prendre Rendez-vous
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <p className="text-tikoun-white/30 text-xs mt-6 tracking-wider">
              Appel stratégique 30 min · Sans engagement · Réponse sous 24h
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            NEXT STEPS
        ═══════════════════════════════════════════ */}
        <section className="text-center mb-16 bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8">
          <h3 className="font-serif text-2xl text-tikoun-white mb-4">Prochaines Étapes : Activation du Paiement</h3>
          <p className="text-tikoun-white/60 font-light max-w-2xl mx-auto">
            Une fois les photos et le catalogue reçus, nous procéderons à l&apos;intégration complète de <strong className="text-tikoun-white">Stripe</strong> et <strong className="text-tikoun-white">PayPal</strong> — votre boutique sera opérationnelle en moins de 30 jours.
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
