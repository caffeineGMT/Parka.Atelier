import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLogoutUrl } from "@/lib/shopify-auth";

export async function GET() {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("shopify_id_token")?.value;

  cookieStore.delete("shopify_access_token");
  cookieStore.delete("shopify_refresh_token");
  cookieStore.delete("shopify_id_token");
  cookieStore.delete("shopify_logged_in");

  if (idToken) {
    return NextResponse.redirect(getLogoutUrl(idToken));
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parka-atelier.vercel.app";
  return NextResponse.redirect(baseUrl);
}
