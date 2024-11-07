"use client";

import { useEffect, useRef, useState } from "react";

const RippleAttemptPage: React.FC = () => {
  const [clickPoints, setClickPoints] = useState<
    { x: number; y: number; key: number; baseZIndex: number }[]
  >([]);
  const [count, setCount] = useState(0);
  const clickRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (clickRef.current) {
      const handleAddRipple = (e: MouseEvent) => {
        const key = Math.random();
        setClickPoints((v) => [
          ...v,
          {
            x:
              e.offsetX -
              (clickRef.current ? (clickRef.current.offsetWidth * 0.2) / 2 : 0),
            y:
              e.offsetY -
              (clickRef.current
                ? (clickRef.current.offsetHeight * 0.2) / 2
                : 0),
            key,
            baseZIndex: count + 1,
          },
        ]);
        setCount((v) => v + 1);
        setTimeout(() => {
          setClickPoints((v) => v.filter((vv) => vv.key != key));
        }, 1600);
      };
      clickRef.current.addEventListener("click", handleAddRipple);
      return () => {
        clickRef.current?.removeEventListener("click", handleAddRipple);
      };
    }
  }, [count]);
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* width and height should be same and divide-friendly */}
      <div className="w-[100vmax] h-[100vmax] relative overflow-hidden">
        <div
          ref={clickRef}
          className="absolute top-0 left-0 w-full h-full pt-60 bg-[length:_100%] bg-center bg-fixed bg-[url('/aiyiRemPublic/7.webp')]"
        >
          <a href="https://segmentfault.com/a/1190000019132065" target="_blank">
            原文链接
          </a>
        </div>
        {clickPoints.map((clickPoint) => (
          <div
            className=" w-[20%] h-[20%] absolute pointer-events-none "
            key={clickPoint.key}
            style={{
              zIndex: clickPoint.baseZIndex,
              top: clickPoint.y + "px",
              left: clickPoint.x + "px",
            }}
          >
            {Array(6)
              .fill(0)
              .map((v, i) => i + 2)
              .map((zIndex) => {
                return (
                  <div
                    key={zIndex}
                    // cnm, 不管是用clippath还是widthheight关键是初始值得是动画初始值，因为动画设置了b的延迟，不设置成动画初值会挡住牛魔的先动画的
                    // className="absolute rounded-full w-0 h-0 top-[50%] left-[50%] bg-center bg-fixed animate-ripple1 bg-[url('/aiyiRemPublic/7.webp')]"
                    className="absolute [clip-path:circle(0%)] top-0 left-0 w-full h-full bg-center bg-fixed animate-ripple2 bg-[url('/aiyiRemPublic/7.webp')]"
                    style={{
                      zIndex,
                      backgroundSize:
                        100 +
                        (zIndex % 2 === 0 ? 8 - zIndex : (7 - zIndex) / 2) * 2 +
                        "%",
                      animationDelay: (zIndex - 2) / 8 + "s",
                    }}
                  ></div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RippleAttemptPage;
