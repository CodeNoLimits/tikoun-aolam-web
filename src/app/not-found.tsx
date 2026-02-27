import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tikoun-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-serif text-8xl md:text-9xl font-bold text-tikoun-gold mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl text-tikoun-white mb-6">
          Page introuvable
        </h2>
        <p className="text-tikoun-white/60 max-w-md mx-auto mb-10 font-light">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-tikoun-gold text-tikoun-black px-8 py-3 font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/produits"
            className="border border-tikoun-white/20 text-tikoun-white px-8 py-3 font-bold text-sm tracking-widest uppercase hover:border-tikoun-gold hover:text-tikoun-gold transition-colors"
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
