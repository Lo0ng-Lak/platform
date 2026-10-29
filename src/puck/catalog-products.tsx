"use client";

import { useState } from "react";
import { useSiteSettings } from "@/components/builder/SiteSettingsContext";
import type { SiteProduct } from "@/lib/settings-types";
import {
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  demoProducts,
  imageField,
  productFields,
  ProductCard,
  ProductGridView,
  sectionFromProps,
  sectionHead,
  titleFields,
  type DemoProduct,
} from "./section-shared";

const columnOpts = [
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
] as const;

const collectionFields = {
  name: { type: "text" as const, label: "Tên bộ sưu tập" },
  image: imageField("Ảnh"),
  href: { type: "text" as const, label: "Link" },
  count: { type: "text" as const, label: "Số SP" },
};

const demoCollections = [
  { name: "Thời trang nam", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80", href: "#", count: "48 SP" },
  { name: "Thời trang nữ", image: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=600&q=80", href: "#", count: "72 SP" },
  { name: "Phụ kiện", image: "https://images.unsplash.com/photo-1548036328-c165bc401e83?w=600&q=80", href: "#", count: "35 SP" },
];

function siteProductsToDemo(products: SiteProduct[]): DemoProduct[] {
  return products.map((p) => ({
    name: p.name,
    price: p.price,
    compareAt: p.compareAt,
    image: p.image,
    badge: p.badge,
    href: p.href,
    productId: p.productId,
    slug: p.slug,
    priceValue: p.priceValue,
    stock: p.stock,
  }));
}

function resolveSectionProducts(
  productSource: "manual" | "site" | undefined,
  manualProducts: DemoProduct[],
  siteProducts: SiteProduct[] | undefined
): DemoProduct[] {
  if (productSource === "site" && siteProducts?.length) {
    return siteProductsToDemo(siteProducts);
  }
  return manualProducts;
}

function productSectionFields(extra: Record<string, unknown> = {}) {
  return {
    ...titleFields,
    productSource: {
      type: "radio" as const,
      label: "Nguồn sản phẩm",
      options: [
        { label: "Catalog site", value: "site" },
        { label: "Thủ công", value: "manual" },
      ],
    },
    products: {
      type: "array" as const,
      label: "Sản phẩm",
      getItemSummary: (item: { name?: string }, i?: number) => item.name || `SP ${(i ?? 0) + 1}`,
      defaultItemProps: demoProducts[0],
      arrayFields: productFields,
    },
    columns: { type: "radio" as const, label: "Số cột", options: [...columnOpts] },
    gap: { type: "number" as const, label: "Gap (px)", min: 0 },
    cardRadius: { type: "number" as const, label: "Bo góc card", min: 0 },
    ...extra,
    ...commonSpacingFields,
  };
}

function productSectionDefaults(title: string, subtitle: string, products = demoProducts) {
  return {
    title,
    subtitle,
    align: "center" as const,
    productSource: "site" as const,
    products,
    columns: "4" as const,
    gap: 20,
    cardRadius: 12,
    spacing: defaultSpacingGroup(48, { background: "#ffffff", maxWidth: 1140 }),
  };
}

function renderProductSection(
  props: Record<string, unknown> & {
    title: string;
    subtitle: string;
    align: "left" | "center" | "right";
    productSource?: "manual" | "site";
    products: DemoProduct[];
    columns: "2" | "3" | "4";
    gap: number;
    cardRadius: number;
  }
) {
  const settings = useSiteSettings();
  const { title, subtitle, align, columns, gap, cardRadius } = props;
  const products = resolveSectionProducts(
    props.productSource,
    props.products,
    settings?.products
  );
  return sectionFromProps(
    props,
    boxedFromProps(
      props,
      <>
        {sectionHead(title, subtitle, align)}
        <ProductGridView products={products} columns={Number(columns)} gap={gap} radius={cardRadius} />
      </>
    )
  );
}

export const catalogProductComponents = {
  FeaturedProducts: {
    label: "Featured Products",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults("Sản phẩm nổi bật", "Những sản phẩm được yêu thích nhất"),
    render: renderProductSection,
  },

  NewArrivals: {
    label: "New Arrivals",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults(
      "Hàng mới về",
      "Cập nhật xu hướng mới nhất",
      demoProducts.map((p) => ({ ...p, badge: "New" }))
    ),
    render: renderProductSection,
  },

  BestSellers: {
    label: "Best Sellers",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults("Bán chạy nhất", "Top sản phẩm được khách hàng tin dùng"),
    render: renderProductSection,
  },

  OnSaleProducts: {
    label: "On Sale",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults(
      "Đang giảm giá",
      "Ưu đãi hấp dẫn trong tuần này",
      demoProducts.map((p) => ({ ...p, badge: "Sale" }))
    ),
    render: renderProductSection,
  },

  RecentlyViewed: {
    label: "Recently Viewed",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults("Đã xem gần đây", "Tiếp tục mua sắm từ lịch sử của bạn", demoProducts.slice(0, 3)),
    render: renderProductSection,
  },

  ProductGrid: {
    label: "Product Grid",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults("Tất cả sản phẩm", "Lưới sản phẩm tổng quát"),
    render: renderProductSection,
  },

  CollectionList: {
    label: "Collection List",
    fields: {
      ...titleFields,
      collections: {
        type: "array" as const,
        label: "Bộ sưu tập",
        getItemSummary: (item: { name?: string }) => item.name || "Collection",
        defaultItemProps: demoCollections[0],
        arrayFields: collectionFields,
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Bộ sưu tập",
      subtitle: "Khám phá theo danh mục",
      align: "left" as const,
      collections: demoCollections,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown> & {
      title: string;
      subtitle: string;
      align: "left" | "center" | "right";
      collections: { name: string; image: string; href: string; count: string }[];
    }) => {
      const { title, subtitle, align, collections } = props;
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {collections.map((c, i) => (
                <a
                  key={i}
                  href={c.href || "#"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: 12,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    {c.count ? <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{c.count}</div> : null}
                  </div>
                  <span style={{ color: "#94a3b8" }}>→</span>
                </a>
              ))}
            </div>
          </>
        )
      );
    },
  },

  ProductCarousel: {
    label: "Product Carousel",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults("Carousel sản phẩm", "Cuộn ngang để xem thêm"),
    render: (props: Record<string, unknown> & {
      title: string;
      subtitle: string;
      align: "left" | "center" | "right";
      productSource?: "manual" | "site";
      products: DemoProduct[];
      cardRadius: number;
    }) => {
      const settings = useSiteSettings();
      const { title, subtitle, align, cardRadius } = props;
      const products = resolveSectionProducts(
        props.productSource,
        props.products,
        settings?.products
      );
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory" }}>
              {products.map((p, i) => (
                <div key={i} style={{ minWidth: 220, flex: "0 0 220px", scrollSnapAlign: "start" }}>
                  <ProductCard product={p} radius={cardRadius} />
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  ProductTabs: {
    label: "Product Tabs",
    fields: {
      ...titleFields,
      productSource: {
        type: "radio" as const,
        label: "Nguồn sản phẩm",
        options: [
          { label: "Catalog site", value: "site" },
          { label: "Thủ công", value: "manual" },
        ],
      },
      tabs: {
        type: "array" as const,
        label: "Tab",
        getItemSummary: (item: { label?: string }) => item.label || "Tab",
        defaultItemProps: { label: "Tab mới", products: demoProducts.slice(0, 2) },
        arrayFields: {
          label: { type: "text" as const, label: "Nhãn tab" },
          products: {
            type: "array" as const,
            label: "Sản phẩm",
            getItemSummary: (item: { name?: string }) => item.name || "SP",
            defaultItemProps: demoProducts[0],
            arrayFields: productFields,
          },
        },
      },
      columns: { type: "radio" as const, label: "Số cột", options: [...columnOpts] },
      gap: { type: "number" as const, label: "Gap (px)", min: 0 },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Sản phẩm theo tab",
      subtitle: "",
      align: "center" as const,
      productSource: "site" as const,
      tabs: [
        { label: "Nam", products: demoProducts.slice(0, 2) },
        { label: "Nữ", products: demoProducts.slice(1, 3) },
        { label: "Sale", products: demoProducts },
      ],
      columns: "3" as const,
      gap: 16,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown> & {
      title: string;
      subtitle: string;
      align: "left" | "center" | "right";
      productSource?: "manual" | "site";
      tabs: { label: string; products: DemoProduct[] }[];
      columns: "2" | "3" | "4";
      gap: number;
    }) => {
      const settings = useSiteSettings();
      const { title, subtitle, align, tabs, columns, gap } = props;
      const [active, setActive] = useState(0);
      const tab = tabs[active] || tabs[0];
      const tabProducts = resolveSectionProducts(
        props.productSource,
        tab?.products || [],
        settings?.products
      );
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start", flexWrap: "wrap" }}>
              {tabs.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    background: i === active ? "#0f766e" : "#fff",
                    color: i === active ? "#fff" : "#334155",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {tab ? <ProductGridView products={tabProducts} columns={Number(columns)} gap={gap} /> : null}
          </>
        )
      );
    },
  },

  ProductSlider: {
    label: "Product Slider",
    fields: productSectionFields(),
    defaultProps: productSectionDefaults("Slider sản phẩm", "Xem từng sản phẩm với mũi tên"),
    render: (props: Record<string, unknown> & {
      title: string;
      subtitle: string;
      align: "left" | "center" | "right";
      productSource?: "manual" | "site";
      products: DemoProduct[];
      cardRadius: number;
    }) => {
      const settings = useSiteSettings();
      const { title, subtitle, align, cardRadius } = props;
      const products = resolveSectionProducts(
        props.productSource,
        props.products,
        settings?.products
      );
      const [idx, setIdx] = useState(0);
      const total = products.length;
      const prev = () => setIdx((i) => (i - 1 + total) % total);
      const next = () => setIdx((i) => (i + 1) % total);
      const product = products[idx];
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ position: "relative", maxWidth: 320, margin: "0 auto" }}>
              {product ? <ProductCard product={product} radius={cardRadius} /> : null}
              {total > 1 ? (
                <>
                  <button type="button" onClick={prev} style={{ position: "absolute", left: -48, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>‹</button>
                  <button type="button" onClick={next} style={{ position: "absolute", right: -48, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>›</button>
                </>
              ) : null}
            </div>
          </>
        )
      );
    },
  },
};
