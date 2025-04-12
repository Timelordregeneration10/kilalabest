"use client";

import { useContext, useEffect, useState } from "react";
import useWindow from "../../hooks/useWindow";
import hollowknight from "../../assets/game/hollowknight.webp";
import endinglilies from "../../assets/game/endinglilies.webp";
import terreria from "../../assets/game/terreria.webp";
import astlibra from "../../assets/game/astlibra.webp";
import skull from "../../assets/game/skull.webp";
import no11 from "../../assets/game/no11.webp";
import Image from "next/image";
import gameGIF from "../assets/game.gif";
import { motion } from "framer-motion";
import { loadingContext } from "@/app/providers/frontierVanishLayout";
import useScroll from "@/app/hooks/useScroll";

const gamesrc = [hollowknight, endinglilies, terreria, astlibra, skull, no11];

const gameList = [
  "Hollow Knight",
  "Terreria",
  "苍翼：混沌效应",
  "神之天平",
  "Dead Cells",
  "心渊梦境",
  "Ending Lilies",
  "musedash",
  "noita",
  "小骨：英雄杀手",
];

export default function GameScene() {
  const { loading } = useContext(loadingContext);
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);

  let beforeTransforms = [];
  let afterTransforms = [];
  const translateZBefore = 6;
  const translateZAfter = 15;
  const translateXY = 18;

  for (let i = 0; i < 24; i++) {
    let temp = ``;
    if (i < 16) {
      temp = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${
        i >= 8 ? 0 : i % 4 >= 2 ? 90 : -90
      }deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${
        i % 8 >= 4 ? translateZBefore : -1 * translateZBefore
      }vw)`;
    } else {
      temp = `translate3d(${(i - 16) % 2 >= 1 ? 0 : translateXY}vw,${
        (i - 16) % 4 >= 2 ? 0 : translateXY
      }vw,${i % 8 >= 4 ? translateZBefore : -1 * translateZBefore}vw)`;
    }
    beforeTransforms.push(temp);
  }
  for (let i = 0; i < 24; i++) {
    let temp = ``;
    if (i < 16) {
      temp = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${
        i >= 8 ? 0 : i % 4 >= 2 ? 90 : -90
      }deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${
        i % 8 >= 4 ? translateZAfter : -1 * translateZAfter
      }vw)`;
    } else {
      temp = `translate3d(${(i - 16) % 2 >= 1 ? 0 : translateXY}vw,${
        (i - 16) % 4 >= 2 ? 0 : translateXY
      }vw,${i % 8 >= 4 ? translateZAfter : -1 * translateZAfter}vw)`;
    }
    afterTransforms.push(temp);
  }

  let gamecubes = [];
  for (let i = 0; i < 24; i++) {
    gamecubes.push({
      id: i,
      src: gamesrc[i % 6],
      beforeTransform: beforeTransforms[i],
      afterTransform: afterTransforms[i],
    });
  }
  const finalgamecubes = gamecubes;

  let smallgamecubes = [];
  const smallgamecubeTrans = [
    "translateZ(3vw)",
    "rotateY(180deg) translateZ(3vw)",
    "rotateY(-90deg) translateZ(3vw)",
    "rotateY(90deg) translateZ(3vw)",
    "rotateX(90deg) translateZ(3vw)",
    "rotateX(-90deg) translateZ(3vw)",
  ];
  for (let i = 0; i < 6; i++) {
    smallgamecubes.push({
      id: i,
      src: gamesrc[i],
      trans: smallgamecubeTrans[i],
    });
  }
  const finalsmallgamecubes = smallgamecubes;

  const { scrollTop } = useScroll();
  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  const [animationPlayState, setAnimationPlayState] = useState("paused");

  useEffect(() => {
    if (loading) return;
    if (
      scrollTop > 10.7 * kilaInnerHeight &&
      scrollTop < 12.7 * kilaInnerHeight
    ) {
      setAnimationPlayState("running");
    } else {
      setAnimationPlayState("paused");
    }
  }, [loading, scrollTop, kilaInnerHeight]);

  return (
    <div className="h-screen w-screen bg-game bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* mainScene */}
      <div className="absolute z-[1] left-0 top-0 w-screen h-screen flex justify-center items-center ">
        <div
          className="relative w-[30vw] h-[30vw] transform-style-3d transition-[transform_width_height] duration-1000 "
          style={{ perspective: isHover ? "1000px" : "1000px" }}
        >
          <div
            className="absolute w-full h-full transform-style-3d rotate-x-0 rotate-y-0 rotate-z-0 animate-turn24 "
            style={{ animationPlayState }}
          >
            {finalgamecubes.map((gamecube) => {
              return (
                <div
                  key={gamecube.id}
                  className="absolute w-full h-full transform-style-3d transition-[transform_width_height] duration-1000"
                  style={{
                    transform: isHover
                      ? gamecube.afterTransform
                      : gamecube.beforeTransform,
                    opacity: isHover ? "1" : "0.5",
                  }}
                >
                  <Image
                    src={gamecube.src}
                    alt="gamecube"
                    height={200}
                    width={200}
                    className="absolute object-cover transition-[transform_width_height] duration-1000"
                    style={{
                      width: isHover ? "40%" : "20%",
                      height: isHover ? "40%" : "20%",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div
            className="absolute w-[20%] h-[20%] left-[40%] top-[40%] transform-style-3d rotate-x-0 rotate-y-0 rotate-z-0 animate-turn24 "
            style={{ animationPlayState }}
          >
            {finalsmallgamecubes.map((gamecube) => {
              return (
                <Image
                  src={gamecube.src}
                  alt="gamecube"
                  height={200}
                  width={200}
                  key={gamecube.id}
                  className="absolute w-full h-full object-cover transition-[transform_width_height] duration-1000"
                  style={{
                    opacity: isHover ? "0.5" : "1",
                    transform: gamecube.trans,
                  }}
                />
              );
            })}
          </div>
        </div>
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
          href="https://space.bilibili.com/515016084"
          target="_blank"
        >
          <div
            className={`relative z-[2] text-[15vw] sm:text-[6.4vmax] ${
              isHover ? "opacity-100" : "opacity-100"
            } text-white `}
          >
            <h2>GAME</h2>
          </div>
          {/* left top border */}
          <div
            className="absolute z-[2] top-0 left-0 w-full h-full border-5 sm:border-[10px] border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? 24 : 48}px,${isMobile ? 16 : 32}px)`
                : "",
            }}
          ></div>
          {/* right top corner */}
          <div
            className="absolute z-[2] top-0 right-0 w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] sm:border-r-[10px] sm:border-t-[10px] border-l-0 border-b-0 border-r-5 border-t-5 border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? 24 : 48}px,${isMobile ? -16 : -32}px)`
                : "",
            }}
          ></div>
          {/* right bottom border */}
          <div
            className="absolute z-[2] top-0 left-0 w-full h-full border-5 sm:border-[10px] border-white transition-transform"
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
            className="absolute z-[2] bottom-0 left-0 w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] sm:border-l-[10px] sm:border-b-[10px] border-r-0 border-t-0 border-l-5 border-b-5 border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? -24 : -48}px,${isMobile ? 16 : 32}px)`
                : "",
            }}
          ></div>
          {/* top game gif */}
          <div
            className={`absolute z-[2] ${
              isMobile ? "w-[calc(100%-15px)]" : "w-[calc(100%-23px)]"
            } top-[5px] left-[5px]`}
          >
            <Image
              width={60}
              height={60}
              alt="game"
              src={gameGIF}
              className="min-w-[60px] min-h-[60px] absolute top-0 transition-[left_transform]"
              style={{
                left: isHover ? "calc(100%)" : "0",
                transform: isHover
                  ? `translateY(${isMobile ? -16 : -32}px)`
                  : "",
              }}
            ></Image>
          </div>
          {/* bottom game gif */}
          <div
            className={`absolute z-[2] ${
              isMobile ? "w-[calc(100%-15px)]" : "w-[calc(100%-23px)]"
            } bottom-[5px] right-[5px]`}
          >
            <Image
              width={60}
              height={60}
              alt="game"
              src={gameGIF}
              className="min-w-[60px] min-h-[60px] absolute bottom-0 transition-[right_transform]"
              style={{
                right: isHover ? "calc(100%)" : "0",
                transform: isHover ? `translateY(${isMobile ? 16 : 32}px)` : "",
              }}
            ></Image>
          </div>
        </a>

        <div className=" relative z-[2] text-white text-start text-[6.5vw] sm:text-[3.5vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          {gameList.map((name) => (
            <motion.p
              initial={{ clipPath: "inset(70%)" }}
              whileInView={{ clipPath: "inset(0%)" }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
              key={name}
            >
              <a href="https://timelord.cn?to=game" target="_blank">
                & {name} &
              </a>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
