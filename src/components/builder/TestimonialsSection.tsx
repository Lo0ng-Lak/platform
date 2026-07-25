"use client";

import { useEffect, useState } from "react";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export function TestimonialsSection({
  items,
  autoplay,
  interval,
  cardBackground,
  quoteColor,
  nameColor,
  roleColor,
  quoteSize,
  align,
}: {
  items: TestimonialItem[];
  autoplay: "yes" | "no";
  interval: number;
  cardBackground: string;
  quoteColor: string;
  nameColor: string;
  roleColor: string;
  quoteSize: number;
  align: "left" | "center";
}) {
  const list = items?.length
    ? items
    : [
        {
          quote: "Amazing builder experience.",
          name: "Alex",
          role: "Founder",
          avatar: "",
        },
      ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (autoplay !== "yes" || list.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, Math.max(2000, interval));
    return () => window.clearInterval(id);
  }, [autoplay, interval, list.length]);

  const item = list[index];

  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          background: cardBackground,
          borderRadius: 16,
          padding: 28,
          border: "1px solid #e7e5e4",
        }}
      >
        <p
          style={{
            margin: 0,
            color: quoteColor,
            fontSize: quoteSize,
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          “{item.quote}”
        </p>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: align === "center" ? "center" : "flex-start",
          }}
        >
          {item.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.avatar}
              alt={item.name}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#d6d3d1",
              }}
            />
          )}
          <div>
            <div style={{ color: nameColor, fontWeight: 700 }}>{item.name}</div>
            <div style={{ color: roleColor, fontSize: 13 }}>{item.role}</div>
          </div>
        </div>
      </div>
      {list.length > 1 ? (
        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 8,
            justifyContent: align === "center" ? "center" : "flex-start",
          }}
        >
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                background: i === index ? "#047857" : "#d6d3d1",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
