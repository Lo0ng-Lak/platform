import type { Config, Slot } from "@puckeditor/core";
import type { CSSProperties, ComponentType } from "react";
import { advancedSectionComponents } from "@/puck/advanced-sections";
import {
  ContainerShell,
  backgroundFields,
  borderFields,
  defaultBackground,
  defaultBorder,
  defaultLayout,
  defaultShadow,
  defaultSpacing,
  defaultTypography,
  layoutFields,
  shadowFields,
  spacingFields,
  spacingToCss,
  typographyFields,
  typographyToCss,
  type BackgroundSettings,
  type BorderSettings,
  type LayoutSettings,
  type ShadowSettings,
  type SpacingBox,
  type TypographySettings,
} from "@/lib/builder-styles";

type SlotRender = ComponentType<{
  style?: CSSProperties;
  className?: string;
  minEmptyHeight?: number | string;
}>;

type RootProps = {
  title: string;
  pageBackground: string;
  contentMaxWidth: number;
  header: Slot;
  footer: Slot;
};

type ContainerProps = {
  layout: LayoutSettings;
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
  children: Slot;
};

type ColumnProps = {
  width: number;
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
  verticalAlign: "stretch" | "flex-start" | "center" | "flex-end";
  children: Slot;
};

type ColumnsProps = {
  columns: "1" | "2" | "3" | "4" | "5" | "6";
  gap: number;
  stackOnMobile: "yes" | "no";
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  col1: Slot;
  col2: Slot;
  col3: Slot;
  col4: Slot;
  col5: Slot;
  col6: Slot;
};

type HeadingProps = {
  text: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  typography: TypographySettings;
  padding: SpacingBox;
  margin: SpacingBox;
};

type TextProps = {
  text: string;
  typography: TypographySettings;
  padding: SpacingBox;
  margin: SpacingBox;
};

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  align: "left" | "center" | "right";
  objectFit: "cover" | "contain" | "fill";
  aspectRatio: "auto" | "16/9" | "4/3" | "1/1" | "3/4";
  border: BorderSettings;
  shadow: ShadowSettings;
  padding: SpacingBox;
  margin: SpacingBox;
};

type ButtonProps = {
  label: string;
  href: string;
  size: "sm" | "md" | "lg";
  fullWidth: "yes" | "no";
  align: "left" | "center" | "right";
  typography: TypographySettings;
  background: string;
  hoverBackground: string;
  border: BorderSettings;
  padding: SpacingBox;
  margin: SpacingBox;
};

type SpacerProps = {
  height: number;
  hideOnMobile: "yes" | "no";
};

type DividerProps = {
  color: string;
  thickness: number;
  width: number;
  align: "left" | "center" | "right";
  style: "solid" | "dashed" | "dotted";
  margin: SpacingBox;
};

type IconBoxProps = {
  icon: string;
  title: string;
  description: string;
  iconSize: number;
  iconColor: string;
  typographyTitle: TypographySettings;
  typographyDesc: TypographySettings;
  align: "left" | "center";
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
};

type NavbarProps = {
  brand: string;
  link1Label: string;
  link1Href: string;
  link2Label: string;
  link2Href: string;
  link3Label: string;
  link3Href: string;
  ctaLabel: string;
  ctaHref: string;
  background: string;
  textColor: string;
  sticky: "yes" | "no";
  padding: SpacingBox;
};

type FooterProps = {
  brand: string;
  text: string;
  link1Label: string;
  link1Href: string;
  link2Label: string;
  link2Href: string;
  background: string;
  textColor: string;
  padding: SpacingBox;
};

type Props = {
  Container: ContainerProps;
  InnerContainer: ContainerProps;
  Columns: ColumnsProps;
  Column: ColumnProps;
  Heading: HeadingProps;
  Text: TextProps;
  Image: ImageProps;
  Button: ButtonProps;
  Spacer: SpacerProps;
  Divider: DividerProps;
  IconBox: IconBoxProps;
  Navbar: NavbarProps;
  Footer: FooterProps;
  Slider: Record<string, unknown>;
  Gallery: Record<string, unknown>;
  Accordion: Record<string, unknown>;
  Testimonials: Record<string, unknown>;
  Video: Record<string, unknown>;
};

