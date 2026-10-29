"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { formatVND, type Product } from "@/lib/store-types";

export function ProductDetail({ product }: { product: Product }) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.variants.map((v) => [v.label, v.options[0] ?? ""]))
  );
  const [qty, setQty] = useState(1);

  const variantText = useMemo(
    () =>
      product.variants
        .filter((v) => selected[v.label])
        .map((v) => `${v.label}: ${selected[v.label]}`)
        .join(" · ") || undefined,
    [product.variants, selected]
  );

  const outOfStock = product.stock <= 0;
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;

  return (
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 24px 64px" }}>
      <nav style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>
        <Link href="/shop" style={{ color: "#0f766e", fontWeight: 600, textDecoration: "none" }}>
          ← Cửa hàng
        </Link>{" "}
        / {product.collection} / {product.name}
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#f1f5f9", aspectRatio: "1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {discount ? (
            <span style={{ position: "absolute", top: 14, left: 14, background: "#0f172a", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 8 }}>
              Giảm {discount}%
            </span>
          ) : null}
        </div>

        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0f766e" }}>
            {product.collection}
          </span>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", margin: "10px 0 12px" }}>
            {product.name}
          </h1>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 16 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#0f766e" }}>{formatVND(product.price)}</span>
            {product.compareAtPrice ? (
              <span style={{ fontSize: 16, color: "#94a3b8", textDecoration: "line-through" }}>
                {formatVND(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <p style={{ color: "#475569", lineHeight: 1.7, margin: "0 0 20px" }}>{product.description}</p>
          <p style={{ fontSize: 13, color: outOfStock ? "#ef4444" : "#16a34a", fontWeight: 600, margin: "0 0 20px" }}>
            {outOfStock ? "Hết hàng" : `Còn ${product.stock} sản phẩm trong kho`}
          </p>

          {product.variants.map((variant) => (
            <div key={variant.label} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                {variant.label}: <span style={{ color: "#0f766e" }}>{selected[variant.label]}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {variant.options.map((opt) => {
                  const active = selected[variant.label] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelected((s) => ({ ...s, [variant.label]: opt }))}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: `1px solid ${active ? "#0f766e" : "#e2e8f0"}`,
                        background: active ? "#0f766e" : "#fff",
                        color: active ? "#fff" : "#334155",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 12, alignItems: "stretch", marginTop: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} style={qtyBtn}>−</button>
              <span style={{ minWidth: 36, textAlign: "center", fontWeight: 700 }}>{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))} style={qtyBtn}>+</button>
            </div>
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              image={product.image}
              price={product.price}
              variant={variantText}
              qty={qty}
              disabled={outOfStock}
              label="Thêm vào giỏ hàng"
              style={{ flex: 1, padding: "13px 20px", fontSize: 15 }}
            />
          </div>
          <Link href="/cart" style={{ display: "inline-block", marginTop: 14, fontSize: 14, color: "#0f766e", fontWeight: 600 }}>
            Xem giỏ hàng →
          </Link>
        </div>
      </div>
    </div>
  );
}

const qtyBtn: React.CSSProperties = {
  width: 38,
  height: "100%",
  minHeight: 44,
  border: "none",
  background: "#f8fafc",
  fontSize: 16,
  cursor: "pointer",
};
