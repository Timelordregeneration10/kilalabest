"use client";

import { useEffect, useState } from "react";
import useWindow from "../../hooks/useWindow";
import { motion } from "framer-motion";

const attempts = [
  { name: "sticky系列", url: "https://kilalabest.cn/attempt/sticky" },
  { name: "初学three.js与Rem", url: "https://timelord.cn/threeRem" },
  { name: "CSS3D系列", url: "https://timelord.cn/css3d" },
  { name: "bilibilitop", url: "https://timelord.cn/bilibilitop" },
  { name: "Font系列", url: "https://timelord.cn/fontSeries" },
  { name: "My Happy Engagement", url: "https://timelord.cn/myHappyEngagement" },
];

export default function AttemptScene() {
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);

  const words = [
    "如果真爱有颜色，那一定是蓝色！",
    "蕾姆是最可爱的！",
    "我喜欢蕾姆啊！",
    "蕾姆是最棒的！",
    "蕾姆是我一切温柔的来源和归属！",
    "RMTYYDS!!",
    "Rem suki!",
    "蕾姆生日快乐！！！！！！！！！",
  ];
  const [normalDanmu, setNormalDanmu] = useState<
    Array<{
      order: number;
      word: string;
      fontSize: number;
      color: string;
      top: number;
      animationTime: number;
    }>
  >([]);
  const [leftBottomDanmu, setLeftBottomDanmu] = useState<
    Array<{
      order: number;
      word: string;
      color: string;
    }>
  >([]);
  const [rotateDanmu, setRotateDanmu] = useState<
    Array<{
      order: number;
      count: number;
    }>
  >([]);
  function adddanmu() {
    let ran1 = Math.random();
    let ran2 = Math.random();
    let ran3 = Math.random();
    let ranword = Math.floor(Math.random() * words.length);
    let colorran = `rgb(${Math.floor(Math.random() * 100 + 155)},${Math.floor(
      Math.random() * 100 + 155
    )},${Math.floor(Math.random() * 100 + 155)})`;
    if (ranword == 0) {
      colorran = "#91bef0";
    }
    let sec = new Date().getTime();
    setNormalDanmu((n) => [
      ...n,
      {
        order: sec,
        word: words[ranword],
        fontSize: 5 + ran1 * 6,
        color: colorran,
        top: ran2 * 80,
        animationTime: 3 + ran3 * 4,
      },
    ]);

    setTimeout((sec: number) => {
      setNormalDanmu((arr) => {
        let templist = [...arr];
        let index = 0;
        for (let i = 0; i < templist.length; i++) {
          if (templist[i].order === sec) {
            index = i;
          }
        }
        templist.splice(index, 1);
        return templist;
      });
    }, 7000);
  }

  function addToLeftBottomDanmu() {
    let ranword = Math.floor(Math.random() * words.length);
    let colorran = `rgb(${Math.floor(Math.random() * 100 + 155)},${Math.floor(
      Math.random() * 100 + 155
    )},${Math.floor(Math.random() * 100 + 155)})`;
    if (ranword == 0) {
      colorran = "#91bef0";
    }

    let sec = new Date().getTime();
    setLeftBottomDanmu((l) => [
      ...l,
      {
        order: sec,
        word: words[ranword],
        color: colorran,
      },
    ]);

    setTimeout((sec: number) => {
      setLeftBottomDanmu((arr) => {
        let templist = [...arr];
        let index = 0;
        for (let i = 0; i < templist.length; i++) {
          if (templist[i].order === sec) {
            index = i;
          }
        }
        templist.splice(index, 1);
        return templist;
      });
    }, 2000);
  }

  function addRotateDanmu() {
    let currentNum = 0;
    let rotateInterval = setInterval(() => {
      if (currentNum >= 12) {
        clearInterval(rotateInterval);
      }

      let sec = new Date().getTime();
      setRotateDanmu((r) => [
        ...r,
        {
          order: sec,
          count: currentNum,
        },
      ]);

      setTimeout((sec: number) => {
        setRotateDanmu((arr) => {
          let templist = [...arr];
          let index = 0;
          for (let i = 0; i < templist.length; i++) {
            if (templist[i].count === currentNum) {
              index = i;
            }
          }
          templist.splice(index, 1);
          return templist;
        });
      }, 3000);

      currentNum++;
    }, 50);
  }

  useEffect(() => {
    let danmuInterval = setInterval(() => {
      adddanmu();
    }, 300);
    let danmuInterval2 = setInterval(() => {
      addToLeftBottomDanmu();
    }, 3000);
    let danmuInterval3 = setInterval(() => {
      addRotateDanmu();
    }, 7000);
    return () => {
      clearInterval(danmuInterval);
      clearInterval(danmuInterval2);
      clearInterval(danmuInterval3);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-attempt bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* mainScene */}
      <div className=" absolute top-0 left-0 w-screen h-screen"></div>
      {/* danmu */}
      {normalDanmu.map((danmu) => {
        return (
          <div
            key={danmu.order}
            className="absolute w-[300vw] text-start z-[4] pointer-events-none animate-notbiggest"
            style={{
              fontSize: `${danmu.fontSize}vw`,
              color: danmu.color,
              top: `${danmu.top}vh`,
              animationDuration: `${danmu.animationTime}s`,
            }}
          >
            {danmu.word}
          </div>
        );
      })}
      {leftBottomDanmu.map((danmu) => {
        return (
          <div
            key={danmu.order}
            className="absolute left-[60vw] text-[10vw] w-[300vw] text-start top-0 z-[6] pointer-events-none animate-toLeftBottom"
            style={{
              color: danmu.color,
            }}
          >
            {danmu.word}
          </div>
        );
      })}
      {rotateDanmu.map((danmu) => {
        return (
          <div
            key={danmu.order}
            className="absolute w-[100vh] text-start z-[6] pointer-events-none right-0 top-[50%] text-[3vw] text-[#91bef0]"
            style={{
              transform: `translateY(-50%) rotate(${
                danmu.count * (360 / 12)
              }deg)`,
            }}
          >
            蕾姆生日快乐！！
          </div>
        );
      })}
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[7vw] relative z-[7]">
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
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#beb4f1] to-[#97efffdb]  `}
          >
            Attempt
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#beb4f1] to-[#97efffdb]  `}
          >
            浅尝
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#beb4f1] to-[#97efffdb]  `}
          >
            浅尝
          </div>
        </div>

        <div className="order-2 sm:order-1 relative text-start sm:text-end text-white text-[6.5vw] sm:text-[4vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          {attempts.map((att, index) => (
            <motion.p
              key={att.name}
              initial={{
                transform: index % 2 === 0 ? "skewY(45deg)" : "skewY(-45deg)",
                opacity: 0,
              }}
              whileInView={{ transform: "skewY(0)", opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <a
                href={att.url}
                target="_blank"
                style={{
                  fontSize:
                    att.name === "My Happy Engagement" ||
                    att.name === "初学three.js与Rem"
                      ? "3vmax"
                      : "inherit",
                }}
              >
                · {att.name} ·
              </a>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
