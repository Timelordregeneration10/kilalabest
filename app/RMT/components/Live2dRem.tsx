"use client";
import useWindow from "@/app/hooks/useWindow";
import Script from "next/script";
import { useEffect, useState } from "react";

interface Window {
  loadlive2d: (canvasId: string, modelPath: string) => void;
}

const Live2dRem: React.FC = () => {
  const { width } = useWindow();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (width === 0) return;
    setIsMobile(width < 640);
  }, [width]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const checkLive2dLoaded = () => {
      if (typeof window === "object") {
        const myWindow = window as unknown as Window;
        if (myWindow.loadlive2d) {
          if (isMobile) {
            myWindow.loadlive2d(
              "live2d1",
              "https://timelordregeneration10.github.io/live2d/model/remGenuine/model.json"
            );
          } else if (!isMobile) {
            myWindow.loadlive2d(
              "live2d2",
              "https://timelordregeneration10.github.io/live2d/model/remGenuine/model.json"
            );
          }
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }
    };
    intervalId = setInterval(checkLive2dLoaded, 200);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isMobile]);
  return (
    <>
      <canvas
        id="live2d1"
        width="100"
        height="200"
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 98,
          display: !isMobile ? "none" : "block",
        }}
      ></canvas>
      <canvas
        id="live2d2"
        width="300"
        height="600"
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 98,
          display: isMobile ? "none" : "block",
        }}
      ></canvas>
      <Script src="https://timelordregeneration10.github.io/live2d/attempt/cubism2/compressed/lib/live2d.js" />
    </>
  );
};

export default Live2dRem;
