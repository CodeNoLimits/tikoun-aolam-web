"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Mic, Volume2, MicOff, MessageCircle, Square, Play } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);
  const lastSpokenIndexRef = useRef<number>(-1);
  const ttsUnlockedRef = useRef(false);
  const pendingTTSRef = useRef<string | null>(null);

  // Stable refs for handlers (prevent infinite re-render)
  const handleSubmitRef = useRef(handleSubmit);
  const handleInputChangeRef = useRef(handleInputChange);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
    handleInputChangeRef.current = handleInputChange;
  });

  // Auto-scroll in text mode
  useEffect(() => {
    if (activeMode === 'text') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeMode, isOpen]);

  // Track voice status based on loading
  useEffect(() => {
    if (activeMode === 'voice' && isLoading) {
      setVoiceStatus('thinking');
    }
  }, [isLoading, activeMode]);

  // When AI response arrives in voice mode → show text + play TTS
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

      // Try TTS — if already unlocked (user gesture on mic button) it will work
      // If not (first load), it falls back to showing text only
      trySpeak(lastMsg.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading, activeMode]);

  // Clean markdown for TTS
  const cleanForTTS = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/#+ /g, '')
      .replace(/`[^`]+`/g, '');
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setVoiceStatus('idle');
  };

  const trySpeak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const clean = cleanForTTS(text);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.92;
    utterance.pitch = 0.85;
    utterance.volume = 1.0;

    // Pick a French voice (prefer masculine)
    const getVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const frVoice =
        voices.find(v => v.lang.startsWith('fr') && /thomas|male|homme/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('fr') && !/female|femme/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('fr'));
      if (frVoice) utterance.voice = frVoice;

      utterance.onstart = () => { setIsSpeaking(true); setVoiceStatus('speaking'); };
      utterance.onend = () => { setIsSpeaking(false); setVoiceStatus('idle'); };
      utterance.onerror = () => {
        // TTS blocked (iOS autoplay policy) — just show text, don't crash
        setIsSpeaking(false);
        setVoiceStatus('idle');
        pendingTTSRef.current = text; // User can click Play to hear it
      };

      window.speechSynthesis.speak(utterance);
    };

    // If voices already loaded
    if (window.speechSynthesis.getVoices().length > 0) {
      getVoiceAndSpeak();
    } else {
      // Wait for voices to load (some browsers async)
      window.speechSynthesis.onvoiceschanged = () => { getVoiceAndSpeak(); };
    }
  };

  // Called on mic button click (user gesture) → unlocks iOS TTS for this session
  const unlockTTS = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis || ttsUnlockedRef.current) return;
    const silent = new SpeechSynthesisUtterance(' ');
    silent.volume = 0;
    silent.onend = () => { ttsUnlockedRef.current = true; };
    window.speechSynthesis.speak(silent);
  };

  // Initialize Speech Recognition — run once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      setVoiceStatus('thinking');
      setIsRecording(false);

      handleInputChangeRef.current({ target: { value: transcript } } as any);
      setTimeout(() => {
        handleSubmitRef.current({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
      }, 300);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
      setVoiceStatus('idle');
    };

    recognition.onend = () => { setIsRecording(false); };

    speechRecognitionRef.current = recognition;

    // Pre-load voices
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleRecording = () => {
    const recognition = speechRecognitionRef.current;
    if (!recognition) {
      alert('Votre navigateur ne supporte pas la reconnaissance vocale.');
      return;
    }

    // Unlock TTS during this user gesture (critical for iOS Safari)
    unlockTTS();

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      setVoiceStatus('idle');
    } else {
      stopSpeaking();
      setVoiceTranscript('');
      setVoiceResponse('');
      pendingTTSRef.current = null;
      lastSpokenIndexRef.current = messages.filter(m => m.role === 'assistant').length - 1;
      recognition.start();
      setIsRecording(true);
      setVoiceStatus('listening');
    }
  };

  // "Play" button: replays last response (triggered by user gesture → iOS compatible)
  const replayLastResponse = () => {
    const text = pendingTTSRef.current || voiceResponse;
    if (!text) return;
    unlockTTS();
    setTimeout(() => trySpeak(text), 100);
  };

  const statusLabel = {
    idle: 'Appuyez sur le micro pour parler',
    listening: 'Gemini vous écoute...',
    thinking: 'Gemini réfléchit...',
    speaking: 'Gemini vous répond...',
  }[voiceStatus];

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: isOpen ? 100 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        className={`fixed bottom-24 right-5 md:right-8 z-[90] w-14 h-14 bg-tikoun-copper text-tikoun-white rounded-full flex items-center justify-center shadow-2xl shadow-tikoun-copper/20 hover:scale-110 active:scale-95 transition-transform ${isOpen ? 'pointer-events-none' : ''}`}
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
            {/* Header */}
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
                  onClick={() => { stopSpeaking(); setIsOpen(false); }}
                  className="text-tikoun-white/50 hover:text-tikoun-white transition-colors p-1 bg-tikoun-white/5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode tabs */}
              <div className="flex w-full bg-tikoun-black/50 rounded-lg p-1 mb-3 border border-tikoun-white/5">
                <button
                  onClick={() => { stopSpeaking(); setActiveMode('text'); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-all ${activeMode === 'text' ? 'bg-tikoun-white/10 text-tikoun-gold font-medium shadow' : 'text-tikoun-white/50 hover:text-tikoun-white'}`}
                >
                  <MessageCircle className="w-4 h-4" /> Chat
                </button>
                <button
                  onClick={() => setActiveMode('voice')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-all ${activeMode === 'voice' ? 'bg-tikoun-white/10 text-tikoun-gold font-medium shadow' : 'text-tikoun-white/50 hover:text-tikoun-white'}`}
                >
                  <Volume2 className="w-4 h-4" /> Appel Vocal
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-hidden bg-tikoun-black/60">
              <AnimatePresence mode="wait">

                {/* ── TEXT MODE ── */}
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
                          <p className="text-xs">Je connais tout notre catalogue (&quot;Otsar Hayira&quot;, &quot;Likouté Moharan&quot;, nos Sidourim...). Comment puis-je vous aider aujourd&apos;hui ?</p>
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

                  /* ── VOICE MODE ── */
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
                      {/* User transcript */}
                      {voiceTranscript ? (
                        <div className="flex justify-end">
                          <div className="max-w-[85%] bg-tikoun-white/10 text-tikoun-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
                            {voiceTranscript}
                          </div>
                        </div>
                      ) : null}

                      {/* AI thinking indicator */}
                      {voiceStatus === 'thinking' && (
                        <div className="flex justify-start">
                          <div className="bg-tikoun-copper/10 border border-tikoun-copper/20 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-tikoun-gold/60 rounded-full animate-bounce"></span>
                          </div>
                        </div>
                      )}

                      {/* AI response text */}
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

                    {/* Mic button area */}
                    <div className="flex flex-col items-center gap-4 pb-2">
                      <div className="relative">
                        {/* Pulse rings when active */}
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
                        >
                          {isSpeaking
                            ? <Volume2 className="w-9 h-9 animate-pulse" />
                            : isRecording
                              ? <Mic className="w-9 h-9 animate-pulse" />
                              : <MicOff className="w-9 h-9" />
                          }
                        </button>
                      </div>

                      {/* Controls row */}
                      <div className="flex items-center gap-3">
                        {isSpeaking && (
                          <button
                            onClick={stopSpeaking}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-tikoun-white/10 rounded-full text-tikoun-white text-xs uppercase tracking-widest hover:bg-tikoun-white/20 transition-colors"
                          >
                            <Square className="w-3 h-3" /> Arrêter
                          </button>
                        )}
                        {/* Play button: lets user replay response via user gesture (iOS fix) */}
                        {voiceResponse && !isSpeaking && !isRecording && (
                          <button
                            onClick={replayLastResponse}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-tikoun-copper/20 border border-tikoun-copper/40 rounded-full text-tikoun-gold text-xs uppercase tracking-widest hover:bg-tikoun-copper/30 transition-colors"
                          >
                            <Play className="w-3 h-3" /> Réécouter
                          </button>
                        )}
                      </div>

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
