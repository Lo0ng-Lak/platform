import { NextResponse } from "next/server";
import {
  createPage,
  deletePage,
  listPages,
  normalizePath,
  savePage,
} from "@/lib/pages";
import { homepageTemplate } from "@/lib/templates";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json({ pages: listPages() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    path?: string;
    title?: string;
    seedHome?: boolean;
  };

  try {
    if (body.seedHome) {
      savePage("/", homepageTemplate, "Trang chủ");
      revalidatePath("/");
      return NextResponse.json({
        page: { path: "/", title: "Trang chủ", updatedAt: new Date().toISOString() },
      });
    }

    const pagePath = normalizePath(body.path || "");
    const title = body.title?.trim() || pagePath;

    if (!pagePath || pagePath === "/") {
      return NextResponse.json(
        { error: "Đường dẫn không hợp lệ. Dùng ví dụ: /about" },
        { status: 400 }
      );
    }

    const page = createPage(pagePath, title);
    revalidatePath(pagePath);
    return NextResponse.json({ page });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không tạo được trang" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("path");

  if (!pagePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  deletePage(pagePath);
  revalidatePath(pagePath);
  return NextResponse.json({ status: "ok" });
}
