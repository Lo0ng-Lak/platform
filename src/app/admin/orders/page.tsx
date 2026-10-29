"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  formatVND,
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  type Order,
  type OrderStatus,
} from "@/lib/store-types";

const statusColor: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-amber-100 text-amber-800",
  shipping: "bg-violet-100 text-violet-800",
  done: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (!live) return;
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);

  async function changeStatus(order: Order, status: OrderStatus) {
    setError("");
    const res = await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Không đổi được trạng thái");
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === order.id ? data.order : o)));
  }

  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-800">Platform · Shopify</p>
            <h1 className="text-xl font-bold text-stone-900">Quản lý đơn hàng</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/products" className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700">
              Sản phẩm
            </Link>
            <Link href="/dashboard" className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">Tổng số đơn</div>
            <div className="mt-1 text-2xl font-bold text-stone-900">{orders.length}</div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">Đơn mới</div>
            <div className="mt-1 text-2xl font-bold text-blue-700">
              {orders.filter((o) => o.status === "new").length}
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">Doanh thu (chưa trừ đơn huỷ)</div>
            <div className="mt-1 text-2xl font-bold text-emerald-700">{formatVND(revenue)}</div>
          </div>
        </div>

        {error ? <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          {loading ? (
            <p className="text-sm text-stone-500">Đang tải…</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-stone-500">
              Chưa có đơn hàng nào. Khách đặt hàng ở trang{" "}
              <Link href="/checkout" className="font-semibold text-emerald-700">checkout</Link> sẽ hiện ở đây.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-left text-stone-500">
                    <th className="py-2 pr-3 font-medium">Mã đơn</th>
                    <th className="py-2 pr-3 font-medium">Khách hàng</th>
                    <th className="py-2 pr-3 font-medium">Sản phẩm</th>
                    <th className="py-2 pr-3 font-medium">Tổng tiền</th>
                    <th className="py-2 pr-3 font-medium">Thanh toán</th>
                    <th className="py-2 pr-3 font-medium">Thời gian</th>
                    <th className="py-2 font-medium">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <Fragment key={o.id}>
                      <tr className="border-b border-stone-100">
                        <td className="py-3 pr-3">
                          <button type="button" onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="font-bold text-emerald-800">
                            {o.code}
                          </button>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="font-semibold text-stone-900">{o.customer.name}</div>
                          <div className="text-xs text-stone-400">{o.customer.phone}</div>
                        </td>
                        <td className="py-3 pr-3 text-stone-600">
                          {o.items.reduce((s, i) => s + i.qty, 0)} SP · {o.items.map((i) => i.name).join(", ")}
                        </td>
                        <td className="py-3 pr-3 font-semibold text-stone-900">{formatVND(o.total)}</td>
                        <td className="py-3 pr-3 text-stone-600">{o.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}</td>
                        <td className="py-3 pr-3 text-stone-600">
                          {new Date(o.createdAt).toLocaleString("vi-VN")}
                        </td>
                        <td className="py-3">
                          <span className={`mr-2 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${statusColor[o.status]}`}>
                            {ORDER_STATUS_LABELS[o.status]}
                          </span>
                          <select
                            value={o.status}
                            onChange={(e) => void changeStatus(o, e.target.value as OrderStatus)}
                            className="rounded-md border border-stone-300 px-2 py-1.5 text-xs font-semibold text-stone-700"
                          >
                            {ORDER_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {ORDER_STATUS_LABELS[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {expanded === o.id ? (
                        <tr className="border-b border-stone-100 bg-stone-50">
                          <td colSpan={7} className="px-3 py-3 text-xs text-stone-600">
                            <div className="mb-2">
                              <b>Địa chỉ:</b> {o.customer.address}
                              {o.customer.note ? <> · <b>Ghi chú:</b> {o.customer.note}</> : null}
                            </div>
                            {o.items.map((i, idx) => (
                              <div key={idx} className="flex justify-between py-0.5">
                                <span>
                                  {i.name}
                                  {i.variant ? ` (${i.variant})` : ""} × {i.qty}
                                </span>
                                <span className="font-semibold">{formatVND(i.price * i.qty)}</span>
                              </div>
                            ))}
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
