import { NextResponse } from "next/server";
import { getSettings, saveSettings, type SiteSettings } from "@/lib/pages";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json({ settings: getSettings() });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { settings?: SiteSettings };
    if (!body.settings) {
      return NextResponse.json({ error: "Thiếu settings" }, { status: 400 });
    }
    saveSettings(body.settings);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, settings: getSettings() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lỗi lưu settings" },
      { status: 500 }
    );
  }
}
