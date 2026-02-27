"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlyoutCart } from "@/components/shop/FlyoutCart";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

const BOOK_CATEGORIES = [
  { name: "Livres d'étude", href: "/produits?cat=livres-etude" },
  { name: "Nos Sidourim", href: "/produits?cat=sidourim" },
  { name: "Fêtes de l'Année", href: "/produits?cat=fetes" },
  { name: "Téhilim & Tikoun Haklali", href: "/produits?cat=tehilim" },
  { name: "Biographies", href: "/produits?cat=biographies" },
  { name: "Les Contes", href: "/produits?cat=contes" },
];

export function Header() {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full max-w-[100vw] z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-tikoun-black/85 backdrop-blur-md border-b border-tikoun-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo: flame only on mobile, flame + text on desktop */}
          <Link href="/" className="relative z-10 flex items-center gap-3 group">
            <Image
              src="/logo-flame.png"
              alt="Logo Tikoun Aolam"
              width={44}
              height={53}
              className="object-contain drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.7)] transition-all"
              priority
            />
            <span className="hidden lg:inline font-cinzel text-xl font-bold tracking-[0.25em] uppercase group-hover:text-tikoun-gold transition-colors">
              Tikoun <span className="text-tikoun-gold">Aolam</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <Link href="/" className="hover:text-tikoun-gold transition-colors">
              Accueil
            </Link>
            
            <div className="group relative">
              <button className="flex items-center gap-1 hover:text-tikoun-gold transition-colors py-2">
                Nos Livres <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-tikoun-black/95 backdrop-blur-lg border border-tikoun-white/10 rounded-lg shadow-2xl overflow-hidden py-2">
                  {BOOK_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="block px-4 py-2 text-sm text-tikoun-white/80 hover:text-tikoun-gold hover:bg-tikoun-white/5 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/blog" className="hover:text-tikoun-gold transition-colors">
              Notre Blog
            </Link>
            <Link href="/editions" className="hover:text-tikoun-gold transition-colors">
              Nos Éditions
            </Link>
            <div className="group relative">
              <Link href="/maitres" className="flex items-center gap-1 hover:text-tikoun-gold transition-colors py-2">
                Nos Maîtres <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-tikoun-black/95 backdrop-blur-lg border border-tikoun-white/10 rounded-lg shadow-2xl overflow-hidden py-2">
                  <Link href="/maitres/rabbi-nahman" className="block px-4 py-2 text-sm text-tikoun-white/80 hover:text-tikoun-gold hover:bg-tikoun-white/5 transition-colors">Rabbi Na&apos;hman</Link>
                  <Link href="/maitres/rabbi-israel-ber-odesser" className="block px-4 py-2 text-sm text-tikoun-white/80 hover:text-tikoun-gold hover:bg-tikoun-white/5 transition-colors">Rabbi Israël Ber Odesser</Link>
                  <Link href="/hiloula-de-rabbi-israel-ber-odesser" className="block px-4 py-2 text-sm text-tikoun-white/80 hover:text-tikoun-gold hover:bg-tikoun-white/5 transition-colors">Hiloula du Saba</Link>
                </div>
              </div>
            </div>
            <Link href="/contact" className="hover:text-tikoun-gold transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button aria-label="Rechercher" className="hover:text-tikoun-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="flex items-center bg-tikoun-white/5 rounded-full px-3 py-1 border border-tikoun-white/10 focus-within:border-tikoun-gold transition-colors">
               <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "ILS" | "EUR" | "USD")}
                className="bg-transparent text-sm appearance-none outline-none cursor-pointer text-tikoun-white pr-2"
               >
                 <option value="ILS" className="bg-tikoun-black text-tikoun-white">ILS ₪</option>
                 <option value="EUR" className="bg-tikoun-black text-tikoun-white">EUR €</option>
                 <option value="USD" className="bg-tikoun-black text-tikoun-white">USD $</option>
               </select>
               <ChevronDown className="w-3 h-3 text-tikoun-white/50 pointer-events-none" />
            </div>
            <button aria-label={`Panier (${itemCount} articles)`} className="relative group p-2" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5 group-hover:text-tikoun-gold transition-colors" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-tikoun-gold text-tikoun-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button aria-label={`Panier (${itemCount} articles)`} className="relative group p-2" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-6 h-6 group-hover:text-tikoun-gold transition-colors" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-tikoun-gold text-tikoun-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="text-tikoun-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-tikoun-black/95 backdrop-blur-xl border-b border-tikoun-white/10 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col p-6 space-y-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-tikoun-gold">Accueil</Link>
              <div className="space-y-3">
                <span className="text-sm text-tikoun-white/50 uppercase tracking-widest">Nos Livres</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4 border-l border-tikoun-white/10">
                  {BOOK_CATEGORIES.map((cat) => (
                    <Link key={cat.name} href={cat.href} onClick={() => setMobileMenuOpen(false)} className="text-sm hover:text-tikoun-gold">{cat.name}</Link>
                  ))}
                </div>
              </div>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-tikoun-gold">Notre Blog</Link>
              <Link href="/editions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-tikoun-gold">Nos Éditions</Link>
              <div className="space-y-3">
                <span className="text-sm text-tikoun-white/50 uppercase tracking-widest">Nos Maîtres</span>
                <div className="flex flex-col gap-2 pl-4 border-l border-tikoun-white/10">
                  <Link href="/maitres/rabbi-nahman" onClick={() => setMobileMenuOpen(false)} className="text-sm hover:text-tikoun-gold">Rabbi Na&apos;hman</Link>
                  <Link href="/maitres/rabbi-israel-ber-odesser" onClick={() => setMobileMenuOpen(false)} className="text-sm hover:text-tikoun-gold">Rabbi Israël Ber Odesser</Link>
                  <Link href="/hiloula-de-rabbi-israel-ber-odesser" onClick={() => setMobileMenuOpen(false)} className="text-sm hover:text-tikoun-gold">Hiloula du Saba</Link>
                </div>
              </div>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-tikoun-gold">Contact</Link>

              {/* Mobile currency selector */}
              <div className="pt-4 border-t border-tikoun-white/10 flex items-center gap-3">
                <span className="text-sm text-tikoun-white/50 uppercase tracking-widest">Devise</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as "ILS" | "EUR" | "USD")}
                  className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-lg px-4 py-2 text-sm text-tikoun-white appearance-none outline-none cursor-pointer"
                >
                  <option value="ILS" className="bg-tikoun-black text-tikoun-white">ILS ₪</option>
                  <option value="EUR" className="bg-tikoun-black text-tikoun-white">EUR €</option>
                  <option value="USD" className="bg-tikoun-black text-tikoun-white">USD $</option>
                </select>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <FlyoutCart open={cartOpen} setOpen={setCartOpen} />
    </header>
  );
}
