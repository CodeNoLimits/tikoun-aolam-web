"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-tikoun-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-serif text-4xl text-tikoun-white mb-4">
          Une erreur est survenue
        </h1>
        <p className="text-tikoun-white/60 mb-8 font-light">
          Nous nous excusons pour la gêne occasionnée.
        </p>
        <button
          onClick={reset}
          className="bg-tikoun-gold text-tikoun-black px-8 py-3 font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
