"use client";

import { loadingContext } from "@/app/providers/loadingVanishLayout";
import { useContext } from "react";

export default function CyberPunkKilala() {
  const { loading } = useContext(loadingContext);
  return (
    <div
      className="absolute top-[30vh] lg:top-[25vh] leading-[33vw] left-[10vw] w-[80vw] h-[50vh] text-[40.4vw] sm:text-[22.4vw] overflow-visible flex justify-center items-center text-transparent bg-anime bg-clip-text bg-contain animate-sanInfinity bg-center "
      style={{ animationPlayState: loading ? "paused" : "running" }}
    >
      雷绮罗姆
    </div>
  );
}
