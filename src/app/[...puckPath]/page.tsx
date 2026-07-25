import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRender } from "./client";
import { getPage } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const page = getPage(path);

  return {
    title: (page?.root?.props?.title as string | undefined) || path,
  };
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;

  // Reserved app routes
  if (puckPath[0] === "dashboard" || puckPath[0] === "api" || puckPath[0] === "puck") {
    notFound();
  }

  const data = getPage(path);
  if (!data) notFound();

  return <PageRender data={data} />;
}

export const dynamic = "force-dynamic";
