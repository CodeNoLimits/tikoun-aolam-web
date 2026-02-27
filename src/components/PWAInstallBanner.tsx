"use client";

import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem('pwa-banner-dismissed')) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after a small delay so it doesn't feel intrusive
      setTimeout(() => setShow(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem('pwa-banner-dismissed', '1');
  };

  if (dismissed || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[200] md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[420px] md:rounded-2xl"
        >
          <div className="bg-tikoun-darkgray border-t border-tikoun-copper/40 md:border md:rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl shadow-tikoun-black/50">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-tikoun-black border border-tikoun-copper/30 flex items-center justify-center shrink-0 text-tikoun-gold text-lg">
              ✡
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-tikoun-white text-sm font-medium leading-tight">
                Installer l&apos;application
              </p>
              <p className="text-tikoun-white/50 text-xs mt-0.5 truncate">
                Accès rapide depuis votre écran d&apos;accueil
              </p>
            </div>

            {/* Install button */}
            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-tikoun-copper text-tikoun-white text-xs font-medium rounded-lg hover:bg-tikoun-gold transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Installer
            </button>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="text-tikoun-white/40 hover:text-tikoun-white transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
