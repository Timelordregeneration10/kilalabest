"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heartpng from "./components/img/heart.png";

export default function Home() {
  const boxallRef = useRef<HTMLDivElement>(null);

  const [heartList, setHeartlist] = useState<
    Array<{ px: number; py: number; order: number }>
  >([]);

  const [showLeaveWeb, setShowLeaveWeb] = useState(false);
  const [leaveWebTimeout, setLeaveWebTimeout] = useState<NodeJS.Timeout | null>(null);

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
      className="overflow-x-hidden overflow-y-scroll w-screen h-screen no-scrollbar text-center m-0 p-0 font-[saibo] select-none"
      onClick={(e) => {
        if (boxallRef.current)
          generateHeart(
            e.pageX - 15,
            e.pageY - 20
          );
      }}
      onMouseLeave={() => {
        setLeaveWebTimeout(setTimeout(() => {
          setShowLeaveWeb(true);
        }, 2000))
      }}
      onMouseEnter={() => {
        if (leaveWebTimeout)
          clearTimeout(leaveWebTimeout);
        setLeaveWebTimeout(null);
      }}
      ref={boxallRef}
    >
      <div className="h-[75vh]">rmt</div>
      <div className="h-[75vh]">rmt</div>

      {/* leaveweb page */}
      {showLeaveWeb && (
        <div className="absolute top-0 left-0 w-screen h-screen z-[99] bg-[url(./components/img/musedash/leaving.png)] bg-cover bg-center lg:bg-[length:100vw_100vh]">
          <div className="absolute top-[43vh] right-0 px-[2vmax] text-[4vmax] sm:text-[6vmax] bg-[rgb(255,158,229)] text-white">you have leaved!</div>
          <button onClick={() => { setShowLeaveWeb(false) }} className="absolute bottom-[25vh] right-[5vw] px-[2vmax] text-[5vmax] bg-[rgb(124,255,130)] text-white border-hidden transition-all hover:bg-[rgb(55,255,0)]">return</button>
        </div>
      )}

      {/* heart bubble */}
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
