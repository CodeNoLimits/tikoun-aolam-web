"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function RabbiNahmanPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-28 pb-24">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden mb-0">
        <Image
          src="https://tikoun-aolam.com/wp-content/uploads/2022/09/Chaise-de-Rabbi-Nahman.jpg"
          alt="La chaise sacrée de Rabbi Na'hman de Breslev"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tikoun-black/50 via-tikoun-black/20 to-tikoun-black" />
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
              Rabbi Na&apos;hman <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper">
                de Breslev
              </span>
            </h1>
            <p className="font-serif text-tikoun-white/70 text-xl mt-4 italic">
              1772 — 1810 · Uman, Ukraine
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
              &quot;Il est interdit d&apos;être triste. La joie est le remède à tout.&quot;
            </p>
            <cite className="text-tikoun-white/50 text-sm mt-3 block not-italic tracking-widest uppercase">
              — Rabbi Na&apos;hman de Breslev, Likouté Moharan
            </cite>
          </blockquote>

          <p>
            Arrière-petit-fils du <strong className="text-tikoun-white">Baal Chem Tov</strong>, fondateur du mouvement Hassidique, Rabbi Na&apos;hman de Breslev (1772–1810) est une figure d&apos;une envergure spirituelle exceptionnelle. Né à Medzhybizh en Ukraine, il a révélé des remèdes spirituels uniques, particulièrement adaptés aux défis de notre génération.
          </p>

          <p>
            Son enseignement central repose sur la <strong className="text-tikoun-white">Sim&apos;ha</strong> (la joie), la <strong className="text-tikoun-white">Emouna</strong> (la foi simple et pure), et la pratique de la <em>Hitbodédout</em> (conversation personnelle et spontanée avec Hachem). Rabbi Na&apos;hman enseignait que chaque Juif, du plus grand érudit au plus simple, possède une étincelle divine précieuse et unique.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {[
              { title: "Likouté Moharan", desc: "Son œuvre maîtresse : 286 enseignements d'une profondeur mystique inégalée." },
              { title: "Les Contes", desc: "13 récits allégoriques révélant les secrets de la Kabbale sous forme de contes." },
              { title: "Likouté Tefilot", desc: "Prières composées par Rabbi Nathan, basées sur chaque enseignement." },
            ].map((item) => (
              <div key={item.title} className="bg-tikoun-white/5 border border-tikoun-white/10 rounded-xl p-6">
                <h3 className="font-serif text-tikoun-gold text-lg mb-2">{item.title}</h3>
                <p className="text-tikoun-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            Rabbi Na&apos;hman s&apos;éteignit le <strong className="text-tikoun-white">18 Tichri 5571 (16 octobre 1810)</strong> à Uman en Ukraine, à l&apos;âge de 38 ans. Chaque année, pour <strong className="text-tikoun-gold">Roch Hachana</strong>, des dizaines de milliers de Juifs du monde entier se rendent à Uman pour prier sur sa tombe, accomplissant ainsi la promesse qu&apos;il avait faite : <em>«&nbsp;Celui qui viendra sur ma tombe, récite les Dix Psaumes [Tikoun Haklali] et me donne un peu de tsedaka... je m&apos;occuperai de lui tout le long de l&apos;année.&nbsp;»</em>
          </p>

          <p>
            Les Éditions <strong className="text-tikoun-gold">Tikoun Aolam</strong> ont pour mission sacrée de diffuser ses enseignements en français, avec la plus haute exigence de fidélité et de qualité littéraire, afin d&apos;ouvrir ces trésors spirituels à chaque Juif francophone.
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
            href="/maitres/rabbi-israel-ber-odesser"
            className="px-8 py-4 border border-tikoun-white/20 text-tikoun-white text-sm tracking-widest uppercase rounded hover:border-tikoun-gold hover:text-tikoun-gold transition-all text-center"
          >
            Découvrir le Saba →
          </Link>
          <Link
            href="/produits?cat=livres-etude"
            className="px-8 py-4 bg-tikoun-gold text-tikoun-black text-sm tracking-widest uppercase font-bold rounded hover:bg-tikoun-white transition-colors text-center"
          >
            Nos Livres d&apos;Étude
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
