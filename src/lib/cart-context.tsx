"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "./products";

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
  subtotal: number;
  tva: number;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

const TVA_RATE = 0.17; // Israel 17% VAT

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  const tva = +(subtotal * TVA_RATE).toFixed(2);
  const total = subtotal + tva;
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
