/**
 * Commerce provider entry point.
 *
 * To switch from Stripe to Shopify:
 * 1. Create ./shopify-provider.ts implementing CommerceProvider
 * 2. Change the import below
 *
 * Everything else (API routes, components) stays the same.
 */

import { shopifyProvider } from "./shopify-provider";

// Swap this line to switch providers:
export const commerce = shopifyProvider;

// Re-export types
export type { Product, CheckoutInput, CheckoutResult, Order, CommerceProvider } from "./types";
