"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import type { Fields } from "@puckeditor/core";
import { numberField } from "@/components/builder/NumberField";
import { imageField } from "@/components/builder/ImageField";

export type SpacingBox = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LayoutSettings = {
  // Structure
  tag: "div" | "section" | "header" | "footer" | "main" | "article" | "aside" | "nav";
  display: "flex" | "grid" | "block";
  // Width
  contentWidth: "boxed" | "full" | "custom";
  width: number;
  customWidth: number;
  customWidthUnit: "px" | "%";
  containerAlign: "left" | "center" | "right";
  // Height
  heightMode: "auto" | "min" | "fixed" | "vh";
  height: number;
  minHeight: number;
  maxHeight: number;
  // Flex
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
  alignContent:
    | "stretch"
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  gap: number;
  rowGap: number;
  columnGap: number;
  // Grid
  gridColumns: number;
  gridRows: number;
  gridAutoFlow: "row" | "column" | "dense";
  // Position
  position: "static" | "relative" | "absolute" | "sticky" | "fixed";
  zIndex: number;
  offsetTop: number;
  offsetRight: number;
  offsetBottom: number;
  offsetLeft: number;
  stickyOffset: number;
  // Overflow & visual
  overflow: "visible" | "hidden" | "auto" | "scroll" | "clip";
  overflowX: "visible" | "hidden" | "auto" | "scroll";
  overflowY: "visible" | "hidden" | "auto" | "scroll";
  opacity: number;
  // Responsive visibility
  hideDesktop: "yes" | "no";
  hideTablet: "yes" | "no";
  hideMobile: "yes" | "no";
};

export type BackgroundSettings = {
  type: "color" | "image" | "gradient";
  color: string;
  imageUrl: string;
  imagePosition: string;
  imageSize: "cover" | "contain" | "auto";
  imageRepeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  imageAttachment: "scroll" | "fixed" | "local";
  gradient: string;
  overlayColor: string;
  overlayOpacity: number;
  overlayBlend: "normal" | "multiply" | "overlay" | "soft-light" | "darken";
};

export type BorderSettings = {
  width: number;
  widthTop: number;
  widthRight: number;
  widthBottom: number;
  widthLeft: number;
  linked: "yes" | "no";
  style: "none" | "solid" | "dashed" | "dotted" | "double";
  color: string;
  radius: number;
  radiusTopLeft: number;
  radiusTopRight: number;
  radiusBottomRight: number;
  radiusBottomLeft: number;
  radiusLinked: "yes" | "no";
};

export type ShadowSettings = {
  enabled: "yes" | "no";
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: "yes" | "no";
};

export type TypographySettings = {
  fontSize: number;
  fontWeight: "300" | "400" | "500" | "600" | "700" | "800";
  lineHeight: number;
  letterSpacing: number;
  textAlign: "left" | "center" | "right" | "justify";
  color: string;
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline" | "line-through";
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
  display: "flex",
  contentWidth: "boxed",
  width: 1140,
  customWidth: 1140,
  customWidthUnit: "px",
  containerAlign: "center",
  heightMode: "auto",
  height: 400,
  minHeight: 0,
  maxHeight: 0,
  direction: "column",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "stretch",
  flexWrap: "nowrap",
  gap: 16,
  rowGap: 16,
  columnGap: 16,
  gridColumns: 3,
  gridRows: 1,
  gridAutoFlow: "row",
  position: "relative",
  zIndex: 0,
  offsetTop: 0,
  offsetRight: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  stickyOffset: 0,
  overflow: "visible",
  overflowX: "visible",
  overflowY: "visible",
  opacity: 100,
  hideDesktop: "no",
  hideTablet: "no",
  hideMobile: "no",
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
  imageAttachment: "scroll",
  gradient: "linear-gradient(135deg, #ecfdf5 0%, #fafaf9 100%)",
  overlayColor: "#000000",
  overlayOpacity: 0,
  overlayBlend: "normal",
  ...overrides,
});

