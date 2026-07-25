"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type CSSProperties } from "react";

type PageMeta = {
  path: string;
  title: string;
};

function editBodyHref(path: string) {
  return path === "/" ? "/edit" : `${path}/edit`;
}

/** Menu admin nổi — chọn sửa Header / Footer / từng trang */
export function AdminMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState<PageMeta[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      setPages(data.pages || []);
    } catch {
      setPages([]);
    }
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  // Ẩn trên các màn editor / dashboard
  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/edit") ||
    pathname?.startsWith("/puck") ||
    pathname?.endsWith("/edit")
  ) {
    return null;
  }

  const currentEdit = editBodyHref(pathname || "/");

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {open ? (
        <div
          style={{
            width: 280,
            marginBottom: 10,
            borderRadius: 14,
            border: "1px solid #e7e5e4",
            background: "#fff",
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid #f5f5f4",
              background: "#0c0a09",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700 }}>Chỉnh sửa website</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
              Chọn vùng hoặc trang cần sửa
            </div>
          </div>

          <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            <Link href="/admin/header" style={itemStyle} onClick={() => setOpen(false)}>
              <span>Header</span>
              <span style={hint}>toàn site</span>
            </Link>
            <Link href="/admin/footer" style={itemStyle} onClick={() => setOpen(false)}>
              <span>Footer</span>
              <span style={hint}>toàn site</span>
            </Link>
            <Link href="/admin/settings" style={itemStyle} onClick={() => setOpen(false)}>
              <span>Cài đặt website</span>
              <span style={hint}>logo, sản phẩm</span>
            </Link>
            <Link href={currentEdit} style={itemStyle} onClick={() => setOpen(false)}>
              <span>Body trang hiện tại</span>
              <span style={hint}>{pathname || "/"}</span>
            </Link>
          </div>

          <div
            style={{
              padding: "8px 10px 4px",
              fontSize: 11,
              fontWeight: 700,
              color: "#78716c",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Tất cả trang
          </div>
          <div
            style={{
              padding: "0 10px 10px",
              maxHeight: 200,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {pages.length === 0 ? (
              <p style={{ margin: 0, fontSize: 12, color: "#a8a29e", padding: 8 }}>
                Chưa có trang — mở Dashboard để tạo.
              </p>
            ) : (
              pages.map((page) => (
                <div
                  key={page.path}
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <Link
                    href={page.path}
                    style={{ ...itemStyle, flex: 1 }}
                    onClick={() => setOpen(false)}
                  >
                    <span>{page.title}</span>
                    <span style={hint}>{page.path}</span>
                  </Link>
                  <Link
                    href={editBodyHref(page.path)}
                    onClick={() => setOpen(false)}
                    style={{
                      flexShrink: 0,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: "#14532d",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Sửa
                  </Link>
                </div>
              ))
            )}
          </div>

          <div style={{ padding: 10, borderTop: "1px solid #f5f5f4" }}>
            <Link
              href="/dashboard"
              style={{
                ...itemStyle,
                justifyContent: "center",
                background: "#f5f5f4",
                fontWeight: 700,
              }}
              onClick={() => setOpen(false)}
            >
              Mở Dashboard
            </Link>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          border: "none",
          borderRadius: 999,
          padding: "12px 16px",
          background: open ? "#44403c" : "#0c0a09",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        {open ? "Đóng" : "Chỉnh sửa"}
      </button>
    </div>
  );
}

const itemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "10px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: "#1c1917",
  background: "#fafaf9",
  fontSize: 13,
  fontWeight: 600,
};

const hint: CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#a8a29e",
};
