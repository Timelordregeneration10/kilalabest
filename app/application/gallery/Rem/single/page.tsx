"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
export default function SinglePage() {
  const aiyiRems = IaiyiRems;

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
                lastAiyiRemTime.current = new Date().getTime();
              }, 3000)
            );
            setTwoAiyiRems((twoAiyiRems) => {
              let index = Math.floor(Math.random() * aiyiRems.length);
              return [twoAiyiRems[1], aiyiRems[index]];
            });
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
      {twoAiyiRems.map((aiyiRem) => (
        <div
          key={aiyiRem}
          className=" absolute w-full h-full top-0 left-0 animate-changeOpacity"
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
            className="w-full h-full object-contain absolute top-0 left-0 animate-bigger z-[2]"
            style={{ animationPlayState: paused ? "paused" : "running" }}
            alt="aiyiRem"
          ></NextImage>
        </div>
      ))}
    </div>
  );
}
