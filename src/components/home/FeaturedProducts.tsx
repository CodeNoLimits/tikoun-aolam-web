"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

const PRODUCTS = getFeaturedProducts();

export function FeaturedProducts() {
  const { addItem } = useCart();
  const { formatPrice, getPrice } = useCurrency();

  return (
    <section className="py-24 bg-tikoun-black relative z-10 border-t border-tikoun-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-tikoun-white mb-4 uppercase tracking-wider">
            Ventes du{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              Moment
            </span>
          </h2>
          <div className="w-24 h-[1px] bg-tikoun-gold mx-auto opacity-50 mb-6" />
          <p className="text-tikoun-white/60 text-lg font-light max-w-2xl mx-auto">
            Découvrez les ouvrages les plus plébiscités par notre communauté,
            édités avec le plus grand soin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PRODUCTS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group flex flex-col"
            >
              {/* 3D Flip Card Container */}
              <div className="relative aspect-[4/5] perspective-1000 mb-6 group/card">
                <div className="w-full h-full relative transition-transform duration-1000 transform-style-3d group-hover/card:rotate-y-180">
                  
                  {/* Front Face */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-tikoun-darkgray/30 rounded-2xl border border-tikoun-white/5 overflow-hidden">
                    {item.badge && (
                      <div className="absolute top-4 left-4 z-20 bg-tikoun-black/80 backdrop-blur-md border border-tikoun-gold/30 text-tikoun-gold px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded">
                        {item.badge}
                      </div>
                    )}
                    <div
                      className="w-full h-full bg-no-repeat transition-all duration-700 ease-out"
                      style={{ 
                        backgroundImage: `url('${item.image}')`,
                        backgroundSize: '115%',
                        backgroundPosition: 'center top'
                      }}
                    />
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-tikoun-black rounded-2xl border border-tikoun-gold/30 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-[inset_0_0_50px_rgba(212,175,55,0.1)]">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)' }} />
                    <div className="relative z-10 flex flex-col items-center h-full justify-between py-4">
                      <h4 className="font-serif text-2xl text-tikoun-gold mb-2">{item.name}</h4>
                      <p className="text-tikoun-white/70 text-sm font-light italic mb-6">Édition Premium Reliée</p>
                      
                      <div className="flex flex-col gap-4 w-full">
                        <Link
                          href={`/produits/${item.id}`}
                          className="w-full text-center border py-3 px-6 rounded-lg font-bold text-xs tracking-widest uppercase transition-colors text-tikoun-white border-tikoun-white/30 hover:border-tikoun-gold hover:text-tikoun-gold"
                        >
                          Voir les détails
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addItem(item);
                          }}
                          className="flex items-center gap-2 bg-tikoun-gold text-tikoun-black hover:bg-white w-full justify-center py-3 px-6 rounded-lg font-bold text-xs tracking-widest uppercase transition-colors shadow-xl"
                        >
                          <ShoppingBag className="w-4 h-4" /> Ajouter au panier
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex gap-1 mb-2 text-tikoun-gold">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3 h-3 ${
                        idx < (item.rating ?? 0)
                          ? "fill-tikoun-gold"
                          : "fill-tikoun-white/20 text-tikoun-white/20"
                      }`}
                    />
                  ))}
                </div>
                <Link href={`/produits/${item.id}`}>
                  <h3 className="font-serif text-xl tracking-wide text-tikoun-white group-hover:text-tikoun-gold transition-colors mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <span className="text-tikoun-white/90 font-medium text-lg">
                  {formatPrice(getPrice(item))}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
