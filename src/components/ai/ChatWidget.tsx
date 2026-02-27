"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Send, Sparkles, Mic, Volume2, MicOff,
  MessageCircle, Square, Play, PhoneOff
} from 'lucide-react';

// ─────────────────────────────────────────────
// Detect mobile/iOS at module level (SSR-safe)
// ─────────────────────────────────────────────
function detectMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/** Broadcast chat open/close so sibling components (WhatsAppButton) can react */
function BroadcastChatOpen({ isOpen }: { isOpen: boolean }) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('tikoun:chat-open', { detail: isOpen }));
  }, [isOpen]);
  return null;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [showReplay, setShowReplay] = useState(false);
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);
  const lastSpokenIndexRef = useRef<number>(-1);
  const ttsUnlockedRef = useRef(false);
  const pendingTTSTextRef = useRef<string | null>(null);
  const shouldRestartRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null); // track objectURL for cleanup
  const isMobileRef = useRef(false);
  const voicesReadyRef = useRef(false);

  // Stable refs — avoid stale closures
  const activeModeRef = useRef<'text' | 'voice'>('text');
  const isRecordingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const messagesRef = useRef(messages);
  const voiceStatusRef = useRef<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  useEffect(() => { activeModeRef.current = activeMode; }, [activeMode]);
  useEffect(() => { isRecordingRef.current = isRecording; }, [isRecording]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { voiceStatusRef.current = voiceStatus; }, [voiceStatus]);

  // Detect mobile + SpeechRecognition once on mount
  useEffect(() => {
    isMobileRef.current = detectMobile();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.SpeechRecognition || w.webkitSpeechRecognition) {
      setHasSpeechRecognition(true);
    }
  }, []);

  useEffect(() => {
    if (activeMode === 'text') messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeMode, isOpen]);

  useEffect(() => {
    if (activeMode === 'voice' && isLoading) setVoiceStatus('thinking');
  }, [isLoading, activeMode]);

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  const cleanForTTS = (text: string): string =>
    text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/#+ /g, '')
      .replace(/`[^`]+`/g, '')
      .trim();

  /** Release previous audio object URL */
  const freeAudioUrl = useCallback(() => {
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }, []);

  // ─────────────────────────────────────────────
  // TTS — stop
  // ─────────────────────────────────────────────

  const stopSpeaking = useCallback(() => {
    // Stop Gemini TTS audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // Also cancel Web Speech API (fallback)
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setVoiceStatus('idle');
  }, []);

  // Unlock Web Speech TTS in user gesture (iOS)
  const unlockTTS = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (ttsUnlockedRef.current) return;
    ttsUnlockedRef.current = true;
    const silent = new SpeechSynthesisUtterance('\u200B');
    silent.volume = 0;
    silent.rate = 10;
    window.speechSynthesis.speak(silent);
  }, []);

  // Restart mic for continuous conversation
  const restartMic = useCallback(() => {
    const recognition = speechRecognitionRef.current;
    if (!recognition) return;
    if (!shouldRestartRef.current) return;
    if (activeModeRef.current !== 'voice') return;
    if (isRecordingRef.current) return;
    if (isSpeakingRef.current) return;

    setVoiceTranscript('');
    setShowReplay(false);
    lastSpokenIndexRef.current = messagesRef.current.filter(m => m.role === 'assistant').length - 1;

    try {
      recognition.start();
      setIsRecording(true);
      setVoiceStatus('listening');
    } catch {
      // already running — fine
    }
  }, []);

  // ─────────────────────────────────────────────
  // WEB SPEECH API TTS (desktop primary, mobile fallback)
  // ─────────────────────────────────────────────

  const trySpeak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const clean = cleanForTTS(text);
    if (!clean) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 0.88;
    utterance.volume = 1.0;

    // Use cached voices (populated by voiceschanged listener)
    const voices = window.speechSynthesis.getVoices();
    const preferredNames = ['Edouard', 'Thomas', 'Google français', 'Microsoft Paul'];
    let bestVoice = null;
    for (const name of preferredNames) {
      const v = voices.find(vx => vx.name.includes(name));
      if (v) { bestVoice = v; break; }
    }
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith('fr')) ?? null;
    if (bestVoice) utterance.voice = bestVoice;

    // Watchdog: iOS blocks speak() silently — onstart never fires → loop dies
    // If onstart hasn't fired in 2.5s, rescue the conversation loop
    let started = false;
    const watchdog = setTimeout(() => {
      if (!started) {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setVoiceStatus('idle');
        pendingTTSTextRef.current = text;
        setShowReplay(true);
        setTimeout(restartMic, 500);
      }
    }, 2500);

    utterance.onstart = () => {
      started = true;
      clearTimeout(watchdog);
      setIsSpeaking(true);
      setVoiceStatus('speaking');
      setShowReplay(false);
    };
    utterance.onend = () => {
      started = true;
      clearTimeout(watchdog);
      setIsSpeaking(false);
      isSpeakingRef.current = false; // sync ref immediately
      setVoiceStatus('idle');
      pendingTTSTextRef.current = null;
      setTimeout(restartMic, 500);
    };
    utterance.onerror = () => {
      started = true;
      clearTimeout(watchdog);
      setIsSpeaking(false);
      isSpeakingRef.current = false; // sync ref immediately — prevents stale ref blocking restartMic
      setVoiceStatus('idle');
      pendingTTSTextRef.current = text;
      setShowReplay(true);
      setTimeout(restartMic, 1000);
    };

    window.speechSynthesis.speak(utterance);
  }, [restartMic]);

  // ─────────────────────────────────────────────
  // GEMINI TTS — primary on mobile (Charon male voice)
  // ─────────────────────────────────────────────

  const playGeminiTTS = useCallback(async (text: string) => {
    const clean = cleanForTTS(text);
    if (!clean) return;

    setIsSpeaking(true);
    isSpeakingRef.current = true;
    setVoiceStatus('speaking');
    setShowReplay(false);
    freeAudioUrl();

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean }),
      });

      if (!res.ok) throw new Error(`TTS HTTP ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;

      const audio = audioRef.current;
      if (!audio) throw new Error('No audio element');

      audio.src = url;
      audio.onended = () => {
        freeAudioUrl();
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        pendingTTSTextRef.current = null;
        setShowReplay(false);
        setTimeout(restartMic, 500);
      };
      audio.onerror = () => {
        freeAudioUrl();
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        console.warn('Audio element error, falling back to Web Speech API');
        trySpeak(clean);
      };

      await audio.play();
    } catch (err) {
      console.warn('Gemini TTS failed, falling back to Web Speech API:', err);
      freeAudioUrl();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      pendingTTSTextRef.current = text;
      trySpeak(clean); // fallback
    }
  }, [freeAudioUrl, restartMic, trySpeak]);

  // ─────────────────────────────────────────────
  // SPEAK — unified dispatcher (picks best TTS per platform)
  // Desktop: Web Speech API (zero latency) → fallback Gemini TTS on watchdog timeout
  // Mobile:  Gemini TTS via <audio> (works from useEffect) → fallback Web Speech + Replay button
  // ─────────────────────────────────────────────

  const speakResponse = useCallback((text: string) => {
    if (isMobileRef.current) {
      // Mobile: Gemini TTS is reliable from non-gesture context because
      // the <audio> element was unlocked in startVoiceMode() user gesture.
      // Web Speech speak() from useEffect is blocked on iOS — skip it.
      playGeminiTTS(text);
    } else {
      // Desktop: Web Speech API — instant, no network latency.
      // trySpeak has a 2.5s watchdog that shows a Replay button if it fails.
      trySpeak(text);
    }
  }, [playGeminiTTS, trySpeak]);

  // When AI response arrives in voice mode → speak it
  useEffect(() => {
    if (activeMode !== 'voice') return;
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    if (
      assistantMessages.length > 0 &&
      assistantMessages.length > lastSpokenIndexRef.current + 1 &&
      !isLoading
    ) {
      const lastMsg = assistantMessages[assistantMessages.length - 1];
      lastSpokenIndexRef.current = assistantMessages.length - 1;
      setVoiceResponse(lastMsg.content);
      setVoiceStatus('speaking');
      speakResponse(lastMsg.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading, activeMode]);

  // ─────────────────────────────────────────────
  // SPEECH RECOGNITION — init once
  // ─────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognitionAPI = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;

      if (!lastResult.isFinal) {
        // ── BARGE-IN: user started speaking while AI is talking → stop audio ──
        if (isSpeakingRef.current) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          if (typeof window !== 'undefined' && window.speechSynthesis?.speaking) {
            window.speechSynthesis.cancel();
          }
          setIsSpeaking(false);
          setVoiceStatus('listening');
        }
        setVoiceTranscript(transcript + '…');
      } else {
        // Final result → send to Gemini
        setVoiceTranscript(transcript);
        setVoiceStatus('thinking');
        setIsRecording(false);
        append({ role: 'user', content: transcript });
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      const err = event.error;
      if (err === 'not-allowed' || err === 'service-not-allowed') {
        shouldRestartRef.current = false;
        setIsRecording(false);
        setVoiceStatus('idle');
        alert('Accès au microphone refusé. Autorisez le micro dans les paramètres du navigateur.');
      } else if (err === 'no-speech') {
        // On mobile, no-speech fires fast → restart mic to keep listening
        setIsRecording(false);
        if (shouldRestartRef.current && activeModeRef.current === 'voice') {
          setTimeout(() => restartMic(), 300);
        }
      } else if (err !== 'aborted') {
        console.error('Mic error:', err);
        setIsRecording(false);
        setVoiceStatus('idle');
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      // Auto-restart if session active, not thinking/speaking
      if (
        shouldRestartRef.current &&
        activeModeRef.current === 'voice' &&
        !isSpeakingRef.current &&
        voiceStatusRef.current !== 'thinking' &&
        voiceStatusRef.current !== 'speaking'
      ) {
        setTimeout(() => restartMic(), 400);
      }
    };

    speechRecognitionRef.current = recognition;

    // ── Load voices properly (critical for mobile) ──
    if (window.speechSynthesis) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v.length > 0) voicesReadyRef.current = true;
      };
      loadVoices(); // immediate attempt (works on some browsers)
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────
  // VOICE MODE CONTROLS
  // ─────────────────────────────────────────────

  // Called on "Appel Vocal" tab click — user gesture context → unlock everything
  const startVoiceMode = useCallback(() => {
    if (isRecordingRef.current) return;
    unlockTTS();

    // Unlock <audio> element for iOS — MUST happen in user gesture.
    // Play a tiny silent WAV so the browser marks the element as "user-activated".
    // This allows subsequent programmatic .play() calls from useEffect/async code.
    if (audioRef.current) {
      const a = audioRef.current;
      // Minimal valid WAV: 44 bytes header + 2 bytes silence (1 sample)
      const silentWav = new Uint8Array([
        0x52,0x49,0x46,0x46, 0x26,0x00,0x00,0x00, 0x57,0x41,0x56,0x45,
        0x66,0x6D,0x74,0x20, 0x10,0x00,0x00,0x00, 0x01,0x00,0x01,0x00,
        0x80,0x3E,0x00,0x00, 0x00,0x7D,0x00,0x00, 0x02,0x00,0x10,0x00,
        0x64,0x61,0x74,0x61, 0x02,0x00,0x00,0x00, 0x00,0x00
      ]);
      const silentBlob = new Blob([silentWav], { type: 'audio/wav' });
      const silentUrl = URL.createObjectURL(silentBlob);
      a.src = silentUrl;
      a.play().then(() => {
        URL.revokeObjectURL(silentUrl);
      }).catch(() => {
        URL.revokeObjectURL(silentUrl);
      });
    }

    shouldRestartRef.current = true;
    setVoiceTranscript('');
    setVoiceResponse('');
    setShowReplay(false);
    pendingTTSTextRef.current = null;
    lastSpokenIndexRef.current = messagesRef.current.filter(m => m.role === 'assistant').length - 1;

    window.dispatchEvent(new Event('tikoun:mic-start'));

    const recognition = speechRecognitionRef.current;
    if (!recognition) return;
    try {
      recognition.start();
      setIsRecording(true);
      setVoiceStatus('listening');
    } catch {
      // already running
    }
  }, [unlockTTS]);

  // Mic button: toggle / interrupt AI
  const toggleRecording = () => {
    const recognition = speechRecognitionRef.current;
    if (!recognition) {
      alert('Votre navigateur ne supporte pas la reconnaissance vocale. Essayez Chrome.');
      return;
    }
    if (isSpeaking) stopSpeaking();
    unlockTTS();

    if (isRecording) {
      shouldRestartRef.current = false;
      recognition.stop();
      setIsRecording(false);
      setVoiceStatus('idle');
    } else {
      shouldRestartRef.current = true;
      window.dispatchEvent(new Event('tikoun:mic-start'));
      setVoiceTranscript('');
      setShowReplay(false);
      pendingTTSTextRef.current = null;
      lastSpokenIndexRef.current = messagesRef.current.filter(m => m.role === 'assistant').length - 1;
      try {
        recognition.start();
        setIsRecording(true);
        setVoiceStatus('listening');
      } catch { /* already started */ }
    }
  };

  // End conversation: stop everything, resume music
  const endConversation = useCallback(() => {
    // Force sync all refs immediately so no async callback restarts anything
    shouldRestartRef.current = false;
    isRecordingRef.current = false;
    isSpeakingRef.current = false;
    // Always try to stop recognition regardless of ref state
    const recognition = speechRecognitionRef.current;
    if (recognition) {
      try { recognition.abort(); } catch { /* ignore */ }
    }
    stopSpeaking();
    freeAudioUrl();
    setIsRecording(false);
    setIsSpeaking(false);
    setVoiceStatus('idle');
    setVoiceTranscript('');
    setVoiceResponse('');
    setShowReplay(false);
    pendingTTSTextRef.current = null;
    window.dispatchEvent(new Event('tikoun:mic-end'));
  }, [stopSpeaking, freeAudioUrl]);

  // Escape key closes panel
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        endConversation();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, endConversation]);

  // iOS fallback: tap to replay
  const replayLastResponse = () => {
    const text = pendingTTSTextRef.current || voiceResponse;
    if (!text) return;
    unlockTTS();
    setShowReplay(false);
    setTimeout(() => playGeminiTTS(text), 80);
  };

  const statusLabel = {
    idle: 'Appuyez sur le micro pour parler',
    listening: 'Je vous écoute…',
    thinking: 'Gemini réfléchit…',
    speaking: 'Gemini vous répond…',
  }[voiceStatus];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  return (
    <>
      {/* Hidden audio element for Gemini TTS — playsInline prevents iOS fullscreen */}
      <audio ref={audioRef} playsInline className="hidden" />

      {/* Broadcast open/close state so WhatsAppButton can hide */}
      <BroadcastChatOpen isOpen={isOpen} />

      {/* Floating trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: isOpen ? 100 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        className={`fixed bottom-[68px] right-4 md:bottom-24 md:right-8 z-90 w-12 h-12 md:w-14 md:h-14 bg-tikoun-copper text-tikoun-white rounded-full flex items-center justify-center shadow-2xl shadow-tikoun-copper/20 hover:scale-110 active:scale-95 transition-transform ${isOpen ? 'pointer-events-none' : ''}`}
        aria-label="Ouvrir l'assistant IA"
      >
        <Sparkles className="w-6 h-6 absolute animate-pulse opacity-50 -top-1 -right-1 text-tikoun-gold" />
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-3 right-3 left-3 md:bottom-24 md:right-8 md:left-auto z-[100] w-auto md:w-[400px] h-[80dvh] md:h-[550px] max-h-[calc(100dvh-80px)] md:max-h-[75vh] bg-tikoun-black border border-tikoun-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* ── Header ── */}
            <div className="bg-gradient-to-r from-tikoun-darkgray to-tikoun-black pt-4 px-4 border-b border-tikoun-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tikoun-copper to-tikoun-gold flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-tikoun-black" />
                  </div>
                  <div>
                    <h3 className="font-serif text-tikoun-white text-lg font-medium leading-tight">Conseiller IA</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      <p className="text-[10px] text-tikoun-white/60 tracking-widest uppercase">Gemini 2.5 Actif</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { endConversation(); setIsOpen(false); }}
                  className="text-tikoun-white/50 hover:text-tikoun-white transition-colors p-1 bg-tikoun-white/5 rounded-full"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode tabs — only show voice tab if browser supports SpeechRecognition */}
              {hasSpeechRecognition ? (
                <div className="flex w-full bg-tikoun-black/50 rounded-lg p-1 mb-3 border border-tikoun-white/5">
                  <button
                    onClick={() => { stopSpeaking(); shouldRestartRef.current = false; setActiveMode('text'); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-all ${activeMode === 'text' ? 'bg-tikoun-white/10 text-tikoun-gold font-medium shadow' : 'text-tikoun-white/50 hover:text-tikoun-white'}`}
                  >
                    <MessageCircle className="w-4 h-4" /> Chat
                  </button>
                  <button
                    onClick={() => {
                      setActiveMode('voice');
                      startVoiceMode(); // must be in onClick for iOS TTS + audio unlock
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-all ${activeMode === 'voice' ? 'bg-tikoun-white/10 text-tikoun-gold font-medium shadow' : 'text-tikoun-white/50 hover:text-tikoun-white'}`}
                  >
                    <Volume2 className="w-4 h-4" /> Appel Vocal
                  </button>
                </div>
              ) : (
                <div className="mb-3" />
              )}
            </div>

            {/* ── Content ── */}
            <div className="flex-1 relative overflow-hidden bg-tikoun-black/60">
              <AnimatePresence mode="wait">

                {/* TEXT MODE */}
                {activeMode === 'text' ? (
                  <motion.div
                    key="text-mode"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                      {messages.length === 0 && (
                        <div className="text-center text-tikoun-white/50 text-sm mt-6 space-y-4 px-4">
                          <p>Shalom ! Je suis l&apos;assistant spirituel et conseiller de Tikoun Aolam.</p>
                          <p className="text-xs">Je connais tout notre catalogue (&quot;Otsar Hayira&quot;, &quot;Likouté Moharan&quot;, nos Sidourim...). Comment puis-je vous aider ?</p>
                        </div>
                      )}
                      {messages.map(m => (
                        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                            m.role === 'user'
                              ? 'bg-tikoun-white/10 text-tikoun-white rounded-br-sm'
                              : 'bg-gradient-to-br from-tikoun-copper/20 to-tikoun-black border border-tikoun-copper/30 text-tikoun-white rounded-bl-sm leading-relaxed shadow-lg'
                          }`}>
                            {m.content.split('**').map((seg, i) =>
                              i % 2 === 1
                                ? <strong key={i} className="text-tikoun-gold font-medium">{seg}</strong>
                                : seg
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-tikoun-copper/10 border border-tikoun-copper/20 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce"></span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="p-3 border-t border-tikoun-white/10 bg-tikoun-black/80">
                      <div className="relative flex items-center">
                        <input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Posez votre question..."
                          className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-tikoun-white focus:outline-none focus:border-tikoun-copper transition-colors placeholder:text-tikoun-white/30"
                        />
                        <button
                          type="submit"
                          disabled={isLoading || !input.trim()}
                          className="absolute right-1 w-9 h-9 bg-tikoun-copper text-tikoun-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tikoun-gold transition-colors"
                        >
                          <Send className="w-4 h-4 -ml-0.5" />
                        </button>
                      </div>
                    </form>
                  </motion.div>

                ) : (

                  /* VOICE MODE */
                  <motion.div
                    key="voice-mode"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex flex-col items-center justify-between p-5 overflow-y-auto"
                  >
                    {/* Status label */}
                    <p className="text-xs text-tikoun-white/50 uppercase tracking-widest text-center pt-2">
                      {statusLabel}
                    </p>

                    {/* Conversation bubbles */}
                    <div className="w-full flex-1 flex flex-col justify-center gap-3 py-4">
                      {voiceTranscript ? (
                        <div className="flex justify-end">
                          <div className="max-w-[85%] bg-tikoun-white/10 text-tikoun-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
                            {voiceTranscript}
                          </div>
                        </div>
                      ) : null}

                      {voiceStatus === 'thinking' && (
                        <div className="flex justify-start">
                          <div className="bg-tikoun-copper/10 border border-tikoun-copper/20 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce"></span>
                          </div>
                        </div>
                      )}

                      {voiceResponse && voiceStatus !== 'thinking' ? (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] bg-gradient-to-br from-tikoun-copper/20 to-tikoun-black border border-tikoun-copper/30 text-tikoun-white rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed">
                            {voiceResponse.split('**').map((seg, i) =>
                              i % 2 === 1
                                ? <strong key={i} className="text-tikoun-gold font-medium">{seg}</strong>
                                : seg
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-center gap-4 pb-2">
                      {/* Animated mic button */}
                      <div className="relative">
                        {(isRecording || isSpeaking) && (
                          <>
                            <motion.div
                              className={`absolute inset-0 rounded-full ${isSpeaking ? 'bg-tikoun-copper/20' : 'bg-tikoun-gold/20'}`}
                              animate={{ scale: [1, 1.6, 2], opacity: [0.8, 0.3, 0] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                            />
                            <motion.div
                              className={`absolute inset-0 rounded-full ${isSpeaking ? 'bg-tikoun-gold/20' : 'bg-tikoun-copper/30'}`}
                              animate={{ scale: [1, 2, 2.6], opacity: [0.6, 0.2, 0] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                            />
                          </>
                        )}
                        <button
                          onClick={toggleRecording}
                          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                            isSpeaking
                              ? 'bg-tikoun-copper text-tikoun-white scale-105'
                              : isRecording
                                ? 'bg-tikoun-white text-tikoun-black scale-105'
                                : 'bg-gradient-to-br from-tikoun-copper to-tikoun-darkgray text-tikoun-white hover:scale-105'
                          }`}
                          aria-label={isSpeaking ? 'Interrompre' : isRecording ? 'Arrêter micro' : 'Parler'}
                        >
                          {isSpeaking
                            ? <Volume2 className="w-9 h-9 animate-pulse" />
                            : isRecording
                              ? <Mic className="w-9 h-9 animate-pulse" />
                              : <MicOff className="w-9 h-9" />
                          }
                        </button>
                      </div>

                      {/* Action buttons row */}
                      <div className="flex items-center gap-3">
                        {isSpeaking && (
                          <button
                            onClick={stopSpeaking}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-tikoun-white/10 rounded-full text-tikoun-white text-xs uppercase tracking-widest hover:bg-tikoun-white/20 transition-colors"
                          >
                            <Square className="w-3 h-3" /> Arrêter
                          </button>
                        )}
                        {showReplay && voiceResponse && !isSpeaking && !isRecording && (
                          <button
                            onClick={replayLastResponse}
                            className="flex items-center gap-1.5 px-4 py-2 bg-tikoun-copper/20 border border-tikoun-copper/50 rounded-full text-tikoun-gold text-xs uppercase tracking-widest hover:bg-tikoun-copper/35 transition-colors animate-pulse"
                          >
                            <Play className="w-3 h-3" /> Écouter la réponse
                          </button>
                        )}
                      </div>

                      {/* End conversation */}
                      <button
                        onClick={endConversation}
                        className="flex items-center gap-2 px-5 py-2 bg-tikoun-white/5 border border-tikoun-white/15 rounded-full text-tikoun-white/50 text-xs hover:bg-tikoun-white/10 hover:text-tikoun-white/80 transition-colors"
                      >
                        <PhoneOff className="w-3.5 h-3.5" />
                        Terminer la conversation
                      </button>

                      <p className="text-[10px] text-tikoun-white/30 uppercase tracking-widest">
                        Propulsé par Google Gemini 2.5
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
