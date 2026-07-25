export type SiteProduct = {
  id: string;
  name: string;
  price: string;
  compareAt?: string;
  image: string;
  badge?: string;
  href?: string;
  category?: string;
  description?: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    zalo: string;
  };
  products: SiteProduct[];
};

export function defaultSettings(): SiteSettings {
  return {
    siteName: "Studio",
    tagline: "Thiết kế không gian làm việc hiện đại",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#0f766e",
    contact: {
      email: "hello@studio.vn",
      phone: "0123 456 789",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      hours: "T2–T6: 9:00–18:00",
    },
    social: {
      facebook: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      zalo: "",
    },
    products: [
      {
        id: "p1",
        name: "Áo thun Premium",
        price: "299.000đ",
        compareAt: "399.000đ",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
        badge: "Sale",
        href: "#",
        category: "Áo",
        description: "Áo thun cotton cao cấp",
      },
      {
        id: "p2",
        name: "Giày sneaker",
        price: "1.290.000đ",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
        badge: "New",
        href: "#",
        category: "Giày",
        description: "Sneaker nhẹ, êm",
      },
      {
        id: "p3",
        name: "Túi canvas",
        price: "450.000đ",
        image:
          "https://images.unsplash.com/photo-1548036328-c165bc401e83?w=600&q=80",
        href: "#",
        category: "Phụ kiện",
        description: "Túi vải bền đẹp",
      },
      {
        id: "p4",
        name: "Đồng hồ minimal",
        price: "890.000đ",
        compareAt: "1.100.000đ",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
        badge: "-20%",
        href: "#",
        category: "Phụ kiện",
        description: "Đồng hồ tối giản",
      },
    ],
  };
}
