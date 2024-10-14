"use client";
import SwayLeaf from "@/app/components/SwayLeaf";
import { useEffect, useMemo, useState } from "react";
import RemCursor0 from "@/app/assets/rmt/RemCursors/0.gif";
import RemCursor1 from "@/app/assets/rmt/RemCursors/1.gif";
import RemCursor2 from "@/app/assets/rmt/RemCursors/2.gif";
import RemCursor3 from "@/app/assets/rmt/RemCursors/3.gif";
import RemCursor4 from "@/app/assets/rmt/RemCursors/4.gif";
import RemCursor5 from "@/app/assets/rmt/RemCursors/5.gif";
import RemCursor6 from "@/app/assets/rmt/RemCursors/6.gif";
import RemCursor7 from "@/app/assets/rmt/RemCursors/7.gif";
import RemCursor8 from "@/app/assets/rmt/RemCursors/8.gif";
import RemCursor9 from "@/app/assets/rmt/RemCursors/9.gif";
import RemCursor10 from "@/app/assets/rmt/RemCursors/10.gif";
import { StaticImageData } from "next/image";

const RemCursors = [
  RemCursor0,
  RemCursor1,
  RemCursor2,
  RemCursor3,
  RemCursor4,
  RemCursor5,
  RemCursor6,
  RemCursor7,
  RemCursor8,
  RemCursor9,
  RemCursor10,
];

const RemAreaPage: React.FC = () => {
  const [RemArrays, setRemArrays] = useState<
    {
      src: StaticImageData;
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
