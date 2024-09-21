"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
// import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
export default function Page() {
  // const aiyiRems = IaiyiRems;
  
  const aiyiRems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push("/aiyiRemPublic/" + String(i + 1) + ".webp");
    }
    return temp;
  }, []);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();

  const [shuffledAiyiRems0, setShuffledAiyiRems0] = useState(aiyiRems);
  const [shuffledAiyiRems1, setShuffledAiyiRems1] = useState(aiyiRems);
  const [shuffledAiyiRems2, setShuffledAiyiRems2] = useState(aiyiRems);
  useEffect(() => {
    setShuffledAiyiRems0([...aiyiRems].sort(() => Math.random() - 0.5));
    setShuffledAiyiRems1([...aiyiRems].sort(() => Math.random() - 0.5));
    setShuffledAiyiRems2([...aiyiRems].sort(() => Math.random() - 0.5));
  }, [aiyiRems]);

  const [paused, setPaused] = useState(false);
  const handleKeyDown = (key: string) => {
    if (key === " ") {
      setPaused(!paused);
    }
  };

  return (
    <div
      className="fixed z-[100] w-full min-h-screen top-0 left-0 bg-[#91bef0] overflow-hidden outline-[transparent] outline-0 "
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyDown(e.key);
      }}
    >
      <div
        className=" absolute w-[calc(100vw/3)] left-0 top-0 flex flex-col h-auto animate-rising"
        style={{
          animationDuration: aiyiRems.length * 5 + "s",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {shuffledAiyiRems0.map((aiyiRem: string) => (
          <div className=" aspect-[12/9] w-full" key={aiyiRem}>
            <Image
              src={aiyiRem}
              width={400}
              height={300}
              className="w-full aspect-[12/9] object-cover"
              alt="aiyiRem"
            ></Image>
          </div>
        ))}
      </div>
      <div
        className=" absolute w-[calc(100vw/3)] left-[calc(100vw/3)] bottom-0 flex flex-col h-auto animate-falling"
        style={{
          animationDuration: aiyiRems.length * 5 + "s",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {shuffledAiyiRems1.map((aiyiRem: string) => (
          <div className=" aspect-[12/9] w-full" key={aiyiRem}>
            <Image
              src={aiyiRem}
              width={400}
              height={300}
              className="w-full aspect-[12/9] object-cover"
              alt="aiyiRem"
            ></Image>
          </div>
        ))}
      </div>
      <div
        className=" absolute w-[calc(100vw/3)] top-0 left-[calc(200vw/3)] flex flex-col h-auto animate-rising"
        style={{
          animationDuration: aiyiRems.length * 5 + "s",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {shuffledAiyiRems2.map((aiyiRem: string) => (
          <div className=" aspect-[12/9] w-full" key={aiyiRem}>
            <Image
              src={aiyiRem}
              width={400}
              height={300}
              className="w-full aspect-[12/9] object-cover"
              alt="aiyiRem"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
}
