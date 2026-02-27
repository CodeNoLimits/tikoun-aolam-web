"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SHOWCASE_BOOKS = [
  {
    id: "likoute-halakhot-orah-haim-1",
    title: "Likouté Halakhot – Ora'h 'Haim 1",
    author: "Rabbi Nathan de Breslev",
    price: 150,
    image: "https://tikoun-aolam.com/wp-content/uploads/2024/03/LH-Orah-Haim-1-Double002.jpg",
    desc: "Cette œuvre magistrale transpose les enseignements spirituels du Likouté Moharan dans la dimension pratique de la Halakha (Loi Juive). Rabbi Nathan y révèle les profondeurs cachées de chaque loi avec une clarté remarquable.",
  },
  {
    id: "sidour-commente",
    title: "Le Sidour de Rabénou – Commenté",
    author: "Rabbi Na'hman de Breslev",
    price: 100,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Sidour-Tefilot-Double001.jpg",
    desc: "Le recueil de prières traditionnel enrichi des précieux commentaires, kavanot et enseignements de Rabbi Na'hman. Chaque prière est accompagnée d'explications profondes.",
  },
  {
    id: "contes-temps-anciens",
    title: "Les Contes des Temps Anciens",
    author: "Rabbi Na'hman de Breslev",
    price: 200,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Les-Contes-des-Temps-Anciens-Double001.jpg",
    desc: "Un chef-d'œuvre exceptionnel de 618 pages. Les treize contes en bilingue interlinéaire révélant les secrets les plus profonds de la Kabbale sous forme d'histoires intemporelles.",
  },
];

export function BookShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === SHOWCASE_BOOKS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? SHOWCASE_BOOKS.length - 1 : prev - 1));
  };

  const book = SHOWCASE_BOOKS[activeIndex];

  return (
    <section className="py-24 bg-tikoun-black relative overflow-hidden">
      {/* Book carousel video — 25% opacity */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.25, zIndex: 0 }}
      >
        <source src="/videos/book-carousel.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-tikoun-white/5 skew-y-3 origin-top-left -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-tikoun-white mb-4 uppercase tracking-wider">
              Ouvrages{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
                Exceptionnels
              </span>
            </h2>
            <p className="text-tikoun-white/60 text-lg font-light max-w-xl">
              Plongez dans ces éditions prestigieuses, véritables trésors pour l'âme.
            </p>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-tikoun-white/20 flex items-center justify-center text-tikoun-white hover:bg-tikoun-gold hover:text-tikoun-black hover:border-tikoun-gold transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-tikoun-white/20 flex items-center justify-center text-tikoun-white hover:bg-tikoun-gold hover:text-tikoun-black hover:border-tikoun-gold transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 min-h-[400px]"
          >
            {/* Book Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-[260px] h-[380px] md:w-[320px] md:h-[460px] shadow-2xl">
                <div
                  className="w-full h-full bg-tikoun-darkgray bg-cover bg-center rounded-r-lg shadow-[inset_10px_0_20px_rgba(0,0,0,0.6)] border-l border-tikoun-white/10"
                  style={{ backgroundImage: `url('${book.image}')` }}
                />
                <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/70 to-transparent rounded-l-sm" />
              </div>
            </div>

            {/* Book Info */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-tikoun-gold text-sm font-bold tracking-widest uppercase mb-4">
                {book.author}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-tikoun-white mb-6 leading-tight">
                {book.title}
              </h3>
              <p className="text-tikoun-white/70 text-lg font-light leading-relaxed mb-8 max-w-lg">
                {book.desc}
              </p>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-medium text-tikoun-white">{book.price} ₪</span>
                <Link
                  href={`/produits/${book.id}`}
                  className="bg-tikoun-white text-tikoun-black px-8 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-tikoun-gold transition-colors"
                >
                  Découvrir
                </Link>
              </div>

              {/* Pagination dots */}
              <div className="flex gap-2 mt-10">
                {SHOWCASE_BOOKS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-8 bg-tikoun-gold" : "w-3 bg-tikoun-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
