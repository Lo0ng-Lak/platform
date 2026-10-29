import type { Data } from "@puckeditor/core";

export const headerTemplate: Data = {
  root: { props: { title: "Header" } },
  content: [
    {
      type: "Navbar",
      props: {
        id: "Navbar-1",
        brand: "Studio",
        link1Label: "Trang chủ",
        link1Href: "/",
        link2Label: "Dịch vụ",
        link2Href: "/services",
        link3Label: "Liên hệ",
        link3Href: "/contact",
        ctaLabel: "Liên hệ ngay",
        ctaHref: "/contact",
        background: "#ffffff",
        textColor: "#1c1917",
        sticky: "yes",
        padding: { top: 16, right: 24, bottom: 16, left: 24 },
      },
    },
  ],
};

export const footerTemplate: Data = {
  root: { props: { title: "Footer" } },
  content: [
    {
      type: "Footer",
      props: {
        id: "Footer-1",
        brand: "Studio",
        text: "Thiết kế không gian làm việc hiện đại cho đội ngũ sáng tạo.",
        link1Label: "Điều khoản",
        link1Href: "/terms",
        link2Label: "Liên hệ",
        link2Href: "/contact",
        background: "#0c0a09",
        textColor: "#a8a29e",
        padding: { top: 48, right: 24, bottom: 48, left: 24 },
      },
    },
  ],
};