export const defaultBorder = (
  overrides: Partial<BorderSettings> = {}
): BorderSettings => ({
  width: 0,
  widthTop: 0,
  widthRight: 0,
  widthBottom: 0,
  widthLeft: 0,
  linked: "yes",
  style: "solid",
  color: "#e7e5e4",
  radius: 0,
  radiusTopLeft: 0,
  radiusTopRight: 0,
  radiusBottomRight: 0,
  radiusBottomLeft: 0,
  radiusLinked: "yes",
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
  inset: "no",
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
  fontStyle: "normal",
  textDecoration: "none",
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
      backgroundAttachment: bg.imageAttachment,
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
  const linked = border.linked !== "no";
  const radiusLinked = border.radiusLinked !== "no";

  const widths = linked
    ? {
        borderTopWidth: `${border.width}px`,
        borderRightWidth: `${border.width}px`,
        borderBottomWidth: `${border.width}px`,
        borderLeftWidth: `${border.width}px`,
      }
    : {
        borderTopWidth: `${border.widthTop}px`,
        borderRightWidth: `${border.widthRight}px`,
        borderBottomWidth: `${border.widthBottom}px`,
        borderLeftWidth: `${border.widthLeft}px`,
      };

  const hasBorder = linked
    ? border.width > 0 && border.style !== "none"
    : (border.widthTop ||
        border.widthRight ||
        border.widthBottom ||
        border.widthLeft) > 0 && border.style !== "none";

  const radius = radiusLinked
    ? { borderRadius: `${border.radius}px` }
    : {
        borderTopLeftRadius: `${border.radiusTopLeft}px`,
        borderTopRightRadius: `${border.radiusTopRight}px`,
        borderBottomRightRadius: `${border.radiusBottomRight}px`,
        borderBottomLeftRadius: `${border.radiusBottomLeft}px`,
      };

  if (!hasBorder) return radius;

  return {
    ...widths,
    borderStyle: border.style,
    borderColor: border.color,
    ...radius,
  };
}

export function shadowToCss(shadow: ShadowSettings): CSSProperties {
  if (shadow.enabled !== "yes") return {};
  const inset = shadow.inset === "yes" ? "inset " : "";
  return {
    boxShadow: `${inset}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`,
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
    fontStyle: typo.fontStyle,
    textDecoration: typo.textDecoration,
  };
}

function layoutHeightCss(layout: LayoutSettings): CSSProperties {
  if (layout.heightMode === "fixed") {
    return {
      height: `${layout.height}px`,
      minHeight: layout.minHeight ? `${layout.minHeight}px` : undefined,
      maxHeight: layout.maxHeight ? `${layout.maxHeight}px` : undefined,
    };
  }
  if (layout.heightMode === "vh") {
    return {
      height: `${layout.height}vh`,
      minHeight: layout.minHeight ? `${layout.minHeight}px` : undefined,
      maxHeight: layout.maxHeight ? `${layout.maxHeight}px` : undefined,
    };
  }
  if (layout.heightMode === "min") {
    return {
      minHeight: `${layout.minHeight || layout.height}px`,
      maxHeight: layout.maxHeight ? `${layout.maxHeight}px` : undefined,
    };
  }
  return {
    minHeight: layout.minHeight ? `${layout.minHeight}px` : undefined,
    maxHeight: layout.maxHeight ? `${layout.maxHeight}px` : undefined,
  };
}

function num(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function layoutWidthOuter(layout: LayoutSettings): CSSProperties {
  if (layout.contentWidth === "custom") {
    const w = num(layout.customWidth, 100);
    if (layout.customWidthUnit === "%") {
      return {
        width: `${w}%`,
        maxWidth: "100%",
      };
    }
    // px: max-width container (intuitive như Elementor)
    return {
      width: "100%",
      maxWidth: `${w}px`,
    };
  }
  return { width: "100%" };
}

function layoutAlignMargin(layout: LayoutSettings): CSSProperties {
  if (layout.contentWidth === "full") return {};
  if (layout.containerAlign === "left") {
    return { marginLeft: 0, marginRight: "auto" };
  }
  if (layout.containerAlign === "right") {
    return { marginLeft: "auto", marginRight: 0 };
  }
  return { marginLeft: "auto", marginRight: "auto" };
}

function layoutPositionCss(layout: LayoutSettings): CSSProperties {
  if (layout.position === "static") {
    return { position: "static" };
  }

  const style: CSSProperties = {
    position: layout.position,
    zIndex: layout.zIndex || undefined,
  };

  if (layout.position === "sticky") {
    style.top = `${layout.stickyOffset}px`;
  }

  if (layout.position === "absolute" || layout.position === "fixed") {
    if (layout.offsetTop) style.top = `${layout.offsetTop}px`;
    if (layout.offsetRight) style.right = `${layout.offsetRight}px`;
    if (layout.offsetBottom) style.bottom = `${layout.offsetBottom}px`;
    if (layout.offsetLeft) style.left = `${layout.offsetLeft}px`;
  }

  if (layout.position === "relative") {
    if (layout.offsetTop) style.top = `${layout.offsetTop}px`;
    if (layout.offsetLeft) style.left = `${layout.offsetLeft}px`;
  }

  return style;
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
    ...layoutPositionCss(layout),
    ...layoutWidthOuter(layout),
    ...layoutHeightCss(layout),
    ...layoutAlignMargin(layout),
    opacity: (layout.opacity ?? 100) / 100,
    overflow: layout.overflow,
    overflowX: layout.overflowX !== "visible" ? layout.overflowX : undefined,
    overflowY: layout.overflowY !== "visible" ? layout.overflowY : undefined,
    ...spacingToCss(padding, "padding"),
    ...spacingToCss(margin, "margin"),
    ...backgroundToCss(background),
    ...borderToCss(border),
    ...shadowToCss(shadow),
  };
}

export function containerInnerStyle(layout: LayoutSettings): CSSProperties {
  const boxedMax = num(layout.width, 1140);

  const base: CSSProperties = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: layout.contentWidth === "boxed" ? `${boxedMax}px` : "none",
    // Chỉ căn inner khi boxed; custom/full đã căn ở outer
    ...(layout.contentWidth === "boxed" ? layoutAlignMargin(layout) : {}),
    minHeight: "inherit",
    height:
      layout.heightMode === "fixed" || layout.heightMode === "vh"
        ? "100%"
        : undefined,
  };

  if (layout.display === "block") {
    return base;
  }

  if (layout.display === "grid") {
    return {
      ...base,
      display: "grid",
      gridTemplateColumns: `repeat(${Math.max(1, layout.gridColumns || 1)}, minmax(0, 1fr))`,
      gridTemplateRows:
        layout.gridRows > 1
          ? `repeat(${layout.gridRows}, minmax(0, auto))`
          : undefined,
      gridAutoFlow: layout.gridAutoFlow,
      gap: `${layout.gap}px`,
      rowGap: `${layout.rowGap ?? layout.gap}px`,
      columnGap: `${layout.columnGap ?? layout.gap}px`,
      justifyContent: layout.justifyContent,
      alignItems: layout.alignItems,
      alignContent: layout.alignContent,
    };
  }

  return {
    ...base,
    display: "flex",
    flexDirection: layout.direction,
    justifyContent: layout.justifyContent,
    alignItems: layout.alignItems,
    alignContent: layout.alignContent,
    flexWrap: layout.flexWrap,
    gap: `${layout.gap}px`,
    rowGap: `${layout.rowGap ?? layout.gap}px`,
    columnGap: `${layout.columnGap ?? layout.gap}px`,
  };
}

