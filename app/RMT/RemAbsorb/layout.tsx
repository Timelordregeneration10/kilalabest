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
        <h2>注意事项</h2>
        <h2>逃离大罪司教，拯救雷姆！</h2>
        <p>
          1.
          本应用部署在Github上，所以需要确保你的网络环境能够正常访问Github，以确保流畅体验。
        </p>
        <p>
          2.
          本应用通过移动鼠标进行，目标是躲过大罪司教，保护雷姆！移动到蓝色范围可以保护范围内的雷姆，分数增加！移动到红色区域就会把大罪司教放进来，分数降低！大罪司教出现前有红色闪烁预警。
        </p>
        <p>
          3.
          不同难度区域的出现速度不同，区域大小不同，留存时间不同，区域分数不同，lv1-lv5大罪司教区域最高失分分别为-100，-200，-500，-999，-9999。
        </p>
        <p>
          4.
          虽然我觉得不太可能，但是如果在lv5分别达到了22222和44444分的话可以找我领取奖励~
        </p>
        <p>
          5. 蓝色区域的雷姆GIF来自B战up主
          <a href="https://space.bilibili.com/8248150" target="_blank">
            Incana在打鱼
          </a>
          ，侵删。
        </p>
      </div>
      <>{children}</>
    </>
  );
}
