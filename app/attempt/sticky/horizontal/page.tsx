"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
// import IaiyiRems from "@/app/constants/aiyiRem";
import useWindow from "@/app/hooks/useWindow";
import useScroll from "@/app/hooks/useScroll";
export default function Page() {
  // const aiyiRems = IaiyiRems;

  const aiyiRems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push("/aiyiRemPublic/" + String(i + 1) + ".webp");
    }
    return temp;
  }, []);

  const { scrollTop } = useScroll();

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  // control stickyRef translateX
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      stickyTopRef.current.style.transform = `translateX(-${
        scrollTop >= stickyTopRef.current.scrollWidth - kilaInnerWidth
          ? stickyTopRef.current.scrollWidth - kilaInnerWidth
          : scrollTop
      }px)`;
    }
    if (stickyMiddleRef.current && scrollRef.current) {
      stickyMiddleRef.current.style.transform = `translateX(-${
        stickyMiddleRef.current.scrollWidth - kilaInnerWidth - scrollTop <= 0
          ? 0
          : stickyMiddleRef.current.scrollWidth - kilaInnerWidth - scrollTop
      }px)`;
    }
    if (stickyBottomRef.current && scrollRef.current) {
      stickyBottomRef.current.style.transform = `translateX(-${
        scrollTop >= stickyBottomRef.current.scrollWidth - kilaInnerWidth
          ? stickyBottomRef.current.scrollWidth - kilaInnerWidth
          : scrollTop
      }px)`;
    }
  }, [kilaInnerWidth, scrollTop]);

  // control scrollRef height
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      scrollRef.current.style.height =
        String(
          stickyTopRef.current.scrollWidth - kilaInnerWidth + kilaInnerHeight
        ) + "px";
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
    <div className="w-full min-h-screen relative bg-[#91bef0] " ref={scrollRef}>
      <div
        className=" sticky h-[calc(100vh/3)] left-0 top-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 "
        ref={stickyTopRef}
      >
        {shuffledAiyiRems0.map((aiyiRem: string, index: number) => (
          <div className=" aspect-[9/16] h-full" key={aiyiRem + index}>
            <Image
              src={aiyiRem}
              width={200}
              height={300}
              className="w-full h-full object-cover"
              alt="aiyiRem"
            ></Image>
          </div>
        ))}
      </div>
      <div
        className=" sticky h-[calc(100vh/3)] top-[calc(100vh/3)] left-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 "
        ref={stickyMiddleRef}
      >
        {shuffledAiyiRems1.map((aiyiRem: string, index: number) => (
          <div className=" aspect-[9/16] h-full" key={aiyiRem + index}>
            <Image
              src={aiyiRem}
              width={200}
              height={300}
              className="w-full h-full object-cover"
              alt="aiyiRem"
            ></Image>
          </div>
        ))}
      </div>
      <div
        className=" sticky h-[calc(100vh/3)] left-0 top-[calc(200vh/3)] flex w-auto transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 "
        ref={stickyBottomRef}
      >
        {shuffledAiyiRems2.map((aiyiRem: string, index: number) => (
          <div className=" aspect-[9/16] h-full" key={aiyiRem + index}>
            <Image
              src={aiyiRem}
              width={200}
              height={300}
              className="w-full h-full object-cover"
              alt="aiyiRem"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
}
