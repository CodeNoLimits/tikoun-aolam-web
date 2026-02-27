"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Star } from "lucide-react";

export function BandeauPromo() {
  return (
    <div className="bg-tikoun-gold text-tikoun-black py-3 overflow-hidden whitespace-nowrap border-y border-tikoun-copper/30">
      <motion.div
        className="flex items-center gap-8 md:gap-16 font-medium text-sm tracking-widest uppercase"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Livraison Gratuite France dès 59€
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Paiement 100% Sécurisé
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Des Ouvrages d'Exception
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
