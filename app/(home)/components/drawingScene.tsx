"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useWindow from "../../hooks/useWindow";
import { motion } from "framer-motion";
import { loadingContext } from "@/app/providers/loadingVanishLayout";
import useScroll from "@/app/hooks/useScroll";

const drawings = [
  { name: "JC迷宫", url: "https://timelord.cn?to=maze" },
  { name: "绘画与生活", url: "https://timelord.cn?to=drawing" },
  { name: "涂鸦系列", url: "/drawing/graffiti" },
];

export default function DrawingScene() {
  const { loading } = useContext(loadingContext);
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);
  const router = useRouter();

  const { scrollTop } = useScroll();
  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  useEffect(() => {
    if (loading) return;
    // 扩大范围，增加渲染缓冲时间
    if (
      scrollTop > (11.7 - 1) * kilaInnerHeight &&
      scrollTop < (13.7 + 1) * kilaInnerHeight
    ) {
    }
  }, [loading, scrollTop, kilaInnerHeight, ]);

  return (
    <div className="h-screen w-screen bg-drawing bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[8vw] z-[2] relative">
        <div
          className="relative text-white h-[40vh] flex justify-center items-center cursor-pointer "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onClick={() => {
            router.push("/drawing");
          }}
        >
          <div
            className={`text-[20vw] sm:text-[9.4vmax] ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#f1b4f1] to-[#65adffbe]  `}
          >
            <h2>Drawing</h2>
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[40vw] sm:text-[22.4vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#f1b4f1] to-[#65adffbe]  `}
          >
            <p>画</p>
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[40vw] sm:text-[22.4vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#f1b4f1] to-[#65adffbe]  `}
          >
            <p>画</p>
          </div>
        </div>

        <div className=" relative text-white text-[12.5vw] sm:text-[7vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          {drawings.map(({ name, url }, index) => (
            <motion.p
              key={name}
              initial={{
                transform: index % 2 === 0 ? "skewX(-45deg)" : "skewX(45deg)",
                opacity: 0,
              }}
              whileInView={{ transform: "skewY(0deg)", opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <a href={url} target="_blank">
                + {name} +
              </a>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
