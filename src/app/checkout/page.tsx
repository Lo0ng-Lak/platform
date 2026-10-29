import type { Metadata } from "next";
import { StoreChrome } from "@/components/store/StoreChrome";
import { getFooter, getHeader } from "@/lib/pages";
import { getSettingsWithStoreProducts } from "@/lib/store";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = { title: "Thanh toán" };

export default function CheckoutPage() {
  return (
    <StoreChrome
      header={getHeader()}
      footer={getFooter()}
      settings={getSettingsWithStoreProducts()}
    >
      <CheckoutClient />
    </StoreChrome>
  );
}
