"use client";

import { useEffect, useState } from "react";
import {
  alignOpts,
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  imageField,
  sectionFromProps,
  yesNo,
} from "./section-shared";

const ctaBtn = (label: string, href: string, variant: "primary" | "secondary" = "primary") => (
  <a
    href={href || "#"}
    style={{
      display: "inline-block",
      padding: variant === "primary" ? "12px 24px" : "11px 23px",
      background: variant === "primary" ? "#0f766e" : "transparent",
      color: variant === "primary" ? "#fff" : "#0f766e",
      border: variant === "primary" ? "none" : "2px solid #0f766e",
      borderRadius: 8,
      fontWeight: 600,
      fontSize: 14,
      textDecoration: "none",
    }}
  >
    {label}
  </a>
);

const heroBg =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80";

export const catalogHeroComponents = {
  HeroBanner: {
    label: "Hero Banner",
    fields: {
      bgImage: imageField("Ảnh nền"),
      title: { type: "text" as const, label: "Tiêu đề" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      ctaPrimary: { type: "text" as const, label: "CTA chính" },
      ctaPrimaryHref: { type: "text" as const, label: "Link CTA chính" },
      ctaSecondary: { type: "text" as const, label: "CTA phụ" },
      ctaSecondaryHref: { type: "text" as const, label: "Link CTA phụ" },
      overlay: { type: "text" as const, label: "Màu overlay" },
      overlayOpacity: { type: "number" as const, label: "Độ mờ overlay %", min: 0, max: 90 },
      minHeight: { type: "number" as const, label: "Chiều cao tối thiểu (px)", min: 200 },
      align: { type: "radio" as const, label: "Căn nội dung", options: [...alignOpts] },
      ...commonSpacingFields,
    },
    defaultProps: {
      bgImage: heroBg,
      title: "Bộ sưu tập mùa hè 2026",
      subtitle: "Khám phá xu hướng thời trang mới nhất với ưu đãi lên đến 40%.",
      ctaPrimary: "Mua ngay",
      ctaPrimaryHref: "#",
      ctaSecondary: "Xem thêm",
      ctaSecondaryHref: "#",
      overlay: "#000000",
      overlayOpacity: 45,
      minHeight: 520,
      align: "center" as const,
      spacing: defaultSpacingGroup(0, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const {
        bgImage,
        title,
        subtitle,
        ctaPrimary,
        ctaPrimaryHref,
        ctaSecondary,
        ctaSecondaryHref,
        overlay,
        overlayOpacity,
        minHeight,
        align,
      } = props as {
        bgImage: string;
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaPrimaryHref: string;
        ctaSecondary: string;
        ctaSecondaryHref: string;
        overlay: string;
        overlayOpacity: number;
        minHeight: number;
        align: "left" | "center" | "right";
      };
      return sectionFromProps(
        props,
        <div
          style={{
            position: "relative",
            minHeight,
            display: "flex",
            alignItems: "center",
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: overlay,
              opacity: overlayOpacity / 100,
            }}
          />
          <div style={{ position: "relative", width: "100%", padding: "48px 24px" }}>
            {boxedFromProps(
              props,
              <div
                style={{
                  textAlign: align,
                  color: "#fff",
                  maxWidth: align === "center" ? 640 : undefined,
                  margin: align === "center" ? "0 auto" : undefined,
                }}
              >
                {title ? (
                  <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em" }}>
                    {title}
                  </h1>
                ) : null}
                {subtitle ? (
                  <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, opacity: 0.92 }}>
                    {subtitle}
                  </p>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 28,
                    flexWrap: "wrap",
                    justifyContent:
                      align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
                  }}
                >
                  {ctaPrimary ? ctaBtn(ctaPrimary, ctaPrimaryHref, "primary") : null}
                  {ctaSecondary ? ctaBtn(ctaSecondary, ctaSecondaryHref, "secondary") : null}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  Slideshow: {
    label: "Slideshow",
    fields: {
      slides: {
        type: "array" as const,
        label: "Slides",
        getItemSummary: (item: { title?: string }, i?: number) => item.title || `Slide ${(i ?? 0) + 1}`,
        defaultItemProps: {
          image: heroBg,
          title: "Slide tiêu đề",
          subtitle: "Mô tả ngắn cho slide",
          cta: "Khám phá",
          ctaHref: "#",
        },
        arrayFields: {
          image: imageField("Ảnh"),
          title: { type: "text" as const, label: "Tiêu đề" },
          subtitle: { type: "textarea" as const, label: "Mô tả" },
          cta: { type: "text" as const, label: "Nút CTA" },
          ctaHref: { type: "text" as const, label: "Link CTA" },
        },
      },
      autoplay: { type: "radio" as const, label: "Autoplay", options: [...yesNo] },
      interval: { type: "number" as const, label: "Thời gian (ms)", min: 2000 },
      height: { type: "number" as const, label: "Chiều cao (px)", min: 200 },
      ...commonSpacingFields,
    },
    defaultProps: {
      slides: [
        {
          image: heroBg,
          title: "Xu hướng mới",
          subtitle: "Bộ sưu tập độc quyền",
          cta: "Mua ngay",
          ctaHref: "#",
        },
        {
          image: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=1600&q=80",
          title: "Sale cuối mùa",
          subtitle: "Giảm đến 50%",
          cta: "Xem deal",
          ctaHref: "#",
        },
      ],
      autoplay: "yes" as const,
      interval: 5000,
      height: 480,
      spacing: defaultSpacingGroup(0, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { slides, autoplay, interval, height } = props as {
        slides: { image: string; title: string; subtitle: string; cta: string; ctaHref: string }[];
        autoplay: "yes" | "no";
        interval: number;
        height: number;
      };
      const [idx, setIdx] = useState(0);
      useEffect(() => {
        if (autoplay !== "yes" || slides.length < 2) return;
        const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), interval);
        return () => clearInterval(t);
      }, [autoplay, interval, slides.length]);
      const slide = slides[idx] || slides[0];
      return sectionFromProps(
        props,
        <div style={{ position: "relative", height, overflow: "hidden" }}>
          {slides.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === idx ? 1 : 0,
                transition: "opacity 0.6s",
                backgroundImage: s.image ? `url(${s.image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "#fff",
                  padding: 24,
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: 12,
                  maxWidth: 560,
                }}
              >
                {s.title ? <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>{s.title}</h2> : null}
                {s.subtitle ? <p style={{ margin: "10px 0 0", fontSize: 16 }}>{s.subtitle}</p> : null}
                {s.cta ? <div style={{ marginTop: 16 }}>{ctaBtn(s.cta, s.ctaHref)}</div> : null}
              </div>
            </div>
          ))}
          {slides.length > 1 ? (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 8,
              }}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "none",
                    background: i === idx ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          ) : null}
          {!slide ? <div style={{ height, background: "#e2e8f0" }} /> : null}
        </div>
      );
    },
  },

  ImageBanner: {
    label: "Image Banner",
    fields: {
      image: imageField("Ảnh"),
      title: { type: "text" as const, label: "Tiêu đề overlay" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      overlay: { type: "text" as const, label: "Màu overlay" },
      overlayOpacity: { type: "number" as const, label: "Độ mờ %", min: 0, max: 90 },
      height: { type: "number" as const, label: "Chiều cao (px)", min: 120 },
      align: { type: "radio" as const, label: "Căn chữ", options: [...alignOpts] },
      ...commonSpacingFields,
    },
    defaultProps: {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
      title: "New Arrivals",
      subtitle: "Khám phá bộ sưu tập mới",
      overlay: "#000",
      overlayOpacity: 35,
      height: 360,
      align: "center" as const,
      spacing: defaultSpacingGroup(0, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { image, title, subtitle, overlay, overlayOpacity, height, align } = props as {
        image: string;
        title: string;
        subtitle: string;
        overlay: string;
        overlayOpacity: number;
        height: number;
        align: "left" | "center" | "right";
      };
      return sectionFromProps(
        props,
        <div style={{ position: "relative", height, overflow: "hidden", borderRadius: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: overlay,
              opacity: overlayOpacity / 100,
            }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: 32 }}>
            <div style={{ width: "100%", textAlign: align, color: "#fff" }}>
              {title ? <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{title}</h2> : null}
              {subtitle ? <p style={{ margin: "8px 0 0", fontSize: 15 }}>{subtitle}</p> : null}
            </div>
          </div>
        </div>
      );
    },
  },

  VideoBanner: {
    label: "Video Banner",
    fields: {
      videoUrl: { type: "text" as const, label: "URL video / YouTube" },
      title: { type: "text" as const, label: "Tiêu đề" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      cta: { type: "text" as const, label: "CTA" },
      ctaHref: { type: "text" as const, label: "Link CTA" },
      overlay: { type: "text" as const, label: "Màu overlay" },
      overlayOpacity: { type: "number" as const, label: "Độ mờ %", min: 0, max: 90 },
      minHeight: { type: "number" as const, label: "Chiều cao (px)", min: 200 },
      ...commonSpacingFields,
    },
    defaultProps: {
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Trải nghiệm thương hiệu",
      subtitle: "Video giới thiệu sản phẩm và câu chuyện thương hiệu.",
      cta: "Tìm hiểu thêm",
      ctaHref: "#",
      overlay: "#000",
      overlayOpacity: 50,
      minHeight: 480,
      spacing: defaultSpacingGroup(0, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { videoUrl, title, subtitle, cta, ctaHref, overlay, overlayOpacity, minHeight } = props as {
        videoUrl: string;
        title: string;
        subtitle: string;
        cta: string;
        ctaHref: string;
        overlay: string;
        overlayOpacity: number;
        minHeight: number;
      };
      const embed = videoUrl.includes("youtube.com/watch")
        ? videoUrl.replace("watch?v=", "embed/")
        : videoUrl.includes("youtu.be/")
          ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
          : videoUrl;
      return sectionFromProps(
        props,
        <div style={{ position: "relative", minHeight, overflow: "hidden" }}>
          {embed ? (
            <iframe
              src={embed}
              title={title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
              allow="autoplay; encrypted-media"
            />
          ) : null}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: overlay,
              opacity: overlayOpacity / 100,
            }}
          />
          <div
            style={{
              position: "relative",
              minHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 48,
              color: "#fff",
              textAlign: "center",
            }}
          >
            <div>
              {title ? <h2 style={{ margin: 0, fontSize: 36, fontWeight: 700 }}>{title}</h2> : null}
              {subtitle ? (
                <p style={{ margin: "12px 0 0", fontSize: 16, maxWidth: 520 }}>{subtitle}</p>
              ) : null}
              {cta ? <div style={{ marginTop: 20 }}>{ctaBtn(cta, ctaHref)}</div> : null}
            </div>
          </div>
        </div>
      );
    },
  },

  SplitBanner: {
    label: "Split Banner",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      cta: { type: "text" as const, label: "CTA" },
      ctaHref: { type: "text" as const, label: "Link CTA" },
      image: imageField("Ảnh bên phải"),
      ratio: {
        type: "select" as const,
        label: "Tỷ lệ cột",
        options: [
          { label: "50 / 50", value: "1fr 1fr" },
          { label: "40 / 60", value: "2fr 3fr" },
          { label: "60 / 40", value: "3fr 2fr" },
        ],
      },
      reverse: { type: "radio" as const, label: "Đảo vị trí", options: [...yesNo] },
      minHeight: { type: "number" as const, label: "Chiều cao tối thiểu", min: 200 },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Thiết kế tối giản",
      subtitle: "Sản phẩm chất lượng cao cho phong cách sống hiện đại.",
      cta: "Xem bộ sưu tập",
      ctaHref: "#",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      ratio: "1fr 1fr",
      reverse: "no" as const,
      minHeight: 400,
      spacing: defaultSpacingGroup(48, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, cta, ctaHref, image, ratio, reverse, minHeight } = props as {
        title: string;
        subtitle: string;
        cta: string;
        ctaHref: string;
        image: string;
        ratio: string;
        reverse: "yes" | "no";
        minHeight: number;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="cat-split-banner"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 32,
              alignItems: "center",
              minHeight,
            }}
          >
            <style>{`
              @media (min-width: 768px) {
                .cat-split-banner { grid-template-columns: ${reverse === "yes" ? `${ratio.split(" ").reverse().join(" ")}` : ratio}; }
              }
            `}</style>
            <div style={{ order: reverse === "yes" ? 2 : 1 }}>
              {title ? <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>{title}</h2> : null}
              {subtitle ? (
                <p style={{ margin: "12px 0 0", color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>
              ) : null}
              {cta ? <div style={{ marginTop: 20 }}>{ctaBtn(cta, ctaHref)}</div> : null}
            </div>
            <div style={{ order: reverse === "yes" ? 1 : 2, borderRadius: 12, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 280 }}
              />
            </div>
          </div>
        )
      );
    },
  },

  FullWidthBanner: {
    label: "Full Width Banner",
    fields: {
      bgImage: imageField("Ảnh nền (tùy chọn)"),
      title: { type: "text" as const, label: "Tiêu đề" },
      text: { type: "textarea" as const, label: "Nội dung" },
      cta: { type: "text" as const, label: "CTA" },
      ctaHref: { type: "text" as const, label: "Link CTA" },
      textColor: { type: "text" as const, label: "Màu chữ" },
      ...commonSpacingFields,
    },
    defaultProps: {
      bgImage: "",
      title: "Miễn phí vận chuyển toàn quốc",
      text: "Đơn hàng từ 500.000đ — áp dụng mọi khu vực.",
      cta: "Mua sắm ngay",
      ctaHref: "#",
      textColor: "#ffffff",
      spacing: defaultSpacingGroup(48, { background: "#0f766e", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { bgImage, title, text, cta, ctaHref, textColor } = props as {
        bgImage: string;
        title: string;
        text: string;
        cta: string;
        ctaHref: string;
        textColor: string;
      };
      return sectionFromProps(
        props,
        <div
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {boxedFromProps(
            props,
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                color: textColor,
              }}
            >
              <div>
                {title ? <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{title}</h3> : null}
                {text ? <p style={{ margin: "6px 0 0", opacity: 0.9 }}>{text}</p> : null}
              </div>
              {cta ? ctaBtn(cta, ctaHref) : null}
            </div>
          )}
        </div>
      );
    },
  },

  PromotionBanner: {
    label: "Promotion Banner",
    fields: {
      promoText: { type: "text" as const, label: "Text khuyến mãi" },
      code: { type: "text" as const, label: "Mã giảm giá" },
      cta: { type: "text" as const, label: "CTA" },
      ctaHref: { type: "text" as const, label: "Link CTA" },
      accentColor: { type: "text" as const, label: "Màu nhấn" },
      ...commonSpacingFields,
    },
    defaultProps: {
      promoText: "Giảm 20% cho đơn hàng đầu tiên",
      code: "WELCOME20",
      cta: "Sao chép mã",
      ctaHref: "#",
      accentColor: "#d97706",
      spacing: defaultSpacingGroup(20, { background: "#fffbeb", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { promoText, code, cta, ctaHref, accentColor } = props as {
        promoText: string;
        code: string;
        cta: string;
        ctaHref: string;
        accentColor: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              textAlign: "center",
            }}
          >
            {promoText ? <span style={{ fontWeight: 600, fontSize: 15 }}>{promoText}</span> : null}
            {code ? (
              <span
                style={{
                  background: accentColor,
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {code}
              </span>
            ) : null}
            {cta ? (
              <a href={ctaHref || "#"} style={{ color: accentColor, fontWeight: 600, textDecoration: "underline" }}>
                {cta}
              </a>
            ) : null}
          </div>
        )
      );
    },
  },
};
