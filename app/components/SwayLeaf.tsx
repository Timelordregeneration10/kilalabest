"use client";
import Image, { StaticImageData } from "next/image";
import leafPNG from "@/app/assets/leaf.png";
import {
  CSSProperties,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { throttle } from "lodash";
import useScroll from "@/app/hooks/useScroll";
import useWindow from "@/app/hooks/useWindow";

interface SwayLeafProps {
  width?: number;
  height?: number;
  src?: StaticImageData | string;
  hoverAreaScale?: number;
  hoverAreaBackgroundColor?: string;
  // 是否可以重叠
  overlapped?: boolean;
  style?: CSSProperties;
}

const defaultProps = {
  width: 40,
  height: 40,
  src: leafPNG,
  hoverAreaScale: 5,
  hoverAreaBackgroundColor: "transparent",
  // 默认不可重叠，性能较好
  overlapped: false,
};

const SwayLeaf: React.FC<SwayLeafProps> = ({
  width = defaultProps.width,
  height = defaultProps.height,
  src = defaultProps.src,
  hoverAreaScale = defaultProps.hoverAreaScale,
  hoverAreaBackgroundColor = defaultProps.hoverAreaBackgroundColor,
  overlapped = defaultProps.overlapped,
  style,
}) => {
  const [relativePos, setRelativePos] = useState([0, 0]);
  const [swaying, setSwaying] = useState(true);
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);
  const { scrollTop } = useScroll();
  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  const hoverAreaPosition: {
    top: number;
    left: number;
    centerX: number;
    centerY: number;
  } = useMemo(() => {
    if (hoverAreaRef.current) {
      const { top, left, bottom, right } =
        hoverAreaRef.current.getBoundingClientRect();
      const centerX = left + (right - left) / 2;
      const centerY = top + (bottom - top) / 2;
      return { top, left, centerX, centerY };
    }
    return { top: 0, left: 0, centerX: 0, centerY: 0 };
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

  const mouseMoveHandler = throttle(
    overlapped ? () => {} : handleMouseMove,
    16
  );

  useEffect(() => {
    if (overlapped) {
      const dis = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      };
      let ticking = false;
      const mouseMoveHandler = (e: MouseEvent) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // TODO: 椭圆
            if (
              dis(
                e.clientX,
                e.clientY,
                hoverAreaPosition.centerX,
                hoverAreaPosition.centerY
              ) >
              (Math.sqrt(width * height) * hoverAreaScale) / 2
            ) {
              setRelativePos([0, 0]);
              setSwaying(true);
            } else {
              setSwaying(false);
              // @ts-ignore
              handleMouseMove(e);
            }
            ticking = false;
          });
          ticking = true;
        }
      };
      // @ts-ignore
      window.addEventListener("mousemove", mouseMoveHandler);
      return () => {
        window.removeEventListener(
          "mousemove",
          // @ts-ignore
          mouseMoveHandler
        );
      };
    }
  }, [overlapped, hoverAreaPosition]);

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
      {/* leaf div */}
      <div className="flex justify-center items-center w-full h-full absolute">
        <div
          style={{
            transform: `translate(${relativePos[0]}px,${relativePos[1]}px)`,
            width: width + "px",
            height: height + "px",
            transition: "transform 0.5s cubic-bezier(0.25,1.25,0.25,1.25)",
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
          if (overlapped) return;
          setSwaying(false);
        }}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={(e) => {
          if (overlapped) return;
          mouseMoveHandler.cancel();
          setRelativePos([0, 0]);
          setSwaying(true);
        }}
      ></div>
    </div>
  );
};

export default SwayLeaf;
