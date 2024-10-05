"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useWindow from "@/app/hooks/useWindow";
import getImageSizeByUrl from "@/app/utils/getImageSizeByUrl";
export default function Page() {
  const [graffitis, setGraffitis] = useState<
    Array<{ width: number; height: number; url: string }>
  >([]);

  async function getResult(url: string) {
    let result = await getImageSizeByUrl(url);
    setGraffitis((g) => {
      return [...g, { width: result.width, height: result.height, url }];
    });
  }

  const firstRender = useRef(true);
  const [sizeGotten, setSizeGotton] = useState(false);
  useEffect(() => {
    if (!firstRender.current) {
      return;
    }
    const arr = [];
    for (let i = 0; i < 8; i += 2) {
      arr.push(getResult("/graffiti/v" + String(i) + ".webp"));
    }
    for (let i = 0; i < 7; i += 2) {
      arr.push(getResult("/graffiti/h" + String(i) + ".webp"));
    }
    for (let i = 1; i < 8; i += 2) {
      arr.push(getResult("/graffiti/v" + String(i) + ".webp"));
    }
    for (let i = 1; i < 7; i += 2) {
      arr.push(getResult("/graffiti/h" + String(i) + ".webp"));
    }
    Promise.all(arr).then(() => {
      setSizeGotton(true);
    });
    firstRender.current = false;
    return () => {
      setGraffitis([]);
    };
  }, []);

  const [scrollTop, setScrollTop] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  // control stickyRef translateX
  useEffect(() => {
    if (stickyTopRef.current && stickyRef.current) {
      stickyTopRef.current.style.transform = `translateX(-${
        scrollTop >= stickyTopRef.current.scrollWidth - kilaInnerWidth
          ? stickyTopRef.current.scrollWidth - kilaInnerWidth
          : scrollTop
      }px)`;
    }
  }, [kilaInnerWidth, scrollTop]);

  // control stickyRef height
  useEffect(() => {
    if (sizeGotten && stickyTopRef.current && stickyRef.current) {
      stickyRef.current.style.height =
        String(
          stickyTopRef.current.scrollWidth - kilaInnerWidth + kilaInnerHeight
        ) + "px";
    }
  }, [kilaInnerWidth, kilaInnerHeight, sizeGotten]);

  const stickyRef = useRef<HTMLDivElement | null>(null);
  const stickyTopRef = useRef<HTMLDivElement | null>(null);

  const [showMask, setShowMask] = useState(false);
  const [selectedGraffiti, setSelectedGraffiti] = useState("");

  return (
    <div
      className="w-screen h-screen overflow-x-hidden overflow-y-scroll no-scrollbar"
      ref={scrollRef}
      onScroll={() => {
        if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop);
      }}
    >
      <div
        className="w-full min-h-screen relative bg-graffiti bg-cover bg-center bg-fixed"
        ref={stickyRef}
      >
        <div
          className=" sticky h-[100vh] left-0 top-0 flex w-fit transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)] duration-100 "
          ref={stickyTopRef}
        >
          {graffitis.map((graffiti) => (
            <div
              className="relative"
              key={graffiti.url}
              style={{
                width:
                  (graffiti.width / graffiti.height) * (kilaInnerHeight - 200) +
                  200 +
                  "px",
                height: kilaInnerHeight + "px",
              }}
            >
              <Image
                src={graffiti.url}
                width={
                  (graffiti.width / graffiti.height) * (kilaInnerHeight - 200)
                }
                height={kilaInnerHeight - 200}
                className="absolute top-[100px] left-[100px]"
                alt="graffiti"
                onClick={() => {
                  setShowMask(!showMask);
                  setSelectedGraffiti(graffiti.url);
                }}
              ></Image>
            </div>
          ))}
        </div>
        {showMask && (
          <div
            className="bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 w-screen h-screen z-[21] flex justify-center items-center"
            onClick={() => setShowMask(false)}
          >
            <Image
              src={selectedGraffiti}
              alt="selectedGraffiti"
              width={1000}
              height={1000}
              className="max-w-[80vw] max-h-[80vh] object-contain"
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
}
