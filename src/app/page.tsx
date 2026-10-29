import type { Metadata } from "next";
import { SiteChrome } from "@/components/builder/SiteChrome";
import { getFooter, getHeader, getPage, getSettings } from "@/lib/pages";
import { getSettingsWithStoreProducts } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: settings.siteName || "Trang chủ",
    description: settings.tagline || undefined,
    icons: settings.faviconUrl ? [{ url: settings.faviconUrl }] : undefined,
  };
}

export default function HomePage() {
  const page = getPage("/");
  const header = getHeader();
  const footer = getFooter();
  const settings = getSettingsWithStoreProducts();

  if (!page) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-stone-900">Website đang được chuẩn bị</h1>
        <p className="text-stone-600">Vui lòng quay lại sau.</p>
      </main>
    );
  }

  return (
    <SiteChrome
      header={header}
      footer={footer}
      page={page}
      settings={settings}
    />
  );
}

export const dynamic = "force-dynamic";
