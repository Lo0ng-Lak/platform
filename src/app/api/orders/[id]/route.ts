import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const body = await request.json();
    const order = updateOrderStatus(id, body.status);
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không đổi được trạng thái" },
      { status: 400 }
    );
  }
}
