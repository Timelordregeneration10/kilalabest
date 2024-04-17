import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers as UIProvider } from "@/app/providers/nextui";

import Head from "next/head";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NicholasのPersonal Website",
  description: "Nicholas's Personal Website, include many his work",
  applicationName: "Personal Website",
  authors: { name: "Nicholas Burkhardt", url: "kilalabest.cn" },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <UIProvider>{children}</UIProvider>
        <Toaster />
      </body>
    </html>
  );
}