const containerFieldGroup = {
  layout: {
    type: "object" as const,
    label: "⚙️ Layout",
    objectFields: layoutFields,
  },
  padding: {
    type: "object" as const,
    label: "📦 Padding",
    objectFields: spacingFields,
  },
  margin: {
    type: "object" as const,
    label: "↔️ Margin",
    objectFields: spacingFields,
  },
  background: {
    type: "object" as const,
    label: "🎨 Background",
    objectFields: backgroundFields,
  },
  border: {
    type: "object" as const,
    label: "⬜ Border",
    objectFields: borderFields,
  },
  shadow: {
    type: "object" as const,
    label: "🌑 Box Shadow",
    objectFields: shadowFields,
  },
  children: {
    type: "slot" as const,
    label: "Nội dung bên trong",
  },
};

const containerDefaults = {
  layout: defaultLayout({
    tag: "section",
    direction: "column",
    gap: 24,
  }),
  padding: defaultSpacing(40, { left: 24, right: 24 }),
  margin: defaultSpacing(0),
  background: defaultBackground({ color: "#ffffff" }),
  border: defaultBorder(),
  shadow: defaultShadow(),
  children: [],
};

function renderContainer({
  layout,
  padding,
  margin,
  background,
  border,
  shadow,
  children: Children,
}: {
  layout: LayoutSettings;
  padding: SpacingBox;
  margin: SpacingBox;
  background: BackgroundSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
  children: SlotRender;
}) {
  return (
    <ContainerShell
      layout={layout}
      padding={padding}
      margin={margin}
      background={background}
      border={border}
      shadow={shadow}
    >
      <Children
        style={{
          display: "contents",
        }}
        minEmptyHeight={80}
      />
    </ContainerShell>
  );
}

const columnCountMap = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
} as const;

const buttonSizeMap = {
  sm: { fontSize: 13, padY: 8, padX: 14 },
  md: { fontSize: 15, padY: 12, padX: 20 },
  lg: { fontSize: 17, padY: 16, padX: 28 },
} as const;

