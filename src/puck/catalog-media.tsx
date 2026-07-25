"use client";

import {
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  imageField,
  sectionFromProps,
  yesNo,
} from "./section-shared";

const demoImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export const catalogMediaComponents = {
  ImageWithText: {
    label: "Image With Text",
    fields: {
      image: imageField("Ảnh"),
      heading: { type: "text" as const, label: "Tiêu đề" },
      body: { type: "textarea" as const, label: "Nội dung" },
      reverse: { type: "radio" as const, label: "Ảnh bên phải", options: [...yesNo] },
      gap: { type: "number" as const, label: "Gap (px)", min: 0 },
      ...commonSpacingFields,
    },
    defaultProps: {
      image: demoImg,
      heading: "Câu chuyện thương hiệu",
      body: "Chúng tôi tạo ra sản phẩm chất lượng cao với thiết kế tối giản, bền vững và thân thiện môi trường.",
      reverse: "no" as const,
      gap: 40,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { image, heading, body, reverse, gap } = props as {
        image: string;
        heading: string;
        body: string;
        reverse: "yes" | "no";
        gap: number;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="cat-image-text" style={{ display: "grid", gridTemplateColumns: "1fr", gap, alignItems: "center" }}>
            <style>{`@media (min-width: 768px) { .cat-image-text { grid-template-columns: 1fr 1fr; } }`}</style>
            <div style={{ order: reverse === "yes" ? 2 : 1, borderRadius: 12, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={heading} style={{ width: "100%", display: "block" }} />
            </div>
            <div style={{ order: reverse === "yes" ? 1 : 2 }}>
              {heading ? <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{heading}</h2> : null}
              {body ? <p style={{ margin: "14px 0 0", color: "#64748b", lineHeight: 1.7 }}>{body}</p> : null}
            </div>
          </div>
        )
      );
    },
  },

  ImageGalleryGrid: {
    label: "Image Gallery Grid",
    fields: {
      images: {
        type: "array" as const,
        label: "Ảnh",
        getItemSummary: (_: unknown, i?: number) => `Ảnh ${(i ?? 0) + 1}`,
        defaultItemProps: { src: demoImg, alt: "Gallery" },
        arrayFields: {
          src: imageField("Ảnh"),
          alt: { type: "text" as const, label: "Alt" },
        },
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
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      ...commonSpacingFields,
    },
    defaultProps: {
      images: [
        { src: demoImg, alt: "1" },
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", alt: "2" },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", alt: "3" },
        { src: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=800&q=80", alt: "4" },
      ],
      columns: "3" as const,
      gap: 12,
      radius: 10,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { images, columns, gap, radius } = props as {
        images: { src: string; alt: string }[];
        columns: "2" | "3" | "4";
        gap: number;
        radius: number;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="cat-gallery-grid" style={{ display: "grid", gap, gridTemplateColumns: "repeat(2, 1fr)" }}>
            <style>{`@media (min-width: 768px) { .cat-gallery-grid { grid-template-columns: repeat(${columns}, 1fr); } }`}</style>
            {images.map((img, i) => (
              <div key={i} style={{ borderRadius: radius, overflow: "hidden", aspectRatio: "1" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  MasonryGallery: {
    label: "Masonry Gallery",
    fields: {
      images: {
        type: "array" as const,
        label: "Ảnh",
        getItemSummary: (_: unknown, i?: number) => `Ảnh ${(i ?? 0) + 1}`,
        defaultItemProps: { src: demoImg, alt: "Masonry" },
        arrayFields: {
          src: imageField("Ảnh"),
          alt: { type: "text" as const, label: "Alt" },
        },
      },
      columns: { type: "number" as const, label: "Số cột", min: 2, max: 4 },
      gap: { type: "number" as const, label: "Gap (px)", min: 0 },
      ...commonSpacingFields,
    },
    defaultProps: {
      images: [
        { src: demoImg, alt: "1" },
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", alt: "2" },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", alt: "3" },
        { src: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=800&q=80", alt: "4" },
        { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", alt: "5" },
      ],
      columns: 3,
      gap: 12,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { images, columns, gap } = props as {
        images: { src: string; alt: string }[];
        columns: number;
        gap: number;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ columnCount: columns, columnGap: gap }}>
            {images.map((img, i) => (
              <div key={i} style={{ breakInside: "avoid", marginBottom: gap }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} style={{ width: "100%", borderRadius: 8, display: "block" }} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  BeforeAfter: {
    label: "Before / After",
    fields: {
      beforeImage: imageField("Ảnh trước"),
      afterImage: imageField("Ảnh sau"),
      beforeLabel: { type: "text" as const, label: "Nhãn trước" },
      afterLabel: { type: "text" as const, label: "Nhãn sau" },
      gap: { type: "number" as const, label: "Gap (px)", min: 0 },
      ...commonSpacingFields,
    },
    defaultProps: {
      beforeImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
      beforeLabel: "Trước",
      afterLabel: "Sau",
      gap: 16,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { beforeImage, afterImage, beforeLabel, afterLabel, gap } = props as {
        beforeImage: string;
        afterImage: string;
        beforeLabel: string;
        afterLabel: string;
        gap: number;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="cat-before-after" style={{ display: "grid", gridTemplateColumns: "1fr", gap }}>
            <style>{`@media (min-width: 768px) { .cat-before-after { grid-template-columns: 1fr 1fr; } }`}</style>
            {[
              { img: beforeImage, label: beforeLabel },
              { img: afterImage, label: afterLabel },
            ].map(({ img, label }, i) => (
              <div key={i}>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: "#64748b" }}>{label}</div>
                <div style={{ borderRadius: 10, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={label} style={{ width: "100%", display: "block" }} />
                </div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  Lookbook: {
    label: "Lookbook",
    fields: {
      image: imageField("Ảnh lookbook"),
      hotspots: {
        type: "array" as const,
        label: "Hotspot",
        getItemSummary: (item: { label?: string }) => item.label || "Pin",
        defaultItemProps: { x: 50, y: 50, label: "Sản phẩm", href: "#" },
        arrayFields: {
          x: { type: "number" as const, label: "X %", min: 0, max: 100 },
          y: { type: "number" as const, label: "Y %", min: 0, max: 100 },
          label: { type: "text" as const, label: "Nhãn" },
          href: { type: "text" as const, label: "Link" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      image: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=1200&q=80",
      hotspots: [
        { x: 35, y: 40, label: "Túi xách", href: "#" },
        { x: 55, y: 65, label: "Giày cao gót", href: "#" },
        { x: 70, y: 30, label: "Váy maxi", href: "#" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { image, hotspots } = props as {
        image: string;
        hotspots: { x: number; y: number; label: string; href: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Lookbook" style={{ width: "100%", display: "block" }} />
            {hotspots.map((h, i) => (
              <a
                key={i}
                href={h.href || "#"}
                title={h.label}
                style={{
                  position: "absolute",
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "3px solid #0f766e",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        )
      );
    },
  },

  Hotspots: {
    label: "Hotspots",
    fields: {
      image: imageField("Ảnh sản phẩm"),
      pins: {
        type: "array" as const,
        label: "Pin sản phẩm",
        getItemSummary: (item: { label?: string }) => item.label || "Pin",
        defaultItemProps: { x: 50, y: 50, label: "SP", href: "#", price: "299.000đ" },
        arrayFields: {
          x: { type: "number" as const, label: "X %", min: 0, max: 100 },
          y: { type: "number" as const, label: "Y %", min: 0, max: 100 },
          label: { type: "text" as const, label: "Tên SP" },
          price: { type: "text" as const, label: "Giá" },
          href: { type: "text" as const, label: "Link" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      pins: [
        { x: 30, y: 45, label: "Áo khoác", price: "890.000đ", href: "#" },
        { x: 60, y: 55, label: "Quần jean", price: "650.000đ", href: "#" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { image, pins } = props as {
        image: string;
        pins: { x: number; y: number; label: string; price: string; href: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Hotspots" style={{ width: "100%", display: "block" }} />
            {pins.map((p, i) => (
              <div
                key={i}
                style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#0f766e",
                    border: "2px solid #fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    cursor: "pointer",
                  }}
                />
                <a
                  href={p.href || "#"}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    transform: "translateX(-50%)",
                    marginTop: 6,
                    background: "#fff",
                    padding: "6px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <strong>{p.label}</strong>
                  {p.price ? <span style={{ color: "#0f766e", marginLeft: 6 }}>{p.price}</span> : null}
                </a>
              </div>
            ))}
          </div>
        )
      );
    },
  },
};
