"use client";

import type { CSSProperties, ReactNode } from "react";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { imageField } from "@/components/builder/ImageField";
import { numberField } from "@/components/builder/NumberField";
import {
  defaultSpacing,
  spacingFields,
  spacingToCss,
  type SpacingBox,
} from "@/lib/builder-styles";

export const yesNo = [
  { label: "Có", value: "yes" },
  { label: "Không", value: "no" },
] as const;

export const alignOpts = [
  { label: "Trái", value: "left" },
  { label: "Giữa", value: "center" },
  { label: "Phải", value: "right" },
] as const;

export type SpacingGroup = {
  padding: SpacingBox;
  margin: SpacingBox;
  background: string;
  maxWidth: number;
};

/** Một object xổ xuống ở cuối — không chiếm đầu sidebar */
export const commonSpacingFields = {
  spacing: {
    type: "object" as const,
    label: "⚙️ Spacing (padding / margin / nền)",
    objectFields: {
      padding: {
        type: "object" as const,
        label: "Padding",
        objectFields: spacingFields,
      },
      margin: {
        type: "object" as const,
        label: "Margin",
        objectFields: spacingFields,
      },
      background: { type: "text" as const, label: "Màu nền" },
      maxWidth: numberField("Max width (px)", { min: 320 }),
    },
  },
};

export function defaultSpacingGroup(
  paddingAll = 40,
  overrides: Partial<SpacingGroup> = {}
): SpacingGroup {
  return {
    background: "transparent",
    maxWidth: 1140,
    ...overrides,
    padding: overrides.padding ?? defaultSpacing(paddingAll, { left: 24, right: 24 }),
    margin: overrides.margin ?? defaultSpacing(0),
  };
}

/** Đọc spacing lồng nhau hoặc flat (data cũ). */
export function resolveSpacing(
  p: Record<string, unknown> | null | undefined,
  fallback?: Partial<SpacingGroup>
): SpacingGroup {
  const nested = (p?.spacing || {}) as Partial<SpacingGroup>;
  const pad =
    nested.padding ||
    (p?.padding as SpacingBox | undefined) ||
    fallback?.padding ||
    defaultSpacing(0);
  const mar =
    nested.margin ||
    (p?.margin as SpacingBox | undefined) ||
    fallback?.margin ||
    defaultSpacing(0);
  const bg =
    nested.background ??
    (p?.background as string | undefined) ??
    fallback?.background ??
    "transparent";
  const mw = Number(
    nested.maxWidth ?? p?.maxWidth ?? fallback?.maxWidth ?? 1140
  );

  return {
    padding: pad,
    margin: mar,
    background: String(bg || "transparent"),
    maxWidth: Number.isFinite(mw) ? mw : 1140,
  };
}

export function sectionShell(
  padding: SpacingBox,
  margin: SpacingBox,
  background: string,
  children: ReactNode,
  extra?: CSSProperties
) {
  return (
    <section
      style={{
        background,
        width: "100%",
        ...spacingToCss(padding, "padding"),
        ...spacingToCss(margin, "margin"),
        ...extra,
      }}
    >
      {children}
    </section>
  );
}

export function sectionFromProps(
  p: Record<string, unknown>,
  children: ReactNode,
  extra?: CSSProperties
) {
  const s = resolveSpacing(p);
  return sectionShell(s.padding, s.margin, s.background, children, extra);
}

