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

  async function onSeedDemo() {
    await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seedDemoSite: true }),
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

  function editHref(pagePath: string) {
    return pagePath === "/" ? "/edit" : `${pagePath}/edit`;
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

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        {/* Theme parts */}
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Theme toàn site
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Header và Footer chỉnh riêng — dùng chung cho mọi trang.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Header
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Navbar, logo, menu — áp dụng toàn website.
              </p>
              <Link
                href="/admin/header"
                className="mt-4 inline-flex rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800"
              >
                Sửa Header
              </Link>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                Footer
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Chân trang, link, thông tin — áp dụng toàn website.
              </p>
              <Link
                href="/admin/footer"
                className="mt-4 inline-flex rounded-md bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-stone-800"
              >
                Sửa Footer
              </Link>
            </div>
            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
                Cài đặt website
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Tên site, logo, màu chủ đạo, sản phẩm catalog — dùng chung toàn site.
              </p>
              <Link
                href="/admin/settings"
                className="mt-4 inline-flex rounded-md bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
              >
                Cài đặt website
              </Link>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  Các trang (Body)
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Mỗi trang chỉ sửa phần nội dung giữa Header và Footer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void onSeedDemo()}
                className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900 hover:bg-emerald-100"
              >
                Seed demo (Home + Services + Contact)
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-stone-500">Đang tải...</p>
            ) : pages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-10 text-center">
                <p className="text-sm text-stone-600">Chưa có trang nào.</p>
                <p className="mt-1 text-xs text-stone-400">
                  Tạo trang mới hoặc seed demo.
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
                        href={editHref(page.path)}
                        className="rounded-md bg-stone-900 px-3 py-1.5 text-sm text-white hover:bg-stone-800"
                      >
                        Sửa Body
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
              <p className="font-medium text-stone-800">Cách làm việc</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4">
                <li>
                  <strong>Sửa Header</strong> / <strong>Sửa Footer</strong> — 1 lần, dùng mọi trang
                </li>
                <li>
                  <strong>Sửa Body</strong> từng trang — nội dung riêng
                </li>
                <li>Website public chỉ hiện kết quả đã Publish</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
