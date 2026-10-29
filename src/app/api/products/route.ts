import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ products: getProducts() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = createProduct(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không tạo được sản phẩm" },
      { status: 400 }
    );
  }
}
