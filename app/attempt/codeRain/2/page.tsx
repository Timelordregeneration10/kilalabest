"use client";

import { useEffect, useState } from "react";
import CodeString from "./components/CodeString";

const CodeRain2Page: React.FC = () => {
  const [codes, setCodes] = useState<
    { x: number; animationDuration: number; key: number }[]
  >([]);
  const [pattern, setPattern] = useState<"Japanese" | "Code">("Code");
  useEffect(() => {
    let interval = setInterval(
      () => {
        const randomKey = Math.random();
        const animationDuration =
          Math.random() * 0.5 + pattern === "Japanese" ? 1.5 : 3.5;
        setCodes((v) => [
          ...v,
          {
            x: Math.random() * 100,
            animationDuration,
            key: randomKey,
          },
        ]);
        setTimeout(() => {
          setCodes((v) => v.filter((vv) => vv.key != randomKey));
        }, (animationDuration - 0.1) * 1000);
      },
      pattern === "Japanese" ? 300 : 700
    );
    return () => {
      clearInterval(interval);
    };
  }, [pattern]);

  return (
    <div className="w-full h-screen overflow-hidden relative flex flex-col justify-center items-center bg-[black] text-white border-b-2 border-white border-solid">
      {codes.map((code) => (
        <CodeString
          x={code.x}
          animationDuration={code.animationDuration}
          pattern={pattern}
          key={code.key}
        ></CodeString>
      ))}
      <h1 className="text-[8vmax]">Code Rain 2</h1>
      <p
        className=" cursor-pointer text-[2vmax] animate-pulse"
        onClick={() =>
          setPattern((p) => (p === "Japanese" ? "Code" : "Japanese"))
        }
      >
        Click to change pattern
      </p>
    </div>
  );
};

export default CodeRain2Page;
