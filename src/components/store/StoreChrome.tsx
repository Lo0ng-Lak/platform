"use client";

import type { Data } from "@puckeditor/core";
import { Render } from "@puckeditor/core";
import type { ReactNode } from "react";
import config from "@/puck.config";
import type { SiteSettings } from "@/lib/settings-types";
import { SiteSettingsProvider } from "@/components/builder/SiteSettingsContext";

/** Chrome (header/footer của site) cho các trang cửa hàng: shop, SP, giỏ, checkout. */
export function StoreChrome({
  header,
  footer,
  settings,
  children,
}: {
  header: Data;
  footer: Data;
  settings: SiteSettings;
  children: ReactNode;
}) {
  return (
    <SiteSettingsProvider settings={settings}>
      <div
        style={{
          minHeight: "100vh",
          background: "#fafaf9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div data-site-region="header" style={{ flexShrink: 0 }}>
          <Render config={config} data={header} />
        </div>
        <main style={{ flex: "1 0 auto", width: "100%" }}>{children}</main>
        <div data-site-region="footer" style={{ flexShrink: 0 }}>
          <Render config={config} data={footer} />
        </div>
      </div>
    </SiteSettingsProvider>
  );
}
