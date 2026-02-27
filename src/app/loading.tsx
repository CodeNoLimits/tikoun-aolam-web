export default function Loading() {
  return (
    <div className="min-h-screen bg-tikoun-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-2 border-tikoun-gold/30 border-t-tikoun-gold rounded-full animate-spin" />
        <p className="text-tikoun-white/50 text-sm tracking-widest uppercase">
          Chargement...
        </p>
      </div>
    </div>
  );
}
