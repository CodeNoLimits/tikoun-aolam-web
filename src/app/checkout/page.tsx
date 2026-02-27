"use client";

import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, CreditCard, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

type PaymentMethod = "whatsapp" | "stripe" | "paypal";

export default function CheckoutPage() {
  const { items, subtotal, tva, total, removeItem, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payMethod, setPayMethod] = useState<PaymentMethod>("whatsapp");
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!name || !phone || !address) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);

    if (payMethod === "whatsapp") {
      const lines = items.map(
        (i) => `• ${i.product.name}${i.product.subtitle ? ` (${i.product.subtitle})` : ""} x${i.qty} = ${i.product.price * i.qty}₪`
      );
      const msg = encodeURIComponent(
        `Bonjour Tikoun Aolam,\n\nNom : ${name}\nTél : ${phone}\nAdresse : ${address}\n\nCommande :\n${lines.join("\n")}\n\nTotal TTC : ${total.toFixed(2)}₪\n\nMerci !`
      );
      clearCart();
      setLoading(false);
      window.open(`https://wa.me/972559759155?text=${msg}`, "_blank");
    } else if (payMethod === "stripe") {
      // Stripe Checkout — calls /api/stripe-checkout
      try {
        const res = await fetch("/api/stripe-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, name, phone, address }),
        });
        const { url } = await res.json();
        if (url) window.location.href = url;
        else alert("Erreur Stripe — veuillez réessayer.");
      } catch {
        alert("Erreur de connexion. Essayez WhatsApp.");
      }
      setLoading(false);
    } else if (payMethod === "paypal") {
      // PayPal — redirect to PayPal.me with amount
      const paypalUrl = `https://paypal.me/holyrentals/${total.toFixed(2)}ILS`;
      clearCart();
      setLoading(false);
      window.open(paypalUrl, "_blank");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-tikoun-black pt-32 pb-24 flex flex-col items-center justify-center gap-8">
        <ShoppingBag className="w-20 h-20 text-tikoun-white/20" />
        <h1 className="font-cinzel text-3xl text-tikoun-white">Votre panier est vide</h1>
        <Link href="/produits" className="bg-tikoun-gold text-tikoun-black px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
          Découvrir nos livres
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tikoun-black pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-tikoun-white mb-12 uppercase tracking-wider">
          Votre <span className="text-tikoun-gold italic">Commande</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Récapitulatif */}
          <div>
            <h2 className="font-cinzel text-xl text-tikoun-white mb-6 tracking-wide">Récapitulatif</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-center p-4 bg-tikoun-white/5 rounded-xl border border-tikoun-white/10">
                  <div
                    className="w-14 bg-tikoun-darkgray rounded bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url('${item.product.image}')`, height: "4.5rem" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-tikoun-white font-serif text-sm leading-tight line-clamp-2">{item.product.name}</p>
                    <p className="text-tikoun-white/50 text-xs mt-1">Qté : {item.qty}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-tikoun-gold font-medium text-sm">{item.product.price * item.qty} ₪</span>
                    <button onClick={() => removeItem(item.product.id)} className="text-tikoun-white/30 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-tikoun-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-tikoun-white/60">
                <span>Sous-total</span><span>{subtotal.toFixed(2)} ₪</span>
              </div>
              <div className="flex justify-between text-tikoun-white/60">
                <span>TVA (17%)</span><span>{tva.toFixed(2)} ₪</span>
              </div>
              <div className="flex justify-between text-tikoun-white font-cinzel text-2xl pt-3 border-t border-tikoun-white/10">
                <span>Total</span><span className="text-tikoun-gold">{total.toFixed(2)} ₪</span>
              </div>
            </div>
          </div>

          {/* Formulaire + Paiement */}
          <div>
            <h2 className="font-cinzel text-xl text-tikoun-white mb-6 tracking-wide">Vos coordonnées</h2>
            <div className="space-y-4 mb-8">
              {[
                { label: "Nom complet *", value: name, setter: setName, placeholder: "Prénom Nom" },
                { label: "Téléphone *", value: phone, setter: setPhone, placeholder: "+33 6 00 00 00 00" },
                { label: "Adresse de livraison *", value: address, setter: setAddress, placeholder: "Rue, Ville, Pays" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs text-tikoun-white/50 uppercase tracking-widest mb-2">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-tikoun-white/5 border border-tikoun-white/10 rounded-lg px-4 py-3 text-tikoun-white focus:outline-none focus:border-tikoun-gold transition-colors text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Payment method selector */}
            <div className="mb-6">
              <label className="block text-xs text-tikoun-white/50 uppercase tracking-widest mb-3">Mode de paiement</label>
              <div className="grid grid-cols-3 gap-3">
                {/* WhatsApp */}
                <button
                  onClick={() => setPayMethod("whatsapp")}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                    payMethod === "whatsapp"
                      ? "border-[#25D366] bg-[#25D366]/10 text-[#25D366]"
                      : "border-tikoun-white/10 text-tikoun-white/50 hover:border-tikoun-white/30"
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1" />
                  WhatsApp
                </button>
                {/* Stripe */}
                <button
                  onClick={() => setPayMethod("stripe")}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                    payMethod === "stripe"
                      ? "border-tikoun-gold bg-tikoun-gold/10 text-tikoun-gold"
                      : "border-tikoun-white/10 text-tikoun-white/50 hover:border-tikoun-white/30"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  Carte
                </button>
                {/* PayPal */}
                <button
                  onClick={() => setPayMethod("paypal")}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                    payMethod === "paypal"
                      ? "border-[#003087] bg-[#003087]/10 text-[#009CDE]"
                      : "border-tikoun-white/10 text-tikoun-white/50 hover:border-tikoun-white/30"
                  }`}
                >
                  <span className="block text-lg font-bold mb-0.5" style={{ fontFamily: "Arial, sans-serif" }}>P</span>
                  PayPal
                </button>
              </div>
              {payMethod === "stripe" && (
                <p className="text-tikoun-white/40 text-xs mt-2 text-center">
                  Paiement sécurisé par carte bancaire via Stripe
                </p>
              )}
              {payMethod === "paypal" && (
                <p className="text-tikoun-white/40 text-xs mt-2 text-center">
                  Vous serez redirigé vers PayPal pour finaliser
                </p>
              )}
              {payMethod === "whatsapp" && (
                <p className="text-tikoun-white/40 text-xs mt-2 text-center">
                  Paiement à la livraison ou par virement confirmé via WhatsApp
                </p>
              )}
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-tikoun-gold text-tikoun-black py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors mt-2 disabled:opacity-60"
            >
              {loading ? "Traitement..." : (
                <>
                  {payMethod === "whatsapp" ? "Commander via WhatsApp" : payMethod === "stripe" ? "Payer par carte" : "Payer via PayPal"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
