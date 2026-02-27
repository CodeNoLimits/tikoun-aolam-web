"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    clearCart();
    // Confetti effect done with CSS below
  }, [clearCart]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-tikoun-black relative overflow-hidden flex items-center justify-center pt-28 pb-24">
      {/* Animated pure gold background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-tikoun-gold/10 blur-[120px] animate-pulse" />
      </div>

      {/* Confetti particles */}
      {[...Array(40)].map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          top: `-10%`,
          animationDuration: `${3 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 2}s`,
          width: `${5 + Math.random() * 8}px`,
          height: `${10 + Math.random() * 20}px`,
          backgroundColor: Math.random() > 0.5 ? '#d4af37' : '#b87333',
        };
        return (
          <div
            key={i}
            className="absolute rounded-sm opacity-80 confetti"
            style={style}
          />
        );
      })}

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.4 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-tikoun-gold/30 blur-xl rounded-full" />
          <CheckCircle className="w-32 h-32 text-tikoun-gold relative z-10" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl text-center text-tikoun-white font-bold tracking-wide mb-6 uppercase"
        >
          Commande <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
            Confirmée
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-tikoun-white/70 text-lg md:text-xl text-center max-w-lg mb-12 font-light"
        >
          Merci de votre confiance. Vos ouvrages de référence sont en cours de préparation et rejoindront très bientôt votre bibliothèque.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-md"
        >
          <Link
            href="/produits"
            className="flex-1 flex items-center justify-center gap-3 bg-tikoun-gold text-tikoun-black hover:bg-white py-4 px-6 rounded-lg font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-tikoun-gold/20"
          >
            <ShoppingBag className="w-4 h-4" /> Continuer
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-3 bg-transparent border border-tikoun-white/20 text-tikoun-white hover:border-tikoun-gold hover:text-tikoun-gold py-4 px-6 rounded-lg font-bold text-sm tracking-widest uppercase transition-colors"
          >
            Accueil <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
