"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "./products";

// ── Types ──────────────────────────────────────────────────────
export type Currency = "ILS" | "EUR" | "USD";

export type ShippingCountryCode =
  | "IL" | "FR" | "BE" | "CH" | "CA" | "US"
  | "GB" | "DE" | "NL" | "LU" | "MA" | "TN" | "OTHER";

type ShippingZone = "IL" | "EU" | "NA" | "INTL";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  symbol: string;
  /** Returns the product price in the current currency */
  getPrice: (product: Product) => number;
  /** Formats a number with the current symbol */
  formatPrice: (amount: number) => string;
  /** Stripe currency code */
  stripeCurrency: string;
  /** Shipping */
  shippingCountry: ShippingCountryCode;
  setShippingCountry: (c: ShippingCountryCode) => void;
  shippingCost: number;
  shippingLabel: string;
  /** TVA rate depends on destination: 17% Israel, 0% export */
  tvaRate: number;
}

// ── Constants ──────────────────────────────────────────────────
const SYMBOLS: Record<Currency, string> = { ILS: "₪", EUR: "€", USD: "$" };
const STRIPE_CURRENCIES: Record<Currency, string> = { ILS: "ils", EUR: "eur", USD: "usd" };

const COUNTRY_TO_ZONE: Record<ShippingCountryCode, ShippingZone> = {
  IL: "IL",
  FR: "EU", BE: "EU", CH: "EU", GB: "EU", DE: "EU", NL: "EU", LU: "EU",
  CA: "NA", US: "NA",
  MA: "INTL", TN: "INTL", OTHER: "INTL",
};

const SHIPPING_RATES: Record<ShippingZone, Record<Currency, number>> = {
  IL:   { ILS: 29,  EUR: 8,  USD: 8  },
  EU:   { ILS: 45,  EUR: 12, USD: 13 },
  NA:   { ILS: 75,  EUR: 19, USD: 21 },
  INTL: { ILS: 90,  EUR: 23, USD: 25 },
};

// Free shipping threshold (Israel only)
const FREE_SHIPPING_THRESHOLD: Record<Currency, number> = { ILS: 200, EUR: 50, USD: 55 };

export const SHIPPING_COUNTRIES: { code: ShippingCountryCode; label: string }[] = [
  { code: "IL", label: "Israël 🇮🇱" },
  { code: "FR", label: "France 🇫🇷" },
  { code: "BE", label: "Belgique 🇧🇪" },
  { code: "CH", label: "Suisse 🇨🇭" },
  { code: "CA", label: "Canada 🇨🇦" },
  { code: "US", label: "États-Unis 🇺🇸" },
  { code: "GB", label: "Royaume-Uni 🇬🇧" },
  { code: "DE", label: "Allemagne 🇩🇪" },
  { code: "NL", label: "Pays-Bas 🇳🇱" },
  { code: "LU", label: "Luxembourg 🇱🇺" },
  { code: "MA", label: "Maroc 🇲🇦" },
  { code: "TN", label: "Tunisie 🇹🇳" },
  { code: "OTHER", label: "Autre pays 🌍" },
];

// ── Context ────────────────────────────────────────────────────
const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("ILS");
  const [shippingCountry, setShippingCountry] = useState<ShippingCountryCode>("IL");

  // Persist currency in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tikoun-currency") as Currency | null;
    if (saved && ["ILS", "EUR", "USD"].includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("tikoun-currency", c);
  }, []);

  const symbol = SYMBOLS[currency];
  const stripeCurrency = STRIPE_CURRENCIES[currency];

  const getPrice = useCallback(
    (product: Product): number => {
      if (currency === "EUR" && product.priceEUR) return product.priceEUR;
      if (currency === "USD" && product.priceUSD) return product.priceUSD;
      return product.price; // ILS fallback
    },
    [currency]
  );

  const formatPrice = useCallback(
    (amount: number): string => {
      const formatted = amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
      return currency === "ILS" ? `${formatted} ₪` : `${formatted} ${symbol}`;
    },
    [currency, symbol]
  );

  // Shipping cost calculation
  const zone = COUNTRY_TO_ZONE[shippingCountry];
  const shippingCost = SHIPPING_RATES[zone][currency];
  const shippingLabel =
    zone === "IL"
      ? `Livraison Israël`
      : zone === "EU"
      ? `Livraison Europe`
      : zone === "NA"
      ? `Livraison Amérique du Nord`
      : `Livraison Internationale`;

  // TVA: 17% for Israel, 0% for export
  const tvaRate = shippingCountry === "IL" ? 0.17 : 0;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        getPrice,
        formatPrice,
        stripeCurrency,
        shippingCountry,
        setShippingCountry,
        shippingCost,
        shippingLabel,
        tvaRate,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

/** Check if order qualifies for free shipping (Israel only) */
export function isEligibleForFreeShipping(
  subtotal: number,
  currency: Currency,
  country: ShippingCountryCode
): boolean {
  return country === "IL" && subtotal >= FREE_SHIPPING_THRESHOLD[currency];
}
