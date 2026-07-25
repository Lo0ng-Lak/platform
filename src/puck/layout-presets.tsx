"use client";

import type { ComponentType, CSSProperties, ReactNode } from "react";
import { imageField } from "@/components/builder/ImageField";
import { defaultSpacing } from "@/lib/builder-styles";
import {
  boxed,
  boxedFromProps,
  commonSpacingFields,
  defaultSpacingGroup,
  resolveSpacing,
  sectionFromProps,
  sectionShell,
  spacingToCss,
} from "@/puck/section-shared";

type SlotRender = ComponentType<{
  style?: CSSProperties;
  className?: string;
  minEmptyHeight?: number | string;
}>;

const ratioOptions = [
  { label: "50 / 50", value: "1fr 1fr" },
  { label: "40 / 60", value: "2fr 3fr" },
  { label: "60 / 40", value: "3fr 2fr" },
  { label: "30 / 70", value: "3fr 7fr" },
  { label: "70 / 30", value: "7fr 3fr" },
  { label: "33 / 67", value: "1fr 2fr" },
  { label: "67 / 33", value: "2fr 1fr" },
  { label: "25 / 75", value: "1fr 3fr" },
  { label: "75 / 25", value: "3fr 1fr" },
];

const alignOptions = [
  { label: "Top", value: "start" },
  { label: "Center", value: "center" },
  { label: "Bottom", value: "end" },
  { label: "Stretch", value: "stretch" },
];

