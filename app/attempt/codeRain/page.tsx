"use client";

import { useEffect, useState } from "react";
import CodeString from "./components/CodeString";

const CodeRainPage: React.FC = () => {
  const [codes, setCodes] = useState<
    { x: number; y: number; animationDuration: number; key: number }[]
  >([]);
  useEffect(() => {
    let interval = setInterval(() => {
      const randomKey = Math.random();
      const animationDuration = Math.random() * 10 + 15;
      setCodes((v) => [
        ...v,
        {
          x: Math.random() * 100,
          y: Math.random() * 100 - 100,
          animationDuration,
          key: randomKey,
        },
      ]);
      setTimeout(() => {
        setCodes((v) => v.filter((vv) => vv.key != randomKey));
      }, (animationDuration - 0.1) * 1000);
    }, 700);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative flex justify-center items-center bg-[black] text-white border-b-2 border-white border-solid">
      {codes.map((code) => (
        <CodeString
          x={code.x}
          y={code.y}
          animationDuration={code.animationDuration}
          key={code.key}
        ></CodeString>
      ))}
      <h1 className="text-[10vmax]">Code Rain</h1>
    </div>
  );
};

export default CodeRainPage;
