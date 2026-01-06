"use client";
import useWindow from "@/app/hooks/useWindow";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function TimerPage() {
  const { width: currentWidth, height: currentHeight } = useWindow();

  /** basic_logic_start */
  const YEAR_2000 = useMemo(() => new Date("2000-01-01"), []);
  const [displayTime, setDisplayTime] = useState("00:00.000");
  const [startTime, setStartTime] = useState(0);
  const [passedTimeWhenStop, setPassedTimeWhenStop] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentAnimationFrameId, setCurrentAnimationFrameId] = useState<
    number | null
  >(null);

  const renderloop = useCallback(() => {
    if (running) {
      const passTime = new Date().getTime() - startTime;
      const newDisplayTime = new Date(YEAR_2000.getTime() + passTime)
        .toISOString()
        .slice(11, -1);
      if (newDisplayTime.slice(0, 2) === "00") {
        setDisplayTime(newDisplayTime.slice(3));
      } else {
        setDisplayTime(newDisplayTime);
      }
    }
    setCurrentAnimationFrameId(requestAnimationFrame(renderloop));
  }, [running, startTime, YEAR_2000]);

  const handleStartStop = useCallback(() => {
    // 初始情况，开始计时
    if (!running && passedTimeWhenStop === 0) {
      setRunning(true);
      setStartTime(new Date().getTime());
    }
    // 计时中，暂停或继续
    else {
      if (passedTimeWhenStop === 0) {
        setPassedTimeWhenStop(new Date().getTime() - startTime);
        setRunning(false);
      } else {
        setStartTime(new Date().getTime() - passedTimeWhenStop);
        setPassedTimeWhenStop(0);
        setRunning(true);
      }
    }
  }, [running, passedTimeWhenStop, startTime]);

  const handleClear = useCallback(() => {
    setRunning(false);
    setStartTime(0);
    setPassedTimeWhenStop(0);
    setDisplayTime("00:00.000");
  }, []);

  useEffect(() => {
    if (running) {
      renderloop();
    }
  }, [running, renderloop]);

  useEffect(() => {
    if (running) {
    } else {
      if (currentAnimationFrameId) {
        cancelAnimationFrame(currentAnimationFrameId);
      }
    }
  }, [running, currentAnimationFrameId]);
  /** basic_logic_end */

  /** mobile_logic_start */
  const DOUBLE_CLICK_TIME = useMemo(() => 200, []);
  const [singleClickTimeout, setSingleClickTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const handleMobileClick = useCallback(() => {
    // 双击
    if (singleClickTimeout) {
      clearTimeout(singleClickTimeout);
      setSingleClickTimeout(null);
      handleClear();
    }
    // 单击
    else {
      setSingleClickTimeout(
        setTimeout(() => {
          handleStartStop();
          if (singleClickTimeout) {
            clearTimeout(singleClickTimeout);
          }
          setSingleClickTimeout(null);
        }, DOUBLE_CLICK_TIME)
      );
    }
  }, [singleClickTimeout, handleStartStop, handleClear, DOUBLE_CLICK_TIME]);
  /** mobile_logic_end */

  /** pc_logic_start */
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);

  const handlePCClick = useCallback(() => {
    if (mousePosition.x > currentWidth / 2) {
      handleClear();
    } else {
      handleStartStop();
    }
  }, [mousePosition.x, currentWidth, handleStartStop, handleClear]);

  const handlePCContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    handleClear();
  }, [handleClear]);

  useEffect(() => {
    const handleSpaceEntered = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        handleStartStop();
      }
    };
    window.addEventListener("keydown", handleSpaceEntered);
    return () => {
      window.removeEventListener("keydown", handleSpaceEntered);
    };
  }, [handleStartStop]);
  /** pc_logic_end */

  return (
    <div className="w-screen h-screen relative bg-black cursor-none">
      {currentWidth < 640 ? (
        <div
          className="w-full h-full flex flex-col justify-center items-center"
          onClick={handleMobileClick}
        >
          <div className="text-[15vw] text-white">{displayTime}</div>
        </div>
      ) : (
        // @ts-ignore
        <div className="w-full h-full flex flex-col justify-center items-center relative" onClick={handlePCClick} onContextMenu={handlePCContextMenu}>
          <div className="text-[15vw] w-fit relative">
            <div
              className="text-[violet] transition-transform ease-[cubic-bezier(0.9,1,1,1)] duration-300"
              style={{
                transform: `translate(${
                  (mousePosition.x - currentWidth / 2) / 4
                }px, ${(mousePosition.y - currentHeight / 2) / 4}px)`,
              }}
            >
              {displayTime}
            </div>
            <div
              className="absolute top-0 left-0 text-[#91bef0] transition-transform ease-[cubic-bezier(0.6,1,1,1)] duration-300"
              style={{
                transform: `translate(${
                  (mousePosition.x - currentWidth / 2) / 4
                }px, ${(mousePosition.y - currentHeight / 2) / 4}px)`,
              }}
            >
              {displayTime}
            </div>
            <div
              className="absolute top-0 left-0 text-white transition-transform ease-[cubic-bezier(0.33,1,1,1)] duration-300"
              style={{
                transform: `translate(${
                  (mousePosition.x - currentWidth / 2) / 4
                }px, ${(mousePosition.y - currentHeight / 2) / 4}px)`,
              }}
            >
              {!running && passedTimeWhenStop === 0 ? (
                <div className="absolute top-0 left-0 text-white">
                  {displayTime}
                </div>
              ) : (
                <>
                  <div className="relative text-white">{displayTime}</div>
                  <div
                    className="absolute top-0 left-0 text-[#c2ff61] [clip-path:circle(0%)] animate-timerFront"
                    style={{
                      animationPlayState: running ? "running" : "paused",
                    }}
                  >
                    {displayTime}
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className="fixed z-[19] -top-8 -left-8 w-16 h-16 flex justify-center items-center text-xl bg-white rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,1.25,0.25,1.25)] mix-blend-difference"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            {mousePosition.x > currentWidth / 2
              ? "clear"
              : running
              ? "stop"
              : "start"}
          </div>
          {/* 太卡了，放弃 */}
          {/* <div className="absolute z-[19] top-0 left-0 w-full h-full bg-white cursor-pointer flex justify-center items-center mix-blend-difference duration-500 transition-[clip-path] ease-[cubic-bezier(0.25,1.25,0.25,1.25)]" style={{ clipPath: `circle(40px at ${mousePosition.x}px ${mousePosition.y}px)` }}>
            <div className="w-1/2 h-full [line-break:anywhere] overflow-hidden" onClick={handleStartStop}>{Array.from({length: 1000}).map(()=>(running?"stop":"start")).join(" ")}</div>
            <div className="w-1/2 h-full [line-break:anywhere] overflow-hidden" onClick={handleClear}>{Array.from({length: 1000}).map(()=>"clear").join(" ")}</div>
          </div> */}
        </div>
      )}
    </div>
  );
}
