"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

export default function ShopifyCart() {
  useEffect(() => {
    const scriptId = "shopify-buy-button-sdk";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    script.onload = () => initShopifyBuyButton();
    document.head.appendChild(script);

    function initShopifyBuyButton() {
      if (!window.ShopifyBuy) return;

      const client = window.ShopifyBuy.buildClient({
        domain: "parka-atelier.myshopify.com",
        storefrontAccessToken: "a1069437e98150591677d175edcff1e4",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        ui.createComponent("product", {
          id: "10159053242674",
          node: document.getElementById("shopify-buy-button"),
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              iframe: false,
              contents: {
                img: false,
                title: false,
                price: false,
                description: false,
                button: false,
                quantity: false,
              },
            },
            cart: {
              iframe: false,
              popup: true,
              startOpen: false,
              styles: {
                button: {
                  "background-color": "#1a1a1a",
                  "border-radius": "8px",
                  "font-family": "inherit",
                  ":hover": {
                    "background-color": "#333",
                  },
                },
                title: {
                  "font-family": "inherit",
                },
                footer: {
                  "background-color": "#fff",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
            toggle: {
              iframe: false,
              styles: {
                toggle: {
                  "background-color": "#1a1a1a",
                  "font-family": "inherit",
                  ":hover": {
                    "background-color": "#333",
                  },
                },
                count: {
                  "font-family": "inherit",
                },
              },
            },
          },
        });
      });
    }
  }, []);

  return <div id="shopify-buy-button" />;
}
