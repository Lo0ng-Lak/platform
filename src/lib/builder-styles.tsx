import type { CSSProperties, ElementType, ReactNode } from "react";
import type { Fields } from "@puckeditor/core";

export type SpacingBox = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LayoutSettings = {
  tag: "div" | "section" | "header" | "footer" | "main" | "article" | "aside";
  contentWidth: "boxed" | "full";
  width: number;
  minHeight: number;
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
  flexWrap: "nowrap" | "wrap";
  gap: number;
  overflow: "visible" | "hidden" | "auto";
};

export type BackgroundSettings = {
  type: "color" | "image" | "gradient";
  color: string;
  imageUrl: string;
  imagePosition: string;
  imageSize: "cover" | "contain" | "auto";
  imageRepeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  gradient: string;
  overlayColor: string;
  overlayOpacity: number;
};

export type BorderSettings = {
  width: number;
  style: "none" | "solid" | "dashed" | "dotted";
  color: string;
  radius: number;
};

export type ShadowSettings = {
  enabled: "yes" | "no";
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

export type TypographySettings = {
  fontSize: number;
  fontWeight: "300" | "400" | "500" | "600" | "700" | "800";
  lineHeight: number;
  letterSpacing: number;
  textAlign: "left" | "center" | "right" | "justify";
  color: string;
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
};

export const defaultSpacing = (
  all = 0,
  overrides: Partial<SpacingBox> = {}
): SpacingBox => ({
  top: all,
  right: all,
  bottom: all,
  left: all,
  ...overrides,
});

export const defaultLayout = (
  overrides: Partial<LayoutSettings> = {}
): LayoutSettings => ({
  tag: "div",
  contentWidth: "boxed",
  width: 1140,
  minHeight: 0,
  direction: "column",
  justifyContent: "flex-start",
  alignItems: "stretch",
  flexWrap: "nowrap",
  gap: 16,
  overflow: "visible",
  ...overrides,
});

export const defaultBackground = (
  overrides: Partial<BackgroundSettings> = {}
): BackgroundSettings => ({
  type: "color",
  color: "transparent",
  imageUrl: "",
  imagePosition: "center center",
  imageSize: "cover",
  imageRepeat: "no-repeat",
  gradient: "linear-gradient(135deg, #ecfdf5 0%, #fafaf9 100%)",
  overlayColor: "#000000",
  overlayOpacity: 0,
  ...overrides,
});

export const defaultBorder = (
  overrides: Partial<BorderSettings> = {}
): BorderSettings => ({
  width: 0,
  style: "solid",
  color: "#e7e5e4",
  radius: 0,
  ...overrides,
});

export const defaultShadow = (
  overrides: Partial<ShadowSettings> = {}
): ShadowSettings => ({
  enabled: "no",
  x: 0,
  y: 8,
  blur: 24,
  spread: 0,
  color: "rgba(0,0,0,0.12)",
  ...overrides,
});

export const defaultTypography = (
  overrides: Partial<TypographySettings> = {}
): TypographySettings => ({
  fontSize: 16,
  fontWeight: "400",
  lineHeight: 1.6,
  letterSpacing: 0,
  textAlign: "left",
  color: "#1c1917",
  textTransform: "none",
  ...overrides,
});

export function spacingToCss(box: SpacingBox, kind: "padding" | "margin") {
  return {
    [`${kind}Top`]: `${box.top}px`,
    [`${kind}Right`]: `${box.right}px`,
    [`${kind}Bottom`]: `${box.bottom}px`,
    [`${kind}Left`]: `${box.left}px`,
  } as CSSProperties;
}

export function backgroundToCss(bg: BackgroundSettings): CSSProperties {
  if (bg.type === "image" && bg.imageUrl) {
    return {
      backgroundColor: bg.color === "transparent" ? undefined : bg.color,
      backgroundImage: `url(${bg.imageUrl})`,
      backgroundPosition: bg.imagePosition,
      backgroundSize: bg.imageSize,
      backgroundRepeat: bg.imageRepeat,
    };
  }

  if (bg.type === "gradient") {
    return { backgroundImage: bg.gradient };
  }

  return {
    backgroundColor: bg.color === "transparent" ? "transparent" : bg.color,
  };
}

export function borderToCss(border: BorderSettings): CSSProperties {
  if (!border.width || border.style === "none") {
    return { borderRadius: `${border.radius}px` };
  }

  return {
    borderWidth: `${border.width}px`,
    borderStyle: border.style,
    borderColor: border.color,
    borderRadius: `${border.radius}px`,
  };
}

export function shadowToCss(shadow: ShadowSettings): CSSProperties {
  if (shadow.enabled !== "yes") return {};
  return {
    boxShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`,
  };
}

export function typographyToCss(typo: TypographySettings): CSSProperties {
  return {
    fontSize: `${typo.fontSize}px`,
    fontWeight: Number(typo.fontWeight),
    lineHeight: typo.lineHeight,
    letterSpacing: `${typo.letterSpacing}px`,
    textAlign: typo.textAlign,
    color: typo.color,
    textTransform: typo.textTransform,
  };
}

export function containerOuterStyle(args: {
  layout: LayoutSettings;
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
}): CSSProperties {
  const { layout, padding, margin, background, border, shadow } = args;

  return {
    position: "relative",
    width: "100%",
    minHeight: layout.minHeight ? `${layout.minHeight}px` : undefined,
    overflow: layout.overflow,
    ...spacingToCss(padding, "padding"),
    ...spacingToCss(margin, "margin"),
    ...backgroundToCss(background),
    ...borderToCss(border),
    ...shadowToCss(shadow),
  };
}

export function containerInnerStyle(layout: LayoutSettings): CSSProperties {
  return {
    display: "flex",
    flexDirection: layout.direction,
    justifyContent: layout.justifyContent,
    alignItems: layout.alignItems,
    flexWrap: layout.flexWrap,
    gap: `${layout.gap}px`,
    width: layout.contentWidth === "boxed" ? "100%" : "100%",
    maxWidth: layout.contentWidth === "boxed" ? `${layout.width}px` : "none",
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: layout.minHeight ? `${layout.minHeight}px` : undefined,
  };
}

export const spacingFields: Fields<SpacingBox> = {
  top: { type: "number", label: "Trên", min: 0 },
  right: { type: "number", label: "Phải", min: 0 },
  bottom: { type: "number", label: "Dưới", min: 0 },
  left: { type: "number", label: "Trái", min: 0 },
};

export const layoutFields: Fields<LayoutSettings> = {
  tag: {
    type: "select",
    label: "HTML Tag",
    options: [
      { label: "div", value: "div" },
      { label: "section", value: "section" },
      { label: "header", value: "header" },
      { label: "footer", value: "footer" },
      { label: "main", value: "main" },
      { label: "article", value: "article" },
      { label: "aside", value: "aside" },
    ],
  },
  contentWidth: {
    type: "radio",
    label: "Độ rộng nội dung",
    options: [
      { label: "Boxed", value: "boxed" },
      { label: "Full Width", value: "full" },
    ],
  },
  width: { type: "number", label: "Max width (px)", min: 320 },
  minHeight: { type: "number", label: "Min height (px)", min: 0 },
  direction: {
    type: "select",
    label: "Hướng (Flex)",
    options: [
      { label: "Cột ↓", value: "column" },
      { label: "Hàng →", value: "row" },
      { label: "Cột ngược ↑", value: "column-reverse" },
      { label: "Hàng ngược ←", value: "row-reverse" },
    ],
  },
  justifyContent: {
    type: "select",
    label: "Justify Content",
    options: [
      { label: "Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "End", value: "flex-end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
      { label: "Space Evenly", value: "space-evenly" },
    ],
  },
  alignItems: {
    type: "select",
    label: "Align Items",
    options: [
      { label: "Stretch", value: "stretch" },
      { label: "Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "End", value: "flex-end" },
      { label: "Baseline", value: "baseline" },
    ],
  },
  flexWrap: {
    type: "radio",
    label: "Wrap",
    options: [
      { label: "No wrap", value: "nowrap" },
      { label: "Wrap", value: "wrap" },
    ],
  },
  gap: { type: "number", label: "Gap (px)", min: 0 },
  overflow: {
    type: "select",
    label: "Overflow",
    options: [
      { label: "Visible", value: "visible" },
      { label: "Hidden", value: "hidden" },
      { label: "Auto", value: "auto" },
    ],
  },
};

export const backgroundFields: Fields<BackgroundSettings> = {
  type: {
    type: "radio",
    label: "Kiểu nền",
    options: [
      { label: "Màu", value: "color" },
      { label: "Ảnh", value: "image" },
      { label: "Gradient", value: "gradient" },
    ],
  },
  color: { type: "text", label: "Màu nền" },
  imageUrl: { type: "text", label: "URL ảnh nền" },
  imagePosition: { type: "text", label: "Vị trí ảnh" },
  imageSize: {
    type: "select",
    label: "Kích thước ảnh",
    options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Auto", value: "auto" },
    ],
  },
  imageRepeat: {
    type: "select",
    label: "Lặp ảnh",
    options: [
      { label: "No repeat", value: "no-repeat" },
      { label: "Repeat", value: "repeat" },
      { label: "Repeat X", value: "repeat-x" },
      { label: "Repeat Y", value: "repeat-y" },
    ],
  },
  gradient: { type: "textarea", label: "CSS Gradient" },
  overlayColor: { type: "text", label: "Màu overlay" },
  overlayOpacity: {
    type: "number",
    label: "Độ mờ overlay (0-100)",
    min: 0,
    max: 100,
  },
};

export const borderFields: Fields<BorderSettings> = {
  width: { type: "number", label: "Độ dày (px)", min: 0 },
  style: {
    type: "select",
    label: "Kiểu viền",
    options: [
      { label: "None", value: "none" },
      { label: "Solid", value: "solid" },
      { label: "Dashed", value: "dashed" },
      { label: "Dotted", value: "dotted" },
    ],
  },
  color: { type: "text", label: "Màu viền" },
  radius: { type: "number", label: "Bo góc (px)", min: 0 },
};

export const shadowFields: Fields<ShadowSettings> = {
  enabled: {
    type: "radio",
    label: "Bật bóng",
    options: [
      { label: "Không", value: "no" },
      { label: "Có", value: "yes" },
    ],
  },
  x: { type: "number", label: "Offset X" },
  y: { type: "number", label: "Offset Y" },
  blur: { type: "number", label: "Blur", min: 0 },
  spread: { type: "number", label: "Spread" },
  color: { type: "text", label: "Màu bóng" },
};

export const typographyFields: Fields<TypographySettings> = {
  fontSize: { type: "number", label: "Cỡ chữ (px)", min: 8 },
  fontWeight: {
    type: "select",
    label: "Độ đậm",
    options: [
      { label: "Light 300", value: "300" },
      { label: "Regular 400", value: "400" },
      { label: "Medium 500", value: "500" },
      { label: "SemiBold 600", value: "600" },
      { label: "Bold 700", value: "700" },
      { label: "ExtraBold 800", value: "800" },
    ],
  },
  lineHeight: { type: "number", label: "Line height", min: 0.8 },
  letterSpacing: { type: "number", label: "Letter spacing" },
  textAlign: {
    type: "radio",
    label: "Căn chữ",
    options: [
      { label: "Trái", value: "left" },
      { label: "Giữa", value: "center" },
      { label: "Phải", value: "right" },
      { label: "Justify", value: "justify" },
    ],
  },
  color: { type: "text", label: "Màu chữ" },
  textTransform: {
    type: "select",
    label: "Transform",
    options: [
      { label: "None", value: "none" },
      { label: "UPPERCASE", value: "uppercase" },
      { label: "lowercase", value: "lowercase" },
      { label: "Capitalize", value: "capitalize" },
    ],
  },
};

export function ContainerShell({
  layout,
  padding,
  margin,
  background,
  border,
  shadow,
  children,
  className,
}: {
  layout: LayoutSettings;
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
  children: ReactNode;
  className?: string;
}) {
  const Tag = layout.tag as ElementType;

  return (
    <Tag
      className={className}
      style={containerOuterStyle({
        layout,
        padding,
        margin,
        background,
        border,
        shadow,
      })}
    >
      {background.overlayOpacity > 0 ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: background.overlayColor,
            opacity: background.overlayOpacity / 100,
            pointerEvents: "none",
            borderRadius: `${border.radius}px`,
          }}
        />
      ) : null}
      <div style={{ position: "relative", zIndex: 1, ...containerInnerStyle(layout) }}>
        {children}
      </div>
    </Tag>
  );
}
