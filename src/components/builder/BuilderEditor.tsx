"use client";

import type { Config, Data } from "@puckeditor/core";
import { Puck } from "@puckeditor/core";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useState } from "react";
import config from "@/puck.config";

type EditorKind = "page" | "header" | "footer";

type PageMeta = {
  path: string;
  title: string;
};

function editBodyHref(path: string) {
  return path === "/" ? "/edit" : `${path}/edit`;
}

export function BuilderEditor({
  kind,
  path,
  data,
  editorConfig = config,
}: {
  kind: EditorKind;
  path: string;
  data: Partial<Data>;
  editorConfig?: Config;
}) {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [saving, setSaving] = useState(false);

  const loadPages = useCallback(async () => {
    try {
      const res = await fetch("/api/pages");
      const json = await res.json();
      setPages(json.pages || []);
    } catch {
      setPages([]);
    }
  }, []);

  useEffect(() => {
    void loadPages();
  }, [loadPages]);

  const titles: Record<EditorKind, string> = {
    page: `Body: ${path}`,
    header: "Header (toàn site)",
    footer: "Footer (toàn site)",
  };

  async function publish(publishedData: Data) {
    setSaving(true);
    try {
      const res = await fetch("/puck/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          path: kind === "page" ? path : kind,
          data: publishedData,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || `Lỗi lưu (${res.status})`);
      }
      alert(
        kind === "page"
          ? `Đã lưu trang ${path}!`
          : `Đã lưu ${kind === "header" ? "Header" : "Footer"} toàn site!`
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "Không lưu được");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "8px 14px",
          borderBottom: "1px solid #e7e5e4",
          background: "#fff",
          zIndex: 50,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <strong style={{ fontSize: 14 }}>{titles[kind]}</strong>
          <span style={{ fontSize: 12, color: "#78716c" }}>
            {kind === "page"
              ? "Chỉ nội dung trang này"
              : "Áp dụng cho mọi trang"}
          </span>
          {saving ? (
            <span style={{ fontSize: 12, color: "#047857" }}>Đang lưu…</span>
          ) : null}

          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <span style={{ color: "#78716c" }}>Chuyển trang:</span>
            <select
              value={kind === "page" ? path : ""}
              onChange={(e) => {
                const next = e.target.value;
                if (!next) return;
                window.location.assign(editBodyHref(next));
              }}
              style={{
                border: "1px solid #d6d3d1",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 12,
                background: "#fafaf9",
              }}
            >
              <option value="" disabled={kind === "page"}>
                {kind === "page" ? "Chọn trang khác…" : "Sửa Body trang…"}
              </option>
              {pages.map((page) => (
                <option key={page.path} value={page.path}>
                  {page.title} ({page.path})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {/* Hard navigation — tránh lỗi soft-nav từ rewrite /edit */}
          <a href="/dashboard" style={navBtn}>
            Dashboard
          </a>
          <a
            href="/admin/header"
            style={{
              ...navBtn,
              ...(kind === "header"
                ? { background: "#14532d", color: "#fff", borderColor: "#14532d" }
                : {}),
            }}
          >
            Header
          </a>
          <a
            href="/admin/footer"
            style={{
              ...navBtn,
              ...(kind === "footer"
                ? { background: "#14532d", color: "#fff", borderColor: "#14532d" }
                : {}),
            }}
          >
            Footer
          </a>
          <a href="/admin/settings" style={navBtn}>
            Settings
          </a>
          <a href={kind === "page" ? path : "/"} style={navBtn}>
            {kind === "page" ? "Xem trang" : "Xem website"}
          </a>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Puck
          key={`${kind}:${path}`}
          config={editorConfig}
          data={data}
          onPublish={publish}
        />
      </div>
    </div>
  );
}

const navBtn: CSSProperties = {
  fontSize: 12,
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #d6d3d1",
  textDecoration: "none",
  color: "#1c1917",
  background: "#fafaf9",
};