export function boxed(maxWidth: number, children: ReactNode) {
  const w = Number(maxWidth);
  return (
    <div
      style={{
        maxWidth: Number.isFinite(w) ? w : 1140,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function boxedFromProps(p: Record<string, unknown>, children: ReactNode) {
  return boxed(resolveSpacing(p).maxWidth, children);
}

export function sectionHead(title: string, subtitle?: string, align = "left") {
  if (!title && !subtitle) return null;
  return (
    <div style={{ textAlign: align as "left" | "center" | "right", marginBottom: 28 }}>
      {title ? (
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 15, lineHeight: 1.5 }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export type DemoProduct = {
  name: string;
  price: string;
  compareAt?: string;
  image: string;
  badge?: string;
  href?: string;
  /** Có khi là sản phẩm thật từ kho SP — bật nút Thêm vào giỏ */
  productId?: string;
  slug?: string;
  priceValue?: number;
  stock?: number;
};

export const demoProducts: DemoProduct[] = [
  {
    name: "Áo thun Premium",
    price: "299.000đ",
    compareAt: "399.000đ",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    badge: "Sale",
    href: "#",
  },
  {
    name: "Giày sneaker",
    price: "1.290.000đ",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    badge: "New",
    href: "#",
  },
  {
    name: "Túi canvas",
    price: "450.000đ",
    image: "https://images.unsplash.com/photo-1548036328-c165bc401e83?w=600&q=80",
    href: "#",
  },
  {
    name: "Đồng hồ minimal",
    price: "890.000đ",
    compareAt: "1.100.000đ",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    badge: "-20%",
    href: "#",
  },
];

export const productFields = {
  name: { type: "text" as const, label: "Tên SP" },
  price: { type: "text" as const, label: "Giá" },
  compareAt: { type: "text" as const, label: "Giá gốc" },
  image: imageField("Ảnh"),
  badge: { type: "text" as const, label: "Badge" },
  href: { type: "text" as const, label: "Link" },
};

export function ProductCard({
  product,
  radius = 12,
}: {
  product: DemoProduct;
  radius?: number;
}) {
  const isStoreProduct = Boolean(product.productId && product.slug);
  const outOfStock = isStoreProduct && (product.stock ?? 1) <= 0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        background: "#fff",
        borderRadius: radius,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        height: "100%",
      }}
    >
      <a
        href={product.href || "#"}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        <div style={{ position: "relative", aspectRatio: "1", background: "#f1f5f9" }}>
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
          {product.badge ? (
            <span
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                background: "#0f172a",
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: 6,
              }}
            >
              {product.badge}
            </span>
          ) : null}
          {outOfStock ? (
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#ef4444",
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: 6,
              }}
            >
              Hết hàng
            </span>
          ) : null}
        </div>
      </a>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <a
          href={product.href || "#"}
          style={{ fontWeight: 600, fontSize: 14, textDecoration: "none", color: "inherit" }}
        >
          {product.name}
        </a>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
          <span style={{ fontWeight: 700, color: "#0f766e" }}>{product.price}</span>
          {product.compareAt ? (
            <span style={{ fontSize: 12, color: "#94a3b8", textDecoration: "line-through" }}>
              {product.compareAt}
            </span>
          ) : null}
        </div>
        {isStoreProduct ? (
          <div style={{ marginTop: "auto" }}>
            <AddToCartButton
              productId={product.productId as string}
              slug={product.slug as string}
              name={product.name}
              image={product.image}
              price={product.priceValue ?? 0}
              disabled={outOfStock}
              style={{ width: "100%", padding: "9px 12px", fontSize: 13 }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProductGridView({
  products,
  columns,
  gap,
  radius,
}: {
  products: DemoProduct[];
  columns: number;
  gap: number;
  radius?: number;
}) {
  return (
    <div
      className="cat-product-grid"
      style={{
        display: "grid",
        gap,
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .cat-product-grid { grid-template-columns: repeat(${columns}, 1fr) !important; }
        }
      `}</style>
      {products.map((p, i) => (
        <ProductCard key={i} product={p} radius={radius} />
      ))}
    </div>
  );
}

export const titleFields = {
  title: { type: "text" as const, label: "Tiêu đề section" },
  subtitle: { type: "textarea" as const, label: "Mô tả ngắn" },
  align: {
    type: "radio" as const,
    label: "Căn tiêu đề",
    options: [...alignOpts],
  },
};

export { defaultSpacing, imageField, spacingToCss };
export type { SpacingBox };
