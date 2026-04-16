import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { queryCustomerApi, refreshAccessToken } from "@/lib/shopify-auth";
import AccountClient from "./AccountClient";

async function getAccessToken() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("shopify_access_token")?.value;
  const refreshToken = cookieStore.get("shopify_refresh_token")?.value;

  if (!accessToken && refreshToken) {
    try {
      const tokens = await refreshAccessToken(refreshToken);
      accessToken = tokens.access_token;
      // Note: In production, you'd update the cookies here via a route handler
    } catch {
      return null;
    }
  }

  return accessToken;
}

export default async function AccountPage() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    redirect("/api/auth/login");
  }

  let customer = null;
  let orders = null;

  try {
    const customerRes = await queryCustomerApi(accessToken, \`
      query {
        customer {
          firstName
          lastName
          emailAddress {
            emailAddress
          }
          defaultAddress {
            address1
            city
            province
            country
            zip
          }
        }
      }
    \`);
    customer = customerRes.data?.customer;

    const ordersRes = await queryCustomerApi(accessToken, \`
      query {
        customer {
          orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                name
                processedAt
                fulfillments(first: 1) {
                  status
                  trackingInformation {
                    number
                    url
                  }
                }
                totalPrice {
                  amount
                  currencyCode
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
                      customAttributes {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    \`);
    orders = ordersRes.data?.customer?.orders?.edges?.map((e: any) => e.node) || [];
  } catch (error) {
    console.error("Customer API error:", error);
  }

  return <AccountClient customer={customer} orders={orders} />;
}
