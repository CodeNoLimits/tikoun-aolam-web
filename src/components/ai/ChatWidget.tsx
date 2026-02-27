"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Mic, Volume2, MicOff, MessageCircle } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use refs to always have latest handlers without re-triggering setup
  const handleSubmitRef = useRef(handleSubmit);
  const handleInputChangeRef = useRef(handleInputChange);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
    handleInputChangeRef.current = handleInputChange;
  });

  const [speechRecognition, setSpeechRecognition] = useState<any>(null);

  useEffect(() => {
    if (activeMode === 'text') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeMode, isOpen]);

  // Initialize Speech Recognition — run once only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleInputChangeRef.current({ target: { value: transcript } } as any);

          setTimeout(() => {
             handleSubmitRef.current({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
          }, 300);

          setIsRecording(false);
          setActiveMode('text');
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        setSpeechRecognition(recognition);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleRecording = () => {
    if (!speechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }
    
    if (isRecording) {
      speechRecognition.stop();
      setIsRecording(false);
    } else {
      speechRecognition.start();
      setIsRecording(true);
    }
  };

  return (
    <>
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
            <div className="bg-gradient-to-r from-tikoun-darkgray to-tikoun-black pt-4 px-4 border-b border-tikoun-white/10 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tikoun-copper to-tikoun-gold flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-tikoun-black" />
                  </div>
                  <div>
                    <h3 className="font-serif text-tikoun-white text-lg font-medium leading-tight">
                      Conseiller IA
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                       <p className="text-[10px] text-tikoun-white/60 tracking-widest uppercase">Gemini 2.5 Actif</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-tikoun-white/50 hover:text-tikoun-white transition-colors p-1 bg-tikoun-white/5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex w-full bg-tikoun-black/50 rounded-lg p-1 mb-3 border border-tikoun-white/5">
                <button
                  onClick={() => setActiveMode('text')}
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

            {/* Content Area - Switches based on mode */}
            <div className="flex-1 relative overflow-hidden bg-tikoun-black/60">
              <AnimatePresence mode="wait">
                {activeMode === 'text' ? (
                  <motion.div
                    key="text-mode"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    {/* Text Messages Area */}
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
                              {m.content.split('**').map((segment, i) => i % 2 === 1 ? <strong key={i} className="text-tikoun-gold font-medium">{segment}</strong> : segment)}
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

                    {/* Text Input Area */}
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
                  <motion.div
                    key="voice-mode"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                  >
                    <div className="text-center mb-12">
                      <h4 className="font-serif text-xl text-tikoun-gold mb-2">Conversation Vocale</h4>
                      <p className="text-sm text-tikoun-white/50 max-w-[250px] mx-auto">
                        {isRecording ? "Gemini 2.5 vous écoute. Parlez naturellement..." : "Cliquez sur le microphone pour démarrer une session vocale interactive fluide."}
                      </p>
                    </div>

                    {/* Animated Pulsing Microphone Area */}
                    <div className="relative mt-4 mb-16">
                      {isRecording && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full bg-tikoun-gold/20"
                            animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full bg-tikoun-copper/30"
                            animate={{ scale: [1, 1.8, 2.5], opacity: [0.6, 0.2, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                          />
                        </>
                      )}
                      <button
                        onClick={toggleRecording}
                        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isRecording ? 'bg-tikoun-white text-tikoun-black shadow-tikoun-white/30 scale-105' : 'bg-gradient-to-br from-tikoun-copper to-tikoun-darkgray text-tikoun-white hover:scale-105'}`}
                      >
                        {isRecording ? <Mic className="w-10 h-10 animate-pulse" /> : <MicOff className="w-10 h-10" />}
                      </button>
                    </div>

                    <div className="text-xs text-tikoun-white/40 uppercase tracking-widest text-center">
                      Propulsé par Google Gemini 2.5 Live
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
