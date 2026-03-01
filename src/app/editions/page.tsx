"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Users, Star, Globe } from "lucide-react";

const STATS = [
  { label: "Livres publiés", value: "25+" },
  { label: "Années d'expertise", value: "15+" },
  { label: "Lecteurs", value: "10 000+" },
  { label: "Langues", value: "FR / HE" },
];

const PILLARS = [
  {
    icon: BookOpen,
    title: "Une Traduction de Haut Niveau",
    text: "Il n'existe à notre connaissance aucun livre au monde qui puisse donner autant à penser, à analyser et donner du fil à retordre aux traducteurs. Rien n'est plus ardu et rien n'est plus profond pour l'intelligence humaine que la compréhension des livres de Rabbi Na'hman. Sa profondeur est inhérente au fait qu'elle puise sa source dans la suprême Sagesse divine, laquelle transcende les considérations liées au temps ou à l'espace.",
  },
  {
    icon: Users,
    title: "L'Équipe Éditoriale",
    text: "L'équipe est composée d'une dizaine de personnes, toutes attachées à Rabbi Na'hman. Après une première écriture effectuée par des traducteurs confirmés, les textes sont relus et contrôlés plusieurs fois avant d'être mis en page. Tout en préservant un français de qualité, nos traductions essaient de rester fidèles au sens des concepts parfois complexes en combinant clarté du langage et exactitude des mots.",
  },
  {
    icon: Globe,
    title: "Ouvrir de Nouveaux Horizons",
    text: "Nos traductions ont été pensées pour être un outil linguistique au service du lecteur qui, sur cette base, est invité à affiner sa découverte du texte. Résultat d'un long travail d'explications, de définitions et d'éclaircissements, nos publications visent à rendre les enseignements de Rabbi Na'hman plus facilement accessibles aux Juifs francophones d'aujourd'hui.",
  },
  {
    icon: Star,
    title: "Notre Mission Sacrée",
    text: "En donnant naissance aux Éditions Tikoun Aolam, notre but était de faire connaître au monde les écrits de Rabbi Na'hman au grand public et d'ouvrir ainsi une nouvelle page dans l'étude de textes en langue française. Nous espérons avec l'aide du Créateur que nos publications vont ouvrir de nouveaux horizons à l'étude d'une Torah de vie.",
  },
];

export default function EditionsPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-28 pb-24 relative overflow-hidden">
      {/* Man studying video — 25% opacity */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-contain object-top md:object-cover md:object-center pointer-events-none"
        style={{ opacity: 0.25, zIndex: 0 }}
      >
        <source src="/videos/man-studying.mp4" type="video/mp4" />
      </video>
      {/* Abstract glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-tikoun-copper/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative container mx-auto px-4 md:px-8 max-w-4xl text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-6 block">
            Découvrez notre histoire
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold text-tikoun-white mb-6">
            Les Éditions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              Tikoun Aolam
            </span>
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-tikoun-gold to-transparent mx-auto mb-10" />
          <p className="text-tikoun-white/60 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Une référence incontournable de la traduction et de la diffusion
            des textes du mouvement Breslev en langue française.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-2xl p-4 sm:p-8 text-center"
            >
              <div className="font-serif text-2xl sm:text-4xl font-bold text-tikoun-gold mb-2">{s.value}</div>
              <div className="text-tikoun-white/50 text-sm tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mission statement */}
      <div className="container mx-auto px-4 md:px-8 max-w-3xl mb-24">
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="border-l-4 border-tikoun-gold pl-8 py-4"
        >
          <p className="font-serif text-2xl md:text-3xl italic text-tikoun-white leading-relaxed">
            &quot;Notre exigence&nbsp;: une fidélité absolue aux textes originaux,
            sublimée par une traduction française d&apos;une qualité littéraire
            exceptionnelle, ouvrant les portes de la sagesse à tous.&quot;
          </p>
        </motion.blockquote>
      </div>

      {/* 4 Pillars — 3D hover cards */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mb-24">
        <div className="space-y-8">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                whileHover={{
                  y: -6,
                  rotateX: 2,
                  rotateY: i % 2 === 0 ? 1 : -1,
                  scale: 1.01,
                  boxShadow: "0 20px 60px rgba(212,175,55,0.12), 0 8px 20px rgba(0,0,0,0.4)",
                }}
                className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start p-5 sm:p-8 rounded-2xl border cursor-default transition-colors duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  borderColor: "rgba(255,255,255,0.08)",
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(184,115,51,0.2), rgba(212,175,55,0.08))",
                    border: "1px solid rgba(212,175,55,0.2)",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.1)",
                    transform: "translateZ(20px)",
                  }}
                >
                  <Icon className="w-7 h-7 text-tikoun-gold" />
                </div>
                <div style={{ transform: "translateZ(10px)" }}>
                  <h2 className="font-cinzel text-xl text-tikoun-white mb-4 tracking-wide">{pillar.title}</h2>
                  <p className="text-tikoun-white/70 font-light leading-relaxed">{pillar.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="container mx-auto px-4 md:px-8 max-w-2xl text-center"
      >
        <h3 className="font-serif text-3xl text-tikoun-white mb-6">
          Découvrez notre catalogue complet
        </h3>
        <p className="text-tikoun-white/60 mb-10 font-light">
          Des éditions de référence, conçues pour durer et pour élever l&apos;âme.
        </p>
        <Link
          href="/produits"
          className="inline-block bg-tikoun-gold text-tikoun-black px-12 py-4 rounded text-sm font-bold tracking-widest uppercase hover:bg-tikoun-white transition-colors"
        >
          Voir tous nos livres
        </Link>
      </motion.div>
    </div>
  );
}
