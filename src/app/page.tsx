import type { Metadata } from "next";
import { PageRender } from "./[...puckPath]/client";
import { getPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Trang chủ",
};

export default function HomePage() {
  const data = getPage("/");

  if (!data) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-stone-900">Website đang được chuẩn bị</h1>
        <p className="text-stone-600">Vui lòng quay lại sau.</p>
      </main>
    );
  }

  return <PageRender data={data} />;
}

export const dynamic = "force-dynamic";
