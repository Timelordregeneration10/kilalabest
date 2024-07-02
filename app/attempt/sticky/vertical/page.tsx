"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
export default function Page() {
  const aiyiRems = IaiyiRems;
  const [scrollTop, setScrollTop] = useState(0);
  const refreshScrollTop = useCallback(() => {
    if (localStorage.getItem("kilaScrollTop"))
      setScrollTop(parseInt(localStorage.getItem("kilaScrollTop") as string));
    requestAnimationFrame(refreshScrollTop);
  }, []);

  // get scrollTop
  useEffect(() => {
    refreshScrollTop();
  }, [refreshScrollTop]);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  // control stickyRef translateX
  useEffect(() => {
    if (stickyMiddleRef.current && scrollRef.current) {
      stickyMiddleRef.current.style.transform = `translateY(-${
        stickyMiddleRef.current.scrollHeight - kilaInnerHeight - scrollTop*0.5 <= 0
          ? 0
          : stickyMiddleRef.current.scrollHeight - kilaInnerHeight - scrollTop*0.5
      }px)`;
    }
  }, [kilaInnerHeight, scrollTop]);

  // control scrollRef height
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      scrollRef.current.style.height =
        String(stickyTopRef.current.scrollHeight) + "px";
    }
  }, [kilaInnerWidth, kilaInnerHeight]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const stickyTopRef = useRef<HTMLDivElement | null>(null);
  const stickyMiddleRef = useRef<HTMLDivElement | null>(null);
  const stickyBottomRef = useRef<HTMLDivElement | null>(null);

  const [shuffledAiyiRems0, setShuffledAiyiRems0] = useState(aiyiRems);
  const [shuffledAiyiRems1, setShuffledAiyiRems1] = useState(aiyiRems);
  const [shuffledAiyiRems2, setShuffledAiyiRems2] = useState(aiyiRems);
  useEffect(() => {
    setShuffledAiyiRems0([...aiyiRems].sort(() => Math.random() - 0.5));
    setShuffledAiyiRems1([...aiyiRems].sort(() => Math.random() - 0.5));
    setShuffledAiyiRems2([...aiyiRems].sort(() => Math.random() - 0.5));
  }, [aiyiRems]);
  //   const shuffledAiyiRems1 = [...aiyiRems].sort(() => Math.random() - 0.5);
  //   const shuffledAiyiRems2 = [...aiyiRems].sort(() => Math.random() - 0.5);

  return (
    <div className="w-full min-h-screen relative bg-[#91bef0] flex" ref={scrollRef}>
      <div
        className=" sticky w-[calc(100vw/3)] top-0 flex flex-col h-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
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
        className=" sticky w-[calc(100vw/3)] top-0 flex flex-col h-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
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
        className=" sticky w-[calc(100vw/3)] top-0 flex flex-col h-auto transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
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
