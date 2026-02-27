"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

export function FlyoutCart({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { items, updateQty, removeItem, subtotal, tva, total } = useCart();
  const { formatPrice, getPrice } = useCurrency();
  const tvaLabel = `TVA (${Math.round(tva / subtotal * 100) || 0}%)`;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-tikoun-black/60 backdrop-blur-sm z-[100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] bg-tikoun-black border-l border-tikoun-white/10 shadow-2xl z-[110] flex flex-col"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-tikoun-white/10">
                  <Dialog.Title className="font-serif text-2xl text-tikoun-white flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-tikoun-gold" />
                    Mon Panier ({items.length})
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-tikoun-white/60 hover:text-tikoun-white transition-colors p-2">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-tikoun-white/5 flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-tikoun-white/20" />
                      </div>
                      <p className="text-tikoun-white/60 font-medium">
                        Votre panier est vide
                      </p>
                      <button
                        onClick={() => setOpen(false)}
                        className="text-tikoun-gold hover:text-tikoun-white underline text-sm tracking-widest uppercase transition-colors"
                      >
                        Continuer vos achats
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <div
                            className="w-20 h-24 bg-tikoun-darkgray bg-cover bg-center rounded border border-tikoun-white/10"
                            style={{
                              backgroundImage: `url(${item.product.image})`,
                            }}
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="text-sm font-serif text-tikoun-white leading-tight">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-tikoun-white/40 hover:text-tikoun-gold transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-tikoun-white/20 rounded">
                                <button
                                  onClick={() =>
                                    updateQty(item.product.id, -1)
                                  }
                                  className="p-1.5 text-tikoun-white hover:text-tikoun-gold hover:bg-tikoun-white/5 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm text-tikoun-white">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQty(item.product.id, 1)
                                  }
                                  className="p-1.5 text-tikoun-white hover:text-tikoun-gold hover:bg-tikoun-white/5 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-medium text-tikoun-white">
                                {formatPrice(getPrice(item.product) * item.qty)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t border-tikoun-white/10 p-6 bg-tikoun-black/50 backdrop-blur-md">
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Code promo"
                          className="flex-1 bg-tikoun-white/5 border border-tikoun-white/10 rounded px-3 py-2 text-sm text-tikoun-white focus:outline-none focus:border-tikoun-gold transition-colors"
                        />
                        <button className="bg-tikoun-white/10 text-tikoun-white px-4 py-2 rounded text-sm hover:bg-tikoun-white/20 transition-colors">
                          Appliquer
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between text-tikoun-white/70">
                        <span>Sous-total</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      {tva > 0 && (
                        <div className="flex justify-between text-tikoun-white/70">
                          <span>{tvaLabel}</span>
                          <span>{formatPrice(tva)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-tikoun-white font-serif text-xl pt-2 border-t border-tikoun-white/10">
                        <span>{tva > 0 ? "Total TTC" : "Total"}</span>
                        <span className="text-tikoun-gold">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      onClick={() => setOpen(false)}
                      className="w-full bg-tikoun-gold text-tikoun-black hover:bg-white flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-colors"
                    >
                      Commander <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
