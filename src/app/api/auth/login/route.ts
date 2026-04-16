import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildAuthUrl } from "@/lib/shopify-auth";

export async function GET() {
  const { url, state, nonce, codeVerifier } = await buildAuthUrl();

  const cookieStore = await cookies();
  cookieStore.set("shopify_state", state, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 300, path: "/" });
  cookieStore.set("shopify_nonce", nonce, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 300, path: "/" });
  cookieStore.set("shopify_code_verifier", codeVerifier, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 300, path: "/" });

  return NextResponse.redirect(url);
}
