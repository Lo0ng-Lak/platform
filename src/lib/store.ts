/**
 * Layer dữ liệu cửa hàng kiểu Shopify: sản phẩm thật + đơn hàng.
 * Dùng chung cơ chế đọc/ghi database.json với cache sẵn có trong pages.ts
 * (readDatabase trả bản clone, writeDatabase cập nhật cache ngay sau khi ghi).
 */
import { readDatabase, writeDatabase, getSettings } from "@/lib/pages";
import type { SiteSettings } from "@/lib/settings-types";
import {
  formatVND,
  slugify,
  ORDER_STATUSES,
  type Order,
  type OrderItem,
  type OrderStatus,
  type Product,
  type ProductVariant,
} from "@/lib/store-types";

export * from "@/lib/store-types";

/* ---------------------------------- Products --------------------------------- */

export function getProducts(): Product[] {
  return readDatabase().products;
}

export function getProductById(id: string): Product | null {
  return readDatabase().products.find((p) => p.id === id) ?? null;
}

export function getProductBySlug(slug: string): Product | null {
  return readDatabase().products.find((p) => p.slug === slug) ?? null;
}

export type ProductInput = {
  name: string;
  slug?: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
  description?: string;
  collection?: string;
  stock?: number;
  variants?: ProductVariant[];
};

function cleanVariants(input: unknown): ProductVariant[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (v): v is ProductVariant =>
        !!v && typeof v === "object" && typeof (v as ProductVariant).label === "string"
    )
    .map((v) => ({
      label: String(v.label).trim(),
      options: Array.isArray(v.options)
        ? v.options.map((o) => String(o).trim()).filter(Boolean)
        : [],
    }))
    .filter((v) => v.label && v.options.length > 0);
}

/** Validate + chuẩn hoá dữ liệu sản phẩm từ request body. Ném Error nếu sai. */
export function parseProductInput(body: unknown, base?: Product): Product {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = String(b.name ?? base?.name ?? "").trim();
  if (!name) throw new Error("Thiếu tên sản phẩm");

  const price = Number(b.price ?? base?.price);
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Giá sản phẩm không hợp lệ");
  }

  const compareRaw = b.compareAtPrice ?? base?.compareAtPrice;
  const compareAtPrice =
    compareRaw === undefined || compareRaw === null || compareRaw === ""
      ? undefined
      : Number(compareRaw);
  if (compareAtPrice !== undefined && (!Number.isFinite(compareAtPrice) || compareAtPrice < 0)) {
    throw new Error("Giá gốc không hợp lệ");
  }

  const stock = Number(b.stock ?? base?.stock ?? 0);
  if (!Number.isFinite(stock) || stock < 0) {
    throw new Error("Tồn kho không hợp lệ");
  }

  return {
    id: base?.id ?? `sp-${Date.now().toString(36)}`,
    slug: slugify(String(b.slug ?? base?.slug ?? name)) || base?.slug || `san-pham-${Date.now()}`,
    name,
    price: Math.round(price),
    compareAtPrice:
      compareAtPrice !== undefined ? Math.round(compareAtPrice) : undefined,
    image: String(b.image ?? base?.image ?? ""),
    description: String(b.description ?? base?.description ?? ""),
    collection: String(b.collection ?? base?.collection ?? "Chung"),
    stock: Math.floor(stock),
    variants: cleanVariants(b.variants ?? base?.variants ?? []),
    createdAt: base?.createdAt ?? new Date().toISOString(),
  };
}

function assertUniqueSlug(db: { products: Product[] }, slug: string, exceptId?: string) {
  if (db.products.some((p) => p.slug === slug && p.id !== exceptId)) {
    throw new Error(`Slug "${slug}" đã được dùng cho sản phẩm khác`);
  }
}

export function createProduct(input: ProductInput): Product {
  const db = readDatabase();
  const product = parseProductInput(input);
  assertUniqueSlug(db, product.slug);
  db.products = [product, ...db.products];
  writeDatabase(db);
  return product;
}

export function updateProduct(id: string, input: Partial<ProductInput>): Product {
  const db = readDatabase();
  const idx = db.products.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Không tìm thấy sản phẩm");
  const updated = parseProductInput({ ...db.products[idx], ...input }, db.products[idx]);
  assertUniqueSlug(db, updated.slug, id);
  db.products[idx] = updated;
  writeDatabase(db);
  return updated;
}

