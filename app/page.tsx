"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heartpng from "./components/img/heart.png";

export default function Home() {
  const boxallRef = useRef<HTMLDivElement>(null);

  const [heartList, setHeartlist] = useState<
    Array<{ px: number; py: number; order: number }>
  >([]);

  const generateHeart = (px: number, py: number) => {
    console.log(px, py);
    // setHeartlist((arr) => {
    //   let tempHeartlist = arr;
    //   const sec =new Date().getTime();
    //   tempHeartlist.push({ px:px, py:py, order: sec });
    //   return tempHeartlist;
    // });
    // 因为react浅监听，内容还是数组所以不触发监听，需要解构（相当于浅拷贝）才能触发更新
    let sec = new Date().getTime();
    setHeartlist([...heartList, { px, py, order: sec }]);

    // 精准延时remove
    setTimeout((sec: number) => {
      setHeartlist((arr) => {
        let tempHeartlist = [...arr];
        let index = 0;
        for (let i = 0; i < tempHeartlist.length; i++) {
          if (tempHeartlist[i].order === sec) {
            index = i;
          }
        }
        tempHeartlist.splice(index, 1);
        return tempHeartlist;
      });
    }, 2000);
  };

  return (
    <div
      className="relative overflow-x-hidden overflow-y-scroll w-screen h-screen no-scrollbar text-center m-0 p-0 font-[saibo] select-none"
      onClick={(e) => {
        if (boxallRef.current)
          generateHeart(
            e.clientX - 15,
            e.clientY + boxallRef.current.scrollTop - 20
          );
      }}
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
            className={`absolute w-[40px] h-[40px] select-none pointer-events-none animate-personwebheart`}
            style={{ top: item.py + "px", left: item.px + "px" }}
          ></Image>
        );
      })}
    </div>
  );
}
