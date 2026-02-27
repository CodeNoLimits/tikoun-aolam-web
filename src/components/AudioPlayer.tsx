"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Set a very soft, ambient volume
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }

    // Attempt to auto-play ONLY when the user first interacts with the site
    // This respects browser autoplay policies while fulfilling the user's request.
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch((err) => {
          console.log("Autoplay blocked by browser:", err);
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setHasInteracted(true); // Manually playing counts as interaction
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-tikoun-black/80 backdrop-blur-md border border-tikoun-gold/30 text-tikoun-gold flex items-center justify-center hover:bg-tikoun-gold hover:text-tikoun-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        aria-label={isPlaying ? "Désactiver la musique" : "Activer la musique"}
      >
        {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 opacity-60" />}
      </button>
    </>
  );
}
