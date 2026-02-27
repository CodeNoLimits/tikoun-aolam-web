"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tracks whether the user manually stopped music (don't auto-resume in that case)
  const manuallyStoppedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;

    // Try immediate autoplay
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        const start = () => {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        };
        window.addEventListener('click', start, { once: true });
        window.addEventListener('touchstart', start, { once: true });
        window.addEventListener('keydown', start, { once: true });
      });

    // Pause music when mic is activated (custom event from ChatWidget)
    const handleMicStart = () => {
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
        // Don't mark as manually stopped — auto-resume when conversation ends
      }
    };

    // Resume music when conversation ends (if user hadn't manually stopped it)
    const handleMicEnd = () => {
      if (audio && audio.paused && !manuallyStoppedRef.current) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener('tikoun:mic-start', handleMicStart);
    window.addEventListener('tikoun:mic-end', handleMicEnd);

    return () => {
      window.removeEventListener('tikoun:mic-start', handleMicStart);
      window.removeEventListener('tikoun:mic-end', handleMicEnd);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      manuallyStoppedRef.current = true; // User chose to stop → no auto-resume
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
      manuallyStoppedRef.current = false;
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/background-music.mp3" loop preload="auto" />
      {/* Positioned just above the chat widget button (bottom-24) */}
      <button
        onClick={toggle}
        className="fixed bottom-40 right-5 md:right-8 z-[89] w-11 h-11 rounded-full bg-tikoun-black/80 backdrop-blur-md border border-tikoun-gold/30 text-tikoun-gold flex items-center justify-center hover:bg-tikoun-gold hover:text-tikoun-black transition-all shadow-lg shadow-tikoun-black/40"
        aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
        title={isPlaying ? "Musique : ON" : "Musique : OFF"}
      >
        {isPlaying
          ? <Volume2 className="w-4 h-4 animate-pulse" />
          : <VolumeX className="w-4 h-4 opacity-50" />
        }
      </button>
    </>
  );
}
