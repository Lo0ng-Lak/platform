"use client";

import { useEffect, useState } from "react";
import {
  alignOpts,
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  imageField,
  resolveSpacing,
  sectionFromProps,
  sectionHead,
  titleFields,
  yesNo,
} from "./section-shared";

const ctaBtn = (label: string, href: string, bg = "#0f766e") => (
  <a
    href={href || "#"}
    style={{
      display: "inline-block",
      padding: "12px 24px",
      background: bg,
      color: "#fff",
      borderRadius: 8,
      fontWeight: 600,
      fontSize: 14,
      textDecoration: "none",
    }}
  >
    {label}
  </a>
);

const demoArticles = [
  {
    title: "Xu hướng thời trang 2026",
    image: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=600&q=80",
    date: "15/07/2026",
    excerpt: "Khám phá những xu hướng mới nhất trong ngành thời trang.",
    href: "#",
  },
  {
    title: "Cách phối đồ tối giản",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    date: "10/07/2026",
    excerpt: "Bí quyết mix & match cho phong cách tối giản hiện đại.",
    href: "#",
  },
  {
    title: "Chăm sóc sản phẩm da",
    image: "https://images.unsplash.com/photo-1548036328-c165bc401e83?w=600&q=80",
    date: "05/07/2026",
    excerpt: "Hướng dẫn bảo quản đồ da bền đẹp theo thời gian.",
    href: "#",
  },
];

const articleFields = {
  title: { type: "text" as const, label: "Tiêu đề" },
  image: imageField("Ảnh"),
  date: { type: "text" as const, label: "Ngày" },
  excerpt: { type: "textarea" as const, label: "Tóm tắt" },
  href: { type: "text" as const, label: "Link" },
};

type DemoArticle = (typeof demoArticles)[0];

function articleCard(a: DemoArticle) {
  return (
    <a
      href={a.href || "#"}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ aspectRatio: "16/10", background: "#f1f5f9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: 16 }}>
        {a.date ? <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>{a.date}</div> : null}
        <div style={{ fontWeight: 600, fontSize: 15 }}>{a.title}</div>
        {a.excerpt ? (
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{a.excerpt}</p>
        ) : null}
      </div>
    </a>
  );
}

function stars(rating: number) {
  return "★★★★★".split("").map((s, i) => (
    <span key={i} style={{ color: i < rating ? "#f59e0b" : "#e2e8f0" }}>
      {s}
    </span>
  ));
}

