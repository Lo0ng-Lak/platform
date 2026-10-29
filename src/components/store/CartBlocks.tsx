"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { cartItemKey, useCartOptional } from "./CartContext";
import { formatVND } from "@/lib/store-types";

const qtyBtn: CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: 6,
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  lineHeight: 1,
  fontSize: 13,
};

/** Nội dung block Mini Cart — dùng giỏ thật từ CartContext. */
export function MiniCartDropdown({ fallbackCount = 0 }: { fallbackCount?: number }) {
  const [open, setOpen] = useState(false);
  const cart = useCartOptional();
  const count = cart ? cart.count : fallbackCount;
  const items = cart?.items ?? [];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ position: "relative", background: "none", border: "none", fontSize: 24, cursor: "pointer" }}
      >
        🛒
        {count > 0 ? (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -8,
              background: "#ef4444",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              width: 18,
              height: 18,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {count}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            width: 320,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 10,
            padding: 16,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Giỏ hàng ({count})</div>
          {items.length === 0 ? (
            <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 12px" }}>
              Giỏ đang trống.{" "}
              <Link href="/shop" style={{ color: "#0f766e", fontWeight: 600 }}>
                Mua sắm ngay →
              </Link>
            </p>
          ) : (
            <>
              {items.map((item) => {
                const key = cartItemKey(item);
                return (
                  <div key={key} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      {item.variant ? <div style={{ color: "#94a3b8", fontSize: 12 }}>{item.variant}</div> : null}
                      <div style={{ color: "#0f766e" }}>{formatVND(item.price)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <button type="button" onClick={() => cart?.setQty(key, item.qty - 1)} style={qtyBtn}>−</button>
                      <span style={{ minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                      <button type="button" onClick={() => cart?.setQty(key, item.qty + 1)} style={qtyBtn}>+</button>
                      <button type="button" onClick={() => cart?.removeItem(key)} style={{ ...qtyBtn, color: "#ef4444", border: "none" }}>✕</button>
                    </div>
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, borderTop: "1px solid #f1f5f9", paddingTop: 10, marginTop: 4 }}>
                <span>Tạm tính</span>
                <span>{formatVND(cart?.subtotal ?? 0)}</span>
              </div>
              <Link
                href="/checkout"
                style={{
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                  padding: "10px",
                  background: "#0f766e",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  marginTop: 10,
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
              >
                Thanh toán
              </Link>
              <Link href="/cart" style={{ display: "block", textAlign: "center", marginTop: 8, fontSize: 13, color: "#0f766e", fontWeight: 600 }}>
                Xem giỏ hàng
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** Nội dung block Cart Drawer — dùng giỏ thật từ CartContext. */
export function CartDrawerView({ title, maxWidth }: { title: string; maxWidth: number }) {
  const cart = useCartOptional();
  const items = cart?.items ?? [];

  return (
    <div
      style={{
        maxWidth,
        marginLeft: "auto",
        border: "1px solid #e2e8f0",
        borderRadius: "12px 0 0 12px",
        padding: 24,
        minHeight: 400,
      }}
    >
      {title ? <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700 }}>{title}</h3> : null}
      {items.length === 0 ? (
        <p style={{ fontSize: 14, color: "#64748b" }}>
          Giỏ đang trống.{" "}
          <Link href="/shop" style={{ color: "#0f766e", fontWeight: 600 }}>
            Tiếp tục mua sắm →
          </Link>
        </p>
      ) : (
        <>
          {items.map((item) => {
            const key = cartItemKey(item);
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  gap: 12,
                  paddingBottom: 16,
                  marginBottom: 16,
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                  {item.variant ? <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{item.variant}</div> : null}
                  <div style={{ color: "#0f766e", fontWeight: 700, marginTop: 4 }}>{formatVND(item.price)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                    <button type="button" onClick={() => cart?.setQty(key, item.qty - 1)} style={qtyBtn}>−</button>
                    <span style={{ fontSize: 13, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button type="button" onClick={() => cart?.setQty(key, item.qty + 1)} style={qtyBtn}>+</button>
                    <button
                      type="button"
                      onClick={() => cart?.removeItem(key)}
                      style={{ marginLeft: 8, background: "none", border: "none", color: "#ef4444", fontSize: 13, cursor: "pointer" }}
                    >
                      Xoá
                    </button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{formatVND(item.price * item.qty)}</div>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: 16 }}>
            <span>Tổng</span>
            <span>{formatVND(cart?.subtotal ?? 0)}</span>
          </div>
          <Link
            href="/checkout"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              padding: 14,
              background: "#0f766e",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              boxSizing: "border-box",
            }}
          >
            Thanh toán
          </Link>
        </>
      )}
    </div>
  );
}
