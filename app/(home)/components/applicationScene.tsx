"use client";

import { useContext, useEffect, useRef, useState } from "react";
import useWindow from "../../hooks/useWindow";
import birthday1 from "../../assets/applicaton/birthday1.webp";
import birthday2 from "../../assets/applicaton/birthday2.webp";
import birthday3 from "../../assets/applicaton/birthday3.webp";
import hdwpic from "../../assets/applicaton/hdwpic.webp";
import landu1 from "../../assets/applicaton/landu1.webp";
import landu2 from "../../assets/applicaton/landu2.webp";
import yuan from "../../assets/applicaton/yuan.webp";
import sakamoto from "../../assets/applicaton/sakamoto.webp";
import Image from "next/image";
import applicationGIF from "../assets/application.gif";
import bg from "@/app/assets/musedash/application.webp";
import { motion } from "framer-motion";
import useScroll from "@/app/hooks/useScroll";

const applications = [
  { name: "生日系列", url: "https://timelord.cn/birthday" },
  {
    name: "静静的蓝毒窝",
    url: "https://timelord.cn/%E9%9D%99%E9%9D%99%E7%9A%84%E8%93%9D%E6%AF%92%E7%AA%9D/",
  },
  { name: "DV帅照集", url: "https://timelord.cn/hdwpic/" },
  {
    name: "原神启动！",
    url: "https://timelord.cn/%E5%8E%9F%E7%A5%9E%E5%90%AF%E5%8A%A8/",
  },
  { name: "在下坂本，有何贵干", url: "https://timelord.cn/sakamoto/" },
  { name: "Rem gallery系列", url: "/application/gallery/Rem" },
];

const appsrc = [
  birthday1,
  birthday2,
  birthday3,
  hdwpic,
  landu1,
  landu2,
  yuan,
  sakamoto,
];

