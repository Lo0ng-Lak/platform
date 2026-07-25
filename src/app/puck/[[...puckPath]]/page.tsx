import "@puckeditor/core/puck.css";
import type { Metadata } from "next";
import { BuilderEditor } from "@/components/builder/BuilderEditor";
import { emptyPage, getPage } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath?: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = puckPath.length ? `/${puckPath.join("/")}` : "/";
  return { title: `Sửa Body: ${path}` };
}

export default async function EditorPage({
  params,
}: {
  params: Promise<{ puckPath?: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = puckPath.length ? `/${puckPath.join("/")}` : "/";

  // Reserved — header/footer có route riêng
  if (path === "/header" || path === "/footer") {
    return null;
  }

  const data = getPage(path) || emptyPage(path === "/" ? "Trang chủ" : path);

  return <BuilderEditor kind="page" path={path} data={data} />;
}

export const dynamic = "force-dynamic";
