import { NextResponse } from "next/server";
import { createOrder, getOrders } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ orders: getOrders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = createOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không tạo được đơn hàng" },
      { status: 400 }
    );
  }
}
