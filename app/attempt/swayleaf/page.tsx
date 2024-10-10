"use client";
import SwayLeaf from "@/app/components/SwayLeaf";
import { useMemo } from "react";

const SwayLeafPage: React.FC = () => {
  const leafArrays = useMemo(() => {
    const leafs = [];
    for (let i = 0; i < 10; i++) {
      leafs.push({
        bg: "#91bef022",
        scale: Math.random() * 5 + 8,
        y: Math.random() * 400 - 200,
        key: Math.random(),
      });
    }
    return leafs;
  }, []);
  return (
    <div className="w-full h-screen p-10 flex justify-around items-center">
      {leafArrays.map((leaf) => (
        <SwayLeaf
          hoverAreaScale={leaf.scale}
          hoverAreaBackgroundColor={leaf.bg}
          style={{ transform: `translateY(${leaf.y}px)` }}
          key={leaf.key}
          overlapped={true}
        ></SwayLeaf>
      ))}
    </div>
  );
};

export default SwayLeafPage;
