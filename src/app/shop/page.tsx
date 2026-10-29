import type { Metadata } from "next";
import Link from "next/link";
import { StoreChrome } from "@/components/store/StoreChrome";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { getFooter, getHeader } from "@/lib/pages";
import { formatVND, getProducts, getSettingsWithStoreProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cửa hàng",
  description: "Tất cả sản phẩm của cửa hàng",
};

export default function ShopPage() {
  const products = getProducts();
  const collections = [...new Set(products.map((p) => p.collection))];

  return (
    <StoreChrome
      header={getHeader()}
      footer={getFooter()}
      settings={getSettingsWithStoreProducts()}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "48px 24px 64px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0f766e", margin: 0 }}>
          Cửa hàng
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", margin: "10px 0 8px" }}>
          Tất cả sản phẩm
        </h1>
        <p style={{ color: "#64748b", margin: "0 0 8px" }}>
          {products.length} sản phẩm
          {collections.length ? ` · ${collections.join(" · ")}` : ""}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 20,
            marginTop: 28,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link href={`/products/${p.slug}`} style={{ display: "block", position: "relative", aspectRatio: "1", background: "#f1f5f9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {p.compareAtPrice && p.compareAtPrice > p.price ? (
                  <span style={{ position: "absolute", top: 10, left: 10, background: "#0f172a", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 6 }}>
                    -{Math.round((1 - p.price / p.compareAtPrice) * 100)}%
                  </span>
                ) : null}
                {p.stock <= 0 ? (
                  <span style={{ position: "absolute", top: 10, right: 10, background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 6 }}>
                    Hết hàng
                  </span>
                ) : null}
              </Link>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8" }}>
                  {p.collection}
                </span>
                <Link href={`/products/${p.slug}`} style={{ fontWeight: 700, fontSize: 15, color: "inherit", textDecoration: "none" }}>
                  {p.name}
                </Link>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                  <span style={{ fontWeight: 800, color: "#0f766e", fontSize: 16 }}>{formatVND(p.price)}</span>
                  {p.compareAtPrice ? (
                    <span style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>
                      {formatVND(p.compareAtPrice)}
                    </span>
                  ) : null}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <AddToCartButton
                    productId={p.id}
                    slug={p.slug}
                    name={p.name}
                    image={p.image}
                    price={p.price}
                    disabled={p.stock <= 0}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 ? (
          <p style={{ color: "#64748b", marginTop: 32 }}>
            Cửa hàng chưa có sản phẩm nào. Vào{" "}
            <Link href="/admin/products" style={{ color: "#0f766e", fontWeight: 600 }}>
              Admin → Sản phẩm
            </Link>{" "}
            để thêm.
          </p>
        ) : null}
      </div>
    </StoreChrome>
  );
}
