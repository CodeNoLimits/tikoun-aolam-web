"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Star,
  ChevronDown,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import {
  getProduct,
  getRelatedProducts,
  ALL_PRODUCTS,
  type Product,
} from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  const product = getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductContent product={product} />;
}

function ProductContent({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { formatPrice, getPrice } = useCurrency();
  const variants = product.variants ?? [];
  const [selectedColor, setSelectedColor] = useState(variants[0] ?? null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const images = product.images ?? [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const related = getRelatedProducts(product.id, 4);
  // If category has fewer than 4, fill with other products
  const suggestions =
    related.length >= 4
      ? related
      : [
          ...related,
          ...ALL_PRODUCTS.filter(
            (p) => p.id !== product.id && !related.includes(p)
          ).slice(0, 4 - related.length),
        ];

  const handleAddToCart = () => {
    addItem(product, qty, selectedColor?.name);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-tikoun-black pt-12 pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <nav className="text-xs font-medium tracking-widest uppercase text-tikoun-white/50 flex gap-2 items-center">
          <Link href="/" className="hover:text-tikoun-gold transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link
            href="/produits"
            className="hover:text-tikoun-gold transition-colors"
          >
            Boutique
          </Link>
          <span>/</span>
          <span className="text-tikoun-white">{product.categoryLabel}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-32">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-hide py-2 md:py-0 w-full md:w-24">
              {images.map((img, idx) => {
                const variantForThumb = variants[idx % (variants.length || 1)];
                const isUntinted = !variantForThumb || variantForThumb.name === "Noir" || variantForThumb.name === "Anthracite";
                const isLight = variantForThumb && ['#f8fafc', '#ffffff', '#fda4af', '#7dd3fc'].includes(variantForThumb.hex.toLowerCase());

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(idx);
                      if (variantForThumb) setSelectedColor(variantForThumb);
                    }}
                    className={`relative w-20 h-24 md:w-24 md:h-32 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === idx
                        ? "border-tikoun-gold"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${img}')` }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative aspect-[4/5] bg-tikoun-darkgray/30 rounded-2xl overflow-hidden border border-tikoun-white/10 group">
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 bg-tikoun-gold text-tikoun-black px-3 py-1 text-xs font-bold tracking-widest uppercase rounded shadow-lg">
                  {product.badge}
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${images[activeImage]}')`,
                  }}
                >
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col pt-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-tikoun-white leading-tight mb-4">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-xl md:text-2xl font-light text-tikoun-white/70 mb-6">
                {product.subtitle}
              </p>
            )}

            <div className="flex items-center gap-6 mb-8">
              <span className="text-3xl font-medium text-tikoun-gold">
                {formatPrice(getPrice(product))}
              </span>
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < (product.rating ?? 0)
                            ? "fill-tikoun-gold text-tikoun-gold"
                            : "fill-tikoun-white/20 text-tikoun-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-tikoun-white/50 underline cursor-pointer">
                    ({product.reviewCount ?? 0} Avis)
                  </span>
                </div>
              )}
            </div>

            {/* Colors (if available) */}
            {variants.length > 0 && selectedColor && (
              <div className="mb-10">
                <h4 className="text-sm font-bold tracking-widest text-tikoun-white uppercase mb-4">
                  Couleur reliure :{" "}
                  <span className="text-tikoun-white/60 font-medium ml-2">
                    {selectedColor.name}
                  </span>
                </h4>
                <div className="flex gap-3">
                  {variants.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-tikoun-gold scale-110"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.name === color.name && (
                        <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-tikoun-white/20 rounded-lg bg-tikoun-white/5 h-14 w-full sm:w-32">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex-1 h-full text-tikoun-white rounded-l-lg hover:bg-tikoun-white/10 transition-colors px-4 text-xl"
                >
                  -
                </button>
                <div className="font-medium text-tikoun-white px-2">{qty}</div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex-1 h-full text-tikoun-white rounded-r-lg hover:bg-tikoun-white/10 transition-colors px-4 text-xl"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 h-14 rounded-lg font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-xl ${
                  added
                    ? "bg-green-500 text-white shadow-green-500/10"
                    : "bg-tikoun-gold text-tikoun-black hover:bg-white shadow-tikoun-gold/10"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Ajouté !
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Ajouter au panier
                  </>
                )}
              </button>
            </div>

            {/* Trust Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-tikoun-white/10 mb-10">
              <div className="flex flex-col gap-2">
                <Truck className="w-5 h-5 text-tikoun-gold" />
                <span className="text-xs text-tikoun-white/70 leading-relaxed uppercase tracking-widest font-medium">
                  Livraison 24/48h
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <ShieldCheck className="w-5 h-5 text-tikoun-gold" />
                <span className="text-xs text-tikoun-white/70 leading-relaxed uppercase tracking-widest font-medium">
                  Paiement Sécurisé
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <RotateCcw className="w-5 h-5 text-tikoun-gold" />
                <span className="text-xs text-tikoun-white/70 leading-relaxed uppercase tracking-widest font-medium">
                  Retours 14 Jours
                </span>
              </div>
            </div>

            {/* Accordions */}
            <Accordion.Root type="single" collapsible className="space-y-2">
              <Accordion.Item
                value="desc"
                className="border-b border-tikoun-white/10 overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex justify-between items-center w-full py-6 text-left group">
                    <span className="font-serif text-xl text-tikoun-white group-hover:text-tikoun-gold transition-colors">
                      Description de l&apos;ouvrage
                    </span>
                    <ChevronDown className="w-5 h-5 text-tikoun-white/50 group-data-[state=open]:rotate-180 transition-transform duration-300" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pb-6 text-tikoun-white/70 font-light leading-relaxed">
                    <p>{product.description}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {product.characteristics && (
                <Accordion.Item
                  value="carac"
                  className="border-b border-tikoun-white/10 overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex justify-between items-center w-full py-6 text-left group">
                      <span className="font-serif text-xl text-tikoun-white group-hover:text-tikoun-gold transition-colors">
                        Caractéristiques Techniques
                      </span>
                      <ChevronDown className="w-5 h-5 text-tikoun-white/50 group-data-[state=open]:rotate-180 transition-transform duration-300" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="pb-6 grid grid-cols-2 gap-y-4 text-sm">
                      {Object.entries(product.characteristics).map(
                        ([key, value]) => (
                          <div key={key} className="contents">
                            <div className="text-tikoun-white/50">{key}</div>
                            <div className="text-tikoun-white font-medium text-right">
                              {value}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              )}
            </Accordion.Root>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-32 border-t border-tikoun-white/10 pt-20">
          <h3 className="font-serif text-3xl font-bold text-tikoun-white mb-12 text-center uppercase tracking-widest">
            Vous aimerez aussi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {suggestions.map((p) => (
              <Link
                key={p.id}
                href={`/produits/${p.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-tikoun-darkgray/30 rounded-xl mb-4 overflow-hidden border border-tikoun-white/5">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${p.image}')`,
                    }}
                  />
                </div>
                <h4 className="font-serif text-lg text-tikoun-white group-hover:text-tikoun-gold transition-colors line-clamp-1 mb-1">
                  {p.name}
                </h4>
                <p className="text-tikoun-gold font-medium">{formatPrice(getPrice(p))}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
