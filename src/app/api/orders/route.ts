import { NextResponse } from "next/server";
import { commerce } from "@/lib/commerce";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orders = await commerce.getOrders(session.user.email);
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
