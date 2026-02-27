"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, MessageCircle } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    title: "Livraison 24/48h",
    desc: "En Israël et en France avec suivi"
  },
  {
    icon: ShieldCheck,
    title: "Paiement Sécurisé",
    desc: "Transactions 100% cryptées"
  },
  {
    icon: Clock,
    title: "Offres Exclusives",
    desc: "Promotions réservées aux membres"
  },
  {
    icon: MessageCircle,
    title: "Support WhatsApp",
    desc: "Une équipe à votre écoute"
  }
];

export function TrustBadges() {
  return (
    <section className="py-16 bg-tikoun-black/60 border-y border-tikoun-white/5 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-4">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div 
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-tikoun-white/5 border border-tikoun-white/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-tikoun-gold/10 group-hover:border-tikoun-gold/30 transition-colors duration-500">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-tikoun-gold opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-sm sm:text-lg text-tikoun-white mb-1 sm:mb-2">{badge.title}</h4>
                <p className="text-sm text-tikoun-white/50">{badge.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
