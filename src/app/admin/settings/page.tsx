"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import type { SiteProduct, SiteSettings } from "@/lib/settings-types";

type Tab = "site" | "contact" | "social" | "products";

const emptyProduct = (): SiteProduct => ({
  id: `p${Date.now()}`,
  name: "",
  price: "",
  compareAt: "",
  image: "",
  badge: "",
  href: "#",
  category: "",
  description: "",
});

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("site");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data.settings);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSave(event: FormEvent) {
    event.preventDefault();
    if (!settings) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không lưu được");
      setSettings(data.settings);
      setMessage("Đã lưu cài đặt website!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi lưu");
    } finally {
      setSaving(false);
    }
  }

  async function uploadLogo(file: File | undefined, key: "logoUrl" | "faviconUrl") {
    if (!file || !settings) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload thất bại");
      setSettings({ ...settings, [key]: data.url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
    } finally {
      setUploading(false);
    }
  }

  async function uploadProductImage(index: number, file: File | undefined) {
    if (!file || !settings) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload thất bại");
      const products = [...settings.products];
      products[index] = { ...products[index], image: data.url };
      setSettings({ ...settings, products });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
    } finally {
      setUploading(false);
    }
  }

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-stone-500">
        Đang tải cài đặt…
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "site", label: "Site & Logo" },
    { id: "contact", label: "Liên hệ" },
    { id: "social", label: "Mạng xã hội" },
    { id: "products", label: "Sản phẩm" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfdf5,_#fafaf9_45%,_#f5f5f4)]">
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-800">
              Platform
            </p>
            <h1 className="text-xl font-semibold text-stone-900">
              Cài đặt website
            </h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard"
              className="rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
            >
              Xem website
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <form onSubmit={onSave} className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  tab === t.id
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {message ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}
          {uploading ? (
            <p className="text-sm text-stone-500">Đang upload…</p>
          ) : null}

          {tab === "site" ? (
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">Site & Logo</h2>
              <p className="mt-1 text-sm text-stone-500">
                Tên site, logo và màu chủ đạo dùng chung toàn website.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Tên website">
                  <input
                    className={inputClass}
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </Field>
                <Field label="Màu chủ đạo">
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.primaryColor || "#0f766e"}
                      onChange={(e) =>
                        setSettings({ ...settings, primaryColor: e.target.value })
                      }
                      className="h-10 w-12 cursor-pointer rounded border border-stone-300"
                    />
                    <input
                      className={inputClass}
                      value={settings.primaryColor}
                      onChange={(e) =>
                        setSettings({ ...settings, primaryColor: e.target.value })
                      }
                    />
                  </div>
                </Field>
                <Field label="Tagline" className="sm:col-span-2">
                  <input
                    className={inputClass}
                    value={settings.tagline}
                    onChange={(e) =>
                      setSettings({ ...settings, tagline: e.target.value })
                    }
                  />
                </Field>
                <Field label="Logo">
                  <div className="flex flex-col gap-2">
                    {settings.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={settings.logoUrl}
                        alt="Logo"
                        className="h-12 w-auto object-contain"
                      />
                    ) : null}
                    <input
                      className={inputClass}
                      placeholder="URL logo hoặc upload"
                      value={settings.logoUrl}
                      onChange={(e) =>
                        setSettings({ ...settings, logoUrl: e.target.value })
                      }
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadLogo(e.target.files?.[0], "logoUrl")}
                    />
                  </div>
                </Field>
                <Field label="Favicon">
                  <div className="flex flex-col gap-2">
                    {settings.faviconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={settings.faviconUrl}
                        alt="Favicon"
                        className="h-8 w-8 object-contain"
                      />
                    ) : null}
                    <input
                      className={inputClass}
                      placeholder="URL favicon"
                      value={settings.faviconUrl}
                      onChange={(e) =>
                        setSettings({ ...settings, faviconUrl: e.target.value })
                      }
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        uploadLogo(e.target.files?.[0], "faviconUrl")
                      }
                    />
                  </div>
                </Field>
              </div>
            </section>
          ) : null}

          {tab === "contact" ? (
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">Liên hệ</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["email", "Email"],
                    ["phone", "Điện thoại"],
                    ["address", "Địa chỉ"],
                    ["hours", "Giờ làm việc"],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={label} className={key === "address" ? "sm:col-span-2" : ""}>
                    <input
                      className={inputClass}
                      value={settings.contact[key]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, [key]: e.target.value },
                        })
                      }
                    />
                  </Field>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "social" ? (
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">Mạng xã hội</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["facebook", "Facebook"],
                    ["instagram", "Instagram"],
                    ["tiktok", "TikTok"],
                    ["youtube", "YouTube"],
                    ["zalo", "Zalo"],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={label}>
                    <input
                      className={inputClass}
                      placeholder="https://..."
                      value={settings.social[key]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          social: { ...settings.social, [key]: e.target.value },
                        })
                      }
                    />
                  </Field>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "products" ? (
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-stone-900">
                    Catalog sản phẩm
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">
                    Dùng chung cho các section Featured / Grid / Carousel…
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSettings({
                      ...settings,
                      products: [...settings.products, emptyProduct()],
                    })
                  }
                  className="rounded-md bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-stone-800"
                >
                  + Thêm SP
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                {settings.products.map((product, index) => (
                  <div
                    key={product.id}
                    className="rounded-xl border border-stone-200 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-stone-800">
                        SP #{index + 1}
                      </p>
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            products: settings.products.filter((_, i) => i !== index),
                          })
                        }
                      >
                        Xóa
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          ["name", "Tên"],
                          ["price", "Giá"],
                          ["compareAt", "Giá gốc"],
                          ["badge", "Badge"],
                          ["category", "Danh mục"],
                          ["href", "Link"],
                        ] as const
                      ).map(([key, label]) => (
                        <Field key={key} label={label}>
                          <input
                            className={inputClass}
                            value={product[key] || ""}
                            onChange={(e) => {
                              const products = [...settings.products];
                              products[index] = {
                                ...products[index],
                                [key]: e.target.value,
                              };
                              setSettings({ ...settings, products });
                            }}
                          />
                        </Field>
                      ))}
                      <Field label="Mô tả" className="sm:col-span-2">
                        <input
                          className={inputClass}
                          value={product.description || ""}
                          onChange={(e) => {
                            const products = [...settings.products];
                            products[index] = {
                              ...products[index],
                              description: e.target.value,
                            };
                            setSettings({ ...settings, products });
                          }}
                        />
                      </Field>
                      <Field label="Ảnh sản phẩm" className="sm:col-span-2">
                        <div className="flex flex-col gap-2">
                          {product.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-20 w-20 rounded object-cover"
                            />
                          ) : null}
                          <input
                            className={inputClass}
                            placeholder="URL ảnh"
                            value={product.image}
                            onChange={(e) => {
                              const products = [...settings.products];
                              products[index] = {
                                ...products[index],
                                image: e.target.value,
                              };
                              setSettings({ ...settings, products });
                            }}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              uploadProductImage(index, e.target.files?.[0])
                            }
                          />
                        </div>
                      </Field>
                    </div>
                  </div>
                ))}
                {settings.products.length === 0 ? (
                  <p className="text-sm text-stone-500">Chưa có sản phẩm nào.</p>
                ) : null}
              </div>
            </section>
          ) : null}

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {saving ? "Đang lưu…" : "Lưu cài đặt"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className}`}>
      <span className="font-medium text-stone-700">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";
