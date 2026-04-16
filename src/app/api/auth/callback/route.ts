import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForTokens } from "@/lib/shopify-auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const savedState = cookieStore.get("shopify_state")?.value;
  const codeVerifier = cookieStore.get("shopify_code_verifier")?.value;

  if (!code || !state || state !== savedState || !codeVerifier) {
    return NextResponse.redirect(new URL("/?error=auth_failed", req.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code, codeVerifier);

    // Store tokens in httpOnly cookies
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parka-atelier.vercel.app";

    cookieStore.set("shopify_access_token", tokens.access_token, {
      httpOnly: true, secure: true, sameSite: "lax", maxAge: tokens.expires_in, path: "/",
    });
    cookieStore.set("shopify_refresh_token", tokens.refresh_token, {
      httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/",
    });
    cookieStore.set("shopify_id_token", tokens.id_token, {
      httpOnly: true, secure: true, sameSite: "lax", maxAge: tokens.expires_in, path: "/",
    });
    // Non-httpOnly flag so client knows user is logged in
    cookieStore.set("shopify_logged_in", "true", {
      httpOnly: false, secure: true, sameSite: "lax", maxAge: tokens.expires_in, path: "/",
    });

    // Clean up OAuth cookies
    cookieStore.delete("shopify_state");
    cookieStore.delete("shopify_nonce");
    cookieStore.delete("shopify_code_verifier");

    return NextResponse.redirect(new URL("/account", baseUrl));
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", req.url));
  }
}
