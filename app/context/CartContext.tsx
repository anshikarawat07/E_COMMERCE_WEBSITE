"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "@/app/lib/products";

type CartMap = Record<number, number>; // productId -> quantity

type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartMap;
  lines: CartLine[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, change: number) => void;
  clearCart: () => void;
  renderCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "ut-cart";

const productsById: Record<number, Product> = products.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<number, Product>
);

function loadCartFromStorage(): CartMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const obj = parsed as Record<string, unknown>;
    const result: CartMap = {};

    for (const [key, value] of Object.entries(obj)) {
      const id = Number(key);
      const qty = typeof value === "number" ? value : Number(value);

      if (!Number.isFinite(id) || Number.isNaN(id)) continue;
      if (!Number.isFinite(qty) || qty <= 0) continue;

      result[id] = Math.max(1, Math.floor(qty));
    }

    return result;
  } catch {
    return {};
  }
}

function persistCart(cart: CartMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore write errors (e.g., storage full / blocked).
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartMap>({});

  const renderCart = useCallback(() => {
    setItems(loadCartFromStorage());
  }, []);

  useEffect(() => {
    // Avoid "set-state-in-effect" linting by scheduling the initial sync.
    const timeoutId = window.setTimeout(() => {
      setItems(loadCartFromStorage());
    }, 0);

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) setItems(loadCartFromStorage());
    };

    window.addEventListener("storage", onStorage);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const next: CartMap = { ...prev };
      const id = product.id;
      next[id] = (next[id] ?? 0) + 1;
      persistCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => {
      const next: CartMap = { ...prev };
      delete next[productId];
      persistCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, change: number) => {
    setItems((prev) => {
      const next: CartMap = { ...prev };
      const current = next[productId] ?? 0;
      const updated = current + change;

      if (updated <= 0) {
        delete next[productId];
      } else {
        next[productId] = Math.max(1, Math.floor(updated));
      }

      persistCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems({});
    persistCart({});
  }, []);

  const lines = useMemo(() => {
    return Object.entries(items)
      .map(([idStr, qty]) => {
        const id = Number(idStr);
        const product = productsById[id];
        if (!product) return null;
        return { product, quantity: qty } as CartLine;
      })
      .filter((x): x is CartLine => x !== null);
  }, [items]);

  const totalItems = useMemo(
    () => Object.values(items).reduce((sum, qty) => sum + qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + line.product.price * line.quantity,
        0
      ),
    [lines]
  );

  const value: CartContextValue = {
    items,
    lines,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    renderCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

