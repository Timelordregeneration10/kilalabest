"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import heartpng from "./components/img/heart.png";

export default function Home() {
  const boxallRef = useRef<HTMLDivElement>(null);

  const [heartList, setHeartlist] = useState<
    Array<{ px: number; py: number; order: number }>
  >([]);

  const generateHeart = (px: number, py: number) => {
    console.log(px, py);
    let tempHeartlist = heartList;
    tempHeartlist.push({ px, py, order: heartList.length });
    console.log(tempHeartlist)
    setHeartlist(tempHeartlist);
    setTimeout(() => {
      tempHeartlist.pop();
      setHeartlist(tempHeartlist);
    }, 2000);
  };

  return (
    <div
      className="relative overflow-x-hidden overflow-y-scroll w-screen h-screen no-scrollbar text-center m-0 p-0 font-[saibo]"
      onClick={(e) => generateHeart(e.pageX, e.pageY)}
      ref={boxallRef}
    >
      <div className="h-[75vh]">rmt</div>
      <div className="h-[75vh]">rmt</div>
      {heartList.map((item) => {
        return (
          <Image
            height={40}
            width={40}
            src={heartpng}
            alt="heart"
            key={item.order}
            className={`top-[${item.py}px] left-[${item.px}px] absolute w-[40px] h-[40px] select-none animate-personwebheart`}
          ></Image>
        );
      })}
    </div>
  );
}
