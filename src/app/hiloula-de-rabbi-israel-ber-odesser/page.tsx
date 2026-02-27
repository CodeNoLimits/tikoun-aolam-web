"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

export default function HiloulaPage() {
  return (
    <div className="min-h-screen bg-tikoun-black relative overflow-hidden">
      {/* Book glow video background */}
      <video
        autoPlay muted loop playsInline
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.2, zIndex: 0 }}
      >
        <source src="/videos/book-glow.mp4" type="video/mp4" />
      </video>

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* Saba portrait: ghostly 26% opacity with fade-to-zero at the bottom */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 20%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 85%)',
            }}
          >
            <Image
              src="https://tikoun-aolam.com/wp-content/uploads/2023/11/Rabbi-Israel-Dov-Ber-Odesser-1.jpg"
              alt="Rabbi Israël Ber Odesser — Le Saba"
              fill className="object-cover object-center opacity-[0.26]" priority sizes="100vw"
            />
          </div>
          {/* Subtle darkening at the very top for header readability */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-tikoun-black/70 to-transparent z-[3]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-tikoun-gold text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
              4 Kislev — Hiloula
            </span>
            <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-tikoun-white leading-tight mb-4">
              Hiloula de Rabbi<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper">
                Israël Ber Odesser
              </span>
            </h1>
            <p className="text-tikoun-white/70 text-lg font-light max-w-xl">
              «&nbsp;Le Saba&nbsp;» — Révélateur du Petek et du secret de Na Na&apos;hman Mé&apos;Ouman
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-3xl pb-24">

        {/* Petek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 p-8 bg-gradient-to-br from-tikoun-gold/10 to-tikoun-copper/5 border border-tikoun-gold/30 rounded-2xl text-center"
        >
          <p className="font-cinzel text-2xl md:text-3xl text-tikoun-gold leading-relaxed tracking-widest">
            נ&nbsp;נח&nbsp;נחמ&nbsp;נחמן&nbsp;מאומן
          </p>
          <p className="text-tikoun-white/60 text-sm mt-4 tracking-widest uppercase">
            Na&nbsp;Nach&nbsp;Na'hma&nbsp;Na'hman&nbsp;Mé&apos;Ouman
          </p>
        </motion.div>

        {/* Article text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="space-y-6 text-tikoun-white/80 font-light leading-relaxed text-lg">
            <p>
              Le 4 Kislev est le jour de la Hiloula de Rabbi Israël Ber Odesser (1888–1994), connu
              sous le nom affectueux de «&nbsp;<strong className="text-tikoun-gold">le Saba</strong>&nbsp;» —
              le grand-père. Ce Tsadik d&apos;exception a vécu 106 ans et a consacré sa vie entière
              à diffuser la lumière de Rabbi Na&apos;hman de Breslev dans le monde entier.
            </p>

            <p>
              En 1922, alors qu&apos;il traversait une période de grande tristesse, le Saba trouva
              glissé entre les pages d&apos;un livre un billet mystérieux — connu depuis sous le nom
              de <strong className="text-tikoun-white">«&nbsp;le Petek&nbsp;»</strong> — signé par
              Rabbi Na&apos;hman lui-même, décédé 112 ans auparavant. Ce billet, miracle parmi les
              miracles, contenait la formule sacrée&nbsp;:
            </p>

            <blockquote className="border-l-4 border-tikoun-gold pl-6 py-2 bg-tikoun-white/3 rounded-r-xl">
              <p className="font-cinzel text-tikoun-gold text-xl leading-relaxed">
                «&nbsp;Na Nach Na&apos;hma Na&apos;hman Mé&apos;Ouman&nbsp;»
              </p>
              <p className="text-tikoun-white/60 text-sm mt-2">
                — Le Petek, lettre de Rabbi Na&apos;hman au Saba
              </p>
            </blockquote>

            <p>
              Le Saba a passé les dernières décennies de sa vie à Jerusalem, dans le quartier de
              Meah Shearim, entouré de disciples venus du monde entier. Il disait à quiconque
              s&apos;approchait de lui&nbsp;: <em className="text-tikoun-white/90">«&nbsp;Il n&apos;y a pas de
              désespoir dans le monde. Ein Ye&apos;ouch Ba&apos;Olam Klal.&nbsp;»</em>
            </p>

            <p>
              En ce jour anniversaire de sa disparition, nous nous souvenons de sa lumière,
              de son sourire inépuisable, et de son message universel d&apos;espoir et de joie.
              Les Éditions Tikoun Aolam ont pour mission de perpétuer l&apos;enseignement du
              Saba et de Rabbi Na&apos;hman à travers des traductions d&apos;une qualité
              exceptionnelle en langue française.
            </p>
          </div>
        </motion.div>

        {/* Read more on original site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 pt-12 border-t border-tikoun-white/10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="https://tikoun-aolam.com/hiloula-de-rabbi-israel-ber-odesser/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-tikoun-gold text-tikoun-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
          >
            Lire l&apos;article complet →
          </a>
          <Link
            href="/maitres/rabbi-israel-ber-odesser"
            className="inline-flex items-center gap-2 border border-tikoun-white/20 text-tikoun-white px-8 py-3 text-sm tracking-widest uppercase hover:border-tikoun-gold hover:text-tikoun-gold transition-all"
          >
            Biographie du Saba
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
