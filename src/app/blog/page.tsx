"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type Article = {
  slug: string;
  title: string;
  cat: string;
  date: string;
  img: string;
  excerpt: string;
};

const ARTICLES: Article[] = [
  {
    slug: "tou-bichvat-le-tsadik-symbolise-le-etrog",
    title: "Tou Bichvat : Le Tsadik Symbolise le Etrog",
    cat: "Fêtes de l'année",
    date: "2026-02-01",
    img: "https://tikoun-aolam.com/wp-content/uploads/2026/02/Tou-Bichvat-Tikoun-Aolam.jpg",
    excerpt: "À l'occasion de Tou Bichvat, découvrez comment le Tsadik représente le Etrog — le fruit de la beauté — et comment son attachement élève chaque âme d'Israël.",
  },
  {
    slug: "hiloula-de-rabbi-nathan-5786",
    title: "Hiloula de Rabbi Nathan 5786",
    cat: "Hiloulots",
    date: "2025-12-29",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Hiloula-de-Rabbi-Nathan.jpg",
    excerpt: "En ce jour de Hiloula de Rabbi Nathan de Breslev, nous célébrons l'héritage inestimable du plus grand disciple de Rabbi Na'hman, qui a transmis son enseignement au monde.",
  },
  {
    slug: "hiloula-de-rabbi-israel-ber-odesser",
    title: "Hiloula de Rabbi Israël Ber Odesser",
    cat: "Hiloulots",
    date: "2025-11-07",
    img: "https://tikoun-aolam.com/wp-content/uploads/2023/11/Rabbi-Israel-Dov-Ber-Odesser-1.jpg",
    excerpt: "Quatrième Kislev — Hiloula du Saba. Une journée pour rappeler la lumière de Na Na'hman Mé'Ouman et l'amour infini que le Saba portait à chaque âme d'Israël.",
  },
  {
    slug: "hiloula-de-rabbi-israel-kardouner",
    title: "Hiloula de Rabbi Israël Kardouner",
    cat: "Hiloulots",
    date: "2025-10-29",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/10/Hiloula-de-Rabbi-Israel-Kardouner-Tikoun-Aolam.jpg",
    excerpt: "Rabbi Israël Kardouner, l'un des plus grands disciples de Breslev, a consacré sa vie à transmettre la joie et la foi de Rabbi Na'hman dans les générations difficiles.",
  },
  {
    slug: "roch-hachana-rabbi-nahman",
    title: "Roch Hachana : Rabbi Na'hman est le Roch Hachana du Monde",
    cat: "Fêtes de l'année",
    date: "2025-09-22",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/09/Fetes-de-lannee-Tikoun-Aolam.jpg",
    excerpt: "Roch Hachana est le jour fondateur de tous les enseignements de Rabbi Na'hman. Il nous a promis : 'Quiconque vient sur ma tombe à Roch Hachana, je me fais garant de lui.'",
  },
  {
    slug: "eloul-retourner-vers-hachem",
    title: "Eloul : Retourner vers Hachem avec l'aide du Tsadik",
    cat: "Etude de Torah",
    date: "2025-08-29",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/08/ELOUL-Tikoun-Aolam.jpg",
    excerpt: "Le mois d'Eloul est le moment idéal pour la téchouva et le rapprochement vers le Créateur. Rabbi Na'hman enseigne que le Tsadik est la porte de retour.",
  },
  {
    slug: "tisha-beav-disparition-tsadikim",
    title: "Tisha Béav — La disparition des Tsadikim",
    cat: "Fêtes de l'année",
    date: "2025-08-12",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/08/Tisha-Beav-Tikoun-Aolam.jpg",
    excerpt: "En ce jour de deuil national, Rabbi Na'hman révèle une lumière cachée : la disparition des Tsadikim n'est pas une fin, mais un passage vers une lumière encore plus grande.",
  },
  {
    slug: "balak-feuillet-rabenou",
    title: "Parachat Balak — Le Feuillet de Rabénou",
    cat: "Paracha",
    date: "2025-07-19",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/07/Balak-Tikoun-Aolam.jpg",
    excerpt: "Le Feuillet de Rabénou sur Balak révèle comment la bénédiction de Bilaam se transforme en enseignement central de la joie et de l'attachement au Tsadik.",
  },
  {
    slug: "17-tamouz-feuillet-rabenou",
    title: "17 Tamouz — Le Feuillet de Rabénou",
    cat: "Fêtes de l'année",
    date: "2025-07-14",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/07/17-Tamouz-Tikoun-Aolam.jpg",
    excerpt: "La période des Trois Semaines selon Rabbi Na'hman : comment transformer le deuil en espoir et comprendre la profondeur de la Téchouva dans notre génération.",
  },
  {
    slug: "houkat-tsadik-vache-rousse",
    title: "Parachat 'Houkat — Le Tsadik symbolise la Vache Rousse",
    cat: "Paracha",
    date: "2025-07-12",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/07/Houkat-Tikoun-Aolam.jpg",
    excerpt: "Mystère des mystères : la Vache Rousse purifie le peuple d'Israël de la même façon que le Tsadik véritable purifie les âmes de leur impur spirituel.",
  },
  {
    slug: "lag-baomer-rabenou-rabbi-chimon",
    title: "Lag Baomer : La rencontre extraordinaire entre Rabénou et Rabbi Chimon",
    cat: "Fêtes de l'année",
    date: "2025-05-16",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/05/Lag-Baomer-Tikoun-Aolam.jpg",
    excerpt: "Lag Baomer est le jour de joie de Rabbi Chimon Bar Yo'haï. Rabbi Na'hman révèle le lien profond entre ces deux Tsadikim à travers les générations.",
  },
  {
    slug: "chavouot-mikvé-rabenou",
    title: "Chavouot — Rabenou symbolise le Mikvé de Chavouot",
    cat: "Fêtes de l'année",
    date: "2025-06-01",
    img: "https://tikoun-aolam.com/wp-content/uploads/2025/05/Chavouot-Tikoun-Aolam.jpg",
    excerpt: "La Torah est la source de pureté absolue. À Chavouot, Rabbi Na'hman révèle comment le Tsadik véritable nous permet de recevoir la Torah à travers la pureté spirituelle.",
  },
];