/** Body trang chủ — không gồm header/footer */
export const homepageTemplate = {
  root: {
    props: {
      title: "Trang chủ",
      pageBackground: "#ffffff",
    },
  },
  content: [
    {
      type: "Slider",
      props: {
        id: "Slider-1",
        slides: [
          {
            image:
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
            title: "Không gian làm việc hiện đại",
            subtitle:
              "Thiết kế nội thất văn phòng tối giản, tối ưu ánh sáng và trải nghiệm.",
            buttonLabel: "Khám phá dịch vụ",
            buttonHref: "/services",
            textAlign: "center",
            contentVertical: "center",
            overlayColor: "#000000",
            overlayOpacity: 45,
            titleColor: "#ffffff",
            subtitleColor: "#f5f5f4",
            titleSize: 52,
            subtitleSize: 18,
          },
          {
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
            title: "Tối ưu cho đội ngũ sáng tạo",
            subtitle: "Từ concept đến thi công — đồng bộ thương hiệu và không gian.",
            buttonLabel: "Liên hệ tư vấn",
            buttonHref: "/contact",
            textAlign: "left",
            contentVertical: "center",
            overlayColor: "#022c22",
            overlayOpacity: 50,
            titleColor: "#ecfdf5",
            subtitleColor: "#a7f3d0",
            titleSize: 48,
            subtitleSize: 17,
          },
        ],
        height: 520,
        autoplay: "yes",
        interval: 4500,
        loop: "yes",
        transition: "fade",
        transitionMs: 700,
        textAnimation: "fadeUp",
        showArrows: "yes",
        showDots: "yes",
        pauseOnHover: "yes",
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
    {
      type: "Container",
      props: {
        id: "Container-features",
        structure: {
          tag: "section",
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
        },
        flexGrid: {
          direction: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          alignContent: "stretch",
          flexWrap: "nowrap",
          gap: 24,
          rowGap: 24,
          columnGap: 24,
          gridColumns: 3,
          gridRows: 1,
          gridAutoFlow: "row",
        },
        position: {
          position: "relative",
          zIndex: 0,
          offsetTop: 0,
          offsetRight: 0,
          offsetBottom: 0,
          offsetLeft: 0,
          stickyOffset: 0,
        },
        advanced: {
          overflow: "visible",
          overflowX: "visible",
          overflowY: "visible",
          opacity: 100,
          hideDesktop: "no",
          hideTablet: "no",
          hideMobile: "no",
        },
        padding: { top: 64, right: 24, bottom: 32, left: 24 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        background: {
          type: "color",
          color: "#ffffff",
          imageUrl: "",
          imagePosition: "center center",
          imageSize: "cover",
          imageRepeat: "no-repeat",
          imageAttachment: "scroll",
          gradient: "linear-gradient(135deg, #ecfdf5 0%, #fafaf9 100%)",
          overlayColor: "#000000",
          overlayOpacity: 0,
          overlayBlend: "normal",
        },
        border: {
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
        },
        shadow: {
          enabled: "no",
          x: 0,
          y: 8,
          blur: 24,
          spread: 0,
          color: "rgba(0,0,0,0.12)",
          inset: "no",
        },
        children: [
          {
            type: "Heading",
            props: {
              id: "Heading-1",
              text: "Dịch vụ của chúng tôi",
              tag: "h2",
              typography: {
                fontSize: 36,
                fontWeight: "700",
                lineHeight: 1.2,
                letterSpacing: 0,
                textAlign: "center",
                color: "#1c1917",
                textTransform: "none",
                fontStyle: "normal",
                textDecoration: "none",
              },
              padding: { top: 0, right: 0, bottom: 0, left: 0 },
              margin: { top: 0, right: 0, bottom: 8, left: 0 },
            },
          },
          {
            type: "Text",
            props: {
              id: "Text-1",
              text: "Tư vấn thiết kế, thi công và hoàn thiện không gian làm việc theo nhu cầu từng doanh nghiệp.",
              typography: {
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 1.7,
                letterSpacing: 0,
                textAlign: "center",
                color: "#57534e",
                textTransform: "none",
                fontStyle: "normal",
                textDecoration: "none",
              },
              padding: { top: 0, right: 0, bottom: 0, left: 0 },
              margin: { top: 0, right: 0, bottom: 12, left: 0 },
            },
          },
        ],
      },
    },
  ],
} as Data;

export const servicesTemplate = {
  root: {
    props: {
      title: "Dịch vụ",
      pageBackground: "#ffffff",
    },
  },
  content: [
    {
      type: "Heading",
      props: {
        id: "Heading-services",
        text: "Dịch vụ",
        tag: "h1",
        typography: {
          fontSize: 42,
          fontWeight: "700",
          lineHeight: 1.2,
          letterSpacing: 0,
          textAlign: "left",
          color: "#1c1917",
          textTransform: "none",
          fontStyle: "normal",
          textDecoration: "none",
        },
        padding: { top: 64, right: 24, bottom: 12, left: 24 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
    {
      type: "Text",
      props: {
        id: "Text-services",
        text: "Thiết kế nội thất, cải tạo văn phòng và tư vấn không gian làm việc.",
        typography: {
          fontSize: 17,
          fontWeight: "400",
          lineHeight: 1.7,
          letterSpacing: 0,
          textAlign: "left",
          color: "#57534e",
          textTransform: "none",
          fontStyle: "normal",
          textDecoration: "none",
        },
        padding: { top: 0, right: 24, bottom: 64, left: 24 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
  ],
} as Data;

export const contactTemplate = {
  root: {
    props: {
      title: "Liên hệ",
      pageBackground: "#fafaf9",
    },
  },
  content: [
    {
      type: "Heading",
      props: {
        id: "Heading-contact",
        text: "Liên hệ",
        tag: "h1",
        typography: {
          fontSize: 42,
          fontWeight: "700",
          lineHeight: 1.2,
          letterSpacing: 0,
          textAlign: "left",
          color: "#1c1917",
          textTransform: "none",
          fontStyle: "normal",
          textDecoration: "none",
        },
        padding: { top: 64, right: 24, bottom: 12, left: 24 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
    {
      type: "Text",
      props: {
        id: "Text-contact",
        text: "Email: hello@studio.example — Hotline: 0123 456 789",
        typography: {
          fontSize: 17,
          fontWeight: "400",
          lineHeight: 1.7,
          letterSpacing: 0,
          textAlign: "left",
          color: "#57534e",
          textTransform: "none",
          fontStyle: "normal",
          textDecoration: "none",
        },
        padding: { top: 0, right: 24, bottom: 64, left: 24 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
  ],
} as Data;

/* ------------------------------------------------------------------ */
/* Giao diện mẫu (page templates) — dùng các catalog block có sẵn.     */
/* Helper chung giúp dữ liệu mẫu gọn và nhất quán về spacing/chữ.      */
/* ------------------------------------------------------------------ */

const tplSpacing = (background: string, pad = 64, maxWidth = 1140) => ({
  padding: { top: pad, right: 24, bottom: pad, left: 24 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  background,
  maxWidth,
});

const tplHeading = (id: string, text: string, size = 40) => ({
  type: "Heading",
  props: {
    id,
    text,
    tag: "h1",
    typography: {
      fontSize: size,
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: 0,
      textAlign: "center",
      color: "#1c1917",
      textTransform: "none",
      fontStyle: "normal",
      textDecoration: "none",
    },
    padding: { top: 72, right: 24, bottom: 10, left: 24 },
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  },
});

const tplText = (id: string, text: string) => ({
  type: "Text",
  props: {
    id,
    text,
    typography: {
      fontSize: 17,
      fontWeight: "400",
      lineHeight: 1.7,
      letterSpacing: 0,
      textAlign: "center",
      color: "#57534e",
      textTransform: "none",
      fontStyle: "normal",
      textDecoration: "none",
    },
    padding: { top: 0, right: 24, bottom: 8, left: 24 },
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  },
});

const tplHero = (
  id: string,
  bgImage: string,
  title: string,
  subtitle: string,
  ctaPrimary: string
) => ({
  type: "HeroBanner",
  props: {
    id,
    bgImage,
    title,
    subtitle,
    ctaPrimary,
    ctaPrimaryHref: "#",
    ctaSecondary: "Tìm hiểu thêm",
    ctaSecondaryHref: "#",
    overlay: "#000000",
    overlayOpacity: 48,
    minHeight: 520,
    align: "center",
    spacing: tplSpacing("#0f172a", 0),
  },
});

/** 1 · SaaS Landing — hero, bento tính năng, bảng giá, so sánh, đánh giá, CTA */
export const saasLandingTemplate = {
  root: { props: { title: "SaaS Landing", pageBackground: "#ffffff" } },
  content: [
    tplHero(
      "Hero-saas",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      "Phần mềm quản lý bán hàng cho đội ngũ hiện đại",
      "Tự động hoá đơn hàng, kho và chăm sóc khách hàng trong một nơi. Dùng thử miễn phí 14 ngày.",
      "Dùng thử miễn phí"
    ),
    {
      type: "FeatureBentoPro",
      props: {
        id: "Bento-saas",
        title: "Tính năng nổi bật",
        subtitle: "Đủ mạnh cho doanh nghiệp lớn, đủ đơn giản cho người mới.",
        align: "center",
        accent: "#0284c7",
        items: [
          {
            icon: "✦",
            title: "Dashboard trực quan",
            description: "Theo dõi doanh thu, đơn hàng và tồn kho theo thời gian thực trên một màn hình.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80",
            size: "large",
          },
          { icon: "⚡", title: "Đồng bộ siêu tốc", description: "Dữ liệu cập nhật tức thì trên mọi thiết bị.", image: "", size: "small" },
          { icon: "🤖", title: "Tự động hoá", description: "Nhắc nợ, gửi hoá đơn và báo cáo tự động.", image: "", size: "small" },
          { icon: "🔒", title: "Bảo mật ngân hàng", description: "Mã hoá đầu-cuối, sao lưu mỗi giờ.", image: "", size: "small" },
          { icon: "📱", title: "App di động", description: "Quản lý cửa hàng ngay trên điện thoại.", image: "", size: "small" },
        ],
        spacing: tplSpacing("#ffffff"),
      },
    },
    {
      type: "PricingCards",
      props: {
        id: "Pricing-saas",
        title: "Bảng giá linh hoạt",
        subtitle: "Bắt đầu miễn phí, nâng cấp khi bạn tăng trưởng.",
        align: "center",
        accent: "#0284c7",
        plans: [
          { name: "Starter", price: "0đ", period: "", description: "Trải nghiệm đầy đủ tính năng cơ bản", features: "50 đơn/tháng\n1 người dùng\nBáo cáo cơ bản", featured: "no", ctaLabel: "Bắt đầu miễn phí", ctaHref: "#" },
          { name: "Growth", price: "299.000đ", period: "/tháng", description: "Cho cửa hàng đang phát triển", features: "Không giới hạn đơn\n5 người dùng\nTự động hoá marketing\nHỗ trợ ưu tiên", featured: "yes", ctaLabel: "Dùng thử 14 ngày", ctaHref: "#" },
          { name: "Scale", price: "799.000đ", period: "/tháng", description: "Cho chuỗi nhiều chi nhánh", features: "Nhiều chi nhánh\nAPI riêng\nQuản lý tài khoản riêng", featured: "no", ctaLabel: "Liên hệ tư vấn", ctaHref: "#" },
        ],
        spacing: tplSpacing("#f0f9ff"),
      },
    },
    {
      type: "ComparisonTable",
      props: {
        id: "Compare-saas",
        title: "So với quản lý bằng Excel",
        subtitle: "Khác biệt thấy rõ sau tuần đầu tiên.",
        align: "center",
        usLabel: "Phần mềm của chúng tôi",
        themLabel: "Excel / sổ tay",
        rows: [
          { feature: "Tự động cộng tồn kho khi bán", us: "yes", them: "no" },
          { feature: "Báo cáo doanh thu theo ngày", us: "yes", them: "no" },
          { feature: "Nhiều người dùng cùng lúc", us: "yes", them: "no" },
          { feature: "Sao lưu dữ liệu tự động", us: "yes", them: "no" },
        ],
        spacing: tplSpacing("#ffffff", 64, 900),
      },
    },
    {
      type: "TestimonialWall",
      props: {
        id: "Quotes-saas",
        title: "Được tin dùng bởi 2.000+ cửa hàng",
        subtitle: "",
        align: "center",
        items: [
          { quote: "Tiết kiệm cho đội mình gần 20 giờ mỗi tuần nhờ tự động hoá đơn hàng.", author: "Anh Minh Tuấn", role: "Chủ chuỗi phụ kiện", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", rating: 5 },
          { quote: "Giao diện tiếng Việt dễ dùng, nhân viên mới học 1 buổi là thạo.", author: "Chị Hương Giang", role: "Quản lý cửa hàng", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", rating: 5 },
          { quote: "Báo cáo tồn kho chính xác hẳn, không còn thất thoát như trước.", author: "Anh Quốc Bảo", role: "Chủ kho sỉ", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80", rating: 5 },
        ],
        spacing: tplSpacing("#f8fafc"),
      },
    },
    {
      type: "GradientCtaBanner",
      props: {
        id: "Cta-saas",
        heading: "Dùng thử miễn phí 14 ngày",
        body: "Không cần thẻ tín dụng. Huỷ bất cứ lúc nào.",
        primaryLabel: "Bắt đầu ngay",
        primaryHref: "#",
        secondaryLabel: "Đặt lịch demo",
        secondaryHref: "#",
        gradientFrom: "#0369a1",
        gradientTo: "#059669",
        align: "center",
        spacing: tplSpacing("transparent", 56),
      },
    },
  ],
} as unknown as Data;

/** 2 · Portfolio cá nhân — giới thiệu, bộ sưu tập ảnh, kỹ năng, đánh giá, CTA */
export const portfolioTemplate = {
  root: { props: { title: "Portfolio", pageBackground: "#fafaf9" } },
  content: [
    tplHeading("Heading-portfolio", "Xin chào, mình là An — nhà thiết kế sản phẩm"),
    tplText(
      "Text-portfolio",
      "Mình giúp startup biến ý tưởng thành sản phẩm đẹp và dễ dùng. Dưới đây là những dự án tiêu biểu trong 5 năm qua."
    ),
    {
      type: "ImageGalleryGrid",
      props: {
        id: "Gallery-portfolio",
        images: [
          { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80", alt: "Dự án 1" },
          { src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80", alt: "Dự án 2" },
          { src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80", alt: "Dự án 3" },
          { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80", alt: "Dự án 4" },
          { src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80", alt: "Dự án 5" },
          { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", alt: "Dự án 6" },
        ],
        columns: "3",
        gap: 14,
        radius: 14,
        spacing: tplSpacing("#fafaf9", 40),
      },
    },
    {
      type: "FeatureBentoPro",
      props: {
        id: "Bento-portfolio",
        title: "Kỹ năng & dịch vụ",
        subtitle: "",
        align: "center",
        accent: "#7c3aed",
        items: [
          {
            icon: "🎨",
            title: "Thiết kế UI/UX trọn gói",
            description: "Từ nghiên cứu người dùng, wireframe đến hệ thống thiết kế hoàn chỉnh sẵn sàng bàn giao cho đội dev.",
            image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&q=80",
            size: "large",
          },
          { icon: "🧭", title: "UX Research", description: "Phỏng vấn, kiểm thử khả dụng, bản đồ hành trình.", image: "", size: "small" },
          { icon: "✒️", title: "Branding", description: "Logo và bộ nhận diện cho startup giai đoạn đầu.", image: "", size: "small" },
          { icon: "💻", title: "Webflow / Framer", description: "Dựng website chạy thật từ bản thiết kế.", image: "", size: "small" },
          { icon: "📐", title: "Design System", description: "Thư viện component nhất quán, dễ mở rộng.", image: "", size: "small" },
        ],
        spacing: tplSpacing("#ffffff"),
      },
    },
    {
      type: "TestimonialWall",
      props: {
        id: "Quotes-portfolio",
        title: "Khách hàng nhận xét",
        subtitle: "",
        align: "center",
        items: [
          { quote: "An nắm bắt yêu cầu cực nhanh và giao bản thiết kế đẹp hơn cả mong đợi.", author: "Chị Lan Phương", role: "CEO startup edtech", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80", rating: 5 },
          { quote: "Làm việc chuyên nghiệp, đúng deadline, giao tiếp rõ ràng.", author: "Anh David Trần", role: "Founder fintech", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80", rating: 5 },
          { quote: "Tỷ lệ chuyển đổi trang landing tăng 2 lần sau khi An thiết kế lại.", author: "Chị Mỹ Duyên", role: "Marketing Lead", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80", rating: 5 },
        ],
        spacing: tplSpacing("#fafaf9"),
      },
    },
    {
      type: "GradientCtaBanner",
      props: {
        id: "Cta-portfolio",
        heading: "Bạn có dự án muốn trao đổi?",
        body: "Mình đang nhận dự án freelance cho quý tới — nhắn tin để giữ lịch nhé.",
        primaryLabel: "Liên hệ hợp tác",
        primaryHref: "/contact",
        secondaryLabel: "",
        secondaryHref: "#",
        gradientFrom: "#6d28d9",
        gradientTo: "#db2777",
        align: "center",
        spacing: tplSpacing("transparent", 56),
      },
    },
  ],
} as unknown as Data;

/** 3 · Nhà hàng / Café — hero, giới thiệu, thực đơn, đánh giá, CTA đặt bàn */
export const restaurantTemplate = {
  root: { props: { title: "Nhà hàng", pageBackground: "#fffbeb" } },
  content: [
    tplHero(
      "Hero-restaurant",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
      "Hương vị Việt trong không gian hiện đại",
      "Nguyên liệu tươi mỗi sáng, đầu bếp 15 năm kinh nghiệm. Mở cửa 7:00 – 22:00 hằng ngày.",
      "Đặt bàn ngay"
    ),
    {
      type: "ImageWithText",
      props: {
        id: "About-restaurant",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
        heading: "Câu chuyện của quán",
        body: "Từ một quán nhỏ gia đình năm 2010, chúng tôi giữ nguyên triết lý: nấu như nấu cho người thân. Mỗi món ăn đều dùng nguyên liệu địa phương trong ngày, không chất bảo quản.",
        reverse: "no",
        gap: 44,
        spacing: tplSpacing("#ffffff", 56),
      },
    },
    {
      type: "MenuPriceList",
      props: {
        id: "Menu-restaurant",
        title: "Thực đơn nổi bật",
        subtitle: "Giá đã bao gồm VAT.",
        align: "center",
        accent: "#b45309",
        items: [
          { name: "Phở bò tái nạm", description: "Nước dùng ninh xương 12 giờ, bánh phở tươi", price: "65.000đ", tag: "Bán chạy" },
          { name: "Bún chả Hà Nội", description: "Thịt nướng than hoa, nước chấm chua ngọt", price: "59.000đ", tag: "" },
          { name: "Cơm tấm sườn bì", description: "Sườn nướng mật ong, bì nhà làm", price: "55.000đ", tag: "" },
          { name: "Gỏi cuốn tôm thịt", description: "Cuốn tươi khi gọi, nước chấm đậu phộng", price: "45.000đ", tag: "Mới" },
          { name: "Cà phê trứng", description: "Kem trứng đánh bông, cà phê phin", price: "39.000đ", tag: "" },
          { name: "Trà sen Tây Hồ", description: "Ướp sen thật, vị thanh nhẹ", price: "49.000đ", tag: "" },
        ],
        spacing: tplSpacing("#fffbeb"),
      },
    },
    {
      type: "TestimonialWall",
      props: {
        id: "Quotes-restaurant",
        title: "Thực khách nói gì",
        subtitle: "4.9/5 từ hơn 1.200 đánh giá trên Google.",
        align: "center",
        items: [
          { quote: "Phở ngon chuẩn vị Hà Nội, quán sạch và phục vụ nhanh. Cuối tuần hơi đông nên đặt bàn trước nhé.", author: "Chị Thuỳ Dương", role: "Thực khách quen", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", rating: 5 },
          { quote: "Đưa đối tác nước ngoài tới đây ai cũng khen. Sẽ quay lại nhiều lần nữa.", author: "Anh Phạm Hùng", role: "Doanh nhân", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", rating: 5 },
          { quote: "Giá hợp lý so với chất lượng. Món gỏi cuốn rất tươi.", author: "Bạn Khánh Vy", role: "Sinh viên", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80", rating: 4 },
        ],
        spacing: tplSpacing("#ffffff"),
      },
    },
    {
      type: "GradientCtaBanner",
      props: {
        id: "Cta-restaurant",
        heading: "Đặt bàn trước — giữ chỗ đẹp nhất",
        body: "Đặt online trong 1 phút, xác nhận ngay qua điện thoại.",
        primaryLabel: "Đặt bàn ngay",
        primaryHref: "/contact",
        secondaryLabel: "Xem thực đơn",
        secondaryHref: "#",
        gradientFrom: "#92400e",
        gradientTo: "#dc2626",
        align: "center",
        spacing: tplSpacing("transparent", 56),
      },
    },
  ],
} as unknown as Data;

/** 4 · Cửa hàng / Shop — hero, lưới sản phẩm, dịch vụ, đánh giá, CTA khuyến mãi */
export const shopTemplate = {
  root: { props: { title: "Cửa hàng", pageBackground: "#ffffff" } },
  content: [
    tplHero(
      "Hero-shop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
      "Bộ sưu tập mới — ưu đãi đến 40%",
      "Thời trang tối giản, chất liệu bền vững. Miễn phí vận chuyển cho đơn từ 499.000đ.",
      "Mua ngay"
    ),
    {
      type: "ProductGrid",
      props: {
        id: "Products-shop",
        title: "Sản phẩm nổi bật",
        subtitle: "Được yêu thích nhất tuần này",
        align: "center",
        productSource: "manual",
        products: [
          { name: "Áo thun Premium", price: "299.000đ", compareAt: "399.000đ", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", badge: "Sale", href: "#" },
          { name: "Giày sneaker", price: "1.290.000đ", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", badge: "New", href: "#" },
          { name: "Túi canvas", price: "450.000đ", image: "https://images.unsplash.com/photo-1548036328-c165bc401e83?w=600&q=80", href: "#" },
          { name: "Đồng hồ minimal", price: "890.000đ", compareAt: "1.100.000đ", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", badge: "-20%", href: "#" },
        ],
        columns: "4",
        gap: 20,
        cardRadius: 12,
        spacing: tplSpacing("#ffffff", 56),
      },
    },
    {
      type: "FeatureBentoPro",
      props: {
        id: "Bento-shop",
        title: "Mua sắm an tâm",
        subtitle: "",
        align: "center",
        accent: "#059669",
        items: [
          { icon: "🚚", title: "Giao nhanh 2h nội thành", description: "Đặt trước 16h, nhận hàng trong ngày tại TP.HCM và Hà Nội. Miễn phí cho đơn từ 499.000đ.", image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=1000&q=80", size: "large" },
          { icon: "↩️", title: "Đổi trả 30 ngày", description: "Không cần lý do, hoàn tiền nhanh.", image: "", size: "small" },
          { icon: "🛡️", title: "Bảo hành chính hãng", description: "Cam kết hàng thật 100%.", image: "", size: "small" },
          { icon: "💳", title: "Trả góp 0%", description: "Qua thẻ tín dụng và ví điện tử.", image: "", size: "small" },
          { icon: "🎁", title: "Ưu đãi thành viên", description: "Tích điểm đổi quà mỗi đơn hàng.", image: "", size: "small" },
        ],
        spacing: tplSpacing("#f8fafc"),
      },
    },
    {
      type: "TestimonialWall",
      props: {
        id: "Quotes-shop",
        title: "Khách hàng yêu thích",
        subtitle: "",
        align: "center",
        items: [
          { quote: "Chất lượng áo vượt mong đợi so với giá. Đã mua lần thứ 3.", author: "Chị Phương Thảo", role: "Khách quen", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", rating: 5 },
          { quote: "Giao hàng nhanh, đóng gói cẩn thận, đổi size rất dễ dàng.", author: "Anh Trọng Nghĩa", role: "Khách mới", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", rating: 5 },
          { quote: "Nhân viên tư vấn size chuẩn, mặc vừa y. Rất hài lòng.", author: "Bạn Ánh Ngọc", role: "Sinh viên", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80", rating: 5 },
        ],
        spacing: tplSpacing("#ffffff"),
      },
    },
    {
      type: "GradientCtaBanner",
      props: {
        id: "Cta-shop",
        heading: "Giảm thêm 10% cho đơn đầu tiên",
        body: "Nhập mã CHAO10 khi thanh toán — áp dụng đến hết tháng này.",
        primaryLabel: "Mua sắm ngay",
        primaryHref: "#",
        secondaryLabel: "",
        secondaryHref: "#",
        gradientFrom: "#065f46",
        gradientTo: "#0ea5e9",
        align: "center",
        spacing: tplSpacing("transparent", 56),
      },
    },
  ],
} as unknown as Data;

/** 5 · Spa / Làm đẹp — hero, gói liệu trình, chuyên viên, đánh giá, CTA đặt lịch */
export const spaTemplate = {
  root: { props: { title: "Spa", pageBackground: "#fdf2f8" } },
  content: [
    tplHero(
      "Hero-spa",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80",
      "Thư giãn trọn vẹn, tái tạo năng lượng",
      "Liệu trình chăm sóc da và massage chuẩn quốc tế giữa lòng thành phố.",
      "Đặt lịch ngay"
    ),
    {
      type: "PricingCards",
      props: {
        id: "Pricing-spa",
        title: "Gói liệu trình",
        subtitle: "Mua gói — tặng thêm 1 buổi trải nghiệm.",
        align: "center",
        accent: "#db2777",
        plans: [
          { name: "Thư giãn", price: "399.000đ", period: "/buổi", description: "Massage toàn thân 60 phút", features: "Massage đá nóng\nXông hơi thảo dược\nTrà gừng miễn phí", featured: "no", ctaLabel: "Đặt lịch", ctaHref: "#" },
          { name: "Chăm sóc da chuyên sâu", price: "699.000đ", period: "/buổi", description: "Liệu trình da 90 phút bán chạy nhất", features: "Làm sạch sâu\nĐắp mặt nạ vàng 24k\nMassage mặt nâng cơ\nTư vấn routine tại nhà", featured: "yes", ctaLabel: "Đặt lịch ngay", ctaHref: "#" },
          { name: "Phục hồi toàn diện", price: "1.199.000đ", period: "/buổi", description: "Combo 150 phút cho ngày đặc biệt", features: "Toàn bộ gói Chuyên sâu\nTắm thảo dược\nChăm sóc tóc\nSuất ăn nhẹ healthy", featured: "no", ctaLabel: "Đặt lịch", ctaHref: "#" },
        ],
        spacing: tplSpacing("#ffffff"),
      },
    },
    {
      type: "TeamShowcase",
      props: {
        id: "Team-spa",
        title: "Đội ngũ chuyên viên",
        subtitle: "Tay nghề cao, tận tâm với từng khách hàng.",
        align: "center",
        members: [
          { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", name: "Chị Hồng Nhung", role: "Chuyên viên da liễu", bio: "12 năm kinh nghiệm chăm sóc da chuyên sâu.", social: "" },
          { avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", name: "Chị Thanh Mai", role: "Kỹ thuật viên massage", bio: "Chứng chỉ quốc tế về liệu pháp đá nóng.", social: "" },
          { avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", name: "Chị Bảo Trân", role: "Tư vấn viên", bio: "Luôn lắng nghe để chọn liệu trình phù hợp nhất.", social: "" },
        ],
        spacing: tplSpacing("#fdf2f8"),
      },
    },
    {
      type: "TestimonialWall",
      props: {
        id: "Quotes-spa",
        title: "Khách hàng thư giãn nói gì",
        subtitle: "",
        align: "center",
        items: [
          { quote: "Không gian thơm dịu, nhân viên nhẹ nhàng. Da mình sáng hẳn sau 3 buổi.", author: "Chị Ngọc Anh", role: "Khách quen 2 năm", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80", rating: 5 },
          { quote: "Đi làm về mệt, ghé massage 60 phút là khoẻ hẳn. Đáng tiền.", author: "Chị Thu Hằng", role: "Nhân viên văn phòng", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80", rating: 5 },
          { quote: "Đặt lịch online rất tiện, đến nơi không phải chờ.", author: "Bạn Linh Chi", role: "Khách mới", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", rating: 5 },
        ],
        spacing: tplSpacing("#ffffff"),
      },
    },
    {
      type: "GradientCtaBanner",
      props: {
        id: "Cta-spa",
        heading: "Ưu đãi 20% cho khách lần đầu",
        body: "Đặt lịch hôm nay để giữ khung giờ cuối tuần đẹp nhất.",
        primaryLabel: "Đặt lịch ngay",
        primaryHref: "/contact",
        secondaryLabel: "",
        secondaryHref: "#",
        gradientFrom: "#9d174d",
        gradientTo: "#7c3aed",
        align: "center",
        spacing: tplSpacing("transparent", 56),
      },
    },
  ],
} as unknown as Data;

/** Danh sách mẫu hiển thị ở Dashboard — thêm mẫu mới thì đăng ký tại đây. */
export type PageTemplateMeta = {
  id: string;
  name: string;
  description: string;
  icon: string;
  suggestedPath: string;
  data: Data;
};

export const pageTemplates: PageTemplateMeta[] = [
  {
    id: "saas",
    name: "SaaS Landing",
    description: "Trang giới thiệu phần mềm: tính năng bento, bảng giá, so sánh, đánh giá, CTA.",
    icon: "💻",
    suggestedPath: "/saas",
    data: saasLandingTemplate,
  },
  {
    id: "portfolio",
    name: "Portfolio cá nhân",
    description: "Trang hồ sơ cá nhân: bộ sưu tập dự án, kỹ năng, nhận xét khách hàng.",
    icon: "🎨",
    suggestedPath: "/portfolio",
    data: portfolioTemplate,
  },
  {
    id: "restaurant",
    name: "Nhà hàng / Café",
    description: "Giới thiệu quán, thực đơn có giá, đánh giá thực khách và đặt bàn.",
    icon: "🍜",
    suggestedPath: "/restaurant",
    data: restaurantTemplate,
  },
  {
    id: "shop",
    name: "Cửa hàng / Shop",
    description: "Trang bán hàng: hero khuyến mãi, lưới sản phẩm, cam kết dịch vụ, CTA giảm giá.",
    icon: "🛍️",
    suggestedPath: "/shop",
    data: shopTemplate,
  },
  {
    id: "spa",
    name: "Spa / Làm đẹp",
    description: "Trang spa: gói liệu trình dạng bảng giá, đội ngũ chuyên viên, đặt lịch.",
    icon: "🌸",
    suggestedPath: "/spa",
    data: spaTemplate,
  },
];
