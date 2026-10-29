"use client";

/**
 * Catalog "Showcase" — các block trình bày đẹp, bổ sung cho catalog cũ.
 * Mọi block đều thuần render (không dùng Hooks) để không phát sinh lỗi lint
 * react-hooks/rules-of-hooks như các render dùng useState ở catalog cũ.
 * Props dùng chung pattern: titleFields + commonSpacingFields + sectionFromProps.
 */
import {
  alignOpts,
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  imageField,
  sectionFromProps,
  sectionHead,
  titleFields,
  yesNo,
} from "./section-shared";

type AnyProps = Record<string, unknown>;

const accentField = { type: "text" as const, label: "Màu nhấn (hex / gradient CSS)" };

function splitLines(value: string | undefined): string[] {
  return (value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* 1 · PricingCards — bảng giá 3 gói, gói giữa nổi bật                  */
/* ------------------------------------------------------------------ */

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string;
  featured: "yes" | "no";
  ctaLabel: string;
  ctaHref: string;
};

const defaultPlans: Plan[] = [
  {
    name: "Cơ bản",
    price: "199.000đ",
    period: "/tháng",
    description: "Cho cá nhân mới bắt đầu",
    features: "1 website\n10 trang\nSSL miễn phí\nHỗ trợ qua email",
    featured: "no",
    ctaLabel: "Bắt đầu",
    ctaHref: "#",
  },
  {
    name: "Chuyên nghiệp",
    price: "499.000đ",
    period: "/tháng",
    description: "Cho doanh nghiệp đang tăng trưởng",
    features: "5 website\nKhông giới hạn trang\nTên miền riêng\nSEO nâng cao\nHỗ trợ ưu tiên 24/7",
    featured: "yes",
    ctaLabel: "Dùng thử 14 ngày",
    ctaHref: "#",
  },
  {
    name: "Doanh nghiệp",
    price: "1.299.000đ",
    period: "/tháng",
    description: "Cho đội ngũ lớn, yêu cầu cao",
    features: "Không giới hạn website\nAPI riêng\nBảo mật nâng cao\nQuản lý tài khoản riêng",
    featured: "no",
    ctaLabel: "Liên hệ tư vấn",
    ctaHref: "#",
  },
];

/* ------------------------------------------------------------------ */
/* 2 · FeatureBentoPro — lưới bento tính năng                          */
/* ------------------------------------------------------------------ */

type BentoItem = {
  icon: string;
  title: string;
  description: string;
  image: string;
  size: "large" | "small";
};

const defaultBento: BentoItem[] = [
  {
    icon: "✦",
    title: "Kéo thả trực quan",
    description: "Dựng trang trong vài phút với thư viện block có sẵn, xem trước trực tiếp như người dùng thật.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80",
    size: "large",
  },
  { icon: "⚡", title: "Tốc độ cao", description: "Tối ưu sẵn cho Core Web Vitals.", image: "", size: "small" },
  { icon: "🔒", title: "Bảo mật", description: "SSL và sao lưu tự động mỗi ngày.", image: "", size: "small" },
  { icon: "📈", title: "SEO thân thiện", description: "Thẻ meta, sitemap và cấu trúc chuẩn Google.", image: "", size: "small" },
  { icon: "🎨", title: "Tuỳ biến sâu", description: "Màu sắc, font chữ và spacing theo thương hiệu.", image: "", size: "small" },
];

/* ------------------------------------------------------------------ */
/* 3 · GradientCtaBanner — banner kêu gọi hành động nền gradient       */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* 4 · TeamShowcase — đội ngũ dạng thẻ tròn trịa                       */
/* ------------------------------------------------------------------ */

type Member = { avatar: string; name: string; role: string; bio: string; social: string };

const defaultMembers: Member[] = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    name: "Nguyễn Thu Hà",
    role: "Founder / CEO",
    bio: "10 năm kinh nghiệm xây dựng sản phẩm số cho startup Đông Nam Á.",
    social: "linkedin.com/in/thuha",
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    name: "Trần Minh Quân",
    role: "Trưởng nhóm Kỹ thuật",
    bio: "Chuyên gia Next.js và hạ tầng cloud, mê tối ưu hiệu năng.",
    social: "github.com/minhquan",
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    name: "Lê Phương Anh",
    role: "Trưởng nhóm Thiết kế",
    bio: "Theo đuổi phong cách tối giản, lấy trải nghiệm người dùng làm trung tâm.",
    social: "behance.net/phuonganh",
  },
  {
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    name: "Phạm Đức Long",
    role: "Chăm sóc khách hàng",
    bio: "Luôn có mặt khi khách cần — hỗ trợ tận tâm trong vòng 15 phút.",
    social: "facebook.com/duclong",
  },
];

