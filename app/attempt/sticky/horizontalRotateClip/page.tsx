"use client";

import { useContext, useEffect, useRef, useMemo } from "react";
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
  const rotateDEG = 20;
  const stickyHeightVH = 50;

  const { scrollTop } = useContext(stickyScrollContext);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  // control stickyRef translateX
  useEffect(() => {
    if (stickyTopRef.current && scrollRef.current) {
      stickyTopRef.current.style.transform = `rotate(${rotateDEG}deg) translateX(-${
        scrollTop >= stickyTopRef.current.scrollWidth - kilaInnerWidth
          ? stickyTopRef.current.scrollWidth - kilaInnerWidth
          : scrollTop
      }px)`;
    }
    if (stickyMiddleRef.current && scrollRef.current) {
      stickyMiddleRef.current.style.transform = `rotate(${rotateDEG}deg) translateX(-${
        stickyMiddleRef.current.scrollWidth - kilaInnerWidth - scrollTop <= 0
          ? 0
          : stickyMiddleRef.current.scrollWidth - kilaInnerWidth - scrollTop
      }px)`;
    }
    if (stickyBottomRef.current && scrollRef.current) {
      stickyBottomRef.current.style.transform = `rotate(${rotateDEG}deg) translateX(-${
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
    <div
      className="w-full min-h-screen relative bg-[#91bef0] [clip-path:_polygon(20%_0%,_0%_20%,_30%_50%,_0%_80%,_20%_100%,_50%_70%,_80%_100%,_100%_80%,_70%_50%,_100%_20%,_80%_0%,_50%_30%)]"
      ref={scrollRef}
    >
      <div
        className={` sticky left-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 `}
        style={{
          top:
            String(
              (100 - stickyHeightVH) / 2 -
                stickyHeightVH / Math.cos((rotateDEG * Math.PI) / 180)
            ) + "vh",
          height: String(stickyHeightVH) + "vh",
        }}
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
        className={` sticky left-0 flex w-auto transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 `}
        style={{
          top: String((100 - stickyHeightVH) / 2) + "vh",
          height: String(stickyHeightVH) + "vh",
        }}
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
        className={` sticky flex w-auto transition-transform ease-[cubic-bezier(0.25,0.75,0.85,1)] duration-400 `}
        style={{
          top:
            String(
              (100 - stickyHeightVH) / 2 +
                stickyHeightVH / Math.cos((rotateDEG * Math.PI) / 180)
            ) + "vh",
          height: String(stickyHeightVH) + "vh",
        }}
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
