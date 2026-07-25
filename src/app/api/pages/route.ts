import { NextResponse } from "next/server";
import {
  createPage,
  deletePage,
  listPages,
  normalizePath,
  renamePage,
  saveFooter,
  saveHeader,
  savePage,
} from "@/lib/pages";
import {
  contactTemplate,
  footerTemplate,
  headerTemplate,
  homepageTemplate,
  servicesTemplate,
} from "@/lib/templates";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json({ pages: listPages() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    path?: string;
    title?: string;
    seedHome?: boolean;
    seedDemoSite?: boolean;
    renameFrom?: string;
    renameTo?: string;
  };

  try {
    if (body.seedHome || body.seedDemoSite) {
      saveHeader(headerTemplate);
      saveFooter(footerTemplate);
      savePage("/", homepageTemplate, "Trang chủ");
      savePage("/services", servicesTemplate, "Dịch vụ");
      savePage("/contact", contactTemplate, "Liên hệ");
      revalidatePath("/", "layout");
      return NextResponse.json({
        ok: true,
        pages: listPages(),
      });
    }

    if (body.renameFrom && body.renameTo) {
      const page = renamePage(body.renameFrom, body.renameTo, body.title);
      revalidatePath(body.renameFrom);
      revalidatePath(body.renameTo);
      return NextResponse.json({ page });
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