export const catalogContentComponents = {
  RichText: {
    label: "Rich Text",
    fields: {
      content: { type: "textarea" as const, label: "Nội dung (HTML/text)" },
      useHtml: { type: "radio" as const, label: "Render HTML", options: [...yesNo] },
      ...commonSpacingFields,
    },
    defaultProps: {
      content: "<p>Đoạn văn <strong>in đậm</strong> và <em>in nghiêng</em>.</p>",
      useHtml: "yes" as const,
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 800 }),
    },
    render: (props: Record<string, unknown>) => {
      const { content, useHtml } = props as { content: string; useHtml: "yes" | "no" };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          useHtml === "yes" ? (
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ lineHeight: 1.7, color: "#334155" }} />
          ) : (
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#334155" }}>{content}</div>
          )
        )
      );
    },
  },

  TextBlockSection: {
    label: "Text Block",
    fields: {
      heading: { type: "text" as const, label: "Tiêu đề" },
      body: { type: "textarea" as const, label: "Nội dung" },
      align: { type: "radio" as const, label: "Căn", options: [...alignOpts] },
      ...commonSpacingFields,
    },
    defaultProps: {
      heading: "Về chúng tôi",
      body: "Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời với sản phẩm chất lượng và dịch vụ tận tâm.",
      align: "center" as const,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 800 }),
    },
    render: (props: Record<string, unknown>) => {
      const { heading, body, align } = props as {
        heading: string;
        body: string;
        align: "left" | "center" | "right";
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ textAlign: align }}>
            {heading ? <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{heading}</h2> : null}
            {body ? <p style={{ margin: "14px 0 0", color: "#64748b", lineHeight: 1.7 }}>{body}</p> : null}
          </div>
        )
      );
    },
  },

  FeatureList: {
    label: "Feature List",
    fields: {
      ...titleFields,
      items: {
        type: "array" as const,
        label: "Tính năng",
        getItemSummary: (item: { title?: string }) => item.title || "Feature",
        defaultItemProps: { icon: "🚚", title: "Giao hàng nhanh", text: "Miễn phí vận chuyển toàn quốc" },
        arrayFields: {
          icon: { type: "text" as const, label: "Icon / emoji" },
          title: { type: "text" as const, label: "Tiêu đề" },
          text: { type: "textarea" as const, label: "Mô tả" },
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
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Tại sao chọn chúng tôi",
      subtitle: "",
      align: "center" as const,
      items: [
        { icon: "🚚", title: "Giao hàng nhanh", text: "Miễn phí vận chuyển toàn quốc" },
        { icon: "↩️", title: "Đổi trả 30 ngày", text: "Hoàn tiền 100% nếu không hài lòng" },
        { icon: "🔒", title: "Thanh toán an toàn", text: "Bảo mật thông tin tuyệt đối" },
        { icon: "💬", title: "Hỗ trợ 24/7", text: "Đội ngũ tư vấn nhiệt tình" },
      ],
      columns: "4" as const,
      spacing: defaultSpacingGroup(48, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, items, columns } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        items: { icon: string; title: string; text: string }[];
        columns: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div className="cat-features" style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr" }}>
              <style>{`@media (min-width: 640px) { .cat-features { grid-template-columns: repeat(2, 1fr); } } @media (min-width: 992px) { .cat-features { grid-template-columns: repeat(${columns}, 1fr); } }`}</style>
              {items.map((f, i) => (
                <div key={i} style={{ textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                  <p style={{ margin: 0, color: "#64748b", fontSize: 14, lineHeight: 1.5 }}>{f.text}</p>
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  ContentTimeline: {
    label: "Timeline",
    fields: {
      ...titleFields,
      items: {
        type: "array" as const,
        label: "Mốc thời gian",
        getItemSummary: (item: { year?: string }) => item.year || "Mốc",
        defaultItemProps: { year: "2024", title: "Thành lập", text: "Bắt đầu hành trình kinh doanh" },
        arrayFields: {
          year: { type: "text" as const, label: "Năm" },
          title: { type: "text" as const, label: "Tiêu đề" },
          text: { type: "textarea" as const, label: "Mô tả" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Lịch sử phát triển",
      subtitle: "",
      align: "left" as const,
      items: [
        { year: "2020", title: "Thành lập", text: "Ra mắt cửa hàng online đầu tiên" },
        { year: "2022", title: "Mở rộng", text: "100+ sản phẩm và 10.000 khách hàng" },
        { year: "2026", title: "Hiện tại", text: "Thương hiệu uy tín toàn quốc" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, items } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        items: { year: string; title: string; text: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: 24 }}>
              {items.map((item, i) => (
                <div key={i} style={{ marginBottom: 28, position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: -31,
                      top: 4,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#0f766e",
                    }}
                  />
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f766e" }}>{item.year}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{item.title}</div>
                  <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 14 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  BackgroundVideo: {
    label: "Background Video",
    fields: {
      videoUrl: { type: "text" as const, label: "URL video embed" },
      title: { type: "text" as const, label: "Tiêu đề" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      cta: { type: "text" as const, label: "CTA" },
      ctaHref: { type: "text" as const, label: "Link CTA" },
      overlay: { type: "text" as const, label: "Màu overlay" },
      minHeight: { type: "number" as const, label: "Chiều cao (px)", min: 200 },
      ...commonSpacingFields,
    },
    defaultProps: {
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Khám phá bộ sưu tập",
      subtitle: "Video nền toàn màn hình với overlay nội dung",
      cta: "Xem thêm",
      ctaHref: "#",
      overlay: "#000",
      minHeight: 420,
      spacing: defaultSpacingGroup(0, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { videoUrl, title, subtitle, cta, ctaHref, overlay, minHeight } = props as {
        videoUrl: string;
        title: string;
        subtitle: string;
        cta: string;
        ctaHref: string;
        overlay: string;
        minHeight: number;
      };
      return sectionFromProps(
        props,
        <div style={{ position: "relative", minHeight }}>
          <iframe
            src={videoUrl}
            title={title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
          />
          <div style={{ position: "absolute", inset: 0, background: overlay, opacity: 0.5 }} />
          <div
            style={{
              position: "relative",
              minHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
              padding: 32,
            }}
          >
            <div>
              {title ? <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>{title}</h2> : null}
              {subtitle ? <p style={{ margin: "12px 0 0", maxWidth: 480 }}>{subtitle}</p> : null}
              {cta ? <div style={{ marginTop: 20 }}>{ctaBtn(cta, ctaHref)}</div> : null}
            </div>
          </div>
        </div>
      );
    },
  },

  VideoPopup: {
    label: "Video Popup",
    fields: {
      thumbnail: imageField("Ảnh thumbnail"),
      videoUrl: { type: "text" as const, label: "URL video embed" },
      title: { type: "text" as const, label: "Tiêu đề" },
      ...commonSpacingFields,
    },
    defaultProps: {
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Xem video giới thiệu",
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { thumbnail, videoUrl, title } = props as {
        thumbnail: string;
        videoUrl: string;
        title: string;
      };
      const [open, setOpen] = useState(false);
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            <div
              style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnail} alt={title} style={{ width: "100%", display: "block" }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.35)",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  ▶
                </div>
              </div>
            </div>
            {title ? <p style={{ textAlign: "center", marginTop: 12, fontWeight: 600 }}>{title}</p> : null}
            {open ? (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                }}
                onClick={() => setOpen(false)}
              >
                <div style={{ width: "90%", maxWidth: 800, aspectRatio: "16/9" }} onClick={(e) => e.stopPropagation()}>
                  <iframe src={videoUrl} title={title} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay" />
                </div>
              </div>
            ) : null}
          </>
        )
      );
    },
  },

  CallToAction: {
    label: "Call To Action",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      text: { type: "textarea" as const, label: "Nội dung" },
      primaryCta: { type: "text" as const, label: "CTA chính" },
      primaryHref: { type: "text" as const, label: "Link CTA chính" },
      secondaryCta: { type: "text" as const, label: "CTA phụ" },
      secondaryHref: { type: "text" as const, label: "Link CTA phụ" },
      align: { type: "radio" as const, label: "Căn", options: [...alignOpts] },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Sẵn sàng bắt đầu?",
      text: "Đăng ký ngay để nhận ưu đãi đặc biệt cho thành viên mới.",
      primaryCta: "Đăng ký",
      primaryHref: "#",
      secondaryCta: "Tìm hiểu thêm",
      secondaryHref: "#",
      align: "center" as const,
      spacing: defaultSpacingGroup(56, { background: "#0f766e", maxWidth: 800 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, text, primaryCta, primaryHref, secondaryCta, secondaryHref, align } = props as {
        title: string;
        text: string;
        primaryCta: string;
        primaryHref: string;
        secondaryCta: string;
        secondaryHref: string;
        align: "left" | "center" | "right";
      };
      const { background } = resolveSpacing(props);
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            style={{
              textAlign: align,
              color: background === "#0f766e" || background.startsWith("#0f") ? "#fff" : "inherit",
            }}
          >
            {title ? <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{title}</h2> : null}
            {text ? <p style={{ margin: "12px 0 0", opacity: 0.9 }}>{text}</p> : null}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                flexWrap: "wrap",
                justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
              }}
            >
              {primaryCta ? ctaBtn(primaryCta, primaryHref, "#fff") : null}
              {secondaryCta ? (
                <a
                  href={secondaryHref || "#"}
                  style={{
                    padding: "12px 24px",
                    border: "2px solid currentColor",
                    borderRadius: 8,
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {secondaryCta}
                </a>
              ) : null}
            </div>
          </div>
        )
      );
    },
  },

  Newsletter: {
    label: "Newsletter",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      buttonLabel: { type: "text" as const, label: "Nút gửi" },
      placeholder: { type: "text" as const, label: "Placeholder email" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Đăng ký nhận tin",
      subtitle: "Nhận thông tin khuyến mãi và sản phẩm mới qua email.",
      buttonLabel: "Đăng ký",
      placeholder: "Email của bạn",
      spacing: defaultSpacingGroup(48, { background: "#f0fdfa", maxWidth: 560 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, buttonLabel, placeholder } = props as {
        title: string;
        subtitle: string;
        buttonLabel: string;
        placeholder: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ textAlign: "center" }}>
            {title ? <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{title}</h2> : null}
            {subtitle ? <p style={{ margin: "8px 0 20px", color: "#64748b" }}>{subtitle}</p> : null}
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder={placeholder}
                style={{ flex: 1, minWidth: 200, padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 24px",
                  background: "#0f766e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {buttonLabel}
              </button>
            </form>
          </div>
        )
      );
    },
  },

  EmailSignup: {
    label: "Email Signup",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      buttonLabel: { type: "text" as const, label: "Nút" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Nhận ưu đãi qua email",
      buttonLabel: "Gửi",
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, buttonLabel } = props as { title: string; buttonLabel: string };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {title ? <label style={{ fontWeight: 600 }}>{title}</label> : null}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="email@example.com"
                style={{ flex: 1, padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 8 }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  background: "#0f766e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {buttonLabel}
              </button>
            </div>
          </form>
        )
      );
    },
  },

  PromotionBox: {
    label: "Promotion Box",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      text: { type: "textarea" as const, label: "Nội dung" },
      code: { type: "text" as const, label: "Mã KM" },
      borderColor: { type: "text" as const, label: "Màu viền" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Ưu đãi đặc biệt",
      text: "Giảm 15% cho đơn hàng tiếp theo",
      code: "SAVE15",
      borderColor: "#0f766e",
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, text, code, borderColor } = props as {
        title: string;
        text: string;
        code: string;
        borderColor: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ border: `2px dashed ${borderColor}`, borderRadius: 12, padding: 24, textAlign: "center" }}>
            {title ? <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h3> : null}
            {text ? <p style={{ margin: "8px 0 16px", color: "#64748b" }}>{text}</p> : null}
            {code ? (
              <span
                style={{
                  background: borderColor,
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 6,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {code}
              </span>
            ) : null}
          </div>
        )
      );
    },
  },

  CountdownTimer: {
    label: "Countdown Timer",
    fields: {
      ...titleFields,
      targetDate: { type: "text" as const, label: "Ngày kết thúc (ISO)" },
      dayLabel: { type: "text" as const, label: "Nhãn ngày" },
      hourLabel: { type: "text" as const, label: "Nhãn giờ" },
      minLabel: { type: "text" as const, label: "Nhãn phút" },
      secLabel: { type: "text" as const, label: "Nhãn giây" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Flash Sale kết thúc sau",
      subtitle: "",
      align: "center" as const,
      targetDate: "2026-12-31T23:59:59",
      dayLabel: "Ngày",
      hourLabel: "Giờ",
      minLabel: "Phút",
      secLabel: "Giây",
      spacing: defaultSpacingGroup(48, { background: "#0f172a", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, targetDate, dayLabel, hourLabel, minLabel, secLabel } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        targetDate: string;
        dayLabel: string;
        hourLabel: string;
        minLabel: string;
        secLabel: string;
      };
      const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
      useEffect(() => {
        const tick = () => {
          const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
          setLeft({
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff / 3600000) % 24),
            m: Math.floor((diff / 60000) % 60),
            s: Math.floor((diff / 1000) % 60),
          });
        };
        tick();
        const t = setInterval(tick, 1000);
        return () => clearInterval(t);
      }, [targetDate]);
      const unit = (val: number, label: string) => (
        <div style={{ textAlign: "center", minWidth: 72 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>{String(val).padStart(2, "0")}</div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{label}</div>
        </div>
      );
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
                flexWrap: "wrap",
              }}
            >
              {unit(left.d, dayLabel)}
              {unit(left.h, hourLabel)}
              {unit(left.m, minLabel)}
              {unit(left.s, secLabel)}
            </div>
          </>
        )
      );
    },
  },

  ReviewsSection: {
    label: "Reviews",
    fields: {
      ...titleFields,
      reviews: {
        type: "array" as const,
        label: "Đánh giá",
        getItemSummary: (item: { author?: string }) => item.author || "Review",
        defaultItemProps: { author: "Khách hàng", rating: 5, text: "Sản phẩm rất tốt, giao hàng nhanh!", date: "01/07/2026" },
        arrayFields: {
          author: { type: "text" as const, label: "Tên" },
          rating: { type: "number" as const, label: "Sao (1-5)", min: 1, max: 5 },
          text: { type: "textarea" as const, label: "Nội dung" },
          date: { type: "text" as const, label: "Ngày" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Đánh giá khách hàng",
      subtitle: "",
      align: "center" as const,
      reviews: [
        { author: "Minh Anh", rating: 5, text: "Chất lượng tuyệt vời, sẽ mua lại!", date: "20/06/2026" },
        { author: "Hoàng Nam", rating: 4, text: "Giao hàng nhanh, đóng gói cẩn thận.", date: "15/06/2026" },
        { author: "Thu Hà", rating: 5, text: "Rất hài lòng với dịch vụ.", date: "10/06/2026" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, reviews } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        reviews: { author: string; rating: number; text: string; date: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div className="cat-reviews" style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
              <style>{`@media (min-width: 768px) { .cat-reviews { grid-template-columns: repeat(3, 1fr); } }`}</style>
              {reviews.map((r, i) => (
                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 18 }}>{stars(r.rating)}</div>
                  <p style={{ margin: "10px 0", fontSize: 14, lineHeight: 1.6, color: "#475569" }}>{r.text}</p>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.author}</div>
                  {r.date ? <div style={{ fontSize: 12, color: "#94a3b8" }}>{r.date}</div> : null}
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  RatingStars: {
    label: "Rating Stars",
    fields: {
      rating: { type: "number" as const, label: "Điểm (1-5)", min: 1, max: 5 },
      reviewCount: { type: "text" as const, label: "Số đánh giá" },
      label: { type: "text" as const, label: "Nhãn" },
      ...commonSpacingFields,
    },
    defaultProps: {
      rating: 4.8,
      reviewCount: "128 đánh giá",
      label: "Đánh giá trung bình",
      spacing: defaultSpacingGroup(24, { background: "#fff", maxWidth: 400 }),
    },
    render: (props: Record<string, unknown>) => {
      const { rating, reviewCount, label } = props as {
        rating: number;
        reviewCount: string;
        label: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ textAlign: "center" }}>
            {label ? <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>{label}</div> : null}
            <div style={{ fontSize: 28, fontWeight: 800 }}>{rating.toFixed(1)}</div>
            <div style={{ fontSize: 22, margin: "6px 0" }}>{stars(Math.round(rating))}</div>
            {reviewCount ? <div style={{ fontSize: 13, color: "#94a3b8" }}>{reviewCount}</div> : null}
          </div>
        )
      );
    },
  },

  LogoList: {
    label: "Logo List",
    fields: {
      logos: {
        type: "array" as const,
        label: "Logo",
        getItemSummary: (_: unknown, i?: number) => `Logo ${(i ?? 0) + 1}`,
        defaultItemProps: { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "Brand" },
        arrayFields: { src: imageField("Logo"), alt: { type: "text" as const, label: "Alt" } },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      logos: [
        { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "Brand 1" },
        { src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80", alt: "Brand 2" },
        { src: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=200&q=80", alt: "Brand 3" },
      ],
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { logos } = props as { logos: { src: string; alt: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "center" }}>
            {logos.map((l, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={l.src} alt={l.alt} style={{ height: 40, objectFit: "contain", opacity: 0.7 }} />
            ))}
          </div>
        )
      );
    },
  },

  TrustBadges: {
    label: "Trust Badges",
    fields: {
      badges: {
        type: "array" as const,
        label: "Badge",
        getItemSummary: (item: { label?: string }) => item.label || "Badge",
        defaultItemProps: { icon: "✓", label: "Chính hãng 100%" },
        arrayFields: { icon: { type: "text" as const, label: "Icon" }, label: { type: "text" as const, label: "Nhãn" } },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      badges: [
        { icon: "✓", label: "Chính hãng 100%" },
        { icon: "🔒", label: "Thanh toán bảo mật" },
        { icon: "↩️", label: "Đổi trả dễ dàng" },
      ],
      spacing: defaultSpacingGroup(24, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { badges } = props as { badges: { icon: string; label: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {badges.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  background: "#fff",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <span>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        )
      );
    },
  },

  BrandCarousel: {
    label: "Brand Carousel",
    fields: {
      brands: {
        type: "array" as const,
        label: "Thương hiệu",
        getItemSummary: (item: { name?: string }) => item.name || "Brand",
        defaultItemProps: { name: "Brand", logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80" },
        arrayFields: { name: { type: "text" as const, label: "Tên" }, logo: imageField("Logo") },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      brands: [
        { name: "Brand A", logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80" },
        { name: "Brand B", logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80" },
        { name: "Brand C", logo: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=200&q=80" },
        { name: "Brand D", logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80" },
      ],
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { brands } = props as { brands: { name: string; logo: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", gap: 40, overflowX: "auto", paddingBottom: 8, alignItems: "center" }}>
            {brands.map((b, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={b.logo} alt={b.name} title={b.name} style={{ height: 48, objectFit: "contain", flex: "0 0 auto", opacity: 0.65 }} />
            ))}
          </div>
        )
      );
    },
  },

  BrandGrid: {
    label: "Brand Grid",
    fields: {
      brands: {
        type: "array" as const,
        label: "Thương hiệu",
        getItemSummary: (item: { name?: string }) => item.name || "Brand",
        defaultItemProps: { name: "Brand", logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80" },
        arrayFields: { name: { type: "text" as const, label: "Tên" }, logo: imageField("Logo") },
      },
      columns: {
        type: "radio" as const,
        label: "Số cột",
        options: [
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "6", value: "6" },
        ],
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      brands: [
        { name: "Brand A", logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80" },
        { name: "Brand B", logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80" },
        { name: "Brand C", logo: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=200&q=80" },
        { name: "Brand D", logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80" },
        { name: "Brand E", logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80" },
        { name: "Brand F", logo: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=200&q=80" },
      ],
      columns: "6" as const,
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { brands, columns } = props as { brands: { name: string; logo: string }[]; columns: string };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="cat-brand-grid" style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center" }}>
            <style>{`@media (min-width: 768px) { .cat-brand-grid { grid-template-columns: repeat(${columns}, 1fr); } }`}</style>
            {brands.map((b, i) => (
              <div key={i} style={{ textAlign: "center", padding: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo} alt={b.name} style={{ height: 40, objectFit: "contain", opacity: 0.7 }} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  LogoSlider: {
    label: "Logo Slider",
    fields: {
      logos: {
        type: "array" as const,
        label: "Logo",
        getItemSummary: (_: unknown, i?: number) => `Logo ${(i ?? 0) + 1}`,
        defaultItemProps: { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "Logo" },
        arrayFields: { src: imageField("Logo"), alt: { type: "text" as const, label: "Alt" } },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      logos: [
        { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "1" },
        { src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80", alt: "2" },
        { src: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=200&q=80", alt: "3" },
      ],
      spacing: defaultSpacingGroup(32, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { logos } = props as { logos: { src: string; alt: string }[] };
      const [idx, setIdx] = useState(0);
      const total = logos.length;
      const prev = () => setIdx((i) => (i - 1 + total) % total);
      const next = () => setIdx((i) => (i + 1) % total);
      const logo = logos[idx];
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            {total > 1 ? (
              <button type="button" onClick={prev} style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}>
                ‹
              </button>
            ) : null}
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.src} alt={logo.alt} style={{ height: 56, objectFit: "contain" }} />
            ) : null}
            {total > 1 ? (
              <button type="button" onClick={next} style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}>
                ›
              </button>
            ) : null}
          </div>
        )
      );
    },
  },

  PartnerLogos: {
    label: "Partner Logos",
    fields: {
      ...titleFields,
      logos: {
        type: "array" as const,
        label: "Logo đối tác",
        getItemSummary: (_: unknown, i?: number) => `Partner ${(i ?? 0) + 1}`,
        defaultItemProps: { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "Partner" },
        arrayFields: { src: imageField("Logo"), alt: { type: "text" as const, label: "Alt" } },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Đối tác tin cậy",
      subtitle: "",
      align: "center" as const,
      logos: [
        { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "P1" },
        { src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&q=80", alt: "P2" },
        { src: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=200&q=80", alt: "P3" },
        { src: "https://images.unsplash.com/photo-1611162617474-5b21e939e989?w=200&q=80", alt: "P4" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, logos } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        logos: { src: string; alt: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center", alignItems: "center" }}>
              {logos.map((l, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={l.src} alt={l.alt} style={{ height: 36, objectFit: "contain", filter: "grayscale(100%)", opacity: 0.6 }} />
              ))}
            </div>
          </>
        )
      );
    },
  },

  FaqAccordionSection: {
    label: "FAQ Accordion",
    fields: {
      ...titleFields,
      items: {
        type: "array" as const,
        label: "Câu hỏi",
        getItemSummary: (item: { question?: string }) => item.question || "FAQ",
        defaultItemProps: { question: "Câu hỏi?", answer: "Câu trả lời." },
        arrayFields: {
          question: { type: "text" as const, label: "Câu hỏi" },
          answer: { type: "textarea" as const, label: "Trả lời" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Câu hỏi thường gặp",
      subtitle: "",
      align: "left" as const,
      items: [
        { question: "Làm sao để đổi trả?", answer: "Bạn có thể đổi trả trong vòng 30 ngày kể từ ngày nhận hàng." },
        { question: "Thời gian giao hàng?", answer: "Giao hàng trong 2-5 ngày làm việc tùy khu vực." },
        { question: "Phương thức thanh toán?", answer: "Hỗ trợ COD, chuyển khoản, thẻ tín dụng và ví điện tử." },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, items } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        items: { question: string; answer: string }[];
      };
      const [open, setOpen] = useState<number | null>(0);
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item, i) => (
                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "#f8fafc",
                      border: "none",
                      textAlign: "left",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.question}
                    <span>{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i ? (
                    <div style={{ padding: "14px 16px", fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{item.answer}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  ToggleSection: {
    label: "Toggle Section",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      content: { type: "textarea" as const, label: "Nội dung ẩn" },
      defaultOpen: { type: "radio" as const, label: "Mở mặc định", options: [...yesNo] },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Chi tiết sản phẩm",
      content: "Thông tin chi tiết về chất liệu, kích thước và hướng dẫn bảo quản sản phẩm.",
      defaultOpen: "no" as const,
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, content, defaultOpen } = props as {
        title: string;
        content: string;
        defaultOpen: "yes" | "no";
      };
      const [open, setOpen] = useState(defaultOpen === "yes");
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 8 }}>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "none",
                border: "none",
                textAlign: "left",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {title}
              <span>{open ? "−" : "+"}</span>
            </button>
            {open ? <div style={{ padding: "0 16px 16px", color: "#64748b", lineHeight: 1.6 }}>{content}</div> : null}
          </div>
        )
      );
    },
  },

  FaqSection: {
    label: "FAQ List",
    fields: {
      ...titleFields,
      items: {
        type: "array" as const,
        label: "Câu hỏi",
        getItemSummary: (item: { question?: string }) => item.question || "FAQ",
        defaultItemProps: { question: "Câu hỏi?", answer: "Trả lời." },
        arrayFields: {
          question: { type: "text" as const, label: "Câu hỏi" },
          answer: { type: "textarea" as const, label: "Trả lời" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Hỏi đáp",
      subtitle: "",
      align: "left" as const,
      items: [
        { question: "Có ship COD không?", answer: "Có, chúng tôi hỗ trợ COD toàn quốc." },
        { question: "Bảo hành bao lâu?", answer: "Bảo hành 12 tháng cho sản phẩm chính hãng." },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, items } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        items: { question: string; answer: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {items.map((item, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.question}</div>
                  <p style={{ margin: 0, color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  TabsSection: {
    label: "Tabs",
    fields: {
      ...titleFields,
      tabs: {
        type: "array" as const,
        label: "Tab",
        getItemSummary: (item: { title?: string }) => item.title || "Tab",
        defaultItemProps: { title: "Tab", content: "Nội dung tab." },
        arrayFields: {
          title: { type: "text" as const, label: "Tiêu đề tab" },
          content: { type: "textarea" as const, label: "Nội dung" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "",
      subtitle: "",
      align: "left" as const,
      tabs: [
        { title: "Mô tả", content: "Sản phẩm cao cấp với thiết kế tinh tế." },
        { title: "Thông số", content: "Chất liệu: cotton 100%. Kích thước: S, M, L, XL." },
        { title: "Vận chuyển", content: "Giao hàng 2-5 ngày. Miễn phí đơn từ 500k." },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, tabs } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        tabs: { title: string; content: string }[];
      };
      const [active, setActive] = useState(0);
      const tab = tabs[active];
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #e2e8f0", marginBottom: 16 }}>
              {tabs.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    background: "none",
                    fontWeight: i === active ? 700 : 400,
                    color: i === active ? "#0f766e" : "#64748b",
                    borderBottom: i === active ? "2px solid #0f766e" : "2px solid transparent",
                    cursor: "pointer",
                    marginBottom: -1,
                  }}
                >
                  {t.title}
                </button>
              ))}
            </div>
            {tab ? <div style={{ color: "#475569", lineHeight: 1.7 }}>{tab.content}</div> : null}
          </>
        )
      );
    },
  },

  BlogPosts: {
    label: "Blog Posts",
    fields: {
      ...titleFields,
      articles: {
        type: "array" as const,
        label: "Bài viết",
        getItemSummary: (item: { title?: string }) => item.title || "Bài viết",
        defaultItemProps: demoArticles[0],
        arrayFields: articleFields,
      },
      columns: {
        type: "radio" as const,
        label: "Số cột",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
        ],
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Blog",
      subtitle: "Tin tức và bài viết mới nhất",
      align: "left" as const,
      articles: demoArticles,
      columns: "3" as const,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, articles, columns } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        articles: DemoArticle[];
        columns: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div className="cat-articles" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }}>
              <style>{`@media (min-width: 640px) { .cat-articles { grid-template-columns: repeat(2, 1fr); } } @media (min-width: 992px) { .cat-articles { grid-template-columns: repeat(${columns}, 1fr); } }`}</style>
              {articles.map((a, i) => (
                <div key={i}>{articleCard(a)}</div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  LatestNews: {
    label: "Latest News",
    fields: {
      ...titleFields,
      articles: {
        type: "array" as const,
        label: "Tin tức",
        getItemSummary: (item: { title?: string }) => item.title || "Tin",
        defaultItemProps: demoArticles[0],
        arrayFields: articleFields,
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Tin mới nhất",
      subtitle: "",
      align: "left" as const,
      articles: demoArticles.slice(0, 2),
      spacing: defaultSpacingGroup(48, { background: "#f8fafc", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, articles } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        articles: DemoArticle[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {articles.map((a, i) => (
                <a
                  key={i}
                  href={a.href || "#"}
                  style={{
                    display: "flex",
                    gap: 16,
                    textDecoration: "none",
                    color: "inherit",
                    padding: 12,
                    background: "#fff",
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.image} alt={a.title} style={{ width: 100, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                  <div>
                    {a.date ? <div style={{ fontSize: 12, color: "#94a3b8" }}>{a.date}</div> : null}
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
                    {a.excerpt ? (
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>{a.excerpt.slice(0, 80)}...</p>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </>
        )
      );
    },
  },

  ArticleGrid: {
    label: "Article Grid",
    fields: {
      ...titleFields,
      articles: {
        type: "array" as const,
        label: "Bài viết",
        getItemSummary: (item: { title?: string }) => item.title || "Bài",
        defaultItemProps: demoArticles[0],
        arrayFields: articleFields,
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
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Bài viết",
      subtitle: "",
      align: "center" as const,
      articles: demoArticles,
      columns: "3" as const,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, articles, columns } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        articles: DemoArticle[];
        columns: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div className="cat-article-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }}>
              <style>{`@media (min-width: 768px) { .cat-article-grid { grid-template-columns: repeat(${columns}, 1fr); } }`}</style>
              {articles.map((a, i) => (
                <div key={i}>{articleCard(a)}</div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  ArticleSlider: {
    label: "Article Slider",
    fields: {
      ...titleFields,
      articles: {
        type: "array" as const,
        label: "Bài viết",
        getItemSummary: (item: { title?: string }) => item.title || "Bài",
        defaultItemProps: demoArticles[0],
        arrayFields: articleFields,
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Bài viết nổi bật",
      subtitle: "",
      align: "left" as const,
      articles: demoArticles,
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, align, articles } = props as {
        title: string;
        subtitle: string;
        align: "left" | "center" | "right";
        articles: DemoArticle[];
      };
      const [idx, setIdx] = useState(0);
      const total = articles.length;
      const a = articles[idx];
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align)}
            <div style={{ position: "relative", maxWidth: 400, margin: "0 auto" }}>
              {a ? articleCard(a) : null}
              {total > 1 ? (
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                  <button
                    type="button"
                    onClick={() => setIdx((i) => (i - 1 + total) % total)}
                    style={{ padding: "6px 14px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdx((i) => (i + 1) % total)}
                    style={{ padding: "6px 14px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}
                  >
                    ›
                  </button>
                </div>
              ) : null}
            </div>
          </>
        )
      );
    },
  },

  InstagramFeed: {
    label: "Instagram Feed",
    fields: {
      handle: { type: "text" as const, label: "Instagram handle" },
      images: {
        type: "array" as const,
        label: "Ảnh",
        getItemSummary: (_: unknown, i?: number) => `IG ${(i ?? 0) + 1}`,
        defaultItemProps: { src: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=400&q=80" },
        arrayFields: { src: imageField("Ảnh") },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      handle: "@yourstore",
      images: [
        { src: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=400&q=80" },
        { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80" },
        { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
        { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { handle, images } = props as { handle: string; images: { src: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {handle ? <div style={{ textAlign: "center", marginBottom: 20, fontWeight: 700, fontSize: 18 }}>{handle}</div> : null}
            <div className="cat-ig" style={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(2, 1fr)" }}>
              <style>{`@media (min-width: 768px) { .cat-ig { grid-template-columns: repeat(4, 1fr); } }`}</style>
              {images.map((img, i) => (
                <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  TikTokFeed: {
    label: "TikTok Feed",
    fields: {
      handle: { type: "text" as const, label: "TikTok handle" },
      images: {
        type: "array" as const,
        label: "Thumbnail",
        getItemSummary: (_: unknown, i?: number) => `TT ${(i ?? 0) + 1}`,
        defaultItemProps: { src: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=400&q=80" },
        arrayFields: { src: imageField("Ảnh") },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      handle: "@yourstore",
      images: [
        { src: "https://images.unsplash.com/photo-1611605698335-8b65691f2916?w=400&q=80" },
        { src: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=400&q=80" },
        { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { handle, images } = props as { handle: string; images: { src: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {handle ? (
              <div style={{ textAlign: "center", marginBottom: 20, fontWeight: 700, fontSize: 18, color: "#fff" }}>{handle}</div>
            ) : null}
            <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: 180,
                    aspectRatio: "9/16",
                    borderRadius: 12,
                    overflow: "hidden",
                    position: "relative",
                    flex: "0 0 180px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 28 }}>▶</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },

  SocialIcons: {
    label: "Social Icons",
    fields: {
      facebook: { type: "text" as const, label: "Facebook URL" },
      instagram: { type: "text" as const, label: "Instagram URL" },
      tiktok: { type: "text" as const, label: "TikTok URL" },
      youtube: { type: "text" as const, label: "YouTube URL" },
      zalo: { type: "text" as const, label: "Zalo URL" },
      size: { type: "number" as const, label: "Kích thước icon", min: 24 },
      ...commonSpacingFields,
    },
    defaultProps: {
      facebook: "#",
      instagram: "#",
      tiktok: "#",
      youtube: "#",
      zalo: "#",
      size: 40,
      spacing: defaultSpacingGroup(24, { background: "#fff", maxWidth: 400 }),
    },
    render: (props: Record<string, unknown>) => {
      const { facebook, instagram, tiktok, youtube, zalo, size } = props as {
        facebook: string;
        instagram: string;
        tiktok: string;
        youtube: string;
        zalo: string;
        size: number;
      };
      const links = [
        { label: "f", href: facebook, title: "Facebook" },
        { label: "ig", href: instagram, title: "Instagram" },
        { label: "tt", href: tiktok, title: "TikTok" },
        { label: "yt", href: youtube, title: "YouTube" },
        { label: "Z", href: zalo, title: "Zalo" },
      ].filter((l) => l.href);
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {links.map((l) => (
              <a
                key={l.title}
                href={l.href}
                title={l.title}
                style={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: "#334155",
                  fontWeight: 700,
                  fontSize: size * 0.35,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )
      );
    },
  },

  SocialShare: {
    label: "Social Share",
    fields: {
      label: { type: "text" as const, label: "Nhãn" },
      ...commonSpacingFields,
    },
    defaultProps: {
      label: "Chia sẻ:",
      spacing: defaultSpacingGroup(24, { background: "#fff", maxWidth: 400 }),
    },
    render: (props: Record<string, unknown>) => {
      const { label } = props as { label: string };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {label ? <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span> : null}
            {["Facebook", "Twitter", "Pinterest", "Copy"].map((s) => (
              <button
                key={s}
                type="button"
                style={{
                  padding: "6px 12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 6,
                  background: "#fff",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )
      );
    },
  },

  CustomHtml: {
    label: "Custom HTML",
    fields: {
      html: { type: "textarea" as const, label: "HTML tùy chỉnh" },
      ...commonSpacingFields,
    },
    defaultProps: {
      html: '<div style="padding:20px;background:#f0fdfa;border-radius:8px;text-align:center"><strong>Custom HTML Block</strong><p>Thêm mã HTML tùy chỉnh của bạn.</p></div>',
      spacing: defaultSpacingGroup(24, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { html } = props as { html: string };
      return sectionFromProps(props, boxedFromProps(props, <div dangerouslySetInnerHTML={{ __html: html }} />));
    },
  },
};
