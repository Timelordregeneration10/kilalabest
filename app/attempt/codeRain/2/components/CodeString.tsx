"use client";

import useWindow from "@/app/hooks/useWindow";
import { useEffect, useState } from "react";

interface CodeStringProps {
  x: number;
  animationDuration: number;
  pattern: "Japanese" | "Code";
}

const getJapaneseChar = () =>
  Math.round(Math.random() * (12543 - 12352) + 12352);

const getCodeChar = () => Math.round(Math.random() * (126 - 33) + 33);

const CodeString: React.FC<CodeStringProps> = ({
  x,
  pattern,
  animationDuration,
}) => {
  const [string, setString] = useState("RMTYYDS!!!");
  const { height } = useWindow();
  useEffect(() => {
    if (height === 0) return;
    const letterCount = Math.round(height / 20);
    let eof = false;
    // 提前判断防止每次loop判断
    if (pattern === "Japanese") {
      setString(
        String.fromCharCode(
          ...Array(letterCount)
            .fill(0)
            .map(() => getJapaneseChar())
        )
      );
    } else if (pattern === "Code") {
      const Cloop = () => {
        setString(
          String.fromCharCode(
            ...Array(letterCount)
              .fill(0)
              .map(() => getCodeChar())
          )
        );
        if (eof) return;
        requestAnimationFrame(Cloop);
      };
      Cloop();
    }
    return () => {
      eof = true;
    };
  }, [height]);
  return (
    <div
      className="absolute top-0 h-full text-lg flex flex-col justify-around animate-codeFalling2"
      style={{
        left: x + "vw",
        animationDuration: animationDuration + "s",
        fontWeight: pattern === "Code" ? "normal" : "bolder",
      }}
    >
      {Array(Math.round(height / 20))
        .fill(0)
        .map((value, index) => (
          <span key={index}>{string[index]}</span>
        ))}
    </div>
  );
};

export default CodeString;
