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
import { useCurrency } from "./currency-context";

const CART_KEY = "tikoun-cart";

export interface CartItem {
  product: Product;
  qty: number;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, qty?: number, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  /** Subtotal in currently selected currency */
  subtotal: number;
  /** TVA amount (17% Israel, 0% export) */
  tva: number;
  /** Total = subtotal + tva (shipping NOT included — added at checkout) */
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const { getPrice, tvaRate } = useCurrency();

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (product: Product, qty = 1, color?: string) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { product, qty, selectedColor: color }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? { ...i, qty: Math.max(1, i.qty + delta) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // Compute totals using the selected currency price
  const subtotal = items.reduce(
    (acc, item) => acc + getPrice(item.product) * item.qty,
    0
  );
  const tva = +(subtotal * tvaRate).toFixed(2);
  const total = +(subtotal + tva).toFixed(2);
  const itemCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        itemCount,
        subtotal,
        tva,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
