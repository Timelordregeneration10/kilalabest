"use client";
import useWindow from "../../hooks/useWindow";
import heavenRem from "../../assets/rmt/heavenRem.webp";
import jpegRem from "../../assets/rmt/jpegRem.webp";
import sisRem1Rem from "../../assets/rmt/sisRem1.webp";
import sisRem2Rem from "../../assets/rmt/sisRem2.webp";
import wangjiangRem from "../../assets/rmt/wangjiangRem.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import useScroll from "@/app/hooks/useScroll";

const RMTExplains = [
  "= Rem MaJi Tianshi =",
  "所有温柔的来源和归属",
  "用来定义永恒的度量",
  "守恒律的唯一例外",
  "盾牌座UY的具象",
  "不败樱花永落",
  "缤纷花与绮",
  "人间美好",
  "山与海",
  "一切",
  "爱",
];

const Rems = [
  {
    rid: "wangjiangRem",
    rsrc: wangjiangRem,
    rscaleX: -1,
    rscaleY: -1,
    fwidth: "w-[55vmax]",
    fheight: "h-[200vmin]",
    rwidth: 672,
    rheight: 1132,
    rtranslateX: 48,
    rtranslateY: 20,
    rzIndex: "z-[1]",
    rposition: "left-0",
  },
  {
    rid: "sisRem1Rem",
    rsrc: sisRem1Rem,
    rscaleX: 0.7,
    rscaleY: -1,
    fwidth: "w-[80vmax]",
    fheight: "h-[120vmin]",
    rwidth: 1002,
    rheight: 744,
    rtranslateX: -40,
    rtranslateY: 80,
    rzIndex: "z-[2]",
    rposition: "right-0",
  },
  {
    rid: "jpegRem",
    rsrc: jpegRem,
    rscaleX: -0.8,
    rscaleY: -1.6,
    fwidth: "w-[90vmax]",
    fheight: "h-[250vmin]",
    rwidth: 1600,
    rheight: 2212,
    rtranslateX: 60,
    rtranslateY: 160,
    rzIndex: "z-[3]",
    rposition: "left-0",
  },
  {
    rid: "sisRem2Rem",
    rsrc: sisRem2Rem,
    rscaleX: 1,
    rscaleY: -1.2,
    fwidth: "w-[78vmax]",
    fheight: "h-[210vmin]",
    rwidth: 992,
    rheight: 1403,
    rtranslateX: -100,
    rtranslateY: 220,
    rzIndex: "z-[4]",
    rposition: "right-0",
  },
  {
    rid: "heavenRem",
    rsrc: heavenRem,
    rscaleX: -1,
    rscaleY: -1.2,
    fwidth: "w-[120vmax]",
    fheight: "h-[250vmin]",
    rwidth: 1996,
    rheight: 2994,
    rtranslateX: 120,
    rtranslateY: 300,
    rzIndex: "z-[5]",
    rposition: "left-0",
  },
];

