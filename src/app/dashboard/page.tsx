"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

type PageMeta = {
  path: string;
  title: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/pages");
    const data = await res.json();
    setPages(data.pages || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadPages();
  }, [loadPages]);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setError("");

    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, path }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Không tạo được trang");
      return;
    }

    setTitle("");
    setPath("");
    await loadPages();
  }

  async function onSeedHome() {
    await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seedHome: true }),
    });
    await loadPages();
  }

  async function onDelete(pagePath: string) {
    if (!confirm(`Xóa trang ${pagePath}?`)) return;
    await fetch(`/api/pages?path=${encodeURIComponent(pagePath)}`, {
      method: "DELETE",
    });
    await loadPages();
  }

  function formatDate(value: string) {
    try {
      return new Date(value).toLocaleString("vi-VN");
    } catch {
      return value;
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfdf5,_#fafaf9_45%,_#f5f5f4)]">
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-800">
              Platform
            </p>
            <h1 className="text-xl font-semibold text-stone-900">Dashboard</h1>
          </div>
          <Link
            href="/"
            className="rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            Xem website
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-stone-900">Các trang</h2>
              <p className="mt-1 text-sm text-stone-500">
                Quản lý, chỉnh sửa và xuất bản trang bằng kéo thả.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void onSeedHome()}
              className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900 hover:bg-emerald-100"
            >
              Seed trang chủ demo
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-stone-500">Đang tải...</p>
          ) : pages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-10 text-center">
              <p className="text-sm text-stone-600">Chưa có trang nào.</p>
              <p className="mt-1 text-xs text-stone-400">
                Tạo trang mới bên phải, hoặc seed trang chủ demo.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {pages.map((page) => (
                <li
                  key={page.path}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-stone-900">{page.title}</p>
                    <p className="text-sm text-stone-500">{page.path}</p>
                    <p className="mt-1 text-xs text-stone-400">
                      Cập nhật: {formatDate(page.updatedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={page.path}
                      className="rounded-md border border-stone-300 px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      Xem
                    </Link>
                    <Link
                      href={page.path === "/" ? "/edit" : `${page.path}/edit`}
                      className="rounded-md bg-stone-900 px-3 py-1.5 text-sm text-white hover:bg-stone-800"
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      type="button"
                      onClick={() => void onDelete(page.path)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Tạo trang mới</h2>
          <p className="mt-1 text-sm text-stone-500">
            Ví dụ: tiêu đề &quot;Giới thiệu&quot;, đường dẫn &quot;/about&quot;.
          </p>

          <form onSubmit={onCreate} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">
                Tiêu đề
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Giới thiệu"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none ring-emerald-600 focus:ring-2"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-stone-700">
                Đường dẫn
              </span>
              <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/about"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none ring-emerald-600 focus:ring-2"
                required
              />
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
            >
              Tạo trang
            </button>
          </form>

          <div className="mt-8 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
            <p className="font-medium text-stone-800">Phân tách public / admin</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4">
              <li>
                <strong>/</strong> và các trang public chỉ hiện website — khách không thấy nút sửa
              </li>
              <li>
                Chỉ admin vào <strong>/dashboard</strong> hoặc thêm <strong>/edit</strong> sau URL
              </li>
              <li>Seed trang chủ demo nếu chưa có nội dung</li>
              <li>Publish trong editor để cập nhật trang live</li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}