const CATEGORIES = ["Toutes", "Fêtes de l'année", "Hiloulots", "Paracha", "Etude de Torah", "Torah"];

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState("Toutes");

  const filtered = activeCat === "Toutes"
    ? ARTICLES
    : ARTICLES.filter((a) => a.cat === activeCat);

  return (
    <div className="min-h-screen bg-tikoun-black relative pt-28 pb-24 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.10, zIndex: 0 }}
      >
        <source src="/videos/books-presentation.mp4" type="video/mp4" />
      </video>

      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-6 block">
            Paracha, Fêtes & Étude
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-tikoun-white mb-6">
            Notre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              Blog
            </span>
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-tikoun-gold to-transparent mx-auto mb-8" />
          <p className="text-tikoun-white/60 text-lg font-light max-w-2xl mx-auto">
            Plongez dans les enseignements profonds de la Torah à travers la lumière de Rabbi Na&apos;hman. Un feuillet spirituel mis à jour régulièrement.
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all border ${
                activeCat === cat
                  ? "bg-tikoun-gold text-tikoun-black border-tikoun-gold font-medium"
                  : "border-tikoun-white/15 text-tikoun-white/60 hover:border-tikoun-gold/40 hover:text-tikoun-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group bg-tikoun-white/3 border border-tikoun-white/8 rounded-2xl overflow-hidden hover:border-tikoun-gold/30 transition-all duration-300"
            >
              {/* Image */}
              <div
                className="h-52 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url('${article.img}')` }}
              >
                <div className="absolute inset-0 bg-tikoun-black/30 group-hover:bg-tikoun-black/10 transition-colors" />
                <span className="absolute top-4 left-4 bg-tikoun-black/80 text-tikoun-gold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-tikoun-gold/20 backdrop-blur-sm">
                  {article.cat}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <time className="text-tikoun-white/40 text-xs tracking-widest uppercase block mb-3">
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="font-serif text-tikoun-white text-lg leading-snug mb-3 group-hover:text-tikoun-gold transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-tikoun-white/50 text-sm font-light leading-relaxed line-clamp-3 mb-5">
                  {article.excerpt}
                </p>
                <a
                  href={`https://tikoun-aolam.com/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tikoun-gold text-xs tracking-widest uppercase hover:text-tikoun-white transition-colors inline-flex items-center gap-2"
                >
                  Lire l&apos;article →
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-tikoun-white/40">
            Aucun article dans cette catégorie.
          </div>
        )}

        {/* More articles note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-12 border-t border-tikoun-white/10"
        >
          <p className="text-tikoun-white/40 text-sm mb-6">
            Plus de 35 articles disponibles sur notre site principal
          </p>
          <a
            href="https://tikoun-aolam.com/notre-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-tikoun-white/20 text-tikoun-white px-8 py-3 rounded text-sm tracking-widest uppercase hover:border-tikoun-gold hover:text-tikoun-gold transition-all"
          >
            Voir tous les articles →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
