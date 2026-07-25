import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { Data } from "@puckeditor/core";
import { listPages, saveFooter, saveHeader, savePage } from "@/lib/pages";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      path: string;
      data: Data;
      kind?: "page" | "header" | "footer";
    };

    if (!payload.path || !payload.data) {
      return NextResponse.json(
        { error: "Missing path or data" },
        { status: 400 }
      );
    }

    const kind = payload.kind || "page";

    if (kind === "header" || payload.path === "header") {
      saveHeader(payload.data);
      revalidatePath("/", "layout");
      for (const page of listPages()) {
        revalidatePath(page.path);
      }
      return NextResponse.json({ status: "ok", kind: "header" });
    }

    if (kind === "footer" || payload.path === "footer") {
      saveFooter(payload.data);
      revalidatePath("/", "layout");
      for (const page of listPages()) {
        revalidatePath(page.path);
      }
      return NextResponse.json({ status: "ok", kind: "footer" });
    }

    savePage(payload.path, payload.data);
    revalidatePath(payload.path);
    if (payload.path !== "/") {
      revalidatePath("/");
    }

    return NextResponse.json({ status: "ok", kind: "page", path: payload.path });
  } catch (error) {
    console.error("Publish failed:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Không lưu được",
      },
      { status: 500 }
    );
  }
}
