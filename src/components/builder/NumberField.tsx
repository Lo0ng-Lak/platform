"use client";

import { FieldLabel } from "@puckeditor/core";
import { useEffect, useState } from "react";

type NumberFieldRenderProps = {
  value: number | string | undefined | null;
  onChange: (value: number) => void;
  field: { label?: string; min?: number; max?: number };
};

/**
 * Number input that actually accepts typed values (Puck's default number
 * field often fights mid-edit / nested object updates).
 */
export function NumberFieldInput({ value, onChange, field }: NumberFieldRenderProps) {
  const [draft, setDraft] = useState(() =>
    value === undefined || value === null || value === "" ? "" : String(value)
  );

  useEffect(() => {
    const next =
      value === undefined || value === null || Number.isNaN(Number(value))
        ? ""
        : String(value);
    setDraft(next);
  }, [value]);

  return (
    <FieldLabel label={field.label || "Số"}>
      <input
        type="text"
        inputMode="decimal"
        value={draft}
        placeholder="Nhập số…"
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          const trimmed = raw.trim();
          if (trimmed === "" || trimmed === "-" || trimmed === "." || trimmed === "-.") {
            return;
          }
          const n = Number(trimmed);
          if (!Number.isFinite(n)) return;
          if (field.min !== undefined && n < field.min) return;
          if (field.max !== undefined && n > field.max) return;
          onChange(n);
        }}
        onBlur={() => {
          const n = Number(draft.trim());
          if (!Number.isFinite(n)) {
            const fallback = field.min ?? 0;
            setDraft(String(fallback));
            onChange(fallback);
            return;
          }
          let next = n;
          if (field.min !== undefined) next = Math.max(field.min, next);
          if (field.max !== undefined) next = Math.min(field.max, next);
          setDraft(String(next));
          onChange(next);
        }}
        style={{
          width: "100%",
          border: "1px solid #d6d3d1",
          borderRadius: 6,
          padding: "8px 10px",
          fontSize: 13,
          background: "#fff",
        }}
      />
    </FieldLabel>
  );
}

export function numberField(
  label: string,
  opts?: { min?: number; max?: number }
) {
  return {
    type: "custom" as const,
    label,
    min: opts?.min,
    max: opts?.max,
    render: NumberFieldInput,
  };
}
