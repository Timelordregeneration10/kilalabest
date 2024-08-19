"use client";

import { useEffect, useState } from "react";
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

  return (
    <div className="fixed z-[100] w-screen h-screen bg-[#91bef0] ">
      {twoAiyiRems.map((aiyiRem) => (
        <div
          key={aiyiRem}
          className=" absolute w-full h-full top-0 left-0 animate-changeOpacity"
        >
          <NextImage
            src={aiyiRem}
            width={kilaInnerWidth}
            height={kilaInnerHeight}
            className="w-full h-full object-cover blur-[15px] absolute top-0 left-0"
            alt="aiyiRem"
          ></NextImage>
          <NextImage
            src={aiyiRem}
            width={kilaInnerWidth}
            height={kilaInnerHeight}
            className="w-full h-full object-contain absolute top-0 left-0"
            alt="aiyiRem"
          ></NextImage>
        </div>
      ))}
    </div>
  );
}
