"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
// import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
import { stickyScrollContext } from "../providers/stickyProvider";
export default function Page() {
  // const aiyiRems = IaiyiRems;

  const aiyiRems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push("/aiyiRemPublic/" + String(i + 1) + ".webp");
    }
    return temp;
  }, []);

  const { scrollTop } = useContext(stickyScrollContext);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  // control stickyRef translateX
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      stickyTopRef.current.style.transform = `translateY(-${
        scrollTop >= stickyTopRef.current.scrollHeight - kilaInnerHeight
          ? stickyTopRef.current.scrollHeight - kilaInnerHeight
          : scrollTop
      }px)`;
    }
    if (stickyMiddleRef.current && scrollRef.current) {
      stickyMiddleRef.current.style.transform = `translateY(-${
        stickyMiddleRef.current.scrollHeight - kilaInnerHeight - scrollTop <= 0
          ? 0
          : stickyMiddleRef.current.scrollHeight - kilaInnerHeight - scrollTop
      }px)`;
    }
    if (stickyBottomRef.current && scrollRef.current) {
      stickyBottomRef.current.style.transform = `translateY(-${
        scrollTop >= stickyBottomRef.current.scrollHeight - kilaInnerHeight
          ? stickyBottomRef.current.scrollHeight - kilaInnerHeight
          : scrollTop
      }px)`;
    }
  }, [kilaInnerHeight, scrollTop]);

  // control scrollRef height
  useEffect(() => {
    if (
      stickyTopRef.current &&
      scrollRef.current &&
      stickyBottomRef.current &&
      stickyMiddleRef.current
    ) {
      if (scrollTop < stickyTopRef.current.scrollHeight - kilaInnerHeight) {
        scrollRef.current.style.height =
          String(stickyTopRef.current.scrollHeight * 2) + "px";
      } else {
        scrollRef.current.style.height =
          String(stickyTopRef.current.scrollHeight) + "px";
        // maintain scene when scrollRef over
        stickyTopRef.current.style.transform = "";
        stickyMiddleRef.current.style.transform = ""; // 可不加
        stickyBottomRef.current.style.transform = "";
      }
    }
  }, [kilaInnerWidth, kilaInnerHeight, scrollTop]);

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
    <div
      className="w-full min-h-screen relative bg-[#91bef0] flex "
      ref={scrollRef}
    >
      <div
        className=" sticky w-[calc(100vw/3)] top-0 flex flex-col h-fit transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 "
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
        className=" sticky w-[calc(100vw/3)] top-0 flex flex-col h-fit transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 "
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
        className=" sticky w-[calc(100vw/3)] top-0 flex flex-col h-fit transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 "
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
