"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-tikoun-black">
      {/* Background with slow zoom effect (desktop only — disabled on mobile to prevent jitter) */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        <div className="absolute inset-0 bg-tikoun-black/70 z-10" />
        {/* Static photo base */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('https://tikoun-aolam.com/wp-content/uploads/2024/12/Image-Accueil.jpg')" }}
        />
        {/* Flow video overlay — 25% opacity */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain object-top md:object-cover md:object-center"
          style={{ opacity: 0.25, zIndex: 5 }}
        >
          <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
        </video>
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-tikoun-black via-transparent to-tikoun-black/80 z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tikoun-white/5 border border-tikoun-gold/30 text-tikoun-gold text-xs uppercase tracking-widest font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-tikoun-gold animate-pulse" />
          Les Éditions de Référence
        </motion.div>

        <div className="relative">
          {/* Animated Gold Halo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-tikoun-gold/30 blur-[80px] rounded-[100%] pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-tikoun-white leading-tight mb-8"
          >
            L'Élévation par <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              l'Étude
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-tikoun-white/80 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Découvrez la source des enseignements de Rabbi Na'hman de Breslev, traduits avec la plus haute précision et présentés dans des ouvrages d'exception.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Link 
            href="/produits"
            className="group relative inline-flex items-center justify-center gap-3 bg-tikoun-gold text-tikoun-black px-8 py-4 text-sm font-bold uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
            Découvrir Nos Livres
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/editions"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-widest text-tikoun-white relative after:absolute after:bottom-2 after:left-8 after:right-8 after:h-[1px] after:bg-tikoun-gold after:scale-x-0 cursor-pointer after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Notre Histoire
          </Link>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-tikoun-white/10 to-transparent z-10 hidden md:block" />
      <div className="absolute right-8 lg:right-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-tikoun-white/10 to-transparent z-10 hidden md:block" />
    </section>
  );
}
