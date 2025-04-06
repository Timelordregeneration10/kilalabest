"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
// import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
export default function SinglePage() {
  // const aiyiRems = IaiyiRems;
  
  const aiyiRems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push("/aiyiRemPublic/" + String(i + 1) + ".webp");
    }
    return temp;
  }, []);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  // next image should not make last image disappear instantly
  const [twoAiyiRems, setTwoAiyiRems] = useState([
    aiyiRems[Math.floor(Math.random() * aiyiRems.length)],
    aiyiRems[Math.floor(Math.random() * aiyiRems.length)],
  ]);

  const [cycleInterval, setCycleInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [nextTimeout, setNextTimeout] = useState<NodeJS.Timeout | null>(null);
  const lastAiyiRemTime = useRef<number>(new Date().getTime());
  const [paused, setPaused] = useState(false);
  const firstRender = useRef(true);

  const animeType = 12;
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(1);
  function getAnimation(index: number) {
    switch (index) {
      // 因为旧的图片最终会取消动画，所以时间需要固定为3s且回归初态
      case 1:
        return "animate-[moving1_3s_ease_forwards]";
      case 2:
        return "animate-[moving2_3s_ease_forwards]";
      case 3:
        return "animate-[moving3_3s_ease_forwards]";
      case 4:
        return "animate-[moving4_3s_ease_forwards]";
      case 5:
        return "animate-[rotate3d1_3s_ease_forwards]";
      case 6:
        return "animate-[rotate3d2_3s_ease_forwards]";
      case 7:
        return "animate-[rotate3d3_3s_ease_forwards]";
      case 8:
        return "animate-[rotate3d4_3s_ease_forwards]";
      case 9:
        return "animate-[rotate1_3s_ease_forwards]";
      case 10:
        return "animate-[rotate2_3s_ease_forwards]";
      case 11:
        return "animate-[rotate3_3s_ease_forwards]";
      case 12:
        return "animate-[rotate4_3s_ease_forwards]";
      default:
        return "animate-[moving1_3s_ease_forwards]";
    }
  }

  useEffect(() => {
    if (!firstRender.current) {
      return;
    }
    firstRender.current = false;
    // console.log("setInterval");
    setCycleInterval(
      setInterval(() => {
        setTwoAiyiRems((twoAiyiRems) => {
          let index = Math.floor(Math.random() * aiyiRems.length);
          return [twoAiyiRems[1], aiyiRems[index]];
        });
        setCurrentAnimeIndex(Math.floor(Math.random() * animeType) + 1);
        lastAiyiRemTime.current = new Date().getTime();
      }, 3000)
    );
    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [aiyiRems, firstRender, cycleInterval]);

  const handleKeyDown = (key: string) => {
    if (key === " ") {
      if (nextTimeout) clearTimeout(nextTimeout);
      setNextTimeout(null);
      // running, stop it
      if (!paused) {
        if (cycleInterval) clearInterval(cycleInterval);
        setCycleInterval(null);
        setPaused(true);
        // console.log("stop");
      }
      // paused, run it
      else {
        setNextTimeout(
          setTimeout(() => {
            setCycleInterval(
              setInterval(() => {
                setTwoAiyiRems((twoAiyiRems) => {
                  let index = Math.floor(Math.random() * aiyiRems.length);
                  return [twoAiyiRems[1], aiyiRems[index]];
                });
                setCurrentAnimeIndex(Math.floor(Math.random() * animeType) + 1);
                lastAiyiRemTime.current = new Date().getTime();
              }, 3000)
            );
            setTwoAiyiRems((twoAiyiRems) => {
              let index = Math.floor(Math.random() * aiyiRems.length);
              return [twoAiyiRems[1], aiyiRems[index]];
            });
            setCurrentAnimeIndex(Math.floor(Math.random() * animeType) + 1);
            // 也可以是固定的时间，然后就没有lastAiyiRemTime了
          }, (lastAiyiRemTime.current + 300000 - new Date().getTime()) % 3000)
        );
        // console.log(
        //   "last: " +
        //     lastAiyiRemTime.current +
        //     " current: " +
        //     new Date().getTime() +
        //     " 差: " +
        //     ((lastAiyiRemTime.current + 300000 - new Date().getTime()) % 3000)
        // );
        setPaused(false);
        // console.log("run");
      }
    }
  };

  return (
    <div
      className="fixed z-[100] w-screen h-screen bg-[#91bef0] outline-[transparent] outline-0 "
      // need to be selectable
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyDown(e.key);
      }}
    >
      {twoAiyiRems.map((aiyiRem, index) => (
        <div
          key={aiyiRem+index}
          className=" absolute w-full h-full top-0 left-0 animate-concreter"
        >
          <NextImage
            src={aiyiRem}
            width={kilaInnerWidth}
            height={kilaInnerHeight}
            className="absolute min-w-[calc(100%+200px)] min-h-[calc(100%+200px)] top-[-100px] left-[-100px] object-cover blur-[15px] z-[1] "
            alt="aiyiRem"
          ></NextImage>
          <NextImage
            src={aiyiRem}
            width={kilaInnerWidth}
            height={kilaInnerHeight}
            className={`w-full h-full object-contain absolute top-0 left-0 z-[2] ${
              // 旧的图片在新的图片出现时取消动画，否则因为动画改变后会重新放以及opacity还没反应过来，会和新的图片一起进行动画
              index === 1 ? getAnimation(currentAnimeIndex) : ""
            }`}
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
            alt="aiyiRem"
          ></NextImage>
        </div>
      ))}
    </div>
  );
}
