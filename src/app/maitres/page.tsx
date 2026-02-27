import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Maîtres — Tikoun Aolam",
  description: "Découvrez Rabbi Na'hman de Breslev et Rabbi Israël Ber Odesser, les Tsadikim dont Tikoun Aolam diffuse les enseignements.",
};

export default function MaitresPage() {
  return (
    <div className="min-h-screen bg-tikoun-black pt-28 pb-24 relative overflow-hidden">
      {/* Book glow video — 25% opacity */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.25, zIndex: 0 }}
      >
        <source src="/videos/book-glow.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <span className="text-tikoun-gold tracking-[0.3em] text-xs uppercase font-medium mb-6 block">
            L&apos;essence de notre mission
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-tikoun-white mb-6">
            Nos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tikoun-gold to-tikoun-copper italic">
              Maîtres
            </span>
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-tikoun-gold to-transparent mx-auto mb-8" />
          <p className="text-tikoun-white/60 text-lg font-light max-w-xl mx-auto">
            Deux Tsadikim d&apos;exception dont nous avons pour mission de diffuser les enseignements à travers nos éditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/maitres/rabbi-nahman"
            className="group relative overflow-hidden rounded-2xl border border-tikoun-white/10 hover:border-tikoun-gold/40 transition-all duration-300 block"
          >
            <div
              className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://tikoun-aolam.com/wp-content/uploads/2022/09/Chaise-de-Rabbi-Nahman.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tikoun-black via-tikoun-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-tikoun-gold text-xs tracking-widest uppercase">1772 – 1810</span>
              <h2 className="font-serif text-3xl text-tikoun-white mt-2 mb-3 group-hover:text-tikoun-gold transition-colors">
                Rabbi Na&apos;hman de Breslev
              </h2>
              <p className="text-tikoun-white/60 text-sm leading-relaxed">
                Arrière-petit-fils du Baal Chem Tov, auteur du Likouté Moharan et des Contes des Temps Anciens.
              </p>
              <span className="text-tikoun-gold text-xs tracking-widest uppercase mt-4 block group-hover:underline">
                Découvrir →
              </span>
            </div>
          </Link>

          <Link
            href="/maitres/rabbi-israel-ber-odesser"
            className="group relative overflow-hidden rounded-2xl border border-tikoun-white/10 hover:border-tikoun-gold/40 transition-all duration-300 block"
          >
            <div
              className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://tikoun-aolam.com/wp-content/uploads/2023/11/Rabbi-Israel-Dov-Ber-Odesser-1.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tikoun-black via-tikoun-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-tikoun-gold text-xs tracking-widest uppercase">1888 – 1994</span>
              <h2 className="font-serif text-3xl text-tikoun-white mt-2 mb-3 group-hover:text-tikoun-gold transition-colors">
                Rabbi Israël Ber Odesser
              </h2>
              <p className="text-tikoun-white/60 text-sm leading-relaxed">
                «&nbsp;Le Saba&nbsp;» — Révélateur du Petek et du secret de Na Na&apos;hman Mé&apos;Ouman.
              </p>
              <span className="text-tikoun-gold text-xs tracking-widest uppercase mt-4 block group-hover:underline">
                Découvrir →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
