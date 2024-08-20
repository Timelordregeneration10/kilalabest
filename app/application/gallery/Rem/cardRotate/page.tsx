"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
import getImageSizeByUrl from "@/app/utils/getImageSizeByUrl";
export default function CardRotatePage() {
  const aiyiRems = IaiyiRems;

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  // next image should not make last image disappear instantly
  const [twoAiyiRems, setTwoAiyiRems] = useState([
    aiyiRems[Math.floor(Math.random() * aiyiRems.length)],
    aiyiRems[Math.floor(Math.random() * aiyiRems.length)],
  ]);
  const [currentAiyiRemSize, setCurrentAiyiRemSize] = useState<{
    width: number;
    height: number;
  }>({
    width: kilaInnerWidth,
    height: kilaInnerHeight,
  });

  const [cycleInterval, setCycleInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [nextTimeout, setNextTimeout] = useState<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      return;
    }
    firstRender.current = false;
    setCycleInterval(
      setInterval(() => {
        setTwoAiyiRems((twoAiyiRems) => {
          let index = Math.floor(Math.random() * aiyiRems.length);
          return [twoAiyiRems[1], aiyiRems[index]];
        });
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
              }, 3000)
            );
            setTwoAiyiRems((twoAiyiRems) => {
              let index = Math.floor(Math.random() * aiyiRems.length);
              return [twoAiyiRems[1], aiyiRems[index]];
            });
          }, 1000)
        );
        setPaused(false);
        // console.log("run");
      }
    }
  };

  async function getResult(url: string) {
    let result = await getImageSizeByUrl(url);
    setCurrentAiyiRemSize({ width: result.width, height: result.height });
  }

  useEffect(() => {
    getResult(twoAiyiRems[1]);
  }, [twoAiyiRems]);

  return (
    <div
      className="fixed z-[100] w-screen h-screen bg-[#91bef0] outline-[transparent] outline-0 "
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyDown(e.key);
      }}
    >
      <div className=" absolute w-full h-full top-0 left-0">
        {twoAiyiRems.map((aiyiRem) => (
          <NextImage
            key={aiyiRem}
            src={aiyiRem}
            width={kilaInnerWidth}
            height={kilaInnerHeight}
            className="min-w-[calc(100%+200px)] min-h-[calc(100%+200px)] object-cover blur-[15px] absolute top-[-100px] left-[-100px] animate-changeOpacity"
            alt="aiyiRem"
          ></NextImage>
        ))}
        <div
          className="relative w-full h-full top-0 left-0 animate-cardRotate flex justify-center items-center"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <div
            className="relative"
            style={{
              width:
                (currentAiyiRemSize.width / currentAiyiRemSize.height) *
                (kilaInnerHeight /
                  (Math.cos(
                    Math.PI / 4 -
                      Math.atan(
                        currentAiyiRemSize.width / currentAiyiRemSize.height
                      )
                  ) *
                    Math.sqrt(
                      1 +
                        (currentAiyiRemSize.width / currentAiyiRemSize.height) *
                          (currentAiyiRemSize.width / currentAiyiRemSize.height)
                    ))),
              height:
                kilaInnerHeight /
                (Math.cos(
                  Math.PI / 4 -
                    Math.atan(
                      currentAiyiRemSize.width / currentAiyiRemSize.height
                    )
                ) *
                  Math.sqrt(
                    1 +
                      (currentAiyiRemSize.width / currentAiyiRemSize.height) *
                        (currentAiyiRemSize.width / currentAiyiRemSize.height)
                  )),
            }}
          >
            <NextImage
              src={twoAiyiRems[1]}
              width={kilaInnerWidth}
              height={kilaInnerHeight}
              className="w-full h-full object-contain absolute top-0 left-0 rotate-45"
              alt="aiyiRem"
            ></NextImage>
          </div>
        </div>
      </div>
    </div>
  );
}
