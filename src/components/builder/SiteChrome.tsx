"use client";

import type { Data } from "@puckeditor/core";
import { Render } from "@puckeditor/core";
import config from "@/puck.config";
import type { SiteSettings } from "@/lib/settings-types";
import { SiteSettingsProvider } from "@/components/builder/SiteSettingsContext";

export function SiteChrome({
  header,
  footer,
  page,
  settings,
}: {
  header: Data;
  footer: Data;
  page: Data;
  settings: SiteSettings;
}) {
  const bg =
    ((page.root?.props as { pageBackground?: string } | undefined)
      ?.pageBackground) || "#ffffff";

  return (
    <SiteSettingsProvider settings={settings}>
      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div data-site-region="header" style={{ flexShrink: 0 }}>
          <Render config={config} data={header} />
        </div>
        <main data-site-region="body" style={{ flex: "1 0 auto", width: "100%" }}>
          <Render config={config} data={page} />
        </main>
        <div data-site-region="footer" style={{ flexShrink: 0 }}>
          <Render config={config} data={footer} />
        </div>
      </div>
    </SiteSettingsProvider>
  );
}
