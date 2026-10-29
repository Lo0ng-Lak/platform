"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  /** Giá bán tại thời điểm thêm (VND) */
  price: number;
  /** Chuỗi biến thể đã chọn, ví dụ "Size: M · Màu: Đen" */
  variant?: string;
  qty: number;
};

export function cartItemKey(item: Pick<CartItem, "productId" | "variant">) {
  return `${item.productId}|${item.variant ?? ""}`;
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** true sau khi đã nạp giỏ từ localStorage (tránh hydration lệch) */
  ready: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "platform-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          // Nạp giỏ từ localStorage (hệ thống ngoài) sau mount để tránh lệch hydration
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(
            parsed.filter(
              (i) => i && typeof i.productId === "string" && Number(i.qty) > 0
            )
          );
        }
      }
    } catch {
      // giỏ hỏng thì bỏ qua, bắt đầu rỗng
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage đầy/không khả dụng — giỏ vẫn chạy trong phiên
    }
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const key = cartItemKey(item);
      const existing = prev.find((i) => cartItemKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          cartItemKey(i) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => cartItemKey(i) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => cartItemKey(i) !== key)
        : prev.map((i) => (cartItemKey(i) === key ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      items,
      count,
      subtotal,
      ready,
      addItem,
      removeItem,
      setQty,
      clear,
    };
  }, [items, ready, addItem, removeItem, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải dùng bên trong <CartProvider>");
  return ctx;
}

/** Trả null thay vì ném lỗi — cho các block render trong editor/preview lạ. */
export function useCartOptional(): CartContextValue | null {
  return useContext(CartContext);
}
