"use client";

import { useState } from "react";

export type AccordionItem = {
  title: string;
  content: string;
};

export function AccordionSection({
  items,
  allowMultiple,
  titleColor,
  contentColor,
  borderColor,
  background,
  activeBackground,
  titleSize,
  contentSize,
  radius,
}: {
  items: AccordionItem[];
  allowMultiple: "yes" | "no";
  titleColor: string;
  contentColor: string;
  borderColor: string;
  background: string;
  activeBackground: string;
  titleSize: number;
  contentSize: number;
  radius: number;
}) {
  const [open, setOpen] = useState<number[]>([0]);
  const list = items?.length ? items : [{ title: "Item", content: "Content" }];

  function toggle(i: number) {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (allowMultiple === "yes") {
        return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
      }
      return isOpen ? [] : [i];
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {list.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div
            key={i}
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: radius,
              overflow: "hidden",
              background: isOpen ? activeBackground : background,
            }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                color: titleColor,
                fontSize: titleSize,
                fontWeight: 600,
              }}
            >
              <span>{item.title}</span>
              <span style={{ fontSize: 18 }}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <div
                style={{
                  padding: "0 16px 16px",
                  color: contentColor,
                  fontSize: contentSize,
                  lineHeight: 1.65,
                }}
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
