import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { savePage } from "@/lib/pages";
import type { Data } from "@puckeditor/core";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    path: string;
    data: Data;
  };

  if (!payload.path || !payload.data) {
    return NextResponse.json({ error: "Missing path or data" }, { status: 400 });
  }

  savePage(payload.path, payload.data);
  revalidatePath(payload.path);

  return NextResponse.json({ status: "ok" });
}