export function layoutVisibilityClass(layout: LayoutSettings) {
  const classes: string[] = [];
  if (layout.hideMobile === "yes") classes.push("hide-mobile");
  if (layout.hideTablet === "yes") classes.push("hide-tablet");
  if (layout.hideDesktop === "yes") classes.push("hide-desktop");
  return classes.join(" ");
}

export const spacingFields: Fields<SpacingBox> = {
  top: numberField("Trên", { min: 0 }),
  right: numberField("Phải", { min: 0 }),
  bottom: numberField("Dưới", { min: 0 }),
  left: numberField("Trái", { min: 0 }),
};

/** Nhóm 1: Cấu trúc & kích thước */
export const layoutStructureFields: Fields<
  Pick<
    LayoutSettings,
    | "tag"
    | "display"
    | "contentWidth"
    | "width"
    | "customWidth"
    | "customWidthUnit"
    | "containerAlign"
    | "heightMode"
    | "height"
    | "minHeight"
    | "maxHeight"
  >
> = {
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
      { label: "nav", value: "nav" },
    ],
  },
  display: {
    type: "radio",
    label: "Display",
    options: [
      { label: "Flex", value: "flex" },
      { label: "Grid", value: "grid" },
      { label: "Block", value: "block" },
    ],
  },
  contentWidth: {
    type: "radio",
    label: "Độ rộng",
    options: [
      { label: "Boxed", value: "boxed" },
      { label: "Full", value: "full" },
      { label: "Custom", value: "custom" },
    ],
  },
  width: numberField("Max width boxed (px)", { min: 320 }),
  customWidth: numberField("Custom width (số)", { min: 1 }),
  customWidthUnit: {
    type: "radio",
    label: "Đơn vị custom",
    options: [
      { label: "px", value: "px" },
      { label: "%", value: "%" },
    ],
  },
  containerAlign: {
    type: "radio",
    label: "Căn container",
    options: [
      { label: "Trái", value: "left" },
      { label: "Giữa", value: "center" },
      { label: "Phải", value: "right" },
    ],
  },
  heightMode: {
    type: "select",
    label: "Kiểu chiều cao",
    options: [
      { label: "Auto", value: "auto" },
      { label: "Min height", value: "min" },
      { label: "Fixed (px)", value: "fixed" },
      { label: "Viewport (vh)", value: "vh" },
    ],
  },
  height: numberField("Height / VH value", { min: 0 }),
  minHeight: numberField("Min height (px)", { min: 0 }),
  maxHeight: numberField("Max height (px, 0 = none)", { min: 0 }),
};

