import { AccordionSection } from "@/components/builder/AccordionSection";
import { SliderSection } from "@/components/builder/SliderSection";
import { TestimonialsSection } from "@/components/builder/TestimonialsSection";
import {
  defaultSpacing,
  spacingFields,
  spacingToCss,
  type SpacingBox,
} from "@/lib/builder-styles";

const defaultSlide = {
  image:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  title: "Build beautiful pages",
  subtitle: "Kéo thả section, chỉnh slide, chữ và hiệu ứng xuất hiện.",
  buttonLabel: "Khám phá thêm",
  buttonHref: "/contact",
  textAlign: "center" as const,
  contentVertical: "center" as const,
  overlayColor: "#000000",
  overlayOpacity: 45,
  titleColor: "#ffffff",
  subtitleColor: "#f5f5f4",
  titleSize: 48,
  subtitleSize: 18,
};

export const advancedSectionComponents = {
  Slider: {
    label: "Slider / Carousel",
    fields: {
      slides: {
        type: "array" as const,
        label: "📷 Slides",
        getItemSummary: (item: { title?: string }, i?: number) =>
          item.title || `Slide ${(i ?? 0) + 1}`,
        defaultItemProps: defaultSlide,
        arrayFields: {
          image: { type: "text" as const, label: "URL hình" },
          title: { type: "text" as const, label: "Tiêu đề" },
          subtitle: { type: "textarea" as const, label: "Mô tả" },
          buttonLabel: { type: "text" as const, label: "Nút CTA" },
          buttonHref: { type: "text" as const, label: "Link CTA" },
          textAlign: {
            type: "radio" as const,
            label: "Căn chữ",
            options: [
              { label: "Trái", value: "left" },
              { label: "Giữa", value: "center" },
              { label: "Phải", value: "right" },
            ],
          },
          contentVertical: {
            type: "select" as const,
            label: "Vị trí dọc",
            options: [
              { label: "Trên", value: "flex-start" },
              { label: "Giữa", value: "center" },
              { label: "Dưới", value: "flex-end" },
            ],
          },
          overlayColor: { type: "text" as const, label: "Màu overlay" },
          overlayOpacity: {
            type: "number" as const,
            label: "Độ mờ overlay %",
            min: 0,
            max: 90,
          },
          titleColor: { type: "text" as const, label: "Màu tiêu đề" },
          subtitleColor: { type: "text" as const, label: "Màu mô tả" },
          titleSize: {
            type: "number" as const,
            label: "Cỡ tiêu đề",
            min: 16,
          },
          subtitleSize: {
            type: "number" as const,
            label: "Cỡ mô tả",
            min: 12,
          },
        },
      },
      height: { type: "number" as const, label: "Chiều cao (px)", min: 200 },
      autoplay: {
        type: "radio" as const,
        label: "Autoplay",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      interval: {
        type: "number" as const,
        label: "Thời gian mỗi slide (ms)",
        min: 1500,
      },
      loop: {
        type: "radio" as const,
        label: "Loop",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      transition: {
        type: "select" as const,
        label: "Kiểu trượt",
        options: [
          { label: "Fade", value: "fade" },
          { label: "Slide ngang", value: "slide" },
          { label: "Zoom", value: "zoom" },
        ],
      },
      transitionMs: {
        type: "number" as const,
        label: "Tốc độ chuyển (ms)",
        min: 200,
      },
      textAnimation: {
        type: "select" as const,
        label: "Hiệu ứng chữ",
        options: [
          { label: "Không", value: "none" },
          { label: "Fade Up", value: "fadeUp" },
          { label: "Fade In", value: "fadeIn" },
          { label: "Slide Left", value: "slideLeft" },
          { label: "Zoom In", value: "zoomIn" },
        ],
      },
      showArrows: {
        type: "radio" as const,
        label: "Mũi tên",
        options: [
          { label: "Hiện", value: "yes" },
          { label: "Ẩn", value: "no" },
        ],
      },
      showDots: {
        type: "radio" as const,
        label: "Dots",
        options: [
          { label: "Hiện", value: "yes" },
          { label: "Ẩn", value: "no" },
        ],
      },
      pauseOnHover: {
        type: "radio" as const,
        label: "Pause khi hover",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
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
    },
    defaultProps: {
      slides: [
        defaultSlide,
        {
          ...defaultSlide,
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
          title: "Không gian làm việc hiện đại",
          subtitle: "Thiết kế nội thất văn phòng tối giản, tối ưu ánh sáng.",
          textAlign: "left" as const,
        },
        {
          ...defaultSlide,
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
          title: "Đồng hành cùng đội ngũ của bạn",
          subtitle: "Từ concept đến thi công trọn gói.",
          textAlign: "right" as const,
        },
      ],
      height: 520,
      autoplay: "yes" as const,
      interval: 4500,
      loop: "yes" as const,
      transition: "fade" as const,
      transitionMs: 700,
      textAnimation: "fadeUp" as const,
      showArrows: "yes" as const,
      showDots: "yes" as const,
      pauseOnHover: "yes" as const,
      padding: defaultSpacing(0),
      margin: defaultSpacing(0),
    },
    render: ({
      slides,
      height,
      autoplay,
      interval,
      loop,
      transition,
      transitionMs,
      textAnimation,
      showArrows,
      showDots,
      pauseOnHover,
      padding,
      margin,
    }: {
      slides: typeof defaultSlide[];
      height: number;
      autoplay: "yes" | "no";
      interval: number;
      loop: "yes" | "no";
      transition: "fade" | "slide" | "zoom";
      transitionMs: number;
      textAnimation: "none" | "fadeUp" | "fadeIn" | "slideLeft" | "zoomIn";
      showArrows: "yes" | "no";
      showDots: "yes" | "no";
      pauseOnHover: "yes" | "no";
      padding: SpacingBox;
      margin: SpacingBox;
    }) => (
      <div
        style={{
          ...spacingToCss(padding, "padding"),
          ...spacingToCss(margin, "margin"),
        }}
      >
        <SliderSection
          slides={slides}
          height={height}
          autoplay={autoplay}
          interval={interval}
          loop={loop}
          transition={transition}
          transitionMs={transitionMs}
          textAnimation={textAnimation}
          showArrows={showArrows}
          showDots={showDots}
          pauseOnHover={pauseOnHover}
        />
      </div>
    ),
  },

  Gallery: {
    label: "Image Gallery",
    fields: {
      images: {
        type: "array" as const,
        label: "Hình ảnh",
        getItemSummary: (item: { alt?: string }, i?: number) =>
          item.alt || `Ảnh ${(i ?? 0) + 1}`,
        defaultItemProps: {
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
          alt: "Gallery image",
        },
        arrayFields: {
          src: { type: "text" as const, label: "URL" },
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
      aspectRatio: {
        type: "select" as const,
        label: "Tỷ lệ",
        options: [
          { label: "1:1", value: "1/1" },
          { label: "4:3", value: "4/3" },
          { label: "16:9", value: "16/9" },
          { label: "Auto", value: "auto" },
        ],
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
    },
    defaultProps: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
          alt: "Office",
        },
        {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
          alt: "Work",
        },
        {
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
          alt: "Team",
        },
      ],
      columns: "3" as const,
      gap: 16,
      radius: 12,
      aspectRatio: "4/3" as const,
      padding: defaultSpacing(24),
      margin: defaultSpacing(0),
    },
    render: ({
      images,
      columns,
      gap,
      radius,
      aspectRatio,
      padding,
      margin,
    }: {
      images: { src: string; alt: string }[];
      columns: "2" | "3" | "4";
      gap: number;
      radius: number;
      aspectRatio: string;
      padding: SpacingBox;
      margin: SpacingBox;
    }) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap,
          ...spacingToCss(padding, "padding"),
          ...spacingToCss(margin, "margin"),
        }}
      >
        {(images || []).map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              aspectRatio: aspectRatio === "auto" ? undefined : aspectRatio,
              borderRadius: radius,
              display: "block",
            }}
          />
        ))}
      </div>
    ),
  },

  Accordion: {
    label: "Accordion / FAQ",
    fields: {
      items: {
        type: "array" as const,
        label: "Các mục",
        getItemSummary: (item: { title?: string }, i?: number) =>
          item.title || `Mục ${(i ?? 0) + 1}`,
        defaultItemProps: {
          title: "Câu hỏi thường gặp?",
          content: "Thêm nội dung trả lời tại đây.",
        },
        arrayFields: {
          title: { type: "text" as const, label: "Tiêu đề" },
          content: { type: "textarea" as const, label: "Nội dung" },
        },
      },
      allowMultiple: {
        type: "radio" as const,
        label: "Mở nhiều mục",
        options: [
          { label: "Không", value: "no" },
          { label: "Có", value: "yes" },
        ],
      },
      titleColor: { type: "text" as const, label: "Màu tiêu đề" },
      contentColor: { type: "text" as const, label: "Màu nội dung" },
      borderColor: { type: "text" as const, label: "Màu viền" },
      background: { type: "text" as const, label: "Nền" },
      activeBackground: { type: "text" as const, label: "Nền khi mở" },
      titleSize: { type: "number" as const, label: "Cỡ tiêu đề", min: 12 },
      contentSize: { type: "number" as const, label: "Cỡ nội dung", min: 12 },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
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
    },
    defaultProps: {
      items: [
        {
          title: "Thời gian hoàn thiện một dự án?",
          content:
            "Tùy quy mô. Dự án văn phòng vừa thường mất 4–8 tuần từ thiết kế đến bàn giao.",
        },
        {
          title: "Có hỗ trợ khảo sát tận nơi không?",
          content:
            "Có. Đội ngũ sẽ đến khảo sát hiện trạng và tư vấn phương án phù hợp ngân sách.",
        },
      ],
      allowMultiple: "no" as const,
      titleColor: "#1c1917",
      contentColor: "#57534e",
      borderColor: "#e7e5e4",
      background: "#ffffff",
      activeBackground: "#fafaf9",
      titleSize: 16,
      contentSize: 14,
      radius: 10,
      padding: defaultSpacing(24),
      margin: defaultSpacing(0),
    },
    render: (props: {
      items: { title: string; content: string }[];
      allowMultiple: "yes" | "no";
      titleColor: string;
      contentColor: string;
      borderColor: string;
      background: string;
      activeBackground: string;
      titleSize: number;
      contentSize: number;
      radius: number;
      padding: SpacingBox;
      margin: SpacingBox;
    }) => (
      <div
        style={{
          ...spacingToCss(props.padding, "padding"),
          ...spacingToCss(props.margin, "margin"),
        }}
      >
        <AccordionSection {...props} />
      </div>
    ),
  },

  Testimonials: {
    label: "Testimonials",
    fields: {
      items: {
        type: "array" as const,
        label: "Đánh giá",
        getItemSummary: (item: { name?: string }, i?: number) =>
          item.name || `Person ${(i ?? 0) + 1}`,
        defaultItemProps: {
          quote: "Sản phẩm tuyệt vời.",
          name: "Lan Anh",
          role: "Marketing Lead",
          avatar: "",
        },
        arrayFields: {
          quote: { type: "textarea" as const, label: "Nội dung" },
          name: { type: "text" as const, label: "Tên" },
          role: { type: "text" as const, label: "Chức danh" },
          avatar: { type: "text" as const, label: "URL avatar" },
        },
      },
      autoplay: {
        type: "radio" as const,
        label: "Autoplay",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      interval: { type: "number" as const, label: "Interval (ms)", min: 2000 },
      cardBackground: { type: "text" as const, label: "Nền card" },
      quoteColor: { type: "text" as const, label: "Màu quote" },
      nameColor: { type: "text" as const, label: "Màu tên" },
      roleColor: { type: "text" as const, label: "Màu role" },
      quoteSize: { type: "number" as const, label: "Cỡ chữ quote", min: 12 },
      align: {
        type: "radio" as const,
        label: "Căn",
        options: [
          { label: "Trái", value: "left" },
          { label: "Giữa", value: "center" },
        ],
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
    },
    defaultProps: {
      items: [
        {
          quote: "Giống Elementor nhưng tự host được.",
          name: "Minh Tuấn",
          role: "Founder",
          avatar: "",
        },
        {
          quote: "Chỉnh slide và typography rất dễ.",
          name: "Hà My",
          role: "Designer",
          avatar: "",
        },
      ],
      autoplay: "yes" as const,
      interval: 4000,
      cardBackground: "#ffffff",
      quoteColor: "#292524",
      nameColor: "#1c1917",
      roleColor: "#78716c",
      quoteSize: 18,
      align: "center" as const,
      padding: defaultSpacing(24),
      margin: defaultSpacing(0),
    },
    render: (props: {
      items: {
        quote: string;
        name: string;
        role: string;
        avatar: string;
      }[];
      autoplay: "yes" | "no";
      interval: number;
      cardBackground: string;
      quoteColor: string;
      nameColor: string;
      roleColor: string;
      quoteSize: number;
      align: "left" | "center";
      padding: SpacingBox;
      margin: SpacingBox;
    }) => (
      <div
        style={{
          ...spacingToCss(props.padding, "padding"),
          ...spacingToCss(props.margin, "margin"),
        }}
      >
        <TestimonialsSection {...props} />
      </div>
    ),
  },

  Video: {
    label: "Video",
    fields: {
      src: { type: "text" as const, label: "YouTube / Vimeo / MP4 URL" },
      poster: { type: "text" as const, label: "Poster image URL" },
      aspectRatio: {
        type: "select" as const,
        label: "Tỷ lệ",
        options: [
          { label: "16:9", value: "16/9" },
          { label: "4:3", value: "4/3" },
          { label: "1:1", value: "1/1" },
        ],
      },
      autoplay: {
        type: "radio" as const,
        label: "Autoplay (muted)",
        options: [
          { label: "Không", value: "no" },
          { label: "Có", value: "yes" },
        ],
      },
      controls: {
        type: "radio" as const,
        label: "Controls",
        options: [
          { label: "Hiện", value: "yes" },
          { label: "Ẩn", value: "no" },
        ],
      },
      radius: { type: "number" as const, label: "Bo góc", min: 0 },
      align: {
        type: "radio" as const,
        label: "Căn",
        options: [
          { label: "Trái", value: "left" },
          { label: "Giữa", value: "center" },
          { label: "Phải", value: "right" },
        ],
      },
      width: { type: "number" as const, label: "Width %", min: 30, max: 100 },
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
    },
    defaultProps: {
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      poster: "",
      aspectRatio: "16/9" as const,
      autoplay: "no" as const,
      controls: "yes" as const,
      radius: 12,
      align: "center" as const,
      width: 100,
      padding: defaultSpacing(24),
      margin: defaultSpacing(0),
    },
    render: ({
      src,
      poster,
      aspectRatio,
      autoplay,
      controls,
      radius,
      align,
      width,
      padding,
      margin,
    }: {
      src: string;
      poster: string;
      aspectRatio: string;
      autoplay: "yes" | "no";
      controls: "yes" | "no";
      radius: number;
      align: "left" | "center" | "right";
      width: number;
      padding: SpacingBox;
      margin: SpacingBox;
    }) => {
      const isEmbed =
        src.includes("youtube.com") ||
        src.includes("youtu.be") ||
        src.includes("vimeo.com");

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
          <div
            style={{
              width: `${width}%`,
              aspectRatio,
              borderRadius: radius,
              overflow: "hidden",
              background: "#0c0a09",
            }}
          >
            {isEmbed ? (
              <iframe
                src={src}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            ) : (
              <video
                src={src}
                poster={poster || undefined}
                controls={controls === "yes"}
                autoPlay={autoplay === "yes"}
                muted={autoplay === "yes"}
                loop={autoplay === "yes"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      );
    },
  },
};
