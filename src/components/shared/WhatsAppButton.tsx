"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/972559759155"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip on hover */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-tikoun-black border border-tikoun-white/10 px-4 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
        <p className="text-sm font-medium text-tikoun-white">Une question ? Chattez avec nous</p>
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-l-[6px] border-l-tikoun-black border-y-[6px] border-y-transparent"></div>
      </div>
    </motion.a>
  );
}
