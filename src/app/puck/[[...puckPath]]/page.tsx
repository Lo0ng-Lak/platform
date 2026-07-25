import "@puckeditor/core/puck.css";
import type { Metadata } from "next";
import { Client } from "./client";
import { getPage } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath?: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = puckPath.length ? `/${puckPath.join("/")}` : "/";

  return {
    title: `Editor: ${path}`,
  };
}

export default async function EditorPage({
  params,
}: {
  params: Promise<{ puckPath?: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = puckPath.length ? `/${puckPath.join("/")}` : "/";
  const data = getPage(path) || {
    root: {
      props: {
        title: path === "/" ? "Trang chủ" : path,
        pageBackground: "#fafaf9",
        contentMaxWidth: 1140,
        header: [],
        footer: [],
      },
    },
    content: [],
  };

  return <Client path={path} data={data} />;
}

export const dynamic = "force-dynamic";
