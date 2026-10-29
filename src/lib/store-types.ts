/**
 * Kiểu dữ liệu cho phần cửa hàng kiểu Shopify (sản phẩm thật + đơn hàng).
 * File này thuần types + hằng số, không import gì để tránh vòng lặp import
 * (pages.ts và store.ts đều dùng).
 */

export type ProductVariant = {
  /** Tên nhóm biến thể, ví dụ "Size" hoặc "Màu" */
  label: string;
  options: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Giá bán (VND, số nguyên) */
  price: number;
  /** Giá gốc trước giảm (VND) — bỏ trống nếu không sale */
  compareAtPrice?: number;
  image: string;
  description: string;
  collection: string;
  stock: number;
  variants: ProductVariant[];
  createdAt: string;
};

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "shipping",
  "done",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Mới",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  done: "Hoàn thành",
  cancelled: "Đã huỷ",
};

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  variant?: string;
  qty: number;
};

export type Order = {
  id: string;
  code: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    note?: string;
  };
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod: "cod" | "bank";
  status: OrderStatus;
  createdAt: string;
};

/** 4 sản phẩm mẫu (mockup) — seed cho database.json và DB mới tạo. */
export const SEED_PRODUCTS: Product[] = [
  {
    id: "sp-ao-thun-basic",
    slug: "ao-thun-basic-trang",
    name: "Áo thun Basic trắng",
    price: 199000,
    compareAtPrice: 259000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    description:
      "Áo thun cotton 100% dày dặn, form regular thoải mái. Thoáng mát, ít nhăn, giặt máy thoải mái — món đồ cơ bản nên có trong mọi tủ đồ.",
    collection: "Thời trang",
    stock: 48,
    variants: [
      { label: "Size", options: ["S", "M", "L", "XL"] },
      { label: "Màu", options: ["Trắng", "Đen", "Xám"] },
    ],
    createdAt: "2026-10-29T08:00:00.000Z",
  },
  {
    id: "sp-hoodie-oversize",
    slug: "hoodie-oversize-be",
    name: "Hoodie oversize màu be",
    price: 449000,
    compareAtPrice: 549000,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80",
    description:
      "Hoodie nỉ bông oversize, mũ trùm 2 lớp và túi kangaroo tiện lợi. Form rộng unisex, mặc ấm mà vẫn nhẹ, hợp đi học, đi làm và dạo phố.",
    collection: "Thời trang",
    stock: 32,
    variants: [
      { label: "Size", options: ["M", "L", "XL"] },
      { label: "Màu", options: ["Be", "Đen", "Xanh rêu"] },
    ],
    createdAt: "2026-10-29T08:00:00.000Z",
  },
  {
    id: "sp-tui-tote-canvas",
    slug: "tui-tote-canvas",
    name: "Túi tote canvas",
    price: 159000,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=80",
    description:
      "Túi tote vải canvas dày, quai đeo chắc chắn, đựng vừa laptop 14 inch, sách và đồ cá nhân. Có ngăn nhỏ bên trong để điện thoại và ví.",
    collection: "Phụ kiện",
    stock: 75,
    variants: [{ label: "Màu", options: ["Trắng kem", "Đen", "Nâu"] }],
    createdAt: "2026-10-29T08:00:00.000Z",
  },
  {
    id: "sp-mu-luoi-trai",
    slug: "mu-luoi-trai-theu-logo",
    name: "Mũ lưỡi trai thêu logo",
    price: 129000,
    compareAtPrice: 169000,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
    description:
      "Mũ lưỡi trai kaki thêu logo nổi, vành cong và khoá điều chỉnh phía sau — vừa mọi vòng đầu. Chống nắng tốt, phối được với nhiều outfit.",
    collection: "Phụ kiện",
    stock: 120,
    variants: [{ label: "Màu", options: ["Đen", "Trắng", "Xanh navy"] }],
    createdAt: "2026-10-29T08:00:00.000Z",
  },
];

/** Định dạng số tiền VND: 199000 → "199.000đ" */
export function formatVND(amount: number): string {
  const n = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `${n.toLocaleString("vi-VN")}đ`;
}

/** "Áo thun Basic trắng" → "ao-thun-basic-trang" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
