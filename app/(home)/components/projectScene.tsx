"use client";

import { useContext, useEffect, useState } from "react";
import useWindow from "../../hooks/useWindow";
import { motion } from "framer-motion";
import { loadingContext } from "@/app/providers/loadingVanishLayout";
import useScroll from "@/app/hooks/useScroll";

const projects = [
  {
    name: "Code-Web: 模型应用管理平台",
    url: "https://timelordregeneration10.github.io/CodeWeb/login",
  },
  { name: "选课系统", url: "https://timelord.cn/courseSelectionSystem" },
  {
    name: "今何啖兮: 智能膳食推荐系统",
    url: "https://timelordregeneration10.github.io/Nutrition_Recommendation/login",
  },
  {
    name: "旅行物语",
    url: "https://timelordregeneration10.github.io/notimetotravel/",
  },
  {
    name: "教务管理系统",
    url: "https://timelordregeneration10.github.io/Educational-administration-management-system/",
  },
  {
    name: "admintest",
    url: "https://timelordregeneration10.github.io/admintest/",
  },
];

export default function ProjectScene() {
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);

  const { loading } = useContext(loadingContext);
  const { scrollTop } = useScroll();
  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  useEffect(() => {
    if (loading) return;
    // 扩大范围，增加渲染缓冲时间
    if (
      scrollTop > (3.7 - 1) * kilaInnerHeight &&
      scrollTop < (5.7 + 1) * kilaInnerHeight
    ) {
    }
  }, [loading, scrollTop, kilaInnerHeight]);

  return (
    <div className="h-screen w-screen bg-project bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[8vw]m z-[2] relative">
        <div
          className="order-1 sm:order-2 relative text-white h-[40vh] flex justify-center items-center "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div
            className={`text-[20vw] sm:text-[9.4vmax] ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b4f1d1] to-[#fffb87db]  `}
          >
            <h2>Project</h2>
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b4f1d1] to-[#fffb87db]  `}
          >
            <p>项目</p>
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b4f1d1] to-[#fffb87db]  `}
          >
            <p>项目</p>
          </div>
        </div>

        <div className="order-2 sm:order-1 relative text-white text-[5.5vw] sm:text-[3vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] text-start sm:text-end">
          {projects.map((pro, index) => (
            <motion.p
              key={pro.name}
              initial={{
                transform:
                  index % 2 === 0 ? "translateX(-50%)" : "translateX(50%)",
                opacity: 0,
              }}
              whileInView={{ transform: "translateX(0%)", opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <a href={pro.url} target="_blank">
                - {pro.name} -
              </a>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
