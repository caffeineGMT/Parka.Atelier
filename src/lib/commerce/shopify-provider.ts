/**
 * Shopify commerce provider.
 * Drop-in replacement for stripe-provider via the CommerceProvider interface.
 */

import { shopifyFetch } from "./shopify-client";
import type { CommerceProvider, Product, CheckoutInput, CheckoutResult, Order } from "./types";

/* ── GraphQL Queries ─────────────────────────────────────── */

const PRODUCTS_QUERY = `
  query Products {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          handle
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_ORDERS_QUERY = `
  query CustomerOrders($token: String!) {
    customer(customerAccessToken: $token) {
      orders(first: 20, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            totalPrice {
              amount
              currencyCode
            }
            processedAt
            fulfillmentStatus
            financialStatus
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/* ── Tier → Shopify variant mapping ────────────────────────── */
// Map our tier names to Shopify product variant IDs
// Update these after creating products in Shopify admin
const TIER_VARIANT_MAP: Record<string, string> = {
  classic: process.env.SHOPIFY_VARIANT_CLASSIC || "",
  signature: process.env.SHOPIFY_VARIANT_SIGNATURE || "",
  prestige: process.env.SHOPIFY_VARIANT_PRESTIGE || "",
};

// Fallback prices if Shopify is not configured yet
const FALLBACK_PRICES: Record<string, number> = {
  classic: 14900,
  signature: 19900,
  prestige: 29900,
};

/* ── Provider ──────────────────────────────────────────────── */

export const shopifyProvider: CommerceProvider = {
  getProducts(): Product[] {
    // Static fallback — in production this would query Shopify
    return [
      { id: "classic",   name: "Classic",   price: 14900, currency: "cad", description: "Grade A coyote fur, universal snap-lock fit, 30-day returns" },
      { id: "signature", name: "Signature", price: 19900, currency: "cad", description: "Grade A+ coyote fur, universal snap-lock fit, certificate of authenticity" },
      { id: "prestige",  name: "Prestige",  price: 29900, currency: "cad", description: "Rare Grade S ivory fur, custom sizing, white-glove delivery, cedar storage box" },
    ];
  },

  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    const variantId = TIER_VARIANT_MAP[input.tier];

    if (!variantId) {
      throw new Error(`No Shopify variant mapped for tier: ${input.tier}. Set SHOPIFY_VARIANT_${input.tier.toUpperCase()} in .env.local`);
    }

    const data = await shopifyFetch<any>({
      query: CREATE_CART_MUTATION,
      variables: {
        input: {
          lines: [
            {
              merchandiseId: variantId,
              quantity: 1,
              attributes: [
                { key: "Color", value: input.color || "Natural" },
                { key: "Size", value: input.size || "M" },
              ],
            },
          ],
          buyerIdentity: input.email ? { email: input.email } : undefined,
          note: `Model: ${input.tier} | Color: ${input.color} | Zipper: ${input.size}`,
        },
      },
    });

    const cart = data.cartCreate.cart;
    if (!cart) {
      const errors = data.cartCreate.userErrors.map((e: any) => e.message).join(", ");
      throw new Error(`Shopify cart error: ${errors}`);
    }

    return {
      url: cart.checkoutUrl,
      sessionId: cart.id,
    };
  },

  async getOrders(email: string): Promise<Order[]> {
    // Note: Storefront API requires a customer access token to fetch orders.
    // For now, return empty — orders are managed via Shopify Admin.
    // To enable: implement customer login → get customerAccessToken → query orders.
    console.log(`[shopify] getOrders called for ${email} — use Shopify Admin to view orders`);
    return [];
  },
};
