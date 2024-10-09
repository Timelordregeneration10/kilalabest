"use client";
import Image, { StaticImageData } from "next/image";
import heartPNG from "@/app/assets/heart.png";
import { CSSProperties, MouseEvent, useMemo, useRef, useState } from "react";
import { throttle } from "lodash";
import useScroll from "@/app/hooks/useScroll";
import useWindow from "@/app/hooks/useWindow";

interface SwayLeafProps {
  width?: number;
  height?: number;
  src?: StaticImageData | string;
  hoverAreaScale?: number;
  hoverAreaBackgroundColor?: string;
  style?: CSSProperties;
}

const defaultProps = {
  width: 40,
  height: 40,
  src: heartPNG,
  hoverAreaScale: 5,
  hoverAreaBackgroundColor: "transparent",
};

const SwayLeaf: React.FC<SwayLeafProps> = ({
  width = defaultProps.width,
  height = defaultProps.height,
  src = defaultProps.src,
  hoverAreaScale = defaultProps.hoverAreaScale,
  hoverAreaBackgroundColor = defaultProps.hoverAreaBackgroundColor,
  style,
}) => {
  const [relativePos, setRelativePos] = useState([0, 0]);
  const [swaying, setSwaying] = useState(true);
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);
  const { scrollTop } = useScroll();
  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  const hoverAreaPosition: { top: number; left: number } = useMemo(() => {
    if (hoverAreaRef.current) {
      const { top, left } = hoverAreaRef.current.getBoundingClientRect();
      return { top, left };
    }
    return { top: 0, left: 0 };
  }, [scrollTop, hoverAreaRef.current, kilaInnerHeight, kilaInnerWidth]);

  const handleMouseMove = (e: MouseEvent) => {
    const [offsetX, offsetY] = [
      e.clientX - hoverAreaPosition.left,
      e.clientY - hoverAreaPosition.top,
    ];
    setRelativePos([
      offsetX - (width * hoverAreaScale) / 2,
      offsetY - (height * hoverAreaScale) / 2,
    ]);
  };

  const mouseMoveHandler = throttle(handleMouseMove, 16);

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        width: width + "px",
        height: height + "px",
        minWidth: width + "px",
        minHeight: height + "px",
        maxWidth: width + "px",
        maxHeight: height + "px",
        ...style,
      }}
    >
      {/* hover area */}
      <div
        className="[clip-path:circle()] cursor-pointer "
        ref={hoverAreaRef}
        style={{
          width: hoverAreaScale * 100 + "%",
          height: hoverAreaScale * 100 + "%",
          minWidth: hoverAreaScale * 100 + "%",
          minHeight: hoverAreaScale * 100 + "%",
          maxWidth: hoverAreaScale * 100 + "%",
          maxHeight: hoverAreaScale * 100 + "%",
          backgroundColor: hoverAreaBackgroundColor,
        }}
        onMouseEnter={(e) => {
          setSwaying(false);
        }}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={(e) => {
          mouseMoveHandler.cancel();
          setRelativePos([0, 0]);
          setSwaying(true);
        }}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div
            // className=" transition-transform duration-500 ease-[cubic-bezier(0.25,1.25,0.25,1.25)]"
            style={{
              transform: `translate(${relativePos[0]}px,${relativePos[1]}px)`,
              width: width + "px",
              height: height + "px",
              transition: swaying ? "transform 0.5s" : "none",
            }}
          >
            <Image
              alt="leaf"
              width={width ? width : defaultProps.width}
              height={height ? height : defaultProps.height}
              src={src ? src : defaultProps.src}
              style={{
                animation: swaying ? "cardRotate 6s linear infinite" : "",
              }}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwayLeaf;
