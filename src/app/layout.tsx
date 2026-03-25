import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://parka-atelier.vercel.app"),
  title: {
    default: "Parka.Atelier - Premium Fur Hood Replacements",
    template: "%s | Parka.Atelier",
  },
  description:
    "Premium fur hood replacements for luxury parkas. Handcrafted in Canada.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>

      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