export const config: Config<Props, RootProps> = {
  root: {
    label: "Page (Header / Body / Footer)",
    fields: {
      title: { type: "text", label: "Tiêu đề trang" },
      pageBackground: { type: "text", label: "Màu nền trang" },
      contentMaxWidth: {
        type: "number",
        label: "Gợi ý max-width body (px)",
        min: 320,
      },
      header: {
        type: "slot",
        label: "HEADER — kéo Navbar / Container vào đây",
        allow: ["Navbar", "Container", "InnerContainer", "Heading", "Button"],
      },
      footer: {
        type: "slot",
        label: "FOOTER — kéo Footer / Container vào đây",
        allow: ["Footer", "Container", "InnerContainer", "Heading", "Text", "Button"],
      },
    },
    defaultProps: {
      title: "Trang mới",
      pageBackground: "#fafaf9",
      contentMaxWidth: 1140,
      header: [],
      footer: [],
    },
    render: ({
      children,
      title,
      pageBackground,
      header: Header,
      footer: Footer,
    }) => (
      <div
        data-page-title={title}
        style={{
          minHeight: "100vh",
          background: pageBackground,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div data-region="header" className="builder-region builder-region-header">
          <Header
            minEmptyHeight={72}
            style={{ width: "100%", minHeight: 56 }}
          />
        </div>
        <main
          data-region="body"
          className="builder-region builder-region-body"
          style={{ flex: 1, width: "100%" }}
        >
          {children}
        </main>
        <div data-region="footer" className="builder-region builder-region-footer">
          <Footer
            minEmptyHeight={72}
            style={{ width: "100%", minHeight: 56 }}
          />
        </div>
      </div>
    ),
  },
  categories: {
    layout: {
      title: "Layout",
      components: ["Container", "InnerContainer", "Columns", "Column"],
    },
    sections: {
      title: "Sections (ưu điểm riêng)",
      components: ["Slider", "Gallery", "Accordion", "Testimonials", "Video"],
    },
    basic: {
      title: "Basic widgets",
      components: ["Heading", "Text", "Image", "Button", "IconBox", "Spacer", "Divider"],
    },
    site: {
      title: "Header / Footer",
      components: ["Navbar", "Footer"],
    },
  },
  components: {
    Container: {
      label: "Container",
      fields: containerFieldGroup,
      defaultProps: {
        ...containerDefaults,
        layout: defaultLayout({
          tag: "section",
          contentWidth: "boxed",
          width: 1140,
          direction: "column",
          gap: 24,
          minHeight: 0,
        }),
        padding: defaultSpacing(48, { left: 24, right: 24 }),
        background: defaultBackground({ color: "#ffffff" }),
      },
      render: renderContainer,
    },
    InnerContainer: {
      label: "Inner Container",
      fields: containerFieldGroup,
      defaultProps: {
        ...containerDefaults,
        layout: defaultLayout({
          tag: "div",
          contentWidth: "full",
          direction: "row",
          gap: 24,
          alignItems: "stretch",
          flexWrap: "wrap",
        }),
        padding: defaultSpacing(16),
        background: defaultBackground({ color: "transparent" }),
      },
      render: renderContainer,
    },
    Columns: {
      label: "Columns",
      fields: {
        columns: {
          type: "radio",
          label: "Số cột",
          options: [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
          ],
        },
        gap: { type: "number", label: "Gap (px)", min: 0 },
        stackOnMobile: {
          type: "radio",
          label: "Stack trên mobile",
          options: [
            { label: "Có", value: "yes" },
            { label: "Không", value: "no" },
          ],
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
        background: {
          type: "object",
          label: "🎨 Background",
          objectFields: backgroundFields,
        },
        col1: { type: "slot", label: "Cột 1" },
        col2: { type: "slot", label: "Cột 2" },
        col3: { type: "slot", label: "Cột 3" },
        col4: { type: "slot", label: "Cột 4" },
        col5: { type: "slot", label: "Cột 5" },
        col6: { type: "slot", label: "Cột 6" },
      },
      defaultProps: {
        columns: "3",
        gap: 24,
        stackOnMobile: "yes",
        padding: defaultSpacing(24),
        margin: defaultSpacing(0),
        background: defaultBackground({ color: "transparent" }),
        col1: [],
        col2: [],
        col3: [],
        col4: [],
        col5: [],
        col6: [],
      },
      render: ({
        columns,
        gap,
        stackOnMobile,
        padding,
        margin,
        background,
        col1: Col1,
        col2: Col2,
        col3: Col3,
        col4: Col4,
        col5: Col5,
        col6: Col6,
      }) => {
        const count = columnCountMap[columns];
        const cols = [Col1, Col2, Col3, Col4, Col5, Col6].slice(0, count);
        const className = `puck-columns puck-columns-${count}${
          stackOnMobile === "yes" ? " puck-columns-stack" : ""
        }`;

        return (
          <div
            style={{
              ...spacingToCss(padding, "padding"),
              ...spacingToCss(margin, "margin"),
              backgroundColor:
                background.type === "color" ? background.color : undefined,
              backgroundImage:
                background.type === "gradient"
                  ? background.gradient
                  : background.type === "image" && background.imageUrl
                    ? `url(${background.imageUrl})`
                    : undefined,
              backgroundSize: background.imageSize,
              backgroundPosition: background.imagePosition,
            }}
          >
            <style>{`
              .puck-columns {
                display: grid;
                gap: ${gap}px;
                grid-template-columns: repeat(${count}, minmax(0, 1fr));
              }
              .puck-columns-stack {
                grid-template-columns: 1fr;
              }
              @media (min-width: 768px) {
                .puck-columns-stack.puck-columns-${count} {
                  grid-template-columns: repeat(${count}, minmax(0, 1fr));
                }
              }
            `}</style>
            <div className={className}>
              {cols.map((Col, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      flex: 1,
                      minHeight: 100,
                    }}
                    minEmptyHeight={100}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
    Column: {
      label: "Column",
      fields: {
        width: {
          type: "number",
          label: "Flex grow / độ rộng tương đối",
          min: 1,
          max: 12,
        },
        verticalAlign: {
          type: "select",
          label: "Căn dọc",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Top", value: "flex-start" },
            { label: "Middle", value: "center" },
            { label: "Bottom", value: "flex-end" },
          ],
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
        background: {
          type: "object",
          label: "🎨 Background",
          objectFields: backgroundFields,
        },
        border: {
          type: "object",
          label: "⬜ Border",
          objectFields: borderFields,
        },
        shadow: {
          type: "object",
          label: "🌑 Box Shadow",
          objectFields: shadowFields,
        },
        children: { type: "slot", label: "Widgets" },
      },
      defaultProps: {
        width: 1,
        verticalAlign: "stretch",
        padding: defaultSpacing(16),
        margin: defaultSpacing(0),
        background: defaultBackground({ color: "transparent" }),
        border: defaultBorder(),
        shadow: defaultShadow(),
        children: [],
      },
      render: ({
        width,
        verticalAlign,
        padding,
        margin,
        background,
        border,
        shadow,
        children: Children,
      }) => (
        <div
          style={{
            flex: `${width} 1 0%`,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: verticalAlign === "stretch" ? "flex-start" : verticalAlign,
            alignSelf: verticalAlign === "stretch" ? "stretch" : verticalAlign,
            ...spacingToCss(padding, "padding"),
            ...spacingToCss(margin, "margin"),
            backgroundColor:
              background.type === "color" ? background.color : undefined,
            backgroundImage:
              background.type === "gradient"
                ? background.gradient
                : background.type === "image" && background.imageUrl
                  ? `url(${background.imageUrl})`
                  : undefined,
            borderWidth: border.width ? `${border.width}px` : undefined,
            borderStyle: border.width ? border.style : undefined,
            borderColor: border.color,
            borderRadius: `${border.radius}px`,
            boxShadow:
              shadow.enabled === "yes"
                ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                : undefined,
          }}
        >
          <Children
            style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}
            minEmptyHeight={80}
          />
        </div>
      ),
    },
    Heading: {
      label: "Heading",
      fields: {
        text: { type: "textarea", label: "Nội dung" },
        tag: {
          type: "select",
          label: "HTML Tag",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ],
        },
        typography: {
          type: "object",
          label: "🔤 Typography",
          objectFields: typographyFields,
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        text: "Add Your Heading Text Here",
        tag: "h2",
        typography: defaultTypography({
          fontSize: 36,
          fontWeight: "700",
          lineHeight: 1.2,
          color: "#1c1917",
        }),
        padding: defaultSpacing(0),
        margin: defaultSpacing(0, { bottom: 12 }),
      },
      render: ({ text, tag: Tag, typography, padding, margin }) => (
        <Tag
          style={{
            margin: 0,
            ...typographyToCss(typography),
            ...spacingToCss(padding, "padding"),
            ...spacingToCss(margin, "margin"),
          }}
        >
          {text}
        </Tag>
      ),
    },
    Text: {
      label: "Text Editor",
      fields: {
        text: { type: "textarea", label: "Nội dung" },
        typography: {
          type: "object",
          label: "🔤 Typography",
          objectFields: typographyFields,
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        typography: defaultTypography({
          fontSize: 16,
          color: "#57534e",
          lineHeight: 1.7,
        }),
        padding: defaultSpacing(0),
        margin: defaultSpacing(0, { bottom: 12 }),
      },
      render: ({ text, typography, padding, margin }) => (
        <p
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            ...typographyToCss(typography),
            ...spacingToCss(padding, "padding"),
            ...spacingToCss(margin, "margin"),
          }}
        >
          {text}
        </p>
      ),
    },
    Image: {
      label: "Image",
      fields: {
        src: { type: "text", label: "URL ảnh" },
        alt: { type: "text", label: "Alt" },
        width: { type: "number", label: "Width %", min: 10, max: 100 },
        align: {
          type: "radio",
          label: "Căn",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Phải", value: "right" },
          ],
        },
        objectFit: {
          type: "select",
          label: "Object fit",
          options: [
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
            { label: "Fill", value: "fill" },
          ],
        },
        aspectRatio: {
          type: "select",
          label: "Tỷ lệ",
          options: [
            { label: "Auto", value: "auto" },
            { label: "16:9", value: "16/9" },
            { label: "4:3", value: "4/3" },
            { label: "1:1", value: "1/1" },
            { label: "3:4", value: "3/4" },
          ],
        },
        border: {
          type: "object",
          label: "⬜ Border",
          objectFields: borderFields,
        },
        shadow: {
          type: "object",
          label: "🌑 Shadow",
          objectFields: shadowFields,
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        alt: "Image",
        width: 100,
        align: "center",
        objectFit: "cover",
        aspectRatio: "16/9",
        border: defaultBorder({ radius: 12 }),
        shadow: defaultShadow(),
        padding: defaultSpacing(0),
        margin: defaultSpacing(0, { bottom: 12 }),
      },
      render: ({
        src,
        alt,
        width,
        align,
        objectFit,
        aspectRatio,
        border,
        shadow,
        padding,
        margin,
      }) => (
        <div
          style={{
            display: "flex",
            justifyContent:
              align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
            ...spacingToCss(padding, "padding"),
            ...spacingToCss(margin, "margin"),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              width: `${width}%`,
              maxWidth: "100%",
              height: "auto",
              objectFit,
              aspectRatio: aspectRatio === "auto" ? undefined : aspectRatio,
              borderRadius: `${border.radius}px`,
              borderWidth: border.width ? `${border.width}px` : undefined,
              borderStyle: border.width ? border.style : undefined,
              borderColor: border.color,
              boxShadow:
                shadow.enabled === "yes"
                  ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                  : undefined,
              display: "block",
            }}
          />
        </div>
      ),
    },
    Button: {
      label: "Button",
      fields: {
        label: { type: "text", label: "Nhãn" },
        href: { type: "text", label: "Link" },
        size: {
          type: "radio",
          label: "Size",
          options: [
            { label: "S", value: "sm" },
            { label: "M", value: "md" },
            { label: "L", value: "lg" },
          ],
        },
        fullWidth: {
          type: "radio",
          label: "Full width",
          options: [
            { label: "Không", value: "no" },
            { label: "Có", value: "yes" },
          ],
        },
        align: {
          type: "radio",
          label: "Căn",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Phải", value: "right" },
          ],
        },
        typography: {
          type: "object",
          label: "🔤 Typography",
          objectFields: typographyFields,
        },
        background: { type: "text", label: "Màu nền" },
        hoverBackground: { type: "text", label: "Màu nền hover" },
        border: {
          type: "object",
          label: "⬜ Border",
          objectFields: borderFields,
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        label: "Click here",
        href: "#",
        size: "md",
        fullWidth: "no",
        align: "left",
        typography: defaultTypography({
          fontSize: 15,
          fontWeight: "600",
          color: "#ffffff",
          textAlign: "center",
        }),
        background: "#047857",
        hoverBackground: "#065f46",
        border: defaultBorder({ radius: 8 }),
        padding: defaultSpacing(0),
        margin: defaultSpacing(0, { bottom: 8 }),
      },
      render: ({
        label,
        href,
        size,
        fullWidth,
        align,
        typography,
        background,
        border,
        padding,
        margin,
      }) => {
        const sizeStyle = buttonSizeMap[size];
        return (
          <div
            style={{
              display: "flex",
              justifyContent:
                align === "left"
                  ? "flex-start"
                  : align === "right"
                    ? "flex-end"
                    : "center",
              ...spacingToCss(padding, "padding"),
              ...spacingToCss(margin, "margin"),
            }}
          >
            <a
              href={href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: fullWidth === "yes" ? "100%" : "auto",
                textDecoration: "none",
                background,
                padding: `${sizeStyle.padY}px ${sizeStyle.padX}px`,
                borderRadius: `${border.radius}px`,
                borderWidth: border.width ? `${border.width}px` : 0,
                borderStyle: border.width ? border.style : "none",
                borderColor: border.color,
                ...typographyToCss({
                  ...typography,
                  fontSize: sizeStyle.fontSize,
                }),
              }}
            >
              {label}
            </a>
          </div>
        );
      },
    },
    Spacer: {
      label: "Spacer",
      fields: {
        height: { type: "number", label: "Chiều cao (px)", min: 0 },
        hideOnMobile: {
          type: "radio",
          label: "Ẩn trên mobile",
          options: [
            { label: "Không", value: "no" },
            { label: "Có", value: "yes" },
          ],
        },
      },
      defaultProps: {
        height: 40,
        hideOnMobile: "no",
      },
      render: ({ height, hideOnMobile }) => (
        <div
          aria-hidden
          className={hideOnMobile === "yes" ? "hidden md:block" : undefined}
          style={{ height: `${height}px`, width: "100%" }}
        />
      ),
    },
    Divider: {
      label: "Divider",
      fields: {
        color: { type: "text", label: "Màu" },
        thickness: { type: "number", label: "Độ dày", min: 1 },
        width: { type: "number", label: "Width %", min: 5, max: 100 },
        align: {
          type: "radio",
          label: "Căn",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Phải", value: "right" },
          ],
        },
        style: {
          type: "select",
          label: "Kiểu",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ],
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        color: "#e7e5e4",
        thickness: 1,
        width: 100,
        align: "center",
        style: "solid",
        margin: defaultSpacing(16, { left: 0, right: 0 }),
      },
      render: ({ color, thickness, width, align, style, margin }) => (
        <div
          style={{
            display: "flex",
            justifyContent:
              align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
            ...spacingToCss(margin, "margin"),
          }}
        >
          <hr
            style={{
              width: `${width}%`,
              border: "none",
              borderTop: `${thickness}px ${style} ${color}`,
              margin: 0,
            }}
          />
        </div>
      ),
    },
    IconBox: {
      label: "Icon Box",
      fields: {
        icon: { type: "text", label: "Icon / emoji" },
        title: { type: "text", label: "Tiêu đề" },
        description: { type: "textarea", label: "Mô tả" },
        iconSize: { type: "number", label: "Cỡ icon", min: 12 },
        iconColor: { type: "text", label: "Màu icon" },
        align: {
          type: "radio",
          label: "Căn",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
          ],
        },
        typographyTitle: {
          type: "object",
          label: "🔤 Title Typography",
          objectFields: typographyFields,
        },
        typographyDesc: {
          type: "object",
          label: "🔤 Description Typography",
          objectFields: typographyFields,
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
        margin: {
          type: "object",
          label: "↔️ Margin",
          objectFields: spacingFields,
        },
        background: {
          type: "object",
          label: "🎨 Background",
          objectFields: backgroundFields,
        },
        border: {
          type: "object",
          label: "⬜ Border",
          objectFields: borderFields,
        },
        shadow: {
          type: "object",
          label: "🌑 Shadow",
          objectFields: shadowFields,
        },
      },
      defaultProps: {
        icon: "✦",
        title: "This is the heading",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        iconSize: 28,
        iconColor: "#047857",
        align: "left",
        typographyTitle: defaultTypography({
          fontSize: 20,
          fontWeight: "600",
          color: "#1c1917",
        }),
        typographyDesc: defaultTypography({
          fontSize: 14,
          color: "#57534e",
        }),
        padding: defaultSpacing(24),
        margin: defaultSpacing(0),
        background: defaultBackground({ color: "#ffffff" }),
        border: defaultBorder({ width: 1, radius: 12, color: "#e7e5e4" }),
        shadow: defaultShadow(),
      },
      render: ({
        icon,
        title,
        description,
        iconSize,
        iconColor,
        align,
        typographyTitle,
        typographyDesc,
        padding,
        margin,
        background,
        border,
        shadow,
      }) => (
        <div
          style={{
            textAlign: align,
            ...spacingToCss(padding, "padding"),
            ...spacingToCss(margin, "margin"),
            backgroundColor:
              background.type === "color" ? background.color : undefined,
            backgroundImage:
              background.type === "gradient" ? background.gradient : undefined,
            borderWidth: border.width ? `${border.width}px` : undefined,
            borderStyle: border.width ? border.style : undefined,
            borderColor: border.color,
            borderRadius: `${border.radius}px`,
            boxShadow:
              shadow.enabled === "yes"
                ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                : undefined,
          }}
        >
          <div style={{ fontSize: iconSize, color: iconColor, lineHeight: 1 }}>
            {icon}
          </div>
          <h3
            style={{
              margin: "12px 0 8px",
              ...typographyToCss({ ...typographyTitle, textAlign: align }),
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              ...typographyToCss({ ...typographyDesc, textAlign: align }),
            }}
          >
            {description}
          </p>
        </div>
      ),
    },
    Navbar: {
      label: "Navbar",
      fields: {
        brand: { type: "text", label: "Brand" },
        link1Label: { type: "text", label: "Link 1" },
        link1Href: { type: "text", label: "URL 1" },
        link2Label: { type: "text", label: "Link 2" },
        link2Href: { type: "text", label: "URL 2" },
        link3Label: { type: "text", label: "Link 3" },
        link3Href: { type: "text", label: "URL 3" },
        ctaLabel: { type: "text", label: "CTA" },
        ctaHref: { type: "text", label: "CTA URL" },
        background: { type: "text", label: "Màu nền" },
        textColor: { type: "text", label: "Màu chữ" },
        sticky: {
          type: "radio",
          label: "Sticky",
          options: [
            { label: "Không", value: "no" },
            { label: "Có", value: "yes" },
          ],
        },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        brand: "Studio",
        link1Label: "Home",
        link1Href: "/",
        link2Label: "About",
        link2Href: "/about",
        link3Label: "Contact",
        link3Href: "/contact",
        ctaLabel: "Liên hệ ngay",
        ctaHref: "/contact",
        background: "#ffffff",
        textColor: "#1c1917",
        sticky: "yes",
        padding: defaultSpacing(16, { left: 24, right: 24 }),
      },
      render: ({
        brand,
        link1Label,
        link1Href,
        link2Label,
        link2Href,
        link3Label,
        link3Href,
        ctaLabel,
        ctaHref,
        background,
        textColor,
        sticky,
        padding,
      }) => (
        <header
          style={{
            position: sticky === "yes" ? "sticky" : "relative",
            top: 0,
            zIndex: 50,
            background,
            color: textColor,
            borderBottom: "1px solid #e7e5e4",
            ...spacingToCss(padding, "padding"),
          }}
        >
          <div
            style={{
              maxWidth: 1140,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <a
              href="/"
              style={{
                color: textColor,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {brand}
            </a>
            <nav style={{ display: "flex", gap: 20, fontSize: 14 }}>
              <a href={link1Href} style={{ color: textColor, textDecoration: "none" }}>
                {link1Label}
              </a>
              <a href={link2Href} style={{ color: textColor, textDecoration: "none" }}>
                {link2Label}
              </a>
              <a href={link3Href} style={{ color: textColor, textDecoration: "none" }}>
                {link3Label}
              </a>
            </nav>
            <a
              href={ctaHref}
              style={{
                background: "#047857",
                color: "#fff",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {ctaLabel}
            </a>
          </div>
        </header>
      ),
    },
    Footer: {
      label: "Footer",
      fields: {
        brand: { type: "text", label: "Brand" },
        text: { type: "textarea", label: "Mô tả" },
        link1Label: { type: "text", label: "Link 1" },
        link1Href: { type: "text", label: "URL 1" },
        link2Label: { type: "text", label: "Link 2" },
        link2Href: { type: "text", label: "URL 2" },
        background: { type: "text", label: "Màu nền" },
        textColor: { type: "text", label: "Màu chữ" },
        padding: {
          type: "object",
          label: "📦 Padding",
          objectFields: spacingFields,
        },
      },
      defaultProps: {
        brand: "Studio",
        text: "Thiết kế không gian làm việc hiện đại cho đội ngũ sáng tạo.",
        link1Label: "Điều khoản",
        link1Href: "/terms",
        link2Label: "Liên hệ",
        link2Href: "/contact",
        background: "#0c0a09",
        textColor: "#a8a29e",
        padding: defaultSpacing(48, { left: 24, right: 24 }),
      },
      render: ({
        brand,
        text,
        link1Label,
        link1Href,
        link2Label,
        link2Href,
        background,
        textColor,
        padding,
      }) => (
        <footer
          style={{
            background,
            color: textColor,
            ...spacingToCss(padding, "padding"),
          }}
        >
          <div
            style={{
              maxWidth: 1140,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 420 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>{brand}</div>
              <p style={{ marginTop: 12, lineHeight: 1.6 }}>{text}</p>
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
              <a href={link1Href} style={{ color: textColor }}>
                {link1Label}
              </a>
              <a href={link2Href} style={{ color: textColor }}>
                {link2Label}
              </a>
            </div>
          </div>
        </footer>
      ),
    },
    Slider: advancedSectionComponents.Slider as never,
    Gallery: advancedSectionComponents.Gallery as never,
    Accordion: advancedSectionComponents.Accordion as never,
    Testimonials: advancedSectionComponents.Testimonials as never,
    Video: advancedSectionComponents.Video as never,
  },
};

export default config;
