import { cookies } from "next/headers";

const SHOPIFY_STORE = "parka-atelier";
const CLIENT_ID = "c89104d8-adf9-4bea-915e-ebe3bfa4bfe4";
const AUTH_ENDPOINT = "https://shopify.com/authentication/97847574834/oauth/authorize";
const TOKEN_ENDPOINT = "https://shopify.com/authentication/97847574834/oauth/token";
const CUSTOMER_API = "https://shopify.com/97847574834/account/customer/api/2024-01/graphql";
const LOGOUT_ENDPOINT = "https://shopify.com/authentication/97847574834/logout";

function getRedirectUri() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://parka-atelier.vercel.app";
  return `${base}/api/auth/callback`;
}

function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => chars[b % chars.length]).join("");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function buildAuthUrl(): Promise<{ url: string; state: string; nonce: string; codeVerifier: string }> {
  const state = generateRandomString(32);
  const nonce = generateRandomString(32);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: getRedirectUri(),
    scope: "openid email customer-account-api:full",
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return {
    url: `${AUTH_ENDPOINT}?${params.toString()}`,
    state,
    nonce,
    codeVerifier,
  };
}

export async function exchangeCodeForTokens(code: string, codeVerifier: string) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: getRedirectUri(),
      code,
      code_verifier: codeVerifier,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    id_token: string;
  }>;
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status}`);
  }

  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>;
}

export async function queryCustomerApi(accessToken: string, query: string, variables?: Record<string, unknown>) {
  const res = await fetch(CUSTOMER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Customer API error: ${res.status}`);
  }

  return res.json();
}

export function getLogoutUrl(idToken: string) {
  const params = new URLSearchParams({
    id_token_hint: idToken,
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_SITE_URL || "https://parka-atelier.vercel.app",
  });
  return `${LOGOUT_ENDPOINT}?${params.toString()}`;
}

export { CLIENT_ID, SHOPIFY_STORE };
