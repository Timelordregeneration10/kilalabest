"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
// import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
import { kilalaContext } from "@/app/providers/kilalayout";
export default function Page() {
  // const aiyiRems = IaiyiRems;
  
  const aiyiRems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push("/aiyiRemPublic/" + String(i + 1) + ".webp");
    }
    return temp;
  }, []);

  const { scrollTop } = useContext(kilalaContext);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  // control stickyRef translateX
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      stickyTopRef.current.style.transform = `translateY(-${
        scrollTop * 0.9 >= stickyTopRef.current.scrollHeight/1.9 - kilaInnerHeight
          ? stickyTopRef.current.scrollHeight/1.9 - kilaInnerHeight
          : scrollTop * 0.9
      }px)`;
    }
    if (stickyMiddleRef.current && scrollRef.current) {
      stickyMiddleRef.current.style.transform = `translateY(-${
        scrollTop * 0.3 >=
        stickyMiddleRef.current.scrollHeight/1.9 - kilaInnerHeight
          ? stickyMiddleRef.current.scrollHeight/1.9 - kilaInnerHeight
          : scrollTop * 0.3
      }px)`;
    }
    // 逆行会不丝滑
    // if (stickyMiddleRef.current && scrollRef.current) {
    //   stickyMiddleRef.current.style.transform = `translateY(-${(
    //     stickyMiddleRef.current.scrollHeight/1.9 - kilaInnerHeight - scrollTop <= 0
    //       ? 0
    //       : stickyMiddleRef.current.scrollHeight/1.9 - kilaInnerHeight - scrollTop)
    //   }px)`;
    // }
    if (stickyBottomRef.current && scrollRef.current) {
      stickyBottomRef.current.style.transform = `translateY(-${
        scrollTop * 0.7 >=
        stickyBottomRef.current.scrollHeight/1.9 - kilaInnerHeight
          ? stickyBottomRef.current.scrollHeight/1.9 - kilaInnerHeight
          : scrollTop * 0.7
      }px)`;
    }
  }, [kilaInnerHeight, scrollTop]);

  // control scrollRef height
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      scrollRef.current.style.height =
        String(stickyTopRef.current.scrollHeight/1.9) + "px";
    }
  }, [kilaInnerWidth, kilaInnerHeight]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const stickyTopRef = useRef<HTMLDivElement | null>(null);
  const stickyMiddleRef = useRef<HTMLDivElement | null>(null);
  const stickyBottomRef = useRef<HTMLDivElement | null>(null);

  const shuffledAiyiRems0 = useMemo(
    () => [
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
    ],
    [aiyiRems]
  );
  const shuffledAiyiRems1 = useMemo(
    () => [
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
    ],
    [aiyiRems]
  );
  const shuffledAiyiRems2 = useMemo(
    () => [
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
      ...[...aiyiRems].sort(() => Math.random() - 0.5),
    ],
    [aiyiRems]
  );

  return (
    <div className="w-full min-h-screen relative bg-[#91bef0] overflow-hidden" ref={scrollRef}>
      <div
        className=" absolute w-[calc(100vw/3)] left-0 top-0 flex flex-col h-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
        ref={stickyTopRef}
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
        className=" absolute w-[calc(100vw/3)] left-[calc(100vw/3)] top-0 flex flex-col h-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
        ref={stickyMiddleRef}
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
        className=" absolute w-[calc(100vw/3)] top-0 left-[calc(200vw/3)] flex flex-col h-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
        ref={stickyBottomRef}
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
