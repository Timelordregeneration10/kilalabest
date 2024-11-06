"use client";

import { useEffect, useRef, useState } from "react";

const CamouflagePage: React.FC = () => {
  const [clickPoints, setClickPoints] = useState<
    { x: number; y: number; key: number; baseZIndex: number }[]
  >([]);
  const [count, setCount] = useState(0);
  const clickRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (clickRef.current) {
      const handleAddRipple = (e: MouseEvent) => {
        const key = Math.random();
        console.log(1);
        setClickPoints((v) => [
          ...v,
          {
            x:
              e.offsetX -
              (clickRef.current ? clickRef.current.offsetWidth / 2 : 0),
            y:
              e.offsetY -
              (clickRef.current ? clickRef.current.offsetHeight / 2 : 0),
            key,
            baseZIndex: count * 6,
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
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="w-[50vh] h-[50vh] relative overflow-hidden">
        <div
          ref={clickRef}
          className="absolute top-0 left-0 w-full h-full bg-[length:_100%] bg-center bg-fixed bg-[url('/aiyiRemPublic/7.webp')]"
        ></div>
        {clickPoints.map((clickPoint) => (
          <div
            className="w-full h-full absolute top-0 left-0 pointer-events-none"
            key={clickPoint.key}
          >
            {Array(6)
              .fill(0)
              .map((v, i) => i + 2 + clickPoint.baseZIndex)
              .map((zIndex) => (
                <div
                  key={zIndex}
                  className="absolute rounded-full w-full h-full bg-center bg-fixed animate-ripple bg-[url('/aiyiRemPublic/7.webp')]"
                  style={{
                    zIndex,
                    backgroundSize:
                      100 +
                      ((zIndex - clickPoint.baseZIndex) % 2 === 0
                        ? 8 - (zIndex - clickPoint.baseZIndex)
                        : (7 - (zIndex - clickPoint.baseZIndex)) / 2) *
                        2 +
                      "%",
                    top: clickPoint.y + "px",
                    left: clickPoint.x + "px",
                    animationDelay:
                      (zIndex - clickPoint.baseZIndex - 2) / 20 + "s",
                  }}
                ></div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamouflagePage;
