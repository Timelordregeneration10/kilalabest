"use client";

import { useContext, useState } from "react";
import useWindow from "../../hooks/useWindow";
import musicGIF from "../assets/music.gif";
import Image from "next/image";
import musicBG from "@/app/assets/musedash/music.webp";
import { loadingContext } from "@/app/providers/frontierVanishLayout";

export default function MusicScene() {
  const { loading } = useContext(loadingContext);
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);
  return (
    <div className="h-screen w-screen bg-music bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative overflow-hidden">
      {/* mainScene */}
      <div
        className=" absolute top-0 left-0 w-screen h-screen animate-musicAnimation"
        style={{ animationPlayState: loading ? "paused" : "running" }}
      >
        <Image
          src={musicBG}
          width={1600}
          height={900}
          alt="musicbg"
          className="w-full h-full object-cover"
        ></Image>
      </div>
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center gap-[10vh] sm:gap-[10vw]">
        <a
          className=" relative text-white h-fit flex justify-center items-center cursor-pointer px-12 py-8 sm:px-24 sm:py-16"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          href="https://music.163.com/#/user/home?id=479983448"
          target="_blank"
        >
          <div
            className={`text-[15vw] sm:text-[6.4vmax] ${
              isHover ? "opacity-100" : "opacity-100"
            } text-white `}
          >
            <h2>MUSIC</h2>
          </div>
          {/* left top border */}
          <div
            className="absolute top-0 left-0 w-full h-full border-5 sm:border-[10px] border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? 24 : 48}px,${isMobile ? 16 : 32}px)`
                : "",
            }}
          ></div>
          {/* right top corner */}
          <div
            className="absolute top-0 right-0 w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] sm:border-r-[10px] sm:border-t-[10px] border-l-0 border-b-0 border-r-5 border-t-5 border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? 24 : 48}px,${isMobile ? -16 : -32}px)`
                : "",
            }}
          ></div>
          {/* right bottom border */}
          <div
            className="absolute top-0 left-0 w-full h-full border-5 sm:border-[10px] border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? -24 : -48}px,${
                    isMobile ? -16 : -32
                  }px)`
                : "",
            }}
          ></div>
          {/* left bottom corner */}
          <div
            className="absolute bottom-0 left-0 w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] sm:border-l-[10px] sm:border-b-[10px] border-r-0 border-t-0 border-l-5 border-b-5 border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? -24 : -48}px,${isMobile ? 16 : 32}px)`
                : "",
            }}
          ></div>
          {/* top music gif */}
          <div
            className={`absolute ${
              isMobile ? "w-[calc(100%-15px)]" : "w-[calc(100%-20px)]"
            } top-[5px] left-[5px]`}
          >
            <Image
              width={60}
              height={60}
              alt="music"
              src={musicGIF}
              className="min-w-[60px] min-h-[60px] absolute top-0 transition-[left_transform]"
              style={{
                left: isHover ? "calc(100%)" : "0",
                transform: isHover
                  ? `translateY(${isMobile ? -16 : -32}px)`
                  : "",
              }}
            ></Image>
          </div>
          {/* bottom music gif */}
          <div
            className={`absolute ${
              isMobile ? "w-[calc(100%-15px)]" : "w-[calc(100%-20px)]"
            } bottom-[5px] right-[5px]`}
          >
            <Image
              width={60}
              height={60}
              alt="music"
              src={musicGIF}
              className="min-w-[60px] min-h-[60px] absolute bottom-0 transition-[right_transform]"
              style={{
                right: isHover ? "calc(100%)" : "0",
                transform: isHover ? `translateY(${isMobile ? 16 : 32}px)` : "",
              }}
            ></Image>
          </div>
        </a>

        <div className=" relative text-white text-[12.5vw] sm:text-[6vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          <p
            className=" animate-bounce"
            style={{ animationPlayState: loading ? "paused" : "running" }}
          >
            ^{" "}
            <a
              href="https://music.163.com/#/user/home?id=479983448"
              target="_blank"
            >
              Click
            </a>{" "}
            ^
          </p>
        </div>
      </div>
    </div>
  );
}
