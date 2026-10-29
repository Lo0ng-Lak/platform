import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreChrome } from "@/components/store/StoreChrome";
import { getFooter, getHeader } from "@/lib/pages";
import { getProductBySlug, getSettingsWithStoreProducts } from "@/lib/store";
import { ProductDetail } from "./ProductDetail";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Ctx) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <StoreChrome
      header={getHeader()}
      footer={getFooter()}
      settings={getSettingsWithStoreProducts()}
    >
      <ProductDetail product={product} />
    </StoreChrome>
  );
}
