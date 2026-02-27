"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-tikoun-black text-tikoun-white border-t border-tikoun-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest uppercase">
              Tikoun <span className="text-tikoun-gold">Aolam</span>
            </Link>
            <p className="text-tikoun-white/60 text-sm leading-relaxed max-w-xs">
              Éditeur de référence des enseignements de Rabbi Na'hman de Breslev et Rabbi Israël Ber Odesser, avec une traduction française de la plus haute qualité.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-tikoun-white/5 border border-tikoun-white/10 flex items-center justify-center hover:bg-tikoun-gold hover:text-tikoun-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-tikoun-white/5 border border-tikoun-white/10 flex items-center justify-center hover:bg-tikoun-gold hover:text-tikoun-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-tikoun-white/5 border border-tikoun-white/10 flex items-center justify-center hover:bg-tikoun-gold hover:text-tikoun-black transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg text-tikoun-gold mb-6 uppercase tracking-widest">Nos Collections</h4>
            <ul className="space-y-3 text-sm text-tikoun-white/70">
              <li><Link href="/produits?cat=livres-etude" className="hover:text-tikoun-gold transition-colors">Livres d'étude</Link></li>
              <li><Link href="/produits?cat=sidourim" className="hover:text-tikoun-gold transition-colors">Nos Sidourim</Link></li>
              <li><Link href="/produits?cat=fetes" className="hover:text-tikoun-gold transition-colors">Fêtes de l'Année</Link></li>
              <li><Link href="/produits?cat=tehilim" className="hover:text-tikoun-gold transition-colors">Téhilim & Tikoun Haklali</Link></li>
              <li><Link href="/produits?cat=biographies" className="hover:text-tikoun-gold transition-colors">Biographies</Link></li>
              <li><Link href="/produits?cat=contes" className="hover:text-tikoun-gold transition-colors">Les Contes</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-serif text-lg text-tikoun-gold mb-6 uppercase tracking-widest">Liens Utiles</h4>
            <ul className="space-y-3 text-sm text-tikoun-white/70">
              <li><Link href="/editions" className="hover:text-tikoun-gold transition-colors">Nos Éditions</Link></li>
              <li><Link href="/blog" className="hover:text-tikoun-gold transition-colors">Notre Blog</Link></li>
              <li><Link href="/contact" className="hover:text-tikoun-gold transition-colors">Contactez-nous</Link></li>
              <li><Link href="/conditions" className="hover:text-tikoun-gold transition-colors">Conditions Générales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-tikoun-gold transition-colors">Politique de Confidentialité</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-tikoun-gold transition-colors">Mentions Légales</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-tikoun-gold mb-6 uppercase tracking-widest">Restez Informés</h4>
            <p className="text-tikoun-white/60 text-sm mb-4">
              Inscrivez-vous pour recevoir nos dernières publications et offres exclusives.
            </p>
            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-lg px-4 py-3 text-sm text-tikoun-white focus:outline-none focus:border-tikoun-gold transition-colors"
                required
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-tikoun-gold text-tikoun-black rounded-md hover:bg-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-tikoun-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-tikoun-white/40">
          <p>© {new Date().getFullYear()} Éditions Tikoun Aolam. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Paiement 100% Sécurisé</span>
            <span>•</span>
            <span>Livraison Rapide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
