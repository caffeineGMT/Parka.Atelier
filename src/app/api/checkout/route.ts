import { NextRequest, NextResponse } from "next/server";
import { commerce } from "@/lib/commerce";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { tier, color, size } = await req.json();

    const result = await commerce.createCheckout({
      tier,
      color,
      size,
      email: session?.user?.email || undefined,
      userId: (session?.user as any)?.id || undefined,
    });

    return NextResponse.json({ url: result.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
