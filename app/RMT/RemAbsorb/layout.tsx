import type { Metadata } from "next";
import Image from "next/image";
import RemAbsorbBG from "@/app/RMT/RemAbsorb/assets/RemAbsorbBG.webp";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Rem Absorb",
  description:
    "A fancy game which your goal is absorbing Rem and avoid master of great sin",
  applicationName: "Rem Absorb",
  authors: {
    name: "Nicholas Burkhardt",
    url: "https://kilalabest.cn/RMT/RemAbsorb",
  },
  generator: "Next.js",
  keywords: [
    "蕾姆吸收",
    "雷姆吸收",
    "雷姆小游戏",
    "蕾姆小游戏",
    "rmt",
    "RMT",
    "雷姆",
    "蕾姆",
    "Rem",
    "レム",
  ],
  creator: "Nicholas Burkhardt",
  publisher: "Nicholas Burkhardt",
  abstract:
    "A fancy game which your goal is absorbing Rem and avoid master of great sin",
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
  return (
    <>
      <Image
        src={RemAbsorbBG}
        alt="RemAbsorbBG"
        height={744}
        width={1200}
        className="w-screen h-screen object-cover md:object-fill absolute left-0 right-0 pointer-events-none opacity-20"
      ></Image>
      <div className="fixed opacity-0 pointer-events-none">
        <h1>Rem Absorb</h1>
        <p>
          A fancy game which your goal is absorbing Rem and avoid master of
          great sin
        </p>
      </div>
      <>{children}</>
    </>
  );
}
