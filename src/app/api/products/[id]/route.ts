import { NextResponse } from "next/server";
import { deleteProduct, getProductById, updateProduct } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const body = await request.json();
    const product = updateProduct(id, body);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không sửa được sản phẩm" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request, ctx: Ctx) {
  return PUT(request, ctx);
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    deleteProduct(id);
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không xoá được sản phẩm" },
      { status: 400 }
    );
  }
}