export const layoutPresetComponents = {
  SplitMedia: {
    label: "Split: Media + Content",
    fields: {
      ratio: { type: "select" as const, label: "Tỷ lệ cột", options: ratioOptions },
      reverse: {
        type: "radio" as const,
        label: "Đảo vị trí",
        options: [
          { label: "Media trái", value: "no" },
          { label: "Media phải", value: "yes" },
        ],
      },
      gap: { type: "number" as const, label: "Gap (px)", min: 0 },
      align: { type: "select" as const, label: "Căn dọc", options: alignOptions },
      minHeight: { type: "number" as const, label: "Min height", min: 0 },
      mediaRadius: { type: "number" as const, label: "Bo góc media", min: 0 },
      stackMobile: {
        type: "radio" as const,
        label: "Stack mobile",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      media: { type: "slot" as const, label: "Cột Media" },
      content: { type: "slot" as const, label: "Cột Content" },
      ...commonSpacingFields,
    },
    defaultProps: {
      ratio: "1fr 1fr",
      reverse: "no",
      gap: 32,
      align: "center",
      minHeight: 360,
      mediaRadius: 16,
      stackMobile: "yes",
      media: [],
      content: [],
      spacing: defaultSpacingGroup(48, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { ratio, reverse, gap, align, minHeight, mediaRadius, stackMobile } = props as {
        ratio: string;
        reverse: "yes" | "no";
        gap: number;
        align: string;
        minHeight: number;
        mediaRadius: number;
        stackMobile: "yes" | "no";
        media: SlotRender;
        content: SlotRender;
      };
      const Media = props.media as SlotRender;
      const Content = props.content as SlotRender;
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            style={{
              display: "grid",
              gridTemplateColumns: stackMobile === "yes" ? "1fr" : ratio,
              gap,
              alignItems: align,
              minHeight,
            }}
            className={stackMobile === "yes" ? "layout-split-stack" : undefined}
          >
            <style>{`
              @media (min-width: 768px) {
                .layout-split-stack {
                  grid-template-columns: ${ratio} !important;
                }
              }
            `}</style>
            <div
              style={{
                order: reverse === "yes" ? 2 : 1,
                borderRadius: mediaRadius,
                overflow: "hidden",
                minHeight: 200,
              }}
            >
              <Media style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }} minEmptyHeight={180} />
            </div>
            <div style={{ order: reverse === "yes" ? 1 : 2 }}>
              <Content style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={120} />
            </div>
          </div>
        )
      );
    },
  },

  SidebarLayout: {
    label: "Sidebar Layout",
    fields: {
      sidebarSide: {
        type: "radio" as const,
        label: "Vị trí sidebar",
        options: [
          { label: "Trái", value: "left" },
          { label: "Phải", value: "right" },
        ],
      },
      sidebarWidth: { type: "number" as const, label: "Sidebar width (px)", min: 180 },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      stickySidebar: {
        type: "radio" as const,
        label: "Sticky sidebar",
        options: [
          { label: "Không", value: "no" },
          { label: "Có", value: "yes" },
        ],
      },
      mainBg: { type: "text" as const, label: "Nền main" },
      sidebarBg: { type: "text" as const, label: "Nền sidebar" },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      main: { type: "slot" as const, label: "Main content" },
      sidebar: { type: "slot" as const, label: "Sidebar" },
      ...commonSpacingFields,
    },
    defaultProps: {
      sidebarSide: "right",
      sidebarWidth: 320,
      gap: 28,
      stickySidebar: "yes",
      mainBg: "#ffffff",
      sidebarBg: "#ffffff",
      radius: 12,
      main: [],
      sidebar: [],
      spacing: defaultSpacingGroup(40, { background: "#fafaf9", maxWidth: 1200 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        sidebarSide: "left" | "right";
        sidebarWidth: number;
        gap: number;
        stickySidebar: "yes" | "no";
        mainBg: string;
        sidebarBg: string;
        radius: number;
        main: SlotRender;
        sidebar: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-sidebar"
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr",
            }}
          >
            <style>{`
              @media (min-width: 900px) {
                .layout-sidebar {
                  grid-template-columns: ${
                    p.sidebarSide === "left"
                      ? `${p.sidebarWidth}px 1fr`
                      : `1fr ${p.sidebarWidth}px`
                  } !important;
                }
              }
            `}</style>
            <div
              style={{
                order: p.sidebarSide === "left" ? 2 : 1,
                background: p.mainBg,
                borderRadius: p.radius,
                padding: 24,
              }}
            >
              <p.main style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={200} />
            </div>
            <aside
              style={{
                order: p.sidebarSide === "left" ? 1 : 2,
                background: p.sidebarBg,
                borderRadius: p.radius,
                padding: 24,
                position: p.stickySidebar === "yes" ? "sticky" : "relative",
                top: p.stickySidebar === "yes" ? 24 : undefined,
                alignSelf: "start",
              }}
            >
              <p.sidebar style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={160} />
            </aside>
          </div>
        )
      );
    },
  },

  AsymmetricGrid: {
    label: "Asymmetric 3 vùng",
    fields: {
      gap: { type: "number" as const, label: "Gap", min: 0 },
      leftSpan: { type: "number" as const, label: "Left span (1-8)", min: 1, max: 8 },
      midSpan: { type: "number" as const, label: "Mid span (1-8)", min: 1, max: 8 },
      rightSpan: { type: "number" as const, label: "Right span (1-8)", min: 1, max: 8 },
      minHeight: { type: "number" as const, label: "Min height", min: 0 },
      left: { type: "slot" as const, label: "Vùng trái" },
      mid: { type: "slot" as const, label: "Vùng giữa" },
      right: { type: "slot" as const, label: "Vùng phải" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 20,
      leftSpan: 3,
      midSpan: 5,
      rightSpan: 4,
      minHeight: 280,
      left: [],
      mid: [],
      right: [],
      spacing: defaultSpacingGroup(40, { background: "#ffffff", maxWidth: 1200 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        leftSpan: number;
        midSpan: number;
        rightSpan: number;
        minHeight: number;
        left: SlotRender;
        mid: SlotRender;
        right: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-asym"
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr",
              minHeight: p.minHeight,
            }}
          >
            <style>{`
              @media (min-width: 900px) {
                .layout-asym {
                  grid-template-columns: repeat(12, 1fr) !important;
                }
                .layout-asym-left { grid-column: span ${p.leftSpan}; }
                .layout-asym-mid { grid-column: span ${p.midSpan}; }
                .layout-asym-right { grid-column: span ${p.rightSpan}; }
              }
            `}</style>
            {[
              ["left", p.left],
              ["mid", p.mid],
              ["right", p.right],
            ].map(([name, SlotComp]) => {
              const Comp = SlotComp as SlotRender;
              return (
                <div key={name as string} className={`layout-asym-${name}`}>
                  <Comp
                    style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}
                    minEmptyHeight={140}
                  />
                </div>
              );
            })}
          </div>
        )
      );
    },
  },

  CardGridLayout: {
    label: "Card Grid (2–4)",
    fields: {
      columns: {
        type: "radio" as const,
        label: "Số cột",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      cardBg: { type: "text" as const, label: "Nền card" },
      cardRadius: { type: "number" as const, label: "Bo góc card", min: 0 },
      cardPadding: { type: "number" as const, label: "Padding card", min: 0 },
      cardBorder: { type: "text" as const, label: "Màu viền card" },
      cardShadow: {
        type: "radio" as const,
        label: "Đổ bóng",
        options: [
          { label: "Không", value: "no" },
          { label: "Nhẹ", value: "soft" },
          { label: "Đậm", value: "strong" },
        ],
      },
      card1: { type: "slot" as const, label: "Card 1" },
      card2: { type: "slot" as const, label: "Card 2" },
      card3: { type: "slot" as const, label: "Card 3" },
      card4: { type: "slot" as const, label: "Card 4" },
      ...commonSpacingFields,
    },
    defaultProps: {
      columns: "3",
      gap: 24,
      cardBg: "#ffffff",
      cardRadius: 16,
      cardPadding: 24,
      cardBorder: "#e7e5e4",
      cardShadow: "soft",
      card1: [],
      card2: [],
      card3: [],
      card4: [],
      spacing: defaultSpacingGroup(48, { background: "#fafaf9", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        columns: "2" | "3" | "4";
        gap: number;
        cardBg: string;
        cardRadius: number;
        cardPadding: number;
        cardBorder: string;
        cardShadow: "no" | "soft" | "strong";
        card1: SlotRender;
        card2: SlotRender;
        card3: SlotRender;
        card4: SlotRender;
      };
      const count = Number(p.columns);
      const cards = [p.card1, p.card2, p.card3, p.card4].slice(0, count);
      const shadow =
        p.cardShadow === "soft"
          ? "0 8px 24px rgba(0,0,0,0.06)"
          : p.cardShadow === "strong"
            ? "0 16px 40px rgba(0,0,0,0.12)"
            : "none";

      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className={`layout-cards layout-cards-${count}`}
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr",
            }}
          >
            <style>{`
              @media (min-width: 768px) {
                .layout-cards-${count} {
                  grid-template-columns: repeat(${count}, minmax(0, 1fr)) !important;
                }
              }
            `}</style>
            {cards.map((Card, i) => (
              <div
                key={i}
                style={{
                  background: p.cardBg,
                  borderRadius: p.cardRadius,
                  padding: p.cardPadding,
                  border: `1px solid ${p.cardBorder}`,
                  boxShadow: shadow,
                }}
              >
                <Card style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={120} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  BannerHero: {
    label: "Banner Full-bleed",
    fields: {
      image: imageField("Ảnh nền"),
      overlayColor: { type: "text" as const, label: "Màu overlay" },
      overlayOpacity: { type: "number" as const, label: "Overlay %", min: 0, max: 90 },
      minHeight: { type: "number" as const, label: "Min height", min: 200 },
      contentAlign: {
        type: "radio" as const,
        label: "Căn ngang",
        options: [
          { label: "Trái", value: "flex-start" },
          { label: "Giữa", value: "center" },
          { label: "Phải", value: "flex-end" },
        ],
      },
      contentVertical: {
        type: "radio" as const,
        label: "Căn dọc",
        options: [
          { label: "Trên", value: "flex-start" },
          { label: "Giữa", value: "center" },
          { label: "Dưới", value: "flex-end" },
        ],
      },
      contentMax: { type: "number" as const, label: "Max width content", min: 320 },
      content: { type: "slot" as const, label: "Nội dung trên banner" },
      ...commonSpacingFields,
    },
    defaultProps: {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
      overlayColor: "#000000",
      overlayOpacity: 45,
      minHeight: 480,
      contentAlign: "center",
      contentVertical: "center",
      contentMax: 720,
      content: [],
      spacing: defaultSpacingGroup(64, { background: "#0c0a09", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const {
        image,
        overlayColor,
        overlayOpacity,
        minHeight,
        contentAlign,
        contentVertical,
        contentMax,
      } = props as {
        image: string;
        overlayColor: string;
        overlayOpacity: number;
        minHeight: number;
        contentAlign: string;
        contentVertical: string;
        contentMax: number;
        content: SlotRender;
      };
      const Content = props.content as SlotRender;
      const s = resolveSpacing(props);
      return (
        <section
          style={{
            position: "relative",
            minHeight,
            background: s.background,
            ...spacingToCss(s.margin, "margin"),
            overflow: "hidden",
          }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : null}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: overlayColor,
              opacity: overlayOpacity / 100,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              minHeight,
              display: "flex",
              justifyContent: contentAlign,
              alignItems: contentVertical,
              ...spacingToCss(s.padding, "padding"),
            }}
          >
            <div style={{ width: "100%", maxWidth: contentMax }}>
              <Content style={{ display: "flex", flexDirection: "column", gap: 14 }} minEmptyHeight={100} />
            </div>
          </div>
        </section>
      );
    },
  },

  NarrowCenter: {
    label: "Narrow Centered",
    fields: {
      contentWidth: { type: "number" as const, label: "Độ hẹp content (px)", min: 280 },
      align: {
        type: "radio" as const,
        label: "Căn chữ mặc định",
        options: [
          { label: "Trái", value: "left" },
          { label: "Giữa", value: "center" },
        ],
      },
      content: { type: "slot" as const, label: "Nội dung" },
      ...commonSpacingFields,
    },
    defaultProps: {
      contentWidth: 680,
      align: "center",
      content: [],
      spacing: defaultSpacingGroup(64, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { contentWidth, align } = props as {
        contentWidth: number;
        align: "left" | "center";
        content: SlotRender;
      };
      const Content = props.content as SlotRender;
      return sectionFromProps(
        props,
        <div style={{ maxWidth: contentWidth, margin: "0 auto", textAlign: align }}>
          <Content style={{ display: "flex", flexDirection: "column", gap: 14 }} minEmptyHeight={100} />
        </div>
      );
    },
  },

  StatsRow: {
    label: "Stats / Numbers Row",
    fields: {
      columns: {
        type: "radio" as const,
        label: "Số cột",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      numberColor: { type: "text" as const, label: "Màu số" },
      labelColor: { type: "text" as const, label: "Màu nhãn" },
      numberSize: { type: "number" as const, label: "Cỡ số", min: 20 },
      labelSize: { type: "number" as const, label: "Cỡ nhãn", min: 11 },
      align: {
        type: "radio" as const,
        label: "Căn",
        options: [
          { label: "Trái", value: "left" },
          { label: "Giữa", value: "center" },
        ],
      },
      items: {
        type: "array" as const,
        label: "Các số liệu",
        getItemSummary: (item: { number?: string; label?: string }) =>
          `${item.number || "0"} — ${item.label || "Label"}`,
        defaultItemProps: { number: "100+", label: "Dự án" },
        arrayFields: {
          number: { type: "text" as const, label: "Số" },
          label: { type: "text" as const, label: "Nhãn" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      columns: "4",
      gap: 24,
      numberColor: "#ffffff",
      labelColor: "#a7f3d0",
      numberSize: 40,
      labelSize: 14,
      align: "center",
      items: [
        { number: "120+", label: "Dự án" },
        { number: "40+", label: "Đối tác" },
        { number: "8", label: "Năm" },
        { number: "98%", label: "Hài lòng" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#14532d", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        columns: string;
        gap: number;
        numberColor: string;
        labelColor: string;
        numberSize: number;
        labelSize: number;
        align: "left" | "center";
        items: { number: string; label: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className={`layout-stats layout-stats-${p.columns}`}
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr 1fr",
              textAlign: p.align,
            }}
          >
            <style>{`
              @media (min-width: 768px) {
                .layout-stats-${p.columns} {
                  grid-template-columns: repeat(${p.columns}, minmax(0, 1fr)) !important;
                }
              }
            `}</style>
            {(p.items || []).map((item, i) => (
              <div key={i}>
                <div
                  style={{
                    color: p.numberColor,
                    fontSize: p.numberSize,
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  {item.number}
                </div>
                <div
                  style={{
                    color: p.labelColor,
                    fontSize: p.labelSize,
                    marginTop: 8,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  LogoCloud: {
    label: "Logo Cloud",
    fields: {
      columns: {
        type: "radio" as const,
        label: "Số cột",
        options: [
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
          { label: "6", value: "6" },
        ],
      },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      grayscale: {
        type: "radio" as const,
        label: "Grayscale",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      logos: {
        type: "array" as const,
        label: "Logo",
        getItemSummary: (item: { name?: string }, i?: number) =>
          item.name || `Logo ${(i ?? 0) + 1}`,
        defaultItemProps: {
          name: "Partner",
          src: "https://placehold.co/160x48/png?text=Logo",
        },
        arrayFields: {
          name: { type: "text" as const, label: "Tên" },
          src: imageField("Logo"),
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      columns: "5",
      gap: 32,
      grayscale: "yes",
      logos: [
        { name: "A", src: "https://placehold.co/160x48/png?text=Alpha" },
        { name: "B", src: "https://placehold.co/160x48/png?text=Beta" },
        { name: "C", src: "https://placehold.co/160x48/png?text=Gamma" },
        { name: "D", src: "https://placehold.co/160x48/png?text=Delta" },
        { name: "E", src: "https://placehold.co/160x48/png?text=Echo" },
      ],
      spacing: defaultSpacingGroup(40, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        columns: string;
        gap: number;
        grayscale: "yes" | "no";
        logos: { name: string; src: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className={`layout-logos layout-logos-${p.columns}`}
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              alignItems: "center",
            }}
          >
            <style>{`
              @media (min-width: 768px) {
                .layout-logos-${p.columns} {
                  grid-template-columns: repeat(${p.columns}, minmax(0, 1fr)) !important;
                }
              }
            `}</style>
            {(p.logos || []).map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={logo.src}
                alt={logo.name}
                style={{
                  maxWidth: "100%",
                  height: 40,
                  objectFit: "contain",
                  margin: "0 auto",
                  filter: p.grayscale === "yes" ? "grayscale(1) opacity(0.7)" : "none",
                }}
              />
            ))}
          </div>
        )
      );
    },
  },

  PricingLayout: {
    label: "Pricing Columns",
    fields: {
      columns: {
        type: "radio" as const,
        label: "Số gói",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      highlight: {
        type: "select" as const,
        label: "Gói nổi bật",
        options: [
          { label: "Không", value: "0" },
          { label: "Gói 1", value: "1" },
          { label: "Gói 2", value: "2" },
          { label: "Gói 3", value: "3" },
          { label: "Gói 4", value: "4" },
        ],
      },
      plan1: { type: "slot" as const, label: "Gói 1" },
      plan2: { type: "slot" as const, label: "Gói 2" },
      plan3: { type: "slot" as const, label: "Gói 3" },
      plan4: { type: "slot" as const, label: "Gói 4" },
      ...commonSpacingFields,
    },
    defaultProps: {
      columns: "3",
      gap: 20,
      highlight: "2",
      plan1: [],
      plan2: [],
      plan3: [],
      plan4: [],
      spacing: defaultSpacingGroup(48, { background: "#fafaf9", maxWidth: 1100 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        columns: string;
        gap: number;
        highlight: string;
        plan1: SlotRender;
        plan2: SlotRender;
        plan3: SlotRender;
        plan4: SlotRender;
      };
      const count = Number(p.columns);
      const plans = [p.plan1, p.plan2, p.plan3, p.plan4].slice(0, count);
      const hi = Number(p.highlight);

      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className={`layout-pricing layout-pricing-${count}`}
            style={{ display: "grid", gap: p.gap, gridTemplateColumns: "1fr" }}
          >
            <style>{`
              @media (min-width: 800px) {
                .layout-pricing-${count} {
                  grid-template-columns: repeat(${count}, minmax(0, 1fr)) !important;
                  align-items: stretch;
                }
              }
            `}</style>
            {plans.map((Plan, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 24,
                  border: hi === i + 1 ? "2px solid #047857" : "1px solid #e7e5e4",
                  transform: hi === i + 1 ? "scale(1.03)" : undefined,
                  boxShadow: hi === i + 1 ? "0 16px 40px rgba(4,120,87,0.15)" : undefined,
                }}
              >
                <Plan style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={160} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  ZigZag: {
    label: "ZigZag (2 hàng đảo)",
    fields: {
      gap: { type: "number" as const, label: "Gap hàng", min: 0 },
      ratio: { type: "select" as const, label: "Tỷ lệ", options: ratioOptions },
      row1Media: { type: "slot" as const, label: "Hàng 1 — Media" },
      row1Content: { type: "slot" as const, label: "Hàng 1 — Content" },
      row2Media: { type: "slot" as const, label: "Hàng 2 — Media" },
      row2Content: { type: "slot" as const, label: "Hàng 2 — Content" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 48,
      ratio: "1fr 1fr",
      row1Media: [],
      row1Content: [],
      row2Media: [],
      row2Content: [],
      spacing: defaultSpacingGroup(48, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        ratio: string;
        row1Media: SlotRender;
        row1Content: SlotRender;
        row2Media: SlotRender;
        row2Content: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexDirection: "column", gap: p.gap }}>
            {[
              { media: p.row1Media, content: p.row1Content, reverse: false },
              { media: p.row2Media, content: p.row2Content, reverse: true },
            ].map((row, idx) => (
              <div
                key={idx}
                className={`layout-zigzag layout-zigzag-${idx}`}
                style={{
                  display: "grid",
                  gap: 28,
                  gridTemplateColumns: "1fr",
                  alignItems: "center",
                }}
              >
                <style>{`
                  @media (min-width: 768px) {
                    .layout-zigzag-${idx} {
                      grid-template-columns: ${p.ratio} !important;
                    }
                  }
                `}</style>
                <div style={{ order: row.reverse ? 2 : 1 }}>
                  <row.media
                    style={{ display: "flex", flexDirection: "column", gap: 12 }}
                    minEmptyHeight={160}
                  />
                </div>
                <div style={{ order: row.reverse ? 1 : 2 }}>
                  <row.content
                    style={{ display: "flex", flexDirection: "column", gap: 12 }}
                    minEmptyHeight={120}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  StickyScroll: {
    label: "Sticky Left + Scroll Right",
    fields: {
      leftWidth: { type: "number" as const, label: "Left width %", min: 25, max: 60 },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      stickyTop: { type: "number" as const, label: "Sticky offset", min: 0 },
      left: { type: "slot" as const, label: "Cột sticky" },
      right: { type: "slot" as const, label: "Cột scroll" },
      ...commonSpacingFields,
    },
    defaultProps: {
      leftWidth: 40,
      gap: 40,
      stickyTop: 100,
      left: [],
      right: [],
      spacing: defaultSpacingGroup(48, { background: "#ffffff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        leftWidth: number;
        gap: number;
        stickyTop: number;
        left: SlotRender;
        right: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-sticky-scroll"
            style={{ display: "grid", gap: p.gap, gridTemplateColumns: "1fr" }}
          >
            <style>{`
              @media (min-width: 900px) {
                .layout-sticky-scroll {
                  grid-template-columns: ${p.leftWidth}% ${100 - p.leftWidth}% !important;
                }
              }
            `}</style>
            <div style={{ position: "sticky", top: p.stickyTop, alignSelf: "start" }}>
              <p.left style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={140} />
            </div>
            <div>
              <p.right style={{ display: "flex", flexDirection: "column", gap: 16 }} minEmptyHeight={280} />
            </div>
          </div>
        )
      );
    },
  },

  OverlayCard: {
    label: "Hero + Overlay Card",
    fields: {
      image: imageField("Ảnh nền"),
      overlayOpacity: { type: "number" as const, label: "Overlay %", min: 0, max: 80 },
      heroHeight: { type: "number" as const, label: "Chiều cao hero", min: 200 },
      cardSide: {
        type: "radio" as const,
        label: "Vị trí card",
        options: [
          { label: "Trái", value: "left" },
          { label: "Phải", value: "right" },
        ],
      },
      cardWidth: { type: "number" as const, label: "Card width (px)", min: 260 },
      cardBg: { type: "text" as const, label: "Nền card" },
      cardRadius: { type: "number" as const, label: "Bo góc card", min: 0 },
      overlap: { type: "number" as const, label: "Độ đè xuống (px)", min: 0 },
      hero: { type: "slot" as const, label: "Text trên hero" },
      card: { type: "slot" as const, label: "Card nổi" },
      ...commonSpacingFields,
    },
    defaultProps: {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
      overlayOpacity: 40,
      heroHeight: 420,
      cardSide: "right",
      cardWidth: 380,
      cardBg: "#ffffff",
      cardRadius: 16,
      overlap: 64,
      hero: [],
      card: [],
      spacing: defaultSpacingGroup(0, {
        margin: defaultSpacing(0, { bottom: 80 }),
        background: "#0c0a09",
        maxWidth: 1140,
      }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        image: string;
        overlayOpacity: number;
        heroHeight: number;
        cardSide: "left" | "right";
        cardWidth: number;
        cardBg: string;
        cardRadius: number;
        overlap: number;
        hero: SlotRender;
        card: SlotRender;
      };
      const s = resolveSpacing(props);
      return (
        <section style={{ ...spacingToCss(s.margin, "margin"), position: "relative" }}>
          <div
            style={{
              position: "relative",
              minHeight: p.heroHeight,
              background: s.background,
              overflow: "hidden",
            }}
          >
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#000",
                opacity: p.overlayOpacity / 100,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: s.maxWidth,
                margin: "0 auto",
                padding: "64px 24px",
                minHeight: p.heroHeight,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ maxWidth: 520 }}>
                <p.hero style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={80} />
              </div>
            </div>
          </div>
          <div
            style={{
              maxWidth: s.maxWidth,
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              justifyContent: p.cardSide === "left" ? "flex-start" : "flex-end",
              marginTop: -p.overlap,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: p.cardWidth,
                background: p.cardBg,
                borderRadius: p.cardRadius,
                padding: 28,
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              }}
            >
              <p.card style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={120} />
            </div>
          </div>
        </section>
      );
    },
  },

  BentoGrid: {
    label: "Bento Grid (5 ô)",
    fields: {
      gap: { type: "number" as const, label: "Gap", min: 0 },
      cellBg: { type: "text" as const, label: "Nền ô" },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      a: { type: "slot" as const, label: "Ô lớn trái" },
      b: { type: "slot" as const, label: "Ô trên phải" },
      c: { type: "slot" as const, label: "Ô giữa phải" },
      d: { type: "slot" as const, label: "Ô dưới trái" },
      e: { type: "slot" as const, label: "Ô dưới phải" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 16,
      cellBg: "#ffffff",
      radius: 18,
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      spacing: defaultSpacingGroup(40, { background: "#f5f5f4", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        cellBg: string;
        radius: number;
        a: SlotRender;
        b: SlotRender;
        c: SlotRender;
        d: SlotRender;
        e: SlotRender;
      };
      const cell = (Comp: SlotRender, minH = 140): ReactNode => (
        <div
          style={{
            background: p.cellBg,
            borderRadius: p.radius,
            padding: 20,
            minHeight: minH,
            height: "100%",
          }}
        >
          <Comp style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%" }} minEmptyHeight={80} />
        </div>
      );

      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-bento"
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr",
            }}
          >
            <style>{`
              @media (min-width: 900px) {
                .layout-bento {
                  grid-template-columns: 1.4fr 1fr 1fr !important;
                  grid-template-rows: 180px 140px 180px;
                }
                .bento-a { grid-row: 1 / 3; grid-column: 1; }
                .bento-b { grid-column: 2 / 4; grid-row: 1; }
                .bento-c { grid-column: 2; grid-row: 2; }
                .bento-d { grid-column: 3; grid-row: 2 / 4; }
                .bento-e { grid-column: 1 / 3; grid-row: 3; }
              }
            `}</style>
            <div className="bento-a">{cell(p.a, 200)}</div>
            <div className="bento-b">{cell(p.b)}</div>
            <div className="bento-c">{cell(p.c)}</div>
            <div className="bento-d">{cell(p.d, 200)}</div>
            <div className="bento-e">{cell(p.e)}</div>
          </div>
        )
      );
    },
  },

  MagazineLayout: {
    label: "Magazine (1 lớn + stack)",
    fields: {
      gap: { type: "number" as const, label: "Gap", min: 0 },
      featuredRatio: {
        type: "select" as const,
        label: "Tỷ lệ featured",
        options: [
          { label: "55 / 45", value: "1.2fr 1fr" },
          { label: "60 / 40", value: "3fr 2fr" },
          { label: "66 / 34", value: "2fr 1fr" },
        ],
      },
      featured: { type: "slot" as const, label: "Bài nổi bật" },
      stack1: { type: "slot" as const, label: "Stack 1" },
      stack2: { type: "slot" as const, label: "Stack 2" },
      stack3: { type: "slot" as const, label: "Stack 3" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 24,
      featuredRatio: "1.2fr 1fr",
      featured: [],
      stack1: [],
      stack2: [],
      stack3: [],
      spacing: defaultSpacingGroup(48, { background: "transparent", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        featuredRatio: string;
        featured: SlotRender;
        stack1: SlotRender;
        stack2: SlotRender;
        stack3: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-magazine"
            style={{ display: "grid", gap: p.gap, gridTemplateColumns: "1fr" }}
          >
            <style>{`
              @media (min-width: 900px) {
                .layout-magazine { grid-template-columns: ${p.featuredRatio} !important; }
              }
            `}</style>
            <div style={{ minHeight: 280 }}>
              <p.featured style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }} minEmptyHeight={220} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: p.gap }}>
              {[p.stack1, p.stack2, p.stack3].map((Comp, i) => (
                <div key={i} style={{ flex: 1, minHeight: 100 }}>
                  <Comp style={{ display: "flex", flexDirection: "column", gap: 8 }} minEmptyHeight={80} />
                </div>
              ))}
            </div>
          </div>
        )
      );
    },
  },

  CtaBand: {
    label: "CTA Band",
    fields: {
      align: {
        type: "select" as const,
        label: "Căn",
        options: [
          { label: "Trái", value: "flex-start" },
          { label: "Giữa", value: "center" },
          { label: "Space between", value: "space-between" },
        ],
      },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      content: { type: "slot" as const, label: "Nội dung / CTA" },
      ...commonSpacingFields,
    },
    defaultProps: {
      align: "space-between",
      radius: 16,
      content: [],
      spacing: defaultSpacingGroup(28, {
        padding: defaultSpacing(28, { left: 28, right: 28 }),
        margin: defaultSpacing(24, { left: 24, right: 24 }),
        background: "#0f172a",
        maxWidth: 1140,
      }),
    },
    render: (props: Record<string, unknown>) => {
      const { align, radius } = props as {
        align: string;
        radius: number;
        content: SlotRender;
      };
      const Content = props.content as SlotRender;
      const s = resolveSpacing(props);
      return sectionShell(
        defaultSpacing(0),
        s.margin,
        "transparent",
        boxed(
          s.maxWidth,
          <div
            style={{
              background: s.background,
              borderRadius: radius,
              ...spacingToCss(s.padding, "padding"),
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: align,
              gap: 16,
              color: "#fff",
            }}
          >
            <Content
              style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", width: "100%" }}
              minEmptyHeight={48}
            />
          </div>
        )
      );
    },
  },

  ProcessSteps: {
    label: "Process Steps",
    fields: {
      columns: {
        type: "select" as const,
        label: "Số bước",
        options: [
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ],
      },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      showNumbers: {
        type: "radio" as const,
        label: "Hiện số thứ tự",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      numberColor: { type: "text" as const, label: "Màu số" },
      step1: { type: "slot" as const, label: "Bước 1" },
      step2: { type: "slot" as const, label: "Bước 2" },
      step3: { type: "slot" as const, label: "Bước 3" },
      step4: { type: "slot" as const, label: "Bước 4" },
      step5: { type: "slot" as const, label: "Bước 5" },
      ...commonSpacingFields,
    },
    defaultProps: {
      columns: "4",
      gap: 20,
      showNumbers: "yes",
      numberColor: "#0f766e",
      step1: [],
      step2: [],
      step3: [],
      step4: [],
      step5: [],
      spacing: defaultSpacingGroup(48, { background: "transparent", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        columns: string;
        gap: number;
        showNumbers: string;
        numberColor: string;
        step1: SlotRender;
        step2: SlotRender;
        step3: SlotRender;
        step4: SlotRender;
        step5: SlotRender;
      };
      const n = Number(p.columns);
      const steps = [p.step1, p.step2, p.step3, p.step4, p.step5].slice(0, n);
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-steps"
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr",
            }}
          >
            <style>{`
              @media (min-width: 800px) {
                .layout-steps { grid-template-columns: repeat(${n}, 1fr) !important; }
              }
            `}</style>
            {steps.map((Comp, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {p.showNumbers === "yes" ? (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: p.numberColor,
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </div>
                ) : null}
                <Comp style={{ display: "flex", flexDirection: "column", gap: 8 }} minEmptyHeight={80} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  TimelineLayout: {
    label: "Timeline dọc",
    fields: {
      gap: { type: "number" as const, label: "Gap", min: 0 },
      lineColor: { type: "text" as const, label: "Màu đường" },
      dotColor: { type: "text" as const, label: "Màu chấm" },
      item1: { type: "slot" as const, label: "Mốc 1" },
      item2: { type: "slot" as const, label: "Mốc 2" },
      item3: { type: "slot" as const, label: "Mốc 3" },
      item4: { type: "slot" as const, label: "Mốc 4" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 28,
      lineColor: "#cbd5e1",
      dotColor: "#0f766e",
      item1: [],
      item2: [],
      item3: [],
      item4: [],
      spacing: defaultSpacingGroup(48, { background: "transparent", maxWidth: 760 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        lineColor: string;
        dotColor: string;
        item1: SlotRender;
        item2: SlotRender;
        item3: SlotRender;
        item4: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexDirection: "column", gap: p.gap, position: "relative", paddingLeft: 28 }}>
            <div
              style={{
                position: "absolute",
                left: 7,
                top: 8,
                bottom: 8,
                width: 2,
                background: p.lineColor,
              }}
            />
            {[p.item1, p.item2, p.item3, p.item4].map((Comp, i) => (
              <div key={i} style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: -28,
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    background: p.dotColor,
                    border: "3px solid #fff",
                    boxShadow: `0 0 0 2px ${p.dotColor}`,
                  }}
                />
                <Comp style={{ display: "flex", flexDirection: "column", gap: 8 }} minEmptyHeight={72} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  ContactSplit: {
    label: "Contact Split",
    fields: {
      ratio: { type: "select" as const, label: "Tỷ lệ", options: ratioOptions },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      infoBg: { type: "text" as const, label: "Nền info" },
      formBg: { type: "text" as const, label: "Nền form" },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      info: { type: "slot" as const, label: "Thông tin liên hệ" },
      form: { type: "slot" as const, label: "Form / Map" },
      ...commonSpacingFields,
    },
    defaultProps: {
      ratio: "1fr 1fr",
      gap: 24,
      infoBg: "#0f172a",
      formBg: "#ffffff",
      radius: 18,
      info: [],
      form: [],
      spacing: defaultSpacingGroup(48, { background: "transparent", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        ratio: string;
        gap: number;
        infoBg: string;
        formBg: string;
        radius: number;
        info: SlotRender;
        form: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-contact"
            style={{ display: "grid", gap: p.gap, gridTemplateColumns: "1fr" }}
          >
            <style>{`
              @media (min-width: 900px) {
                .layout-contact { grid-template-columns: ${p.ratio} !important; }
              }
            `}</style>
            <div style={{ background: p.infoBg, borderRadius: p.radius, padding: 28, color: "#fff", minHeight: 280 }}>
              <p.info style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={180} />
            </div>
            <div style={{ background: p.formBg, borderRadius: p.radius, padding: 28, minHeight: 280, border: "1px solid #e2e8f0" }}>
              <p.form style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={180} />
            </div>
          </div>
        )
      );
    },
  },

  FeatureRows: {
    label: "Feature Rows",
    fields: {
      gap: { type: "number" as const, label: "Gap hàng", min: 0 },
      rowBg: { type: "text" as const, label: "Nền hàng" },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      row1: { type: "slot" as const, label: "Hàng 1" },
      row2: { type: "slot" as const, label: "Hàng 2" },
      row3: { type: "slot" as const, label: "Hàng 3" },
      row4: { type: "slot" as const, label: "Hàng 4" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 14,
      rowBg: "#f8fafc",
      radius: 14,
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      spacing: defaultSpacingGroup(40, { background: "transparent", maxWidth: 900 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        rowBg: string;
        radius: number;
        row1: SlotRender;
        row2: SlotRender;
        row3: SlotRender;
        row4: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexDirection: "column", gap: p.gap }}>
            {[p.row1, p.row2, p.row3, p.row4].map((Comp, i) => (
              <div
                key={i}
                style={{
                  background: p.rowBg,
                  borderRadius: p.radius,
                  padding: "18px 20px",
                }}
              >
                <Comp style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }} minEmptyHeight={48} />
              </div>
            ))}
          </div>
        )
      );
    },
  },

  QuoteFeature: {
    label: "Quote Feature",
    fields: {
      ratio: { type: "select" as const, label: "Tỷ lệ", options: ratioOptions },
      gap: { type: "number" as const, label: "Gap", min: 0 },
      quoteBg: { type: "text" as const, label: "Nền quote" },
      accent: { type: "text" as const, label: "Màu accent" },
      quote: { type: "slot" as const, label: "Quote / nội dung" },
      meta: { type: "slot" as const, label: "Avatar / meta" },
      ...commonSpacingFields,
    },
    defaultProps: {
      ratio: "2fr 1fr",
      gap: 28,
      quoteBg: "#f0fdfa",
      accent: "#0f766e",
      quote: [],
      meta: [],
      spacing: defaultSpacingGroup(48, { background: "transparent", maxWidth: 1000 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        ratio: string;
        gap: number;
        quoteBg: string;
        accent: string;
        quote: SlotRender;
        meta: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-quote"
            style={{
              display: "grid",
              gap: p.gap,
              gridTemplateColumns: "1fr",
              background: p.quoteBg,
              borderRadius: 20,
              padding: 32,
              borderLeft: `5px solid ${p.accent}`,
            }}
          >
            <style>{`
              @media (min-width: 800px) {
                .layout-quote { grid-template-columns: ${p.ratio} !important; align-items: center; }
              }
            `}</style>
            <p.quote style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={100} />
            <p.meta style={{ display: "flex", flexDirection: "column", gap: 8 }} minEmptyHeight={80} />
          </div>
        )
      );
    },
  },

  TwoColumnCompare: {
    label: "So sánh 2 cột",
    fields: {
      gap: { type: "number" as const, label: "Gap", min: 0 },
      leftBg: { type: "text" as const, label: "Nền trái" },
      rightBg: { type: "text" as const, label: "Nền phải" },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      left: { type: "slot" as const, label: "Cột trái" },
      right: { type: "slot" as const, label: "Cột phải" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 20,
      leftBg: "#ffffff",
      rightBg: "#0f172a",
      radius: 18,
      left: [],
      right: [],
      spacing: defaultSpacingGroup(48, { background: "transparent", maxWidth: 1000 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        leftBg: string;
        rightBg: string;
        radius: number;
        left: SlotRender;
        right: SlotRender;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="layout-compare"
            style={{ display: "grid", gap: p.gap, gridTemplateColumns: "1fr" }}
          >
            <style>{`
              @media (min-width: 800px) {
                .layout-compare { grid-template-columns: 1fr 1fr !important; }
              }
            `}</style>
            <div style={{ background: p.leftBg, borderRadius: p.radius, padding: 28, border: "1px solid #e2e8f0", minHeight: 240 }}>
              <p.left style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={160} />
            </div>
            <div style={{ background: p.rightBg, borderRadius: p.radius, padding: 28, color: "#fff", minHeight: 240 }}>
              <p.right style={{ display: "flex", flexDirection: "column", gap: 12 }} minEmptyHeight={160} />
            </div>
          </div>
        )
      );
    },
  },

  HeroCentered: {
    label: "Hero Centered",
    fields: {
      contentWidth: { type: "number" as const, label: "Max width nội dung", min: 320 },
      minHeight: { type: "number" as const, label: "Min height", min: 200 },
      content: { type: "slot" as const, label: "Nội dung giữa" },
      ...commonSpacingFields,
    },
    defaultProps: {
      contentWidth: 720,
      minHeight: 420,
      content: [],
      spacing: defaultSpacingGroup(80, {
        background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
        maxWidth: 1280,
      }),
    },
    render: (props: Record<string, unknown>) => {
      const { contentWidth, minHeight } = props as {
        contentWidth: number;
        minHeight: number;
        content: SlotRender;
      };
      const Content = props.content as SlotRender;
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            style={{
              minHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: contentWidth, width: "100%" }}>
              <Content
                style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
                minEmptyHeight={120}
              />
            </div>
          </div>
        )
      );
    },
  },

  MosaicFour: {
    label: "Mosaic 4 ô lệch",
    fields: {
      gap: { type: "number" as const, label: "Gap", min: 0 },
      cellBg: { type: "text" as const, label: "Nền ô" },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      a: { type: "slot" as const, label: "Ô A (lớn)" },
      b: { type: "slot" as const, label: "Ô B" },
      c: { type: "slot" as const, label: "Ô C" },
      d: { type: "slot" as const, label: "Ô D (rộng)" },
      ...commonSpacingFields,
    },
    defaultProps: {
      gap: 14,
      cellBg: "#fff",
      radius: 16,
      a: [],
      b: [],
      c: [],
      d: [],
      spacing: defaultSpacingGroup(40, { background: "transparent", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const p = props as {
        gap: number;
        cellBg: string;
        radius: number;
        a: SlotRender;
        b: SlotRender;
        c: SlotRender;
        d: SlotRender;
      };
      const cell = (Comp: SlotRender, minH: number) => (
        <div
          style={{
            background: p.cellBg,
            borderRadius: p.radius,
            padding: 18,
            minHeight: minH,
            height: "100%",
            border: "1px solid #e2e8f0",
          }}
        >
          <Comp style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }} minEmptyHeight={60} />
        </div>
      );
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="layout-mosaic" style={{ display: "grid", gap: p.gap, gridTemplateColumns: "1fr" }}>
            <style>{`
              @media (min-width: 900px) {
                .layout-mosaic {
                  grid-template-columns: 1.3fr 1fr 1fr !important;
                  grid-template-rows: 200px 160px;
                }
                .mosaic-a { grid-row: 1 / 3; }
                .mosaic-d { grid-column: 2 / 4; }
              }
            `}</style>
            <div className="mosaic-a">{cell(p.a, 220)}</div>
            <div className="mosaic-b">{cell(p.b, 140)}</div>
            <div className="mosaic-c">{cell(p.c, 140)}</div>
            <div className="mosaic-d">{cell(p.d, 140)}</div>
          </div>
        )
      );
    },
  },
};
