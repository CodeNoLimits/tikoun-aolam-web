"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Flame, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-tikoun-black relative overflow-hidden pt-28 pb-24">
      {/* Ambient background video (15% opacity) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-contain object-top md:object-cover md:object-center pointer-events-none"
        style={{ opacity: 0.15, zIndex: 0 }}
      >
        <source src="/videos/hero-cinematic-2.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-tikoun-black/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative container mx-auto px-4 md:px-8 max-w-2xl" style={{ zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full border border-tikoun-gold/30 bg-tikoun-gold/5">
            <Flame className="w-8 h-8 text-tikoun-gold" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.8))" }} />
          </div>
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-tikoun-white mb-4 uppercase tracking-widest">
            Nous{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #d4af37, #b87333, #d4af37)" }}
            >
              Contacter
            </span>
          </h1>
          <div className="h-px w-32 mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, #d4af37, transparent)" }} />
          <p className="text-tikoun-white/60 text-lg font-light">
            Une question sur une commande, un livre, ou un envoi&nbsp;?<br />
            Nous sommes là pour vous.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="space-y-4">
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/972559759155"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(37,211,102,0.05), rgba(0,0,0,0))",
              borderColor: "rgba(37,211,102,0.2)",
            }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(37,211,102,0.5)",
              boxShadow: "0 0 30px rgba(37,211,102,0.1)",
            }}
          >
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <MessageCircle className="w-8 h-8" style={{ color: "#25D366" }} />
            </div>
            <div className="flex-1">
              <div className="font-cinzel text-lg text-tikoun-white tracking-wide mb-1 group-hover:text-[#25D366] transition-colors">WhatsApp</div>
              <div className="text-tikoun-white/60 text-sm">+972 55 975 9155</div>
              <div className="text-tikoun-white/40 text-xs mt-1 tracking-widest uppercase">Réponse rapide · Commandes · Questions</div>
            </div>
            <div className="text-[#25D366]/40 group-hover:text-[#25D366] transition-all text-2xl">→</div>
          </motion.a>

          {/* Email — Contact Form */}
          <ContactForm />

          {/* Téléphone */}
          <motion.a
            href="tel:+972559759155"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(184,115,51,0.05), rgba(0,0,0,0))",
              borderColor: "rgba(184,115,51,0.2)",
            }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(184,115,51,0.5)",
              boxShadow: "0 0 30px rgba(184,115,51,0.1)",
            }}
          >
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{ background: "rgba(184,115,51,0.1)", border: "1px solid rgba(184,115,51,0.3)" }}
            >
              <Phone className="w-8 h-8 text-tikoun-copper" />
            </div>
            <div className="flex-1">
              <div className="font-cinzel text-lg text-tikoun-white tracking-wide mb-1 group-hover:text-tikoun-copper transition-colors">Téléphone</div>
              <div className="text-tikoun-white/60 text-sm">+972 55 975 9155</div>
              <div className="text-tikoun-white/40 text-xs mt-1 tracking-widest uppercase">Lun–Ven · 9h–18h · Heure d&apos;Israël</div>
            </div>
            <div className="text-tikoun-copper/40 group-hover:text-tikoun-copper transition-all text-2xl">→</div>
          </motion.a>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="font-cinzel text-tikoun-gold/60 text-sm tracking-[0.3em] uppercase">
            «&nbsp;Ein Ye&apos;ouch Ba&apos;Olam Klal&nbsp;»
          </p>
          <p className="text-tikoun-white/30 text-xs mt-2 tracking-widest">
            Il n&apos;y a pas de désespoir dans le monde — Rabbi Na&apos;hman de Breslev
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="rounded-2xl border p-4 sm:p-6"
      style={{
        background: "linear-gradient(135deg, rgba(212,175,55,0.05), rgba(0,0,0,0))",
        borderColor: "rgba(212,175,55,0.2)",
      }}
    >
      <div className="flex items-center gap-4 sm:gap-6 mb-4">
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <Mail className="w-8 h-8 text-tikoun-gold" />
        </div>
        <div className="flex-1">
          <div className="font-cinzel text-lg text-tikoun-white tracking-wide mb-1">Envoyer un Email</div>
          <div className="text-tikoun-white/40 text-xs tracking-widest uppercase">Réclamations · Éditions · Partenariats</div>
        </div>
      </div>

      {status === "sent" ? (
        <div className="flex items-center gap-3 py-6 justify-center text-tikoun-gold">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">Message envoyé avec succès !</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-lg px-4 py-3 text-sm text-tikoun-white placeholder:text-tikoun-white/30 focus:outline-none focus:border-tikoun-gold transition-colors"
          />
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-lg px-4 py-3 text-sm text-tikoun-white placeholder:text-tikoun-white/30 focus:outline-none focus:border-tikoun-gold transition-colors"
          />
          <textarea
            placeholder="Votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-lg px-4 py-3 text-sm text-tikoun-white placeholder:text-tikoun-white/30 focus:outline-none focus:border-tikoun-gold transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-tikoun-gold text-tikoun-black py-3 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === "sending" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
            ) : (
              <><Send className="w-4 h-4" /> Envoyer le message</>
            )}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-xs text-center">Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.</p>
          )}
        </form>
      )}
    </motion.div>
  );
}
