"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export function AddToCartButton({
  productId,
  slug,
  name,
  image,
  price,
  variant,
  qty = 1,
  disabled,
  label = "Thêm vào giỏ",
  style,
}: {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  variant?: string;
  qty?: number;
  disabled?: boolean;
  label?: string;
  style?: React.CSSProperties;
}) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        cart.addItem({ productId, slug, name, image, price, variant }, qty);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      style={{
        padding: "10px 16px",
        background: disabled ? "#cbd5e1" : added ? "#15803d" : "#0f766e",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontWeight: 600,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.2s",
        ...style,
      }}
    >
      {disabled ? "Hết hàng" : added ? "✓ Đã thêm" : label}
    </button>
  );
}