export default function RMTScene() {
  const { scrollTop } = useScroll();
  const windowWidth = useWindow().width;
  const windowHeight = useWindow().height;
  const windowScaleX = windowWidth < 640 ? 1 : 1;
  const windowScaleY = windowWidth < 640 ? -1 : windowHeight / 789;

  // TODO: Rem related link

  return (
    <div className=" h-[370vh] w-screen bg-rmt bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* <div className="fixed pointer-events-none top-0 left-0 w-screen h-screen z-[0] bg-[#0000003f]"
        style={{ clipPath: `inset(${scrollTop >= innerHeight ? 0 : (innerHeight - scrollTop) / innerHeight * 100}% 0% ${scrollTop <= innerHeight * 3.7 ? 0 : scrollTop >= innerHeight * 4.7 ? 100 : (scrollTop - innerHeight * 3.7) / innerHeight * 100}% 0%)` }}
      ></div>
      <div className="fixed pointer-events-none top-0 left-0 w-screen h-screen z-[6] "
        style={{ clipPath: `inset(${scrollTop >= innerHeight ? 0 : (innerHeight - scrollTop) / innerHeight * 100}% 0% ${scrollTop <= innerHeight * 3.7 ? 0 : scrollTop >= innerHeight * 4.7 ? 100 : (scrollTop - innerHeight * 3.7) / innerHeight * 100}% 0%)` }}
      >
        <div className="absolute top-[30vh] lg:top-[25vh] leading-[18vh] lqlm:leading-[24vh] left-[10vw] w-[80vw] h-[50vh] text-[20.4vh] lqlm:text-[32.4vh] md:text-[38.4vw] overflow-visible flex justify-center items-center text-transparent bg-rmt bg-clip-text bg-contain bg-center opacity-80">
          RMT
        </div>
      </div> */}
      <div className="absolute bottom-0 right-0 mr-[10vmin] text-white text-end">
        <a
          className=" block text-[15vh] sm:text-[24.4vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_#91bef0] cursor-pointer "
          href="/RMT"
        >
          <h2>RMT</h2>
        </a>
        <div className="text-[8vw] sm:text-[5vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          {RMTExplains.map((name) => (
            <motion.p
              initial={{
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
              whileInView={{
                clipPath:
                  "polygon(50% 0%, 100% 0%, 100% 35%, 100% 67%, 100% 100%, 46% 100%, 0% 100%, 0% 62%, 0% 35%, 0% 0%)",
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
              key={name}
            >
              {name}
            </motion.p>
          ))}
        </div>
      </div>
      <a
        className="absolute left-6 -bottom-3 block text-[11vh] sm:text-[22.4vmax]  cursor-pointer text-white [text-shadow:_0.5vmax_0.5vmax_0.2vmax_#91bef0]"
        href="/RMT"
      >
        <h2>REM:</h2>
      </a>
      {Rems.map((Rem) => {
        return (
          <Image
            key={Rem.rid}
            src={Rem.rsrc}
            width={Rem.rwidth}
            height={Rem.rheight}
            alt={Rem.rid}
            className={` ${Rem.fwidth} ${Rem.fheight} ${Rem.rzIndex} absolute top-0 ${Rem.rposition} pointer-events-none transition-transform delay-100 ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-500 opacity-95 `}
            style={{
              transform: `translate(${
                ((scrollTop > windowHeight * 4 ? windowHeight * 4 : scrollTop) /
                  20) *
                  windowScaleX *
                  Rem.rscaleX +
                Rem.rtranslateX
              }vmax,${
                ((scrollTop > windowHeight * 4 ? windowHeight * 4 : scrollTop) /
                  20) *
                  windowScaleY *
                  Rem.rscaleY +
                Rem.rtranslateY
              }vmin)`,
            }}
          ></Image>
        );
      })}
      {Rems.map((Rem) => {
        return (
          <Image
            key={Rem.rid}
            src={Rem.rsrc}
            width={Rem.rwidth}
            height={Rem.rheight}
            alt={Rem.rid}
            className={` ${Rem.fwidth} ${Rem.fheight} ${Rem.rzIndex} absolute top-0 ${Rem.rposition} pointer-events-none transition-transform delay-[50ms] mix-blend-difference ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-500 opacity-95 `}
            style={{
              transform: `translate(${
                ((scrollTop > windowHeight * 4 ? windowHeight * 4 : scrollTop) /
                  20) *
                  windowScaleX *
                  Rem.rscaleX +
                Rem.rtranslateX
              }vmax,${
                ((scrollTop > windowHeight * 4 ? windowHeight * 4 : scrollTop) /
                  20) *
                  windowScaleY *
                  Rem.rscaleY +
                Rem.rtranslateY
              }vmin)`,
            }}
          ></Image>
        );
      })}
      {Rems.map((Rem) => {
        return (
          <Image
            key={Rem.rid}
            src={Rem.rsrc}
            width={Rem.rwidth}
            height={Rem.rheight}
            alt={Rem.rid}
            className={` ${Rem.fwidth} ${Rem.fheight} ${Rem.rzIndex} absolute top-0 ${Rem.rposition} pointer-events-none transition-transform mix-blend-lighten ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-500 opacity-95 `}
            style={{
              transform: `translate(${
                ((scrollTop > windowHeight * 4 ? windowHeight * 4 : scrollTop) /
                  20) *
                  windowScaleX *
                  Rem.rscaleX +
                Rem.rtranslateX
              }vmax,${
                ((scrollTop > windowHeight * 4 ? windowHeight * 4 : scrollTop) /
                  20) *
                  windowScaleY *
                  Rem.rscaleY +
                Rem.rtranslateY
              }vmin)`,
            }}
          ></Image>
        );
      })}
    </div>
  );
}