export function deleteProduct(id: string) {
  const db = readDatabase();
  const before = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length === before) throw new Error("Không tìm thấy sản phẩm");
  writeDatabase(db);
}

/* ----------------------------------- Orders ---------------------------------- */

export function getOrders(): Order[] {
  return [...readDatabase().orders].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}

export function getOrderById(id: string): Order | null {
  return readDatabase().orders.find((o) => o.id === id) ?? null;
}

export type CreateOrderInput = {
  customer: { name: string; phone: string; address: string; note?: string };
  items: { productId: string; qty: number; variant?: string }[];
  paymentMethod?: "cod" | "bank";
};

/**
 * Tạo đơn hàng: validate đầu vào, lấy giá từ sản phẩm thật phía server
 * (không tin giá client gửi), trừ tồn kho, sinh mã đơn.
 */
export function createOrder(input: CreateOrderInput): Order {
  const customer = input?.customer ?? ({} as CreateOrderInput["customer"]);
  const name = String(customer.name ?? "").trim();
  const phone = String(customer.phone ?? "").trim();
  const address = String(customer.address ?? "").trim();
  if (!name) throw new Error("Thiếu họ tên khách hàng");
  if (!/^[0-9+ .()-]{8,15}$/.test(phone)) throw new Error("Số điện thoại không hợp lệ");
  if (!address) throw new Error("Thiếu địa chỉ giao hàng");
  if (!Array.isArray(input?.items) || input.items.length === 0) {
    throw new Error("Giỏ hàng trống");
  }

  const db = readDatabase();
  const items: OrderItem[] = [];

  for (const raw of input.items) {
    const product = db.products.find((p) => p.id === raw.productId);
    if (!product) throw new Error(`Sản phẩm không còn tồn tại: ${raw.productId}`);
    const qty = Math.floor(Number(raw.qty));
    if (!Number.isFinite(qty) || qty < 1) throw new Error("Số lượng không hợp lệ");
    if (qty > product.stock) {
      throw new Error(`"${product.name}" chỉ còn ${product.stock} sản phẩm`);
    }
    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      variant: raw.variant ? String(raw.variant) : undefined,
      qty,
    });
    product.stock -= qty;
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const code = `DH${Date.now().toString(36).toUpperCase()}`;
  const order: Order = {
    id: `ord-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4)}`,
    code,
    customer: {
      name,
      phone,
      address,
      note: customer.note ? String(customer.note) : undefined,
    },
    items,
    subtotal,
    total: subtotal,
    paymentMethod: input.paymentMethod === "bank" ? "bank" : "cod",
    status: "new",
    createdAt: new Date().toISOString(),
  };

  db.orders = [order, ...db.orders];
  writeDatabase(db);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order {
  if (!ORDER_STATUSES.includes(status)) throw new Error("Trạng thái không hợp lệ");
  const db = readDatabase();
  const order = db.orders.find((o) => o.id === id);
  if (!order) throw new Error("Không tìm thấy đơn hàng");
  order.status = status;
  writeDatabase(db);
  return order;
}

export function deleteOrder(id: string) {
  const db = readDatabase();
  db.orders = db.orders.filter((o) => o.id !== id);
  writeDatabase(db);
}

/* ------------------------- Bridge sang blocks sản phẩm ------------------------ */

/**
 * Trả về settings với `products` được thay bằng SẢN PHẨM THẬT của cửa hàng
 * (định dạng SiteProduct mà các block ProductGrid/ProductCard đang dùng).
 * Nhờ vậy mọi block đặt "Nguồn sản phẩm = Catalog site" sẽ hiển thị SP thật,
 * link sang trang chi tiết /products/<slug> và có productId để thêm vào giỏ.
 * Nếu cửa hàng chưa có sản phẩm nào thì giữ nguyên products trong settings.
 */
export function getSettingsWithStoreProducts(): SiteSettings {
  const settings = getSettings();
  const products = getProducts();
  if (!products.length) return settings;
  return {
    ...settings,
    products: products.map((p) => ({
      id: p.id,
      productId: p.id,
      slug: p.slug,
      stock: p.stock,
      priceValue: p.price,
      name: p.name,
      price: formatVND(p.price),
      compareAt: p.compareAtPrice ? formatVND(p.compareAtPrice) : undefined,
      image: p.image,
      badge: p.compareAtPrice && p.compareAtPrice > p.price ? "Sale" : undefined,
      href: `/products/${p.slug}`,
      category: p.collection,
      description: p.description,
    })),
  };
}
