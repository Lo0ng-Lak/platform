import type { Metadata } from "next";
import { StoreChrome } from "@/components/store/StoreChrome";
import { getFooter, getHeader } from "@/lib/pages";
import { getSettingsWithStoreProducts } from "@/lib/store";
import { CartClient } from "./CartClient";

export const metadata: Metadata = { title: "Giỏ hàng" };

export default function CartPage() {
  return (
    <StoreChrome
      header={getHeader()}
      footer={getFooter()}
      settings={getSettingsWithStoreProducts()}
    >
      <CartClient />
    </StoreChrome>
  );
}
