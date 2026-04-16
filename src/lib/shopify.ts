const SHOPIFY_DOMAIN = "parka-atelier.myshopify.com";
const STOREFRONT_TOKEN = "a1069437e98150591677d175edcff1e4";
const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }
  return json.data;
}

export async function createCart(
  variantId: string,
  attributes: { key: string; value: string }[]
) {
  const query = `
    mutation cartCreate($input: CartInput!) {
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
  const variables = {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1,
          attributes,
        },
      ],
      attributes,
    },
  };
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string; message: string }[];
    };
  }>(query, variables);

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  return data.cartCreate.cart!;
}

export const FUR_HOOD_VARIANT_ID = "gid://shopify/ProductVariant/51065889882418";
