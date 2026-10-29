"use client";

import Link from "next/link";
import { cartItemKey, useCart } from "@/components/store/CartContext";
import { formatVND } from "@/lib/store-types";

export function CartClient() {
  const cart = useCart();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 64px" }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
        Giỏ hàng
      </h1>
      <p style={{ color: "#64748b", margin: "0 0 28px" }}>
        {cart.ready ? `${cart.count} sản phẩm trong giỏ` : "Đang tải giỏ…"}
      </p>

      {cart.ready && cart.items.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 36, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🛒</div>
          <p style={{ color: "#475569", margin: "0 0 18px" }}>Giỏ hàng của bạn đang trống.</p>
          <Link
            href="/shop"
            style={{ display: "inline-block", padding: "11px 22px", background: "#0f766e", color: "#fff", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden" }}>
            {cart.items.map((item) => {
              const key = cartItemKey(item);
              return (
                <div
                  key={key}
                  style={{ display: "flex", gap: 16, padding: 16, borderBottom: "1px solid #f1f5f9", alignItems: "center", flexWrap: "wrap" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} style={{ width: 76, height: 76, objectFit: "cover", borderRadius: 10 }} />
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <Link href={`/products/${item.slug}`} style={{ fontWeight: 700, color: "inherit", textDecoration: "none" }}>
                      {item.name}
                    </Link>
                    {item.variant ? (
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{item.variant}</div>
                    ) : null}
                    <div style={{ color: "#0f766e", fontWeight: 700, marginTop: 5 }}>{formatVND(item.price)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button type="button" onClick={() => cart.setQty(key, item.qty - 1)} style={btn}>−</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontWeight: 700 }}>{item.qty}</span>
                    <button type="button" onClick={() => cart.setQty(key, item.qty + 1)} style={btn}>+</button>
                  </div>
                  <div style={{ fontWeight: 800, minWidth: 110, textAlign: "right" }}>
                    {formatVND(item.price * item.qty)}
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.removeItem(key)}
                    style={{ background: "none", border: "none", color: "#ef4444", fontWeight: 600, cursor: "pointer", fontSize: 13 }}
                  >
                    Xoá
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22, flexWrap: "wrap", gap: 14 }}>
            <button
              type="button"
              onClick={cart.clear}
              style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}
            >
              Xoá toàn bộ giỏ
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 17 }}>
                Tạm tính: <b style={{ color: "#0f766e", fontSize: 20 }}>{formatVND(cart.subtotal)}</b>
              </div>
              <Link
                href="/checkout"
                style={{ padding: "13px 26px", background: "#0f766e", color: "#fff", borderRadius: 9, fontWeight: 700, textDecoration: "none" }}
              >
                Thanh toán →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const btn: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 7,
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1,
};
