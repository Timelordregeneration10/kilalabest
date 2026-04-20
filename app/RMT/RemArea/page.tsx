"use client";
import SwayLeaf from "@/app/components/SwayLeaf";
import { useEffect, useMemo, useState } from "react";
import { StaticImageData } from "next/image";

const RemCursors = [
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-0.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-1.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-2.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-3.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-4.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-5.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-6.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-7.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-8.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-9.gif",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-rmt-RemCursors-10.gif",
];

const RemAreaPage: React.FC = () => {
  const [RemArrays, setRemArrays] = useState<
    {
      src: string;
      scale: number;
      y: number;
      key: string;
    }[]
  >();
  useEffect(() => {
    const Rems = [];
    for (let i = 0; i < 100; i++) {
      Rems.push({
        src: RemCursors[Math.floor(Math.random() * RemCursors.length)],
        scale: Math.random() * 5 + 8,
        y: Math.random() * 400 - 200,
        key: String(i) + Math.random(),
      });
    }
    setRemArrays(Rems);
    return () => setRemArrays(undefined);
  }, []);
  return (
    <div className="w-full h-screen p-10 flex justify-around items-center flex-wrap gap-10 overflow-hidden">
      {RemArrays &&
        RemArrays.map((Rem) => (
          <SwayLeaf
            src={Rem.src}
            hoverAreaScale={Rem.scale}
            style={{ transform: `translateY(${Rem.y}px)` }}
            key={Rem.key}
            height={50}
            width={50}
          ></SwayLeaf>
        ))}
    </div>
  );
};

export default RemAreaPage;
