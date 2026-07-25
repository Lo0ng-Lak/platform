"use client";

import { useState, type ReactNode } from "react";
import {
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  imageField,
  sectionFromProps,
  sectionHead,
  titleFields,
} from "./section-shared";

const categoryFields = {
  name: { type: "text" as const, label: "Tên danh mục" },
  image: imageField("Ảnh"),
  href: { type: "text" as const, label: "Link" },
  count: { type: "text" as const, label: "Số SP" },
};

const demoCategories = [
  { name: "Áo thun", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", href: "#", count: "24 SP" },
  { name: "Quần jean", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", href: "#", count: "18 SP" },
  { name: "Giày dép", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", href: "#", count: "32 SP" },
  { name: "Phụ kiện", image: "https://images.unsplash.com/photo-1548036328-c165bc401e83?w=600&q=80", href: "#", count: "15 SP" },
];

function categoryCard(c: { name: string; image: string; href: string; count: string }, radius = 12) {
  return (
    <a
      href={c.href || "#"}
      style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: radius, overflow: "hidden", border: "1px solid #e2e8f0" }}
    >
      <div style={{ aspectRatio: "4/3", background: "#f1f5f9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</div>
        {c.count ? <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{c.count}</div> : null}
      </div>
    </a>
  );
}

function categorySectionFields(extra: Record<string, unknown> = {}) {
  return {
    ...titleFields,
    categories: {
      type: "array" as const,
      label: "Danh mục",
      getItemSummary: (item: { name?: string }) => item.name || "Danh mục",
      defaultItemProps: demoCategories[0],
      arrayFields: categoryFields,
    },
    columns: {
      type: "radio" as const,
      label: "Số cột",
      options: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
    },
    gap: { type: "number" as const, label: "Gap (px)", min: 0 },
    ...extra,
    ...commonSpacingFields,
  };
}

function categoryDefaults(title: string, subtitle: string) {
  return {
    title,
    subtitle,
    align: "center" as const,
    categories: demoCategories,
    columns: "4" as const,
    gap: 20,
    spacing: defaultSpacingGroup(48, { background: "#ffffff", maxWidth: 1140 }),
  };
}

type CategoryProps = Record<string, unknown> & {
  title: string;
  subtitle: string;
  align: "left" | "center" | "right";
  categories: { name: string; image: string; href: string; count: string }[];
  columns: "2" | "3" | "4";
  gap: number;
};

function renderCategorySection(props: CategoryProps, body: ReactNode) {
  const { title, subtitle, align } = props;
  return sectionFromProps(
    props,
    boxedFromProps(
      props,
      <>
        {sectionHead(title, subtitle, align)}
        {body}
      </>
    )
  );
}

export const catalogCategoryComponents = {
  CollectionGrid: {
    label: "Collection Grid",
    fields: categorySectionFields(),
    defaultProps: categoryDefaults("Bộ sưu tập", "Lưới danh mục sản phẩm"),
    render: (props: CategoryProps & Record<string, unknown>) =>
      renderCategorySection(
        props,
        <div
          className="cat-collection-grid"
          style={{ display: "grid", gap: props.gap, gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <style>{`@media (min-width: 768px) { .cat-collection-grid { grid-template-columns: repeat(${props.columns}, 1fr) !important; } }`}</style>
          {props.categories.map((c, i) => (
            <div key={i}>{categoryCard(c)}</div>
          ))}
        </div>
      ),
  },

  CategoryList: {
    label: "Category List",
    fields: categorySectionFields(),
    defaultProps: categoryDefaults("Danh sách danh mục", "Xem theo loại sản phẩm"),
    render: (props: CategoryProps & Record<string, unknown>) =>
      renderCategorySection(
        props,
        <div style={{ display: "grid", gap: 8 }}>
          {props.categories.map((c, i) => (
            <a
              key={i}
              href={c.href || "#"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              {c.count ? <span style={{ color: "#64748b", fontSize: 13 }}>{c.count}</span> : null}
            </a>
          ))}
        </div>
      ),
  },

  CategorySlider: {
    label: "Category Slider",
    fields: categorySectionFields(),
    defaultProps: categoryDefaults("Slider danh mục", "Cuộn ngang qua các danh mục"),
    render: (props: CategoryProps & Record<string, unknown>) => {
      const [idx, setIdx] = useState(0);
      const total = props.categories.length;
      const prev = () => setIdx((i) => (i - 1 + total) % total);
      const next = () => setIdx((i) => (i + 1) % total);
      const visible = props.categories.slice(idx, idx + 3).concat(props.categories.slice(0, Math.max(0, idx + 3 - total)));
      return renderCategorySection(
        props,
        <div style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: props.gap }}>
            {visible.slice(0, 3).map((c, i) => (
              <div key={i}>{categoryCard(c)}</div>
            ))}
          </div>
          {total > 3 ? (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              <button type="button" onClick={prev} style={{ padding: "6px 14px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>‹</button>
              <button type="button" onClick={next} style={{ padding: "6px 14px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>›</button>
            </div>
          ) : null}
        </div>
      );
    },
  },

  ShopByCategory: {
    label: "Shop By Category",
    fields: categorySectionFields(),
    defaultProps: categoryDefaults("Mua theo danh mục", "Chọn danh mục phù hợp với bạn"),
    render: (props: CategoryProps & Record<string, unknown>) =>
      renderCategorySection(
        props,
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: props.align === "center" ? "center" : "flex-start" }}>
          {props.categories.map((c, i) => (
            <a
              key={i}
              href={c.href || "#"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: 999,
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</span>
            </a>
          ))}
        </div>
      ),
  },

  FeaturedCollections: {
    label: "Featured Collections",
    fields: categorySectionFields(),
    defaultProps: {
      ...categoryDefaults("Bộ sưu tập nổi bật", "Những collection được chọn lọc"),
      columns: "3" as const,
    },
    render: (props: CategoryProps & Record<string, unknown>) =>
      renderCategorySection(
        props,
        <div
          className="cat-featured-collections"
          style={{ display: "grid", gap: props.gap, gridTemplateColumns: "1fr" }}
        >
          <style>{`
                @media (min-width: 640px) { .cat-featured-collections { grid-template-columns: repeat(2, 1fr); } }
                @media (min-width: 992px) { .cat-featured-collections { grid-template-columns: repeat(${props.columns}, 1fr); } }
              `}</style>
          {props.categories.map((c, i) => (
            <a
              key={i}
              href={c.href || "#"}
              style={{ position: "relative", display: "block", borderRadius: 14, overflow: "hidden", textDecoration: "none", color: "#fff", minHeight: 200 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.65))" }} />
              <div style={{ position: "relative", padding: 20, marginTop: 120 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
                {c.count ? <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{c.count}</div> : null}
              </div>
            </a>
          ))}
        </div>
      ),
  },
};
