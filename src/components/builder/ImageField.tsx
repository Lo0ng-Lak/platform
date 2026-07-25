"use client";

import { FieldLabel } from "@puckeditor/core";
import { useRef, useState } from "react";

type ImageFieldRenderProps = {
  value: string;
  onChange: (value: string) => void;
  field: { label?: string };
};

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Upload thất bại");
  }

  return data.url as string;
}

export function ImageFieldInput({ value, onChange, field }: ImageFieldRenderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <FieldLabel label={field.label || "Hình ảnh"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {value ? (
          <div
            style={{
              position: "relative",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #e7e5e4",
              background: "#f5f5f4",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              style={{
                display: "block",
                width: "100%",
                maxHeight: 160,
                objectFit: "cover",
              }}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                border: "none",
                borderRadius: 6,
                background: "rgba(0,0,0,0.65)",
                color: "#fff",
                fontSize: 11,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </div>
        ) : (
          <div
            style={{
              border: "1px dashed #d6d3d1",
              borderRadius: 8,
              padding: "20px 12px",
              textAlign: "center",
              color: "#78716c",
              fontSize: 12,
              background: "#fafaf9",
            }}
          >
            Chưa có ảnh
          </div>
        )}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          style={{
            border: "1px solid #d6d3d1",
            borderRadius: 6,
            background: uploading ? "#f5f5f4" : "#fff",
            padding: "8px 10px",
            fontSize: 13,
            fontWeight: 600,
            cursor: uploading ? "wait" : "pointer",
            color: "#1c1917",
          }}
        >
          {uploading ? "Đang tải lên..." : "Chọn ảnh từ máy"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
          hidden
          onChange={(e) => void onFileChange(e.target.files?.[0])}
        />

        <input
          type="text"
          value={value || ""}
          placeholder="Hoặc dán URL ảnh..."
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #d6d3d1",
            borderRadius: 6,
            padding: "8px 10px",
            fontSize: 12,
            boxSizing: "border-box",
          }}
        />

        {error ? (
          <p style={{ margin: 0, color: "#b91c1c", fontSize: 12 }}>{error}</p>
        ) : null}
      </div>
    </FieldLabel>
  );
}

/** Reusable Puck custom field for image upload + URL */
export const imageField = (label = "Hình ảnh") => ({
  type: "custom" as const,
  label,
  render: (props: ImageFieldRenderProps) => <ImageFieldInput {...props} />,
});
