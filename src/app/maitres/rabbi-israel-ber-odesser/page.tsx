"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export default function RabbiIsraelPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-28 pb-24">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden mb-0">
        <Image
          src="https://tikoun-aolam.com/wp-content/uploads/2023/11/Rabbi-Israel-Dov-Ber-Odesser-1.jpg"
          alt="Rabbi Israël Ber Odesser — Le Saba"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tikoun-black/40 via-transparent to-tikoun-black" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-4 block">
              Nos Maîtres
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-tikoun-white leading-tight">
              Rabbi Israël <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper">
                Ber Odesser
              </span>
            </h1>
            <p className="font-serif text-tikoun-white/70 text-xl mt-4 italic">
              «&nbsp;Na Na'hman Mé&apos;Ouman&nbsp;»
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-3xl pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 text-tikoun-white/80 text-lg font-light leading-relaxed"
        >
          {/* Quote block */}
          <blockquote className="border-l-4 border-tikoun-gold pl-8 py-4 my-10">
            <p className="font-serif text-2xl italic text-tikoun-gold leading-relaxed">
              &quot;Na Na&apos;hman Mé&apos;Ouman — c&apos;est le remède général pour toutes les maladies de l&apos;âme.&quot;
            </p>
            <cite className="text-tikoun-white/50 text-sm mt-3 block not-italic tracking-widest uppercase">
              — Le Saba, Rabbi Israël Ber Odesser
            </cite>
          </blockquote>

          <p>
            Rabbi Israël Ber Odesser, connu et aimé de tous sous le nom de <strong className="text-tikoun-white">«&nbsp;le Saba&nbsp;»</strong> (le grand-père en hébreu), est la figure emblématique qui a révélé au monde le <em>Petek</em> — le billet miraculeux — portant la signature sacrée <strong className="text-tikoun-gold">«&nbsp;Na Na&apos;hman Mé&apos;Ouman&nbsp;»</strong>.
          </p>

          <p>
            Né en 1888 à Tiberias, il traversa des épreuves spirituelles d&apos;une intensité rare. Un jour, dans un moment de désespoir profond, il reçut de manière miraculeuse ce billet qu&apos;il attribua à Rabbi Na&apos;hman de Breslev lui-même. Ce signe divin transforma radicalement sa vie et devint le fondement de sa mission : diffuser la lumière de Na Na&apos;hman à travers le monde entier.
          </p>

          <div className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-8 my-10">
            <h2 className="font-serif text-2xl text-tikoun-gold mb-4">Le Petek — Le Billet Miraculeux</h2>
            <p className="text-tikoun-white/70">
              Le Petek contient les mots suivants : <em>«&nbsp;Il m&apos;a été très difficile de vous descendre Na Na&apos;hman Mé&apos;Ouman...&nbsp;»</em>. Ce billet est considéré par des milliers de personnes comme un signe direct du Ciel, porteur d&apos;une force spirituelle incomparable pour élever les âmes.
            </p>
          </div>

          <p>
            Grâce à sa dévotion incroyable et à sa joie communicative, le Saba a consacré des décennies à parcourir Israël — notamment les rues de Tel Aviv — pour distribuer les livres de Rabbi Na&apos;hman, chanter Na Na&apos;hman, et allumer la flamme de la foi dans des milliers de cœurs.
          </p>

          <p>
            Il s&apos;éteignit le <strong className="text-tikoun-white">4 Kislev 5755 (7 novembre 1994)</strong> à Jérusalem, à l&apos;âge de 106 ans, après une vie entièrement consacrée à la Hafatsa (diffusion) des enseignements breslev. Notre maison d&apos;édition <strong className="text-tikoun-gold">Tikoun Aolam</strong> s&apos;inscrit directement dans cette mission sacrée qu&apos;il nous a léguée.
          </p>

          <p>
            Sa Hiloula (anniversaire de son départ) est célébrée chaque année le <strong className="text-tikoun-white">4 Kislev</strong>, attirant des milliers de fidèles qui se rassemblent pour honorer sa mémoire et perpétuer son message de joie et de foi.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/maitres/rabbi-nahman"
            className="px-8 py-4 border border-tikoun-white/20 text-tikoun-white text-sm tracking-widest uppercase rounded hover:border-tikoun-gold hover:text-tikoun-gold transition-all text-center"
          >
            Découvrir Rabbi Na&apos;hman →
          </Link>
          <Link
            href="/produits"
            className="px-8 py-4 bg-tikoun-gold text-tikoun-black text-sm tracking-widest uppercase font-bold rounded hover:bg-tikoun-white transition-colors text-center"
          >
            Nos Livres Breslev
          </Link>
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-tikoun-white/40 text-xs tracking-widest uppercase hover:text-tikoun-gold transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
