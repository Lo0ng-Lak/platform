"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { formatVND, slugify, type Product } from "@/lib/store-types";

type FormState = {
  name: string;
  slug: string;
  price: string;
  compareAtPrice: string;
  image: string;
  description: string;
  collection: string;
  stock: string;
  variantsText: string;
};

const emptyForm = (): FormState => ({
  name: "",
  slug: "",
  price: "",
  compareAtPrice: "",
  image: "",
  description: "",
  collection: "Thời trang",
  stock: "0",
  variantsText: "",
});

function productToForm(p: Product): FormState {
  return {
    name: p.name,
    slug: p.slug,
    price: String(p.price),
    compareAtPrice: p.compareAtPrice ? String(p.compareAtPrice) : "",
    image: p.image,
    description: p.description,
    collection: p.collection,
    stock: String(p.stock),
    variantsText: p.variants
      .map((v) => `${v.label}: ${v.options.join(", ")}`)
      .join("\n"),
  };
}

function parseVariants(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, rest] = line.split(":");
      return {
        label: (label || "").trim(),
        options: (rest || "")
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      };
    })
    .filter((v) => v.label && v.options.length);
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let live = true;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!live) return;
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
        image: form.image,
        description: form.description,
        collection: form.collection,
        stock: Number(form.stock),
        variants: parseVariants(form.variantsText),
      };
      const res = await fetch(
        editingId ? `/api/products/${editingId}` : "/api/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không lưu được sản phẩm");
      setMessage(editingId ? "Đã cập nhật sản phẩm!" : "Đã thêm sản phẩm!");
      setForm(emptyForm());
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi lưu sản phẩm");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(p: Product) {
    if (!window.confirm(`Xoá sản phẩm "${p.name}"? Hành động này không hoàn tác được.`)) return;
    const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Không xoá được");
      return;
    }
    if (editingId === p.id) {
      setEditingId(null);
      setForm(emptyForm());
    }
    await load();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-800">Platform · Shopify</p>
            <h1 className="text-xl font-bold text-stone-900">Quản lý sản phẩm</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/orders" className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700">
              Đơn hàng
            </Link>
            <Link href="/shop" className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700">
              Xem cửa hàng
            </Link>
            <Link href="/dashboard" className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-stone-900">
            Danh sách sản phẩm ({products.length})
          </h2>
          {loading ? (
            <p className="text-sm text-stone-500">Đang tải…</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-stone-500">Chưa có sản phẩm nào. Thêm ở form bên phải →</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-left text-stone-500">
                    <th className="py-2 pr-3 font-medium">Sản phẩm</th>
                    <th className="py-2 pr-3 font-medium">Bộ sưu tập</th>
                    <th className="py-2 pr-3 font-medium">Giá</th>
                    <th className="py-2 pr-3 font-medium">Tồn kho</th>
                    <th className="py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-stone-100">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.name} className="h-11 w-11 rounded-lg object-cover" />
                          <div>
                            <div className="font-semibold text-stone-900">{p.name}</div>
                            <div className="text-xs text-stone-400">/products/{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-stone-600">{p.collection}</td>
                      <td className="py-3 pr-3">
                        <span className="font-semibold text-emerald-700">{formatVND(p.price)}</span>
                        {p.compareAtPrice ? (
                          <span className="ml-2 text-xs text-stone-400 line-through">{formatVND(p.compareAtPrice)}</span>
                        ) : null}
                      </td>
                      <td className="py-3 pr-3">
                        <span className={p.stock <= 0 ? "font-semibold text-red-500" : "text-stone-700"}>
                          {p.stock <= 0 ? "Hết hàng" : p.stock}
                        </span>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(p.id);
                            setForm(productToForm(p));
                            setMessage("");
                            setError("");
                          }}
                          className="mr-2 rounded-md border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-700"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => void onDelete(p)}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-stone-900">
            {editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input label="Tên sản phẩm *" value={form.name} onChange={(v) => setForm({ ...form, name: v, slug: editingId ? form.slug : slugify(v) })} />
            <Input label="Slug (đường dẫn)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Giá bán (VND) *" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
              <Input label="Giá gốc (nếu sale)" type="number" value={form.compareAtPrice} onChange={(v) => setForm({ ...form, compareAtPrice: v })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Bộ sưu tập" value={form.collection} onChange={(v) => setForm({ ...form, collection: v })} />
              <Input label="Tồn kho" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} />
            </div>
            <Input label="Link ảnh" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-stone-600">Mô tả</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-stone-600">
                Biến thể — mỗi dòng 1 nhóm, dạng: <code>Size: S, M, L</code>
              </span>
              <textarea value={form.variantsText} onChange={(e) => setForm({ ...form, variantsText: e.target.value })} rows={3} placeholder={"Size: S, M, L\nMàu: Đen, Trắng"} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
            </label>
            {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
            {message ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="flex-1 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                {saving ? "Đang lưu…" : editingId ? "Cập nhật" : "Thêm sản phẩm"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm());
                  }}
                  className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600"
                >
                  Huỷ sửa
                </button>
              ) : null}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-stone-600">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
    </label>
  );
}
