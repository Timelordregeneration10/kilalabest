import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers as UIProvider } from "@/app/providers/nextui";

import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { KilaLayout } from "./providers/kilalayout";
import { FrontierLayout } from "./providers/frontierLayout";
import { FrontierVanishLayout } from "./providers/frontierVanishLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "NicholasのPersonal Website",
  description: "Nicholas's Personal Website, include many his work",
  applicationName: "Personal Website",
  authors: { name: "Nicholas Burkhardt", url: "https://kilalabest.cn" },
  generator: "Next.js",
  keywords: [
    "rmt",
    "RMT",
    "timelord",
    "Nicholas",
    "Nicholas Burkhardt",
    "kilalabest",
    "绮罗",
    "綺羅々・バーンシュタイン",
  ],
  creator: "Nicholas Burkhardt",
  publisher: "Nicholas Burkhardt",
  abstract: "Nicholas's Personal Website",
  icons: [
    {
      rel: "icon",
      url: "/favicon32x32.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
    {
      rel: "icon",
      url: "/favicon192x192.ico",
      sizes: "192x192",
      type: "image/x-icon",
    },
  ],
  openGraph: {
    title: "Nicholas's Personal Website",
    description: "Nicholas's Personal Website, include many his work",
    url: "https://kilalabest.cn",
    siteName: "kilalabest.cn",
    images: [
      {
        url: "https://kilalabest.cn/profile.jpg", // Must be an absolute URL
        width: 933,
        height: 933,
      },
      {
        url: "https://kilalabest.cn/profile.jpg", // Must be an absolute URL
        width: 933,
        height: 933,
        alt: "kilalabest pic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <body> */}
        <FrontierLayout>
          <FrontierVanishLayout>
            <UIProvider>
              <KilaLayout>{children}</KilaLayout>
            </UIProvider>
          </FrontierVanishLayout>
        </FrontierLayout>
        <Toaster />
      </body>
    </html>
  );
}
