"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useWindow from "../../hooks/useWindow";
import Image from "next/image";
import boom1 from "../assets/boom1.webp";
import boom2 from "../assets/boom2.webp";
import boom3 from "../assets/boom3.webp";
import boom4 from "../assets/boom4.webp";
import boom5 from "../assets/boom5.webp";
import boom6 from "../assets/boom6.webp";
import boom7 from "../assets/boom7.webp";
import boom8 from "../assets/boom8.webp";
import boom9 from "../assets/boom9.webp";
import { kilalaContext } from "@/app/providers/kilalayout";

const booms = [boom1, boom2, boom3, boom4, boom5, boom6, boom7, boom8, boom9];

export default function AnimeScene() {
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);
  const router = useRouter();

  const aiyiRems = booms;
  const { scrollTop } = useContext(kilalaContext);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  useEffect(() => {
    if (stickyTopRef.current) {
      const top = stickyTopRef.current.getBoundingClientRect().top;
      if (top <= kilaInnerHeight && top >= -kilaInnerHeight) {
        stickyTopRef.current.style.transform = `translateX(-${
          -top + kilaInnerHeight
        }px)`;
        if (stickyMiddleRef.current) {
          stickyMiddleRef.current.style.transform = `translateX(-${
            stickyMiddleRef.current.scrollWidth -
            kilaInnerWidth -
            kilaInnerHeight +
            top
          }px)`;
        }
        if (stickyBottomRef.current) {
          stickyBottomRef.current.style.transform = `translateX(-${
            -top + kilaInnerHeight
          }px)`;
        }
      }
    }
  }, [kilaInnerWidth, scrollTop, kilaInnerHeight]);

  const stickyTopRef = useRef<HTMLDivElement | null>(null);
  const stickyMiddleRef = useRef<HTMLDivElement | null>(null);
  const stickyBottomRef = useRef<HTMLDivElement | null>(null);

  const [shuffledAiyiRems0, setShuffledAiyiRems0] = useState(aiyiRems);
  const [shuffledAiyiRems1, setShuffledAiyiRems1] = useState(aiyiRems);
  const [shuffledAiyiRems2, setShuffledAiyiRems2] = useState(aiyiRems);
  useEffect(() => {
    setShuffledAiyiRems0([...aiyiRems].sort(() => Math.random() - 0.5));
    setShuffledAiyiRems1([...aiyiRems].sort(() => Math.random() - 0.5));
    setShuffledAiyiRems2([...aiyiRems].sort(() => Math.random() - 0.5));
  }, [aiyiRems]);

  return (
    <div className="h-screen w-screen bg-anime bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* mainScene */}
      <div className=" absolute top-0 left-0 w-screen h-screen">
        <div
          className=" relative h-[calc(100vh/3)] left-0 top-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
          ref={stickyTopRef}
        >
          {shuffledAiyiRems0.map((aiyiRem, index) => (
            <div className=" aspect-[16/9] h-full" key={index}>
              {index % 2 === 0 && (
                <Image
                  src={aiyiRem}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  alt="boom"
                ></Image>
              )}
            </div>
          ))}
        </div>
        <div
          className=" relative h-[calc(100vh/3)] left-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
          ref={stickyMiddleRef}
        >
          {shuffledAiyiRems1.map((aiyiRem, index) => (
            <div className=" aspect-[16/9] h-full" key={index}>
              {index % 2 != 0 && (
                <Image
                  src={aiyiRem}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  alt="boom"
                ></Image>
              )}
            </div>
          ))}
        </div>
        <div
          className=" relative h-[calc(100vh/3)] left-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
          ref={stickyBottomRef}
        >
          {shuffledAiyiRems2.map((aiyiRem, index) => (
            <div className=" aspect-[16/9] h-full" key={index}>
              {index % 2 === 0 && (
                <Image
                  src={aiyiRem}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  alt="boom"
                ></Image>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[7vw]">
        <a
          className="order-1 sm:order-2 relative text-white h-[40vh] flex justify-center items-center cursor-pointer "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          href="https://anilist.co/user/NicholasBurkhardt/animelist"
          target="_blank"
        >
          <div
            className={`text-[20vw] sm:text-[9.4vmax] ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[#ffabfe] via-[white] to-[#97efffdb]  `}
          >
            Anime
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[#ffabfe] via-[white] to-[#97efffdb] `}
          >
            番
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[#ffabfe] via-[white] to-[#97efffdb] `}
          >
            番
          </div>
        </a>

        <div className="order-2 sm:order-1 relative text-white text-[11.5vw] sm:text-[6vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          <p className=" animate-bounce">
            %{" "}
            <a
              href="https://anilist.co/user/NicholasBurkhardt/animelist"
              target="_blank"
            >
              Click
            </a>{" "}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
