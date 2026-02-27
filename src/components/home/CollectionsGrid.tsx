"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Livres d'Étude",
    description: "Les ouvrages fondamentaux pour l'étude quotidienne et l'élévation spirituelle.",
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/09/Otsar-Hayira-Fiche-Produit.jpg",
    link: "/produits?cat=livres-etude",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 md:row-span-2",
  },
  {
    title: "Nos Sidourim",
    description: "Prières et recueillement.",
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Sidour-Bilingue-Double001.jpg",
    link: "/produits?cat=sidourim",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Fêtes de l'Année",
    description: "Vivez les temps forts de l'année juive.",
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/07/00Pack-Roch-Hachana-_-Kippour-_-Souccot.jpg",
    link: "/produits?cat=fetes",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
    rowSpan: "row-span-1 md:row-span-2",
  },
  {
    title: "Téhilim & Tikoun Haklali",
    description: "Protection et réparation de l'âme.",
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Tehilim-de-Rabenou-Double002.jpg",
    link: "/produits?cat=tehilim",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Biographies",
    description: "La vie des Justes.",
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/03/Biographie-de-Rabbi-Nahman-Double2.jpg",
    link: "/produits?cat=biographies",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Les Contes",
    description: "La sagesse racontée.",
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Les-Contes-des-Temps-Anciens-Double001.jpg",
    link: "/produits?cat=contes",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  }
];

export function CollectionsGrid() {
  return (
    <section className="py-24 bg-tikoun-black relative z-10">
      <div className="container mx-auto px-4 md:px-8">

        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-tikoun-white mb-6 uppercase tracking-wider">
              Explorez Nos<br/> <span className="text-tikoun-gold italic">Collections</span>
            </h2>
            <p className="text-tikoun-white/60 text-lg font-light leading-relaxed">
              Plongez dans un océan de sagesse avec nos éditions soigneusement traduites et magnifiquement reliées, conçues pour enrichir votre étude.
            </p>
          </div>
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-tikoun-gold font-medium hover:text-tikoun-white transition-colors group"
          >
            Voir tout le catalogue
            <span className="w-8 h-[1px] bg-tikoun-gold group-hover:bg-tikoun-white transition-colors block ml-2"></span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-xl bg-tikoun-darkgray/50 border border-tikoun-white/5 hover:border-tikoun-gold/30 transition-colors ${cat.colSpan} ${cat.rowSpan}`}
            >
              <Link href={cat.link} className="absolute inset-0 z-20">
                <span className="sr-only">Voir {cat.title}</span>
              </Link>

              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tikoun-black via-tikoun-black/40 to-transparent" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-10 h-10 rounded-full bg-tikoun-white/10 backdrop-blur-md flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-4 group-hover:translate-y-0">
                   <ArrowUpRight className="w-5 h-5 text-tikoun-gold" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-tikoun-white mb-2">{cat.title}</h3>
                <p className="text-tikoun-white/70 text-sm md:text-base font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
