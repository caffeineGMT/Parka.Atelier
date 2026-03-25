import Stripe from "stripe";
import type { CommerceProvider, Product, CheckoutInput, CheckoutResult, Order } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil" as any,
});

const PRODUCTS = {
  classic: {
    id: "classic",
    name: "Classic",
    price: 14900,
    currency: "cad",
    description: "Grade A coyote fur, universal snap-lock fit, 30-day returns",
  },
  signature: {
    id: "signature",
    name: "Signature",
    price: 19900,
    currency: "cad",
    description: "Grade A+ coyote fur, universal snap-lock fit, certificate of authenticity",
  },
  prestige: {
    id: "prestige",
    name: "Prestige",
    price: 29900,
    currency: "cad",
    description: "Rare Grade S ivory fur, custom sizing, white-glove delivery, cedar storage box",
  },
} as const;

export const stripeProvider: CommerceProvider = {
  getProducts(): Product[] {
    return Object.values(PRODUCTS);
  },

  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    const product = PRODUCTS[input.tier as keyof typeof PRODUCTS];
    if (!product) throw new Error("Invalid product tier");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: input.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Parka.Atelier ${product.name}`,
              description: `${input.color || "Natural"} fur hood (Size ${input.size || "M"})`,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier: input.tier,
        color: input.color || "Natural",
        size: input.size || "M",
        userId: input.userId || "",
        userEmail: input.email || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/account/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/#shop`,
    });

    return { url: session.url!, sessionId: session.id };
  },

  async getOrders(email: string): Promise<Order[]> {
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ["data.line_items"],
    });

    return sessions.data
      .filter((s) => s.metadata?.userEmail === email && s.payment_status === "paid")
      .map((s) => ({
        id: s.id,
        amount: s.amount_total || 0,
        currency: s.currency || "cad",
        status: s.payment_status || "unknown",
        tier: s.metadata?.tier || "",
        color: s.metadata?.color || "",
        size: s.metadata?.size || "",
        created: s.created,
        items: s.line_items?.data.map((item) => ({
          name: item.description || "",
          amount: item.amount_total || 0,
        })) || [],
      }));
  },
};
