"use client";
import SwayLeaf from "@/app/components/SwayLeaf";
import { useEffect, useMemo, useState } from "react";

const SwayLeafPage: React.FC = () => {
  // useMemo会计算两次得到不一样结果导致水合失败，于是服务端和客户端的值的是不一样的，计算也会出问题
  // const leafArrays: {
  //   bg: string;
  //   scale: number;
  //   y: number;
  //   key: string;
  // }[] = useMemo(
  //   () =>
  //     Array(10)
  //       .fill(0)
  //       .map((v, i) => ({
  //         bg: "#91bef022",
  //         scale: Math.random() * 5 + 8,
  //         y: Math.random() * 400 - 200,
  //         key: String(i) + Math.random(),
  //       })),
  //   []
  // );

  // useEffect方法
  const [leafArrays, setLeafArrays] = useState<
    {
      bg: string;
      scale: number;
      y: number;
      key: string;
    }[]
  >();
  useEffect(() => {
    const leafs = [];
    for (let i = 0; i < 100; i++) {
      leafs.push({
        bg: "#91bef022",
        scale: Math.random() * 5 + 8,
        y: Math.random() * 400 - 200,
        key: String(i) + Math.random(),
      });
    }
    setLeafArrays(leafs);
  }, []);
  return (
    <div className="w-full h-screen p-10 flex justify-around items-center flex-wrap gap-10 overflow-hidden">
      {leafArrays &&
        leafArrays.map((leaf) => (
          <SwayLeaf
            hoverAreaScale={leaf.scale}
            hoverAreaBackgroundColor={leaf.bg}
            style={{ transform: `translateY(${leaf.y}px)` }}
            key={leaf.key}
          ></SwayLeaf>
        ))}
    </div>
  );
};

export default SwayLeafPage;