export default function ApplicationScene() {
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);

  let beforeTransforms = [];
  let afterTransforms = [];
  const translateZBefore = 6;
  const translateZAfter = 15;

  for (let i = 0; i < 16; i++) {
    let temp = ``;
    temp = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${
      i >= 8 ? 0 : i % 4 >= 2 ? 90 : -90
    }deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${
      i % 8 >= 4 ? translateZBefore : -1 * translateZBefore
    }vw)`;
    beforeTransforms.push(temp);
  }
  for (let i = 0; i < 16; i++) {
    let temp = ``;
    temp = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${
      i >= 8 ? 0 : i % 4 >= 2 ? 90 : -90
    }deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${
      i % 8 >= 4 ? translateZAfter : -1 * translateZAfter
    }vw)`;
    afterTransforms.push(temp);
  }

  let gamecubes = [];
  for (let i = 0; i < 16; i++) {
    gamecubes.push({
      id: i,
      src: appsrc[i % 8],
      beforeTransform: beforeTransforms[i],
      afterTransform: afterTransforms[i],
    });
  }
  const finalgamecubes = gamecubes;

  const boxRef = useRef<HTMLDivElement | null>(null);
  const yuanRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const { scrollTop } = useScroll();

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  useEffect(() => {
    // boxRef fixed 400vh
    if (boxRef.current) {
      const { top } = boxRef.current.getBoundingClientRect();
      // before application scene show
      if (top >= kilaInnerHeight) {
        if (bgRef.current) bgRef.current.style.display = "none";
      }
      // scene enter visible area partly
      else if (top > 0 && top < kilaInnerHeight) {
        if (bgRef.current) {
          bgRef.current.style.display = "block";
          bgRef.current.style.opacity = "0";
          bgRef.current.style.transform = `scale(1)`;
        }
      }
      // bg bigger
      else if (top <= 0 && top >= -kilaInnerHeight) {
        if (bgRef.current) {
          bgRef.current.style.opacity = "1";
          bgRef.current.style.transform = `scale(${
            -(top / kilaInnerHeight) + 1
          }) rotate(0deg)`;
        }
        if (yuanRef.current) yuanRef.current.style.display = "none";
        if (boxRef.current) {
          boxRef.current.classList.remove("bg-attempt");
          boxRef.current.classList.add("bg-application");
        }
      }
      // bg bigger and rotate and fade and yuan show behind bg
      else if (top < -kilaInnerHeight && top >= -2 * kilaInnerHeight) {
        if (bgRef.current) {
          bgRef.current.style.opacity = `${
            (top + kilaInnerHeight) / kilaInnerHeight + 1
          }`;
          bgRef.current.style.transform = `scale(${
            -((top + kilaInnerHeight) / kilaInnerHeight) + 2
          }) rotate(${-((top + kilaInnerHeight) / kilaInnerHeight) * 90}deg)`;
        }
        if (yuanRef.current) {
          yuanRef.current.style.display = `block`;
          yuanRef.current.style.transform = `translateY(0)`;
        }
        if (boxRef.current) {
          boxRef.current.classList.remove("bg-application");
          boxRef.current.classList.add("bg-attempt");
        }
      }
      // bg faded and yuan translateY run away
      else if (top < -2 * kilaInnerHeight && top >= -3 * kilaInnerHeight) {
        if (bgRef.current) {
          bgRef.current.style.opacity = `0`;
          bgRef.current.style.transform = `scale(3) rotate(90deg)`;
          bgRef.current.style.display = "block";
        }
        if (yuanRef.current) {
          yuanRef.current.style.transform = `translateY(${
            ((top + 2 * kilaInnerHeight) / kilaInnerHeight) * 100
          }vh)`;
        }
      }
      // yuan vanish and bg display none
      else if (top < -3 * kilaInnerHeight && top > -4 * kilaInnerHeight) {
        if (bgRef.current) {
          bgRef.current.style.display = "none";
        }
        if (yuanRef.current) {
          yuanRef.current.style.display = `block`;
          yuanRef.current.style.transform = `translateY(-100vh)`;
        }
      }
      // yuan display none
      else if (top < -4 * kilaInnerHeight) {
        if (bgRef.current) {
          bgRef.current.style.display = "none";
        }
        if (yuanRef.current) {
          yuanRef.current.style.display = `none`;
        }
      }
    }
  }, [kilaInnerWidth, scrollTop, kilaInnerHeight]);

  return (
    <div
      className="h-[300vh] w-screen bg-application bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative"
      ref={boxRef}
    >
      <div
        className=" fixed top-0 left-0 w-screen h-screen pointer-events-none z-10 opacity-0 transition-[opacity_transform] duration-400 ease-[cubic-bezier(0.25,0.75,0.85,1)] hidden "
        ref={bgRef}
      >
        <Image
          src={bg}
          width={1600}
          height={900}
          loading="eager"
          alt="bg"
          className="w-full h-full object-cover sm:object-fill"
        ></Image>
      </div>
      <div
        className=" fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9] transition-transform duration-100 ease-[cubic-bezier(0.33,1,0.33,1)] hidden "
        ref={yuanRef}
      >
        <Image
          src={
            "https://timelord.cn/%E5%8E%9F%E7%A5%9E%E5%90%AF%E5%8A%A8/yuanshen.jpg"
          }
          width={1600}
          height={900}
          alt="yuan"
          loading="eager"
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="absolute z-[11] left-0 top-0 w-full h-screen flex justify-center items-center ">
        <div
          className="relative z-[11] w-[30vw] h-[30vw] transform-style-3d transition-[transform_width_height] duration-1000 "
          style={{ perspective: isHover ? "1000px" : "1000px" }}
        >
          <div className="absolute w-full h-full transform-style-3d rotate-x-0 rotate-y-0 rotate-z-0 animate-turn24 ">
            {finalgamecubes.map((gamecube) => {
              return (
                <div
                  key={gamecube.id}
                  className="absolute w-full h-full transform-style-3d transition-[transform_width_height] duration-1000"
                  style={{
                    transform: isHover
                      ? gamecube.afterTransform
                      : gamecube.beforeTransform,
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
        </div>
      </div>
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center gap-[10vh] sm:gap-[10vw] relative z-[12]">
        <div
          className=" relative text-white h-fit flex justify-center items-center px-12 py-8 sm:px-24 sm:py-16"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div
            className={`relative z-[12] text-[10vw] sm:text-[4.4vmax] ${
              isHover ? "opacity-100" : "opacity-100"
            } text-white `}
          >
            <h2>APPLICATION</h2>
          </div>
          {/* left top border */}
          <div
            className="absolute z-[12] top-0 left-0 w-full h-full border-5 sm:border-[10px] border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? 24 : 48}px,${isMobile ? 16 : 32}px)`
                : "",
            }}
          ></div>
          {/* right top corner */}
          <div
            className="absolute z-[12] top-0 right-0 w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] sm:border-r-[10px] sm:border-t-[10px] border-l-0 border-b-0 border-r-5 border-t-5 border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? 24 : 48}px,${isMobile ? -16 : -32}px)`
                : "",
            }}
          ></div>
          {/* right bottom border */}
          <div
            className="absolute z-[12] top-0 left-0 w-full h-full border-5 sm:border-[10px] border-white transition-transform"
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
            className="absolute z-[12] bottom-0 left-0 w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] sm:border-l-[10px] sm:border-b-[10px] border-r-0 border-t-0 border-l-5 border-b-5 border-white transition-transform"
            style={{
              transform: isHover
                ? `translate(${isMobile ? -24 : -48}px,${isMobile ? 16 : 32}px)`
                : "",
            }}
          ></div>
          {/* top application gif */}
          <div
            className={`absolute z-[12] ${
              isMobile ? "w-[calc(100%-15px)]" : "w-[calc(100%-20px)]"
            } top-[5px] left-[5px]`}
          >
            <Image
              width={60}
              height={60}
              alt="application"
              src={applicationGIF}
              className="min-w-[60px] min-h-[60px] absolute top-0 transition-[left_transform]"
              style={{
                left: isHover ? "calc(100%)" : "0",
                transform: isHover
                  ? `translateY(${isMobile ? -16 : -32}px)`
                  : "",
              }}
            ></Image>
          </div>
          {/* bottom application gif */}
          <div
            className={`absolute z-[12] ${
              isMobile ? "w-[calc(100%-15px)]" : "w-[calc(100%-20px)]"
            } bottom-[5px] right-[5px]`}
          >
            <Image
              width={60}
              height={60}
              alt="application"
              src={applicationGIF}
              className="min-w-[60px] min-h-[60px] absolute bottom-0 transition-[right_transform]"
              style={{
                right: isHover ? "calc(100%)" : "0",
                transform: isHover ? `translateY(${isMobile ? 16 : 32}px)` : "",
              }}
            ></Image>
          </div>
        </div>

        <div className=" relative text-white text-[8.5vw] text-start sm:text-[3.5vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          {applications.map((app) => (
            <motion.p
              key={app.name}
              initial={{ transform: "translateY(-100%)", opacity: 0 }}
              whileInView={{ transform: "translateY(0%)", opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <a href={app.url} target="_blank">
                * {app.name} *
              </a>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
