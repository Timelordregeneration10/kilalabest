"use client";

import { useEffect, useState } from "react";
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
    width: 0,
    height: 0,
  });
  
  useEffect(() => {
    let it = setInterval(() => {
      setTwoAiyiRems((twoAiyiRems) => {
        let index = Math.floor(Math.random() * aiyiRems.length);
        return [twoAiyiRems[1], aiyiRems[index]];
      });
    }, 3000);
    return () => {
      clearInterval(it);
    };
  }, [aiyiRems]);

  async function getResult(url: string) {
    let result = await getImageSizeByUrl(url);
    setCurrentAiyiRemSize({ width: result.width, height: result.height });
  }

  useEffect(() => {
    getResult(twoAiyiRems[1]);
  }, [twoAiyiRems]);

  return (
    <div className="fixed z-[100] w-screen h-screen bg-[#91bef0] ">
      <div className=" absolute w-full h-full top-0 left-0">
        {twoAiyiRems.map((aiyiRem) => (
          <NextImage
            key={aiyiRem}
            src={aiyiRem}
            width={kilaInnerWidth}
            height={kilaInnerHeight}
            className="w-full h-full object-cover blur-[15px] absolute top-0 left-0 animate-changeOpacity"
            alt="aiyiRem"
          ></NextImage>
        ))}
        <div className="relative w-full h-full top-0 left-0 animate-cardRotate flex justify-center items-center">
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
