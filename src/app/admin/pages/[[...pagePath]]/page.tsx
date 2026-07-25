import "@puckeditor/core/puck.css";
import type { Metadata } from "next";
import { BuilderEditor } from "@/components/builder/BuilderEditor";
import { emptyPage, getPage, normalizePath } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pagePath?: string[] }>;
}): Promise<Metadata> {
  const { pagePath = [] } = await params;
  const path = pagePath.length ? normalizePath(`/${pagePath.join("/")}`) : "/";
  return { title: `Sửa Body: ${path}` };
}

export default async function AdminPageEditor({
  params,
}: {
  params: Promise<{ pagePath?: string[] }>;
}) {
  const { pagePath = [] } = await params;
  const path = pagePath.length ? normalizePath(`/${pagePath.join("/")}`) : "/";
  const data = getPage(path) || emptyPage(path === "/" ? "Trang chủ" : path);

  return <BuilderEditor kind="page" path={path} data={data} />;
}

export const dynamic = "force-dynamic";
