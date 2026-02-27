"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Send, Sparkles, Mic, Volume2, MicOff,
  MessageCircle, Square, Play, PhoneOff
} from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [showReplay, setShowReplay] = useState(false);

  // useChat: use append() for programmatic submit (no form input hack)
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);
  const lastSpokenIndexRef = useRef<number>(-1);
  const ttsUnlockedRef = useRef(false);
  const pendingTTSTextRef = useRef<string | null>(null);
  const shouldRestartRef = useRef(false); // true = keep mic alive (voice session active)

  // Stable refs — always up-to-date without causing stale closures
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

  // Auto-scroll in text mode
  useEffect(() => {
    if (activeMode === 'text') messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeMode, isOpen]);

  // Show "thinking" while AI is loading in voice mode
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

  // ─────────────────────────────────────────────
  // TTS
  // ─────────────────────────────────────────────

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setVoiceStatus('idle');
  }, []);

  // Called in user gesture (voice tab click / mic button click) — unlocks iOS TTS
  const unlockTTS = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (ttsUnlockedRef.current) return;
    ttsUnlockedRef.current = true;
    // Speak zero-width space silently — activates speechSynthesis for this tab
    const silent = new SpeechSynthesisUtterance('\u200B');
    silent.volume = 0;
    silent.rate = 10;
    window.speechSynthesis.speak(silent);
  }, []);

  // Restart mic after TTS finishes (continuous conversation loop)
  const restartMic = useCallback(() => {
    const recognition = speechRecognitionRef.current;
    if (!recognition) return;
    if (!shouldRestartRef.current) return;
    if (activeModeRef.current !== 'voice') return;
    if (isRecordingRef.current) return;
    if (isSpeakingRef.current) return;

    setVoiceTranscript('');
    setShowReplay(false);
    // Sync lastSpoken so we don't re-speak the previous response
    lastSpokenIndexRef.current = messagesRef.current.filter(m => m.role === 'assistant').length - 1;

    try {
      recognition.start();
      setIsRecording(true);
      setVoiceStatus('listening');
    } catch {
      // Recognition might already be running
    }
  }, []);

  // Core TTS — cancel() first to unstick Chrome's speaking state
  const trySpeak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const clean = cleanForTTS(text);
    if (!clean) return;

    // Cancel any stuck/previous speech (silent unlock utterance is done by now — it lasts <100ms)
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 0.88;
    utterance.volume = 1.0;

    // Use French voice if already loaded — otherwise browser uses default (fine)
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr'));
    if (frVoice) utterance.voice = frVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setVoiceStatus('speaking');
      setShowReplay(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setVoiceStatus('idle');
      pendingTTSTextRef.current = null;
      // Auto-restart mic: continuous conversation
      setTimeout(restartMic, 700);
    };

    utterance.onerror = (e) => {
      // On iOS without unlock: 'not-allowed'. On desktop: various.
      console.warn('TTS error:', e.error, '— affichage bouton Réécouter');
      setIsSpeaking(false);
      setVoiceStatus('idle');
      pendingTTSTextRef.current = text;
      setShowReplay(true); // Show Réécouter button (user gesture → TTS plays)
      // Still restart mic so conversation doesn't die
      setTimeout(restartMic, 1000);
    };

    window.speechSynthesis.speak(utterance);
  }, [restartMic]);

  // When AI response arrives in voice mode → play TTS
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
      trySpeak(lastMsg.content);
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
    recognition.interimResults = true; // Show words in real-time
    recognition.lang = 'fr-FR';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;

      if (lastResult.isFinal) {
        // Final result → submit to Gemini
        setVoiceTranscript(transcript);
        setVoiceStatus('thinking');
        setIsRecording(false);
        // Use append() — the correct programmatic API (no form input hack)
        append({ role: 'user', content: transcript });
      } else {
        // Interim — show live with ellipsis
        setVoiceTranscript(transcript + '…');
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
        // Normal — user didn't speak. recognition.onend will restart.
        setIsRecording(false);
      } else if (err !== 'aborted') {
        console.error('Mic error:', err);
        setIsRecording(false);
        setVoiceStatus('idle');
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      // Auto-restart if session is active and we're not thinking/speaking
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

    // Pre-load voices so they're available synchronously later
    if (window.speechSynthesis) window.speechSynthesis.getVoices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────
  // VOICE MODE CONTROLS
  // ─────────────────────────────────────────────

  // Auto-starts mic + unlocks TTS — called on "Appel Vocal" tab click
  const startVoiceMode = useCallback(() => {
    if (isRecordingRef.current) return; // already listening
    unlockTTS(); // must be in this user gesture call stack
    shouldRestartRef.current = true;
    setVoiceTranscript('');
    setVoiceResponse('');
    setShowReplay(false);
    pendingTTSTextRef.current = null;
    lastSpokenIndexRef.current = messagesRef.current.filter(m => m.role === 'assistant').length - 1;

    window.dispatchEvent(new Event('tikoun:mic-start')); // pause background music

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

  // Mic button: toggle recording / interrupt TTS
  const toggleRecording = () => {
    const recognition = speechRecognitionRef.current;
    if (!recognition) {
      alert('Votre navigateur ne supporte pas la reconnaissance vocale. Essayez Chrome.');
      return;
    }
    if (isSpeaking) stopSpeaking(); // interrupt AI if speaking
    unlockTTS(); // keep TTS unlocked on each tap

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
      } catch {
        // already started
      }
    }
  };

  // End conversation: stop everything, resume music
  const endConversation = useCallback(() => {
    shouldRestartRef.current = false;
    const recognition = speechRecognitionRef.current;
    if (recognition && isRecordingRef.current) {
      try { recognition.stop(); } catch { /* ignore */ }
    }
    stopSpeaking();
    setIsRecording(false);
    setVoiceStatus('idle');
    setVoiceTranscript('');
    setVoiceResponse('');
    setShowReplay(false);
    pendingTTSTextRef.current = null;
    window.dispatchEvent(new Event('tikoun:mic-end')); // resume background music
  }, [stopSpeaking]);

  // Réécouter — explicit user gesture → always works on iOS
  const replayLastResponse = () => {
    const text = pendingTTSTextRef.current || voiceResponse;
    if (!text) return;
    unlockTTS();
    setShowReplay(false);
    setTimeout(() => trySpeak(text), 80);
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
      {/* Floating trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: isOpen ? 100 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        className={`fixed bottom-24 right-5 md:right-8 z-[90] w-14 h-14 bg-tikoun-copper text-tikoun-white rounded-full flex items-center justify-center shadow-2xl shadow-tikoun-copper/20 hover:scale-110 active:scale-95 transition-transform ${isOpen ? 'pointer-events-none' : ''}`}
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
            className="fixed bottom-24 right-5 md:right-8 z-[100] w-[calc(100vw-40px)] md:w-[400px] h-[550px] max-h-[75vh] bg-tikoun-black border border-tikoun-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
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

              {/* Mode tabs */}
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
                    // startVoiceMode must run INSIDE this onClick (user gesture context)
                    // to unlock TTS and start mic permission
                    startVoiceMode();
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-all ${activeMode === 'voice' ? 'bg-tikoun-white/10 text-tikoun-gold font-medium shadow' : 'text-tikoun-white/50 hover:text-tikoun-white'}`}
                >
                  <Volume2 className="w-4 h-4" /> Appel Vocal
                </button>
              </div>
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
                        {/* iOS fallback: tap to replay when TTS couldn't auto-play */}
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
