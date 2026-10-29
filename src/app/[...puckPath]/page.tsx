import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/builder/SiteChrome";
import { getFooter, getHeader, getPage, getSettings } from "@/lib/pages";
import { getSettingsWithStoreProducts } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const page = getPage(path);
  const settings = getSettings();

  return {
    title: (page?.root?.props?.title as string | undefined) || path,
    description: settings.tagline || undefined,
    icons: settings.faviconUrl ? [{ url: settings.faviconUrl }] : undefined,
  };
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;

  if (
    puckPath[0] === "dashboard" ||
    puckPath[0] === "api" ||
    puckPath[0] === "puck" ||
    puckPath[0] === "edit" ||
    puckPath[0] === "admin"
  ) {
    notFound();
  }

  const page = getPage(path);
  if (!page) notFound();

  return (
    <SiteChrome
      header={getHeader()}
      footer={getFooter()}
      page={page}
      settings={getSettingsWithStoreProducts()}
    />
  );
}

export const dynamic = "force-dynamic";
