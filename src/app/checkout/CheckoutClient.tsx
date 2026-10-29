"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { cartItemKey, useCart } from "@/components/store/CartContext";
import { formatVND, type Order } from "@/lib/store-types";

export function CheckoutClient() {
  const cart = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          paymentMethod,
          items: cart.items.map((i) => ({
            productId: i.productId,
            qty: i.qty,
            variant: i.variant,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không đặt được hàng");
      setPlacedOrder(data.order as Order);
      cart.clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không đặt được hàng");
    } finally {
      setSubmitting(false);
    }
  }

  if (placedOrder) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 72px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 10px" }}>Đặt hàng thành công!</h1>
        <p style={{ color: "#475569", lineHeight: 1.7, margin: "0 0 6px" }}>
          Cảm ơn <b>{placedOrder.customer.name}</b>. Mã đơn hàng của bạn là:
        </p>
        <p style={{ fontSize: 24, fontWeight: 800, color: "#0f766e", letterSpacing: "0.04em", margin: "6px 0 14px" }}>
          {placedOrder.code}
        </p>
        <p style={{ color: "#475569", lineHeight: 1.7, margin: "0 0 26px" }}>
          Tổng thanh toán: <b>{formatVND(placedOrder.total)}</b> —{" "}
          {placedOrder.paymentMethod === "cod"
            ? "thanh toán khi nhận hàng (COD)."
            : "vui lòng chuyển khoản theo hướng dẫn cửa hàng sẽ liên hệ xác nhận."}{" "}
          Cửa hàng sẽ gọi <b>{placedOrder.customer.phone}</b> để xác nhận trước khi giao.
        </p>
        <Link
          href="/shop"
          style={{ display: "inline-block", padding: "12px 24px", background: "#0f766e", color: "#fff", borderRadius: 9, fontWeight: 700, textDecoration: "none" }}
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 64px" }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 28px" }}>Thanh toán</h1>

      {cart.ready && cart.items.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 32, textAlign: "center" }}>
          <p style={{ color: "#475569", margin: "0 0 16px" }}>Giỏ hàng trống — chưa có gì để thanh toán.</p>
          <Link href="/shop" style={{ color: "#0f766e", fontWeight: 700 }}>
            ← Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 18px" }}>Thông tin giao hàng</h2>
            <Field label="Họ và tên *">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" style={input} />
            </Field>
            <Field label="Số điện thoại *">
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0901 234 567" style={input} />
            </Field>
            <Field label="Địa chỉ giao hàng *">
              <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Số nhà, đường, quận/huyện, tỉnh/thành" style={input} />
            </Field>
            <Field label="Ghi chú">
              <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Ghi chú cho cửa hàng (không bắt buộc)" rows={3} style={input} />
            </Field>

            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "22px 0 12px" }}>Phương thức thanh toán</h2>
            <label style={payOpt(paymentMethod === "cod")}>
              <input type="radio" name="pay" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              <span><b>COD</b> — Thanh toán khi nhận hàng</span>
            </label>
            <label style={payOpt(paymentMethod === "bank")}>
              <input type="radio" name="pay" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
              <span><b>Chuyển khoản</b> — ngân hàng (cửa hàng liên hệ hướng dẫn)</span>
            </label>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
              Thanh toán online (thẻ/ví điện tử) sẽ được bổ sung ở giai đoạn sau.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Đơn hàng ({cart.count} sản phẩm)</h2>
            {cart.items.map((item) => (
              <div key={cartItemKey(item)} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ flex: 1, fontSize: 13 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  {item.variant ? <div style={{ color: "#94a3b8", fontSize: 12 }}>{item.variant}</div> : null}
                  <div style={{ color: "#64748b" }}>× {item.qty}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{formatVND(item.price * item.qty)}</div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
              <span>Tổng cộng</span>
              <span style={{ color: "#0f766e" }}>{formatVND(cart.subtotal)}</span>
            </div>
            {error ? (
              <p style={{ color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px", fontSize: 13, marginTop: 16 }}>
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting || !cart.ready || cart.items.length === 0}
              style={{
                width: "100%",
                marginTop: 18,
                padding: 14,
                background: submitting ? "#94a3b8" : "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: 15,
                cursor: submitting ? "wait" : "pointer",
              }}
            >
              {submitting ? "Đang đặt hàng…" : "Đặt hàng"}
            </button>
            <Link href="/cart" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 13, color: "#0f766e", fontWeight: 600 }}>
              ← Quay lại giỏ hàng
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  padding: "11px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 14,
  boxSizing: "border-box",
  background: "#fff",
};

function payOpt(active: boolean): React.CSSProperties {
  return {
    display: "flex",
    gap: 10,
    alignItems: "center",
    border: `1px solid ${active ? "#0f766e" : "#e2e8f0"}`,
    background: active ? "#f0fdfa" : "#fff",
    borderRadius: 9,
    padding: "12px 14px",
    marginBottom: 10,
    fontSize: 14,
    cursor: "pointer",
  };
}
