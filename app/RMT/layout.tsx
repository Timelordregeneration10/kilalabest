import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RMT",
  description: "Rem Maji TianShi",
  applicationName: "RMT",
  authors: { name: "Nicholas Burkhardt", url: "https://kilalabest.cn/RMT" },
  generator: "Next.js",
  keywords: ["rmt", "RMT", "雷姆", "蕾姆", "Rem", "レム"],
  creator: "Nicholas Burkhardt",
  publisher: "Nicholas Burkhardt",
  abstract: "RMT",
  icons: [
    {
      rel: "icon",
      url: "/favicon32x32.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
    {
      rel: "icon",
      url: "/favicon192x192.ico",
      sizes: "192x192",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
