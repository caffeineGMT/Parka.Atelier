import { NextResponse } from "next/server";
import { createCart, FUR_HOOD_VARIANT_ID } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, fur, zipper, collar, zippyLength } = body;

    const attributes = [
      { key: "Parka Model", value: model || "" },
      { key: "Fur Color", value: fur || "" },
      { key: "Zipper Style", value: zipper || "" },
      { key: "Collar Color", value: collar || "" },
      { key: "Zippy Length (cm)", value: zippyLength || "" },
    ];

    const cart = await createCart(FUR_HOOD_VARIANT_ID, attributes);

    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
