/**
 * Commerce abstraction layer.
 * Currently backed by Stripe. Swap to Shopify by implementing
 * the same interface in ./shopify.ts and changing the export in ./index.ts
 */

export interface Product {
  id: string;
  name: string;
  price: number; // in cents
  currency: string;
  description: string;
  image?: string;
}

export interface CheckoutInput {
  tier: string;
  color?: string;
  size?: string;
  email?: string;
  userId?: string;
}

export interface CheckoutResult {
  url: string;
  sessionId: string;
}

export interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  tier: string;
  color: string;
  size: string;
  created: number;
  items: { name: string; amount: number }[];
}

export interface CommerceProvider {
  getProducts(): Product[];
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
  getOrders(email: string): Promise<Order[]>;
}