/** Nhóm 2: Flex / Grid */
export const layoutFlexFields: Fields<
  Pick<
    LayoutSettings,
    | "direction"
    | "justifyContent"
    | "alignItems"
    | "alignContent"
    | "flexWrap"
    | "gap"
    | "rowGap"
    | "columnGap"
    | "gridColumns"
    | "gridRows"
    | "gridAutoFlow"
  >
> = {
  direction: {
    type: "select",
    label: "Flex direction",
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
  alignContent: {
    type: "select",
    label: "Align Content",
    options: [
      { label: "Stretch", value: "stretch" },
      { label: "Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "End", value: "flex-end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
    ],
  },
  flexWrap: {
    type: "radio",
    label: "Flex wrap",
    options: [
      { label: "No wrap", value: "nowrap" },
      { label: "Wrap", value: "wrap" },
      { label: "Wrap reverse", value: "wrap-reverse" },
    ],
  },
  gap: { type: "number", label: "Gap chung (px)", min: 0 },
  rowGap: { type: "number", label: "Row gap (px)", min: 0 },
  columnGap: { type: "number", label: "Column gap (px)", min: 0 },
  gridColumns: { type: "number", label: "Grid columns", min: 1, max: 12 },
  gridRows: { type: "number", label: "Grid rows", min: 1, max: 12 },
  gridAutoFlow: {
    type: "select",
    label: "Grid auto flow",
    options: [
      { label: "Row", value: "row" },
      { label: "Column", value: "column" },
      { label: "Dense", value: "dense" },
    ],
  },
};

/** Nhóm 3: Position */
export const layoutPositionFields: Fields<
  Pick<
    LayoutSettings,
    | "position"
    | "zIndex"
    | "offsetTop"
    | "offsetRight"
    | "offsetBottom"
    | "offsetLeft"
    | "stickyOffset"
  >
> = {
  position: {
    type: "select",
    label: "Position",
    options: [
      { label: "Static", value: "static" },
      { label: "Relative", value: "relative" },
      { label: "Absolute", value: "absolute" },
      { label: "Sticky", value: "sticky" },
      { label: "Fixed", value: "fixed" },
    ],
  },
  zIndex: { type: "number", label: "Z-index" },
  stickyOffset: { type: "number", label: "Sticky top offset (px)", min: 0 },
  offsetTop: { type: "number", label: "Offset Top (px)" },
  offsetRight: { type: "number", label: "Offset Right (px)" },
  offsetBottom: { type: "number", label: "Offset Bottom (px)" },
  offsetLeft: { type: "number", label: "Offset Left (px)" },
};

/** Nhóm 4: Overflow / Visibility */
export const layoutAdvancedFields: Fields<
  Pick<
    LayoutSettings,
    | "overflow"
    | "overflowX"
    | "overflowY"
    | "opacity"
    | "hideDesktop"
    | "hideTablet"
    | "hideMobile"
  >
> = {
  overflow: {
    type: "select",
    label: "Overflow",
    options: [
      { label: "Visible", value: "visible" },
      { label: "Hidden", value: "hidden" },
      { label: "Auto", value: "auto" },
      { label: "Scroll", value: "scroll" },
      { label: "Clip", value: "clip" },
    ],
  },
  overflowX: {
    type: "select",
    label: "Overflow X",
    options: [
      { label: "Visible", value: "visible" },
      { label: "Hidden", value: "hidden" },
      { label: "Auto", value: "auto" },
      { label: "Scroll", value: "scroll" },
    ],
  },
  overflowY: {
    type: "select",
    label: "Overflow Y",
    options: [
      { label: "Visible", value: "visible" },
      { label: "Hidden", value: "hidden" },
      { label: "Auto", value: "auto" },
      { label: "Scroll", value: "scroll" },
    ],
  },
  opacity: {
    type: "number",
    label: "Opacity (0-100)",
    min: 0,
    max: 100,
  },
  hideDesktop: {
    type: "radio",
    label: "Ẩn Desktop (≥1024px)",
    options: [
      { label: "Không", value: "no" },
      { label: "Ẩn", value: "yes" },
    ],
  },
  hideTablet: {
    type: "radio",
    label: "Ẩn Tablet (768–1023px)",
    options: [
      { label: "Không", value: "no" },
      { label: "Ẩn", value: "yes" },
    ],
  },
  hideMobile: {
    type: "radio",
    label: "Ẩn Mobile (<768px)",
    options: [
      { label: "Không", value: "no" },
      { label: "Ẩn", value: "yes" },
    ],
  },
};

/** Giữ alias cho chỗ còn dùng layoutFields cũ */
export const layoutFields: Fields<LayoutSettings> = {
  ...layoutStructureFields,
  ...layoutFlexFields,
  ...layoutPositionFields,
  ...layoutAdvancedFields,
} as Fields<LayoutSettings>;

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
  imageUrl: imageField("Ảnh nền"),
  imagePosition: {
    type: "select",
    label: "Vị trí ảnh",
    options: [
      { label: "Center", value: "center center" },
      { label: "Top", value: "center top" },
      { label: "Bottom", value: "center bottom" },
      { label: "Left", value: "left center" },
      { label: "Right", value: "right center" },
      { label: "Top Left", value: "left top" },
      { label: "Top Right", value: "right top" },
    ],
  },
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
  imageAttachment: {
    type: "select",
    label: "Attachment",
    options: [
      { label: "Scroll", value: "scroll" },
      { label: "Fixed (parallax)", value: "fixed" },
      { label: "Local", value: "local" },
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
  overlayBlend: {
    type: "select",
    label: "Blend mode overlay",
    options: [
      { label: "Normal", value: "normal" },
      { label: "Multiply", value: "multiply" },
      { label: "Overlay", value: "overlay" },
      { label: "Soft light", value: "soft-light" },
      { label: "Darken", value: "darken" },
    ],
  },
};

export const borderFields: Fields<BorderSettings> = {
  linked: {
    type: "radio",
    label: "Border đồng đều",
    options: [
      { label: "Có", value: "yes" },
      { label: "Từng cạnh", value: "no" },
    ],
  },
  width: { type: "number", label: "Độ dày chung (px)", min: 0 },
  widthTop: { type: "number", label: "Border Top", min: 0 },
  widthRight: { type: "number", label: "Border Right", min: 0 },
  widthBottom: { type: "number", label: "Border Bottom", min: 0 },
  widthLeft: { type: "number", label: "Border Left", min: 0 },
  style: {
    type: "select",
    label: "Kiểu viền",
    options: [
      { label: "None", value: "none" },
      { label: "Solid", value: "solid" },
      { label: "Dashed", value: "dashed" },
      { label: "Dotted", value: "dotted" },
      { label: "Double", value: "double" },
    ],
  },
  color: { type: "text", label: "Màu viền" },
  radiusLinked: {
    type: "radio",
    label: "Bo góc đồng đều",
    options: [
      { label: "Có", value: "yes" },
      { label: "Từng góc", value: "no" },
    ],
  },
  radius: { type: "number", label: "Bo góc chung (px)", min: 0 },
  radiusTopLeft: { type: "number", label: "Top Left", min: 0 },
  radiusTopRight: { type: "number", label: "Top Right", min: 0 },
  radiusBottomRight: { type: "number", label: "Bottom Right", min: 0 },
  radiusBottomLeft: { type: "number", label: "Bottom Left", min: 0 },
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
  inset: {
    type: "radio",
    label: "Inset shadow",
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
  fontStyle: {
    type: "radio",
    label: "Style",
    options: [
      { label: "Normal", value: "normal" },
      { label: "Italic", value: "italic" },
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
  textDecoration: {
    type: "select",
    label: "Decoration",
    options: [
      { label: "None", value: "none" },
      { label: "Underline", value: "underline" },
      { label: "Line through", value: "line-through" },
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
  const Tag = (layout?.tag || "div") as ElementType;
  const safeLayout = { ...defaultLayout(), ...layout };
  const visibility = layoutVisibilityClass(safeLayout);

  return (
    <Tag
      className={[className, visibility].filter(Boolean).join(" ")}
      style={containerOuterStyle({
        layout: safeLayout,
        padding: padding || defaultSpacing(0),
        margin: margin || defaultSpacing(0),
        background: { ...defaultBackground(), ...background },
        border: { ...defaultBorder(), ...border },
        shadow: { ...defaultShadow(), ...shadow },
      })}
    >
      {(background?.overlayOpacity ?? 0) > 0 ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: background.overlayColor,
            opacity: background.overlayOpacity / 100,
            mixBlendMode: background.overlayBlend || "normal",
            pointerEvents: "none",
            borderRadius:
              border?.radiusLinked === "no"
                ? undefined
                : `${border?.radius || 0}px`,
          }}
        />
      ) : null}
      <div style={containerInnerStyle(safeLayout)}>{children}</div>
    </Tag>
  );
}
