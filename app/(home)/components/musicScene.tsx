"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useWindow from "../../hooks/useWindow";

export default function MusicScene() {
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-music bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* mainScene */}
      <div className=" absolute top-0 left-0 w-screen h-screen"></div>
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[10vw]">
        <div
          className=" relative text-white h-[40vh] flex justify-center items-center cursor-pointer "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onClick={() => {
            router.push("/music");
          }}
        >
          <div
            className={`text-[20vw] sm:text-[9.4vmax] ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b5c4ff] to-[#ffe397e8]  `}
          >
            MUSIC
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b5c4ff] to-[#ffe397e8]  `}
          >
            音乐
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b5c4ff] to-[#ffe397e8]  `}
          >
            音乐
          </div>
        </div>

        <div className=" relative text-white text-[12.5vw] sm:text-[6vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          <p>^ 天堂之风 ^</p>
          <p>^ 衔尾游行 ^</p>
          <p>^ 季节系列 ^</p>
          <p>^ todo ^</p>
        </div>
      </div>
    </div>
  );
}
