"use client";

import useWindow from "@/app/hooks/useWindow";
import { kilalaContext } from "@/app/providers/kilalayout";
import { useContext } from "react";

export default function ScrollToRMTscene() {
  const { controlScrollTop } = useContext(kilalaContext);
  const { height } = useWindow();
  return (
    <div
      className="absolute left-[49vw] bottom-[5vh] sm:bottom-[7vh] lg:bottom-[10vh]"
      onClick={() => {
        controlScrollTop(height);
      }}
    >
      <svg
        className="w-[30px] h-[30px]"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4341"
        width="200"
        height="200"
      >
        <path
          d="M512 170.666667a213.333333 213.333333 0 0 0-213.333333 213.333333v256a213.333333 213.333333 0 0 0 426.666666 0V384a213.333333 213.333333 0 0 0-213.333333-213.333333z m0-85.333334a298.666667 298.666667 0 0 1 298.666667 298.666667v256a298.666667 298.666667 0 0 1-597.333334 0V384a298.666667 298.666667 0 0 1 298.666667-298.666667z"
          fill="#ffffff"
          p-id="4342"
        ></path>
        <path
          d="M469.333333 256h85.333334v170.666667h-85.333334z"
          fill="#ffffff"
          p-id="4343"
        ></path>
      </svg>
      <div className="text-white font-bold mt-2 w-[30px] h-[30px] overflow-hidden">
        <div className=" animate-scrollcycle">↓</div>
      </div>
    </div>
  );
}