/* ------------------------------------------------------------------ */
/* 5 · TestimonialWall — tường lời chứng thực dạng masonry             */
/* ------------------------------------------------------------------ */

type Quote = { quote: string; author: string; role: string; avatar: string; rating: number };

const defaultQuotes: Quote[] = [
  {
    quote: "Từ ngày chuyển sang nền tảng này, doanh thu online của shop tăng 40% chỉ sau 2 tháng. Giao diện đẹp mà không cần biết code.",
    author: "Chị Mai Linh",
    role: "Chủ shop thời trang",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
  },
  {
    quote: "Editor kéo thả rất mượt. Đội marketing tự làm landing page cho từng chiến dịch, không phải chờ IT nữa.",
    author: "Anh Hoàng Nam",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
  },
  {
    quote: "Hỗ trợ nhanh và nhiệt tình. Có lần 11 giờ đêm vẫn được xử lý ngay.",
    author: "Chị Thanh Trúc",
    role: "Chủ tiệm cà phê",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    rating: 5,
  },
  {
    quote: "Template mẫu đẹp sẵn, mình chỉ thay nội dung là xong trong một buổi chiều.",
    author: "Anh Tuấn Kiệt",
    role: "Freelancer thiết kế",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    rating: 4,
  },
  {
    quote: "Tốc độ tải trang nhanh rõ rệt, khách hàng ở lại lâu hơn hẳn.",
    author: "Chị Ngọc Diệp",
    role: "Chủ spa",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    rating: 5,
  },
  {
    quote: "Bảng giá rõ ràng, không phí ẩn. Rất đáng tiền cho cửa hàng nhỏ như mình.",
    author: "Anh Văn Đức",
    role: "Chủ cửa hàng điện tử",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/* 6 · ComparisonTable — bảng so sánh tính năng                        */
/* ------------------------------------------------------------------ */

type CompareRow = { feature: string; us: "yes" | "no"; them: "yes" | "no" };

const defaultCompareRows: CompareRow[] = [
  { feature: "Kéo thả trực quan, không cần code", us: "yes", them: "no" },
  { feature: "Template tiếng Việt sẵn dùng", us: "yes", them: "no" },
  { feature: "Hỗ trợ tiếng Việt 24/7", us: "yes", them: "no" },
  { feature: "Xuất bản trong 1 click", us: "yes", them: "yes" },
  { feature: "Không phí ẩn theo traffic", us: "yes", them: "no" },
];

function statusMark(value: "yes" | "no", positive: boolean) {
  if (value === "yes") {
    return (
      <span style={{ color: positive ? "#059669" : "#64748b", fontWeight: 700, fontSize: 17 }}>✓</span>
    );
  }
  return <span style={{ color: "#cbd5e1", fontWeight: 700, fontSize: 17 }}>✕</span>;
}

/* ------------------------------------------------------------------ */
/* 7 · MenuPriceList — danh sách món / bảng giá kiểu nhà hàng          */
/* ------------------------------------------------------------------ */

type MenuItem = { name: string; description: string; price: string; tag: string };

const defaultMenu: MenuItem[] = [
  { name: "Cà phê trứng", description: "Cà phê robusta, kem trứng béo ngậy", price: "45.000đ", tag: "Bán chạy" },
  { name: "Bạc xỉu đá", description: "Sữa tươi, cà phê phin truyền thống", price: "39.000đ", tag: "" },
  { name: "Trà đào cam sả", description: "Trà đen, đào ngâm, sả tươi", price: "49.000đ", tag: "Mới" },
  { name: "Matcha latte", description: "Matcha Nhật, sữa tươi không đường", price: "55.000đ", tag: "" },
  { name: "Bánh tiramisu", description: "Mascarpone, cacao Bỉ, ladyfinger", price: "59.000đ", tag: "" },
  { name: "Croissant bơ", description: "Nướng mới mỗi sáng, bơ Pháp", price: "42.000đ", tag: "" },
];

export const catalogShowcaseComponents = {
  PricingCards: {
    label: "Pricing Cards (bảng giá nổi bật)",
    fields: {
      ...titleFields,
      accent: accentField,
      plans: {
        type: "array" as const,
        label: "Các gói",
        getItemSummary: (item: unknown, i?: number) =>
          (item as Plan)?.name || `Gói ${(i ?? 0) + 1}`,
        defaultItemProps: {
          name: "Gói mới",
          price: "0đ",
          period: "/tháng",
          description: "",
          features: "Tính năng 1\nTính năng 2",
          featured: "no" as const,
          ctaLabel: "Chọn gói",
          ctaHref: "#",
        } satisfies Plan,
        arrayFields: {
          name: { type: "text" as const, label: "Tên gói" },
          price: { type: "text" as const, label: "Giá" },
          period: { type: "text" as const, label: "Chu kỳ (vd /tháng)" },
          description: { type: "text" as const, label: "Mô tả ngắn" },
          features: { type: "textarea" as const, label: "Tính năng (mỗi dòng 1 mục)" },
          featured: { type: "radio" as const, label: "Gói nổi bật", options: [...yesNo] },
          ctaLabel: { type: "text" as const, label: "Chữ nút" },
          ctaHref: { type: "text" as const, label: "Link nút" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Bảng giá đơn giản, minh bạch",
      subtitle: "Không phí ẩn. Huỷ bất cứ lúc nào.",
      align: "center" as const,
      accent: "#059669",
      plans: defaultPlans,
      spacing: defaultSpacingGroup(64, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: AnyProps) => {
      const { title, subtitle, align, accent, plans } = props as {
        title: string;
        subtitle: string;
        align: string;
        accent: string;
        plans: Plan[];
      };
      const color = accent || "#059669";
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align || "center")}
            <div className="sc-pricing-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr", alignItems: "stretch" }}>
              <style>{`@media (min-width: 900px) { .sc-pricing-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
              {(plans || []).map((plan, i) => {
                const featured = plan.featured === "yes";
                return (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      background: featured ? "#0f172a" : "#ffffff",
                      color: featured ? "#f8fafc" : "#0f172a",
                      border: featured ? "none" : "1px solid #e2e8f0",
                      borderRadius: 20,
                      padding: "32px 28px",
                      boxShadow: featured ? "0 24px 48px -16px rgba(15,23,42,0.45)" : "0 4px 16px rgba(15,23,42,0.05)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {featured ? (
                      <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: color, color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
                        Phổ biến nhất
                      </span>
                    ) : null}
                    <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", textTransform: "uppercase", color: featured ? "#a7f3d0" : color }}>
                      {plan.name}
                    </div>
                    <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em" }}>{plan.price}</span>
                      <span style={{ color: featured ? "#94a3b8" : "#64748b", fontSize: 14 }}>{plan.period}</span>
                    </div>
                    {plan.description ? (
                      <p style={{ margin: "10px 0 0", color: featured ? "#cbd5e1" : "#64748b", fontSize: 14, lineHeight: 1.6 }}>{plan.description}</p>
                    ) : null}
                    <ul style={{ listStyle: "none", margin: "22px 0 28px", padding: 0, display: "grid", gap: 10, flex: 1 }}>
                      {splitLines(plan.features).map((f, j) => (
                        <li key={j} style={{ display: "flex", gap: 9, fontSize: 14, lineHeight: 1.5 }}>
                          <span style={{ color: color, fontWeight: 800 }}>✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={plan.ctaHref || "#"}
                      style={{
                        display: "block",
                        textAlign: "center",
                        textDecoration: "none",
                        padding: "13px 18px",
                        borderRadius: 12,
                        fontWeight: 700,
                        fontSize: 15,
                        background: featured ? color : "transparent",
                        color: featured ? "#ffffff" : color,
                        border: featured ? "none" : `1.5px solid ${color}`,
                      }}
                    >
                      {plan.ctaLabel || "Chọn gói"}
                    </a>
                  </div>
                );
              })}
            </div>
          </>
        )
      );
    },
  },

  FeatureBentoPro: {
    label: "Feature Bento Pro (lưới bento)",
    fields: {
      ...titleFields,
      accent: accentField,
      items: {
        type: "array" as const,
        label: "Ô tính năng",
        getItemSummary: (item: unknown, i?: number) =>
          (item as BentoItem)?.title || `Ô ${(i ?? 0) + 1}`,
        defaultItemProps: {
          icon: "✦",
          title: "Tính năng mới",
          description: "Mô tả ngắn gọn.",
          image: "",
          size: "small" as const,
        } satisfies BentoItem,
        arrayFields: {
          icon: { type: "text" as const, label: "Icon (emoji/ký tự)" },
          title: { type: "text" as const, label: "Tiêu đề" },
          description: { type: "textarea" as const, label: "Mô tả" },
          image: imageField("Ảnh (cho ô lớn)"),
          size: {
            type: "radio" as const,
            label: "Kích thước",
            options: [
              { label: "Lớn (2×2)", value: "large" },
              { label: "Nhỏ", value: "small" },
            ],
          },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Mọi thứ bạn cần để bán hàng online",
      subtitle: "Một nền tảng — đủ tính năng từ dựng trang đến tăng trưởng.",
      align: "center" as const,
      accent: "#059669",
      items: defaultBento,
      spacing: defaultSpacingGroup(64, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: AnyProps) => {
      const { title, subtitle, align, accent, items } = props as {
        title: string;
        subtitle: string;
        align: string;
        accent: string;
        items: BentoItem[];
      };
      const color = accent || "#059669";
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align || "center")}
            <div className="sc-bento-grid" style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
              <style>{`
                @media (min-width: 768px) {
                  .sc-bento-grid { grid-template-columns: repeat(4, 1fr) !important; }
                  .sc-bento-large { grid-column: span 2; grid-row: span 2; }
                  .sc-bento-small { grid-column: span 1; }
                }
              `}</style>
              {(items || []).map((item, i) => {
                const large = item.size === "large";
                return (
                  <article
                    key={i}
                    className={large ? "sc-bento-large" : "sc-bento-small"}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 18,
                      border: "1px solid #e2e8f0",
                      background: large && item.image ? "#0f172a" : "#f8fafc",
                      padding: large ? 0 : 24,
                      minHeight: large ? 280 : 150,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: large ? "flex-end" : "flex-start",
                    }}
                  >
                    {large && item.image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.title} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
                        <div style={{ position: "relative", padding: 26, color: "#fff" }}>
                          <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                          <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{item.title}</h3>
                          <p style={{ margin: "8px 0 0", color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{item.description}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, marginBottom: 14 }}>
                          {item.icon}
                        </div>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{item.title}</h3>
                        <p style={{ margin: "7px 0 0", color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{item.description}</p>
                        <span style={{ marginTop: "auto", paddingTop: 12, color, fontSize: 13, fontWeight: 700 }}>Tìm hiểu →</span>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )
      );
    },
  },

  GradientCtaBanner: {
    label: "Gradient CTA Banner",
    fields: {
      heading: { type: "text" as const, label: "Tiêu đề" },
      body: { type: "textarea" as const, label: "Mô tả" },
      primaryLabel: { type: "text" as const, label: "Nút chính" },
      primaryHref: { type: "text" as const, label: "Link nút chính" },
      secondaryLabel: { type: "text" as const, label: "Nút phụ" },
      secondaryHref: { type: "text" as const, label: "Link nút phụ" },
      gradientFrom: { type: "text" as const, label: "Gradient từ" },
      gradientTo: { type: "text" as const, label: "Gradient đến" },
      align: { type: "radio" as const, label: "Căn nội dung", options: [...alignOpts] },
      ...commonSpacingFields,
    },
    defaultProps: {
      heading: "Sẵn sàng xây website của riêng bạn?",
      body: "Bắt đầu miễn phí trong 5 phút — không cần thẻ tín dụng, không cần biết code.",
      primaryLabel: "Bắt đầu miễn phí",
      primaryHref: "#",
      secondaryLabel: "Xem demo",
      secondaryHref: "#",
      gradientFrom: "#065f46",
      gradientTo: "#0ea5e9",
      align: "center" as const,
      spacing: defaultSpacingGroup(56, { background: "transparent", maxWidth: 1140 }),
    },
    render: (props: AnyProps) => {
      const p = props as {
        heading: string;
        body: string;
        primaryLabel: string;
        primaryHref: string;
        secondaryLabel: string;
        secondaryHref: string;
        gradientFrom: string;
        gradientTo: string;
        align: string;
      };
      const align = p.align || "center";
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 28,
              padding: "56px 32px",
              textAlign: align as "left" | "center" | "right",
              color: "#ffffff",
              background: `linear-gradient(120deg, ${p.gradientFrom || "#065f46"} 0%, ${p.gradientTo || "#0ea5e9"} 100%)`,
              boxShadow: "0 30px 60px -24px rgba(2,132,199,0.45)",
            }}
          >
            <div aria-hidden style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,0.14)", top: -160, right: -80 }} />
            <div aria-hidden style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.10)", bottom: -110, left: -40 }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{p.heading}</h2>
              {p.body ? (
                <p style={{ margin: "14px auto 0", maxWidth: 620, color: "rgba(255,255,255,0.88)", fontSize: 16, lineHeight: 1.65, ...(align !== "center" ? { marginLeft: 0 } : {}) }}>{p.body}</p>
              ) : null}
              <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start" }}>
                {p.primaryLabel ? (
                  <a href={p.primaryHref || "#"} style={{ background: "#ffffff", color: "#0f172a", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 999 }}>
                    {p.primaryLabel}
                  </a>
                ) : null}
                {p.secondaryLabel ? (
                  <a href={p.secondaryHref || "#"} style={{ background: "transparent", color: "#ffffff", textDecoration: "none", fontWeight: 600, fontSize: 15, padding: "14px 26px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.7)" }}>
                    {p.secondaryLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )
      );
    },
  },

  TeamShowcase: {
    label: "Team Showcase (đội ngũ)",
    fields: {
      ...titleFields,
      members: {
        type: "array" as const,
        label: "Thành viên",
        getItemSummary: (item: unknown, i?: number) =>
          (item as Member)?.name || `Thành viên ${(i ?? 0) + 1}`,
        defaultItemProps: {
          avatar: "",
          name: "Thành viên mới",
          role: "Vị trí",
          bio: "",
          social: "",
        } satisfies Member,
        arrayFields: {
          avatar: imageField("Ảnh đại diện"),
          name: { type: "text" as const, label: "Họ tên" },
          role: { type: "text" as const, label: "Chức vụ" },
          bio: { type: "textarea" as const, label: "Giới thiệu ngắn" },
          social: { type: "text" as const, label: "Mạng xã hội / liên hệ" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Đội ngũ của chúng tôi",
      subtitle: "Những con người đứng sau sản phẩm.",
      align: "center" as const,
      members: defaultMembers,
      spacing: defaultSpacingGroup(64, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: AnyProps) => {
      const { title, subtitle, align, members } = props as {
        title: string;
        subtitle: string;
        align: string;
        members: Member[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align || "center")}
            <div className="sc-team-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }}>
              <style>{`
                @media (min-width: 640px) { .sc-team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (min-width: 1024px) { .sc-team-grid { grid-template-columns: repeat(4, 1fr) !important; } }
              `}</style>
              {(members || []).map((m, i) => (
                <article key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 20, padding: "30px 22px", textAlign: "center" }}>
                  {m.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.avatar} alt={m.name} loading="lazy" style={{ width: 92, height: 92, borderRadius: "50%", objectFit: "cover", margin: "0 auto", display: "block", border: "3px solid #fff", boxShadow: "0 8px 20px rgba(15,23,42,0.12)" }} />
                  ) : null}
                  <h3 style={{ margin: "18px 0 0", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{m.name}</h3>
                  <p style={{ margin: "5px 0 0", fontSize: 13, fontWeight: 600, color: "#059669", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.role}</p>
                  {m.bio ? <p style={{ margin: "12px 0 0", fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{m.bio}</p> : null}
                  {m.social ? <p style={{ margin: "14px 0 0", fontSize: 12.5, color: "#94a3b8", wordBreak: "break-all" }}>{m.social}</p> : null}
                </article>
              ))}
            </div>
          </>
        )
      );
    },
  },

  TestimonialWall: {
    label: "Testimonial Wall (tường đánh giá)",
    fields: {
      ...titleFields,
      items: {
        type: "array" as const,
        label: "Lời đánh giá",
        getItemSummary: (item: unknown, i?: number) =>
          (item as Quote)?.author || `Đánh giá ${(i ?? 0) + 1}`,
        defaultItemProps: {
          quote: "Sản phẩm tuyệt vời!",
          author: "Khách hàng",
          role: "",
          avatar: "",
          rating: 5,
        } satisfies Quote,
        arrayFields: {
          quote: { type: "textarea" as const, label: "Nội dung" },
          author: { type: "text" as const, label: "Người đánh giá" },
          role: { type: "text" as const, label: "Chức danh / nghề" },
          avatar: imageField("Ảnh đại diện"),
          rating: { type: "number" as const, label: "Số sao (1–5)", min: 1, max: 5 },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Khách hàng nói gì về chúng tôi",
      subtitle: "Hơn 2.000 doanh nghiệp nhỏ đang tin dùng mỗi ngày.",
      align: "center" as const,
      items: defaultQuotes,
      spacing: defaultSpacingGroup(64, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: AnyProps) => {
      const { title, subtitle, align, items } = props as {
        title: string;
        subtitle: string;
        align: string;
        items: Quote[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align || "center")}
            <div className="sc-quote-wall" style={{ columns: 1, columnGap: 20 }}>
              <style>{`
                @media (min-width: 768px) { .sc-quote-wall { columns: 2 !important; } }
                @media (min-width: 1024px) { .sc-quote-wall { columns: 3 !important; } }
              `}</style>
              {(items || []).map((q, i) => {
                const stars = Math.min(5, Math.max(1, Math.round(Number(q.rating) || 5)));
                return (
                  <figure key={i} style={{ breakInside: "avoid", margin: "0 0 20px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 18, padding: "24px 22px", boxShadow: "0 4px 14px rgba(15,23,42,0.04)" }}>
                    <div aria-label={`${stars} sao`} style={{ color: "#f59e0b", fontSize: 15, letterSpacing: 2 }}>
                      {"★".repeat(stars)}
                      <span style={{ color: "#e2e8f0" }}>{"★".repeat(5 - stars)}</span>
                    </div>
                    <blockquote style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.7, color: "#334155" }}>“{q.quote}”</blockquote>
                    <figcaption style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
                      {q.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={q.avatar} alt={q.author} loading="lazy" style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover" }} />
                      ) : null}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{q.author}</div>
                        {q.role ? <div style={{ fontSize: 12.5, color: "#94a3b8" }}>{q.role}</div> : null}
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </>
        )
      );
    },
  },

  ComparisonTable: {
    label: "Comparison Table (bảng so sánh)",
    fields: {
      ...titleFields,
      usLabel: { type: "text" as const, label: "Cột của bạn (nổi bật)" },
      themLabel: { type: "text" as const, label: "Cột đối thủ / gói khác" },
      rows: {
        type: "array" as const,
        label: "Dòng so sánh",
        getItemSummary: (item: unknown, i?: number) =>
          (item as CompareRow)?.feature || `Dòng ${(i ?? 0) + 1}`,
        defaultItemProps: { feature: "Tính năng mới", us: "yes" as const, them: "no" as const } satisfies CompareRow,
        arrayFields: {
          feature: { type: "text" as const, label: "Tính năng" },
          us: { type: "radio" as const, label: "Của bạn có?", options: [...yesNo] },
          them: { type: "radio" as const, label: "Đối thủ có?", options: [...yesNo] },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Vì sao chọn chúng tôi?",
      subtitle: "So sánh thẳng thắn với cách làm truyền thống.",
      align: "center" as const,
      usLabel: "Chúng tôi",
      themLabel: "Cách làm cũ",
      rows: defaultCompareRows,
      spacing: defaultSpacingGroup(64, { background: "#ffffff", maxWidth: 900 }),
    },
    render: (props: AnyProps) => {
      const { title, subtitle, align, usLabel, themLabel, rows } = props as {
        title: string;
        subtitle: string;
        align: string;
        usLabel: string;
        themLabel: string;
        rows: CompareRow[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align || "center")}
            <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: 18 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 480 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "16px 20px", background: "#f8fafc", color: "#64748b", fontWeight: 600 }}>Tính năng</th>
                    <th style={{ textAlign: "center", padding: "16px 20px", background: "#ecfdf5", color: "#065f46", fontWeight: 800, width: 150 }}>{usLabel}</th>
                    <th style={{ textAlign: "center", padding: "16px 20px", background: "#f8fafc", color: "#64748b", fontWeight: 600, width: 150 }}>{themLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {(rows || []).map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 ? "#fcfcfd" : "#fff" }}>
                      <td style={{ padding: "14px 20px", color: "#0f172a" }}>{row.feature}</td>
                      <td style={{ padding: "14px 20px", textAlign: "center", background: "#f0fdf9" }}>{statusMark(row.us, true)}</td>
                      <td style={{ padding: "14px 20px", textAlign: "center" }}>{statusMark(row.them, false)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      );
    },
  },

  MenuPriceList: {
    label: "Menu Price List (thực đơn / bảng giá món)",
    fields: {
      ...titleFields,
      accent: accentField,
      items: {
        type: "array" as const,
        label: "Món / dịch vụ",
        getItemSummary: (item: unknown, i?: number) =>
          (item as MenuItem)?.name || `Mục ${(i ?? 0) + 1}`,
        defaultItemProps: { name: "Món mới", description: "", price: "0đ", tag: "" } satisfies MenuItem,
        arrayFields: {
          name: { type: "text" as const, label: "Tên" },
          description: { type: "text" as const, label: "Mô tả" },
          price: { type: "text" as const, label: "Giá" },
          tag: { type: "text" as const, label: "Nhãn (Bán chạy / Mới…)" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Thực đơn nổi bật",
      subtitle: "Giá đã bao gồm VAT. Phục vụ cả ngày.",
      align: "center" as const,
      accent: "#b45309",
      items: defaultMenu,
      spacing: defaultSpacingGroup(64, { background: "#fffbeb", maxWidth: 1000 }),
    },
    render: (props: AnyProps) => {
      const { title, subtitle, align, accent, items } = props as {
        title: string;
        subtitle: string;
        align: string;
        accent: string;
        items: MenuItem[];
      };
      const color = accent || "#b45309";
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {sectionHead(title, subtitle, align || "center")}
            <div className="sc-menu-grid" style={{ display: "grid", gap: "8px 48px", gridTemplateColumns: "1fr" }}>
              <style>{`@media (min-width: 820px) { .sc-menu-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
              {(items || []).map((item, i) => (
                <div key={i} style={{ padding: "14px 4px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, color: "#1c1917", whiteSpace: "nowrap" }}>{item.name}</h3>
                    {item.tag ? (
                      <span style={{ background: color, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "2.5px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>{item.tag}</span>
                    ) : null}
                    <span aria-hidden style={{ flex: 1, borderBottom: "2px dotted #d6d3d1", transform: "translateY(-4px)" }} />
                    <span style={{ fontWeight: 800, color, fontSize: 16, whiteSpace: "nowrap" }}>{item.price}</span>
                  </div>
                  {item.description ? (
                    <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "#78716c", lineHeight: 1.55 }}>{item.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        )
      );
    },
  },
};
