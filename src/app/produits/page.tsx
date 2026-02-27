"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ShoppingBag, Star } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS, type ProductCategory } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

const CATEGORIES: Array<{ key: "all" | ProductCategory; label: string }> = [
  { key: "all", label: "Tous" },
  { key: "livres-etude", label: "Livres d'étude" },
  { key: "sidourim", label: "Nos Sidourim" },
  { key: "fetes", label: "Fêtes de l'Année" },
  { key: "tehilim", label: "Téhilim" },
  { key: "biographies", label: "Biographies" },
  { key: "contes", label: "Contes" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") as ProductCategory | null;

  const [activeCat, setActiveCat] = useState<"all" | ProductCategory>(
    catParam && CATEGORIES.some((c) => c.key === catParam) ? catParam : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const { formatPrice, getPrice } = useCurrency();

  // Sync URL param changes (browser back/forward)
  useEffect(() => {
    if (catParam && CATEGORIES.some((c) => c.key === catParam)) {
      setActiveCat(catParam);
    } else {
      setActiveCat("all");
    }
  }, [catParam]);

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesCat = activeCat === "all" || p.category === activeCat;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.subtitle?.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-tikoun-black pt-12 pb-24 relative overflow-hidden">
      {/* Global Shop Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.20, zIndex: 0 }}
      >
        <source src="/videos/book-carousel.mp4" type="video/mp4" />
      </video>

      {/* Page Header */}
      <div className="relative z-10 bg-tikoun-white/5 border-b border-tikoun-white/10 py-16 mb-12 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl font-bold text-tikoun-white mb-6 uppercase tracking-wider"
          >
            Notre <span className="text-tikoun-gold italic">Boutique</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-tikoun-white/60 max-w-2xl mx-auto text-lg font-light"
          >
            {filteredProducts.length} ouvrage{filteredProducts.length > 1 ? "s" : ""} — Des éditions traduites et reliées avec soin pour accompagner votre étude.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCat(cat.key)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors ${
                  activeCat === cat.key
                    ? "bg-tikoun-gold text-tikoun-black"
                    : "bg-tikoun-white/5 text-tikoun-white/70 hover:bg-tikoun-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Rechercher un livre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-tikoun-white focus:outline-none focus:border-tikoun-gold transition-colors"
            />
            <Search className="w-4 h-4 text-tikoun-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-tikoun-darkgray/30 rounded-2xl mb-4 border border-tikoun-white/5 overflow-hidden book-hover">
                {item.badge && (
                  <div className="absolute top-3 left-3 z-20 bg-tikoun-black/80 backdrop-blur-md border border-tikoun-gold/30 text-tikoun-gold px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded">
                    {item.badge}
                  </div>
                )}

                <Link
                  href={`/produits/${item.id}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">Voir {item.name}</span>
                </Link>

                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-20 flex justify-center bg-gradient-to-t from-tikoun-black/80 to-transparent">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(item);
                    }}
                    className="flex items-center gap-2 bg-tikoun-gold text-tikoun-black w-full justify-center py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" /> Ajouter
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-tikoun-white/50 text-xs tracking-widest uppercase mb-1">
                  {item.categoryLabel}
                </span>
                <Link
                  href={`/produits/${item.id}`}
                  className="hover:text-tikoun-gold transition-colors"
                >
                  <h3 className="font-serif text-lg text-tikoun-white mb-2 line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-tikoun-gold font-medium">
                    {formatPrice(getPrice(item))}
                  </span>
                  {item.rating && (
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3 h-3 ${
                            idx < (item.rating ?? 0)
                              ? "fill-tikoun-gold text-tikoun-gold"
                              : "fill-tikoun-white/20 text-tikoun-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <h3 className="text-2xl text-tikoun-white/60 font-serif">
              Aucun ouvrage trouvé pour &quot;{searchQuery}&quot;
            </h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCat("all");
              }}
              className="mt-4 text-tikoun-gold underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tikoun-black" />}>
      <ShopContent />
    </Suspense>
  );
}
