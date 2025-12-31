"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function TimerPage() {
  const YEAR_2000 = useMemo(() => new Date("2000-01-01"), []);
  const [displayTime, setDisplayTime] = useState("00:00.000");
  const [startTime, setStartTime] = useState(0);
  const [passedTimeWhenStop, setPassedTimeWhenStop] = useState(0);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [currentAnimationFrameId, setCurrentAnimationFrameId] = useState<number | null>(null);

  const renderloop = useCallback(() => {
    if (started) {
      if (running) {
        const passTime = new Date().getTime() - startTime;
        const newDisplayTime = new Date(YEAR_2000.getTime() + passTime).toISOString().slice(11, -1);
        if (newDisplayTime.slice(0, 2) === '00') {
          setDisplayTime(newDisplayTime.slice(3));
        } else {
          setDisplayTime(newDisplayTime);
        }
      }
    }
    setCurrentAnimationFrameId(requestAnimationFrame(renderloop));
  }, [started, running, startTime, YEAR_2000]);

  const handleStart = useCallback(() => {
    if (!started) {
      setStarted(true);
      setRunning(true);
      setStartTime(new Date().getTime());
    }
  }, [started]);

  const handleStop = useCallback(() => {
    if (started) {
      if (passedTimeWhenStop === 0) {
        setPassedTimeWhenStop(new Date().getTime() - startTime);
        setRunning(false);
      } else {
        setStartTime(new Date().getTime() - passedTimeWhenStop);
        setPassedTimeWhenStop(0);
        setRunning(true);
      }
    }
  }, [started, passedTimeWhenStop, startTime]);

  const handleClear = useCallback(() => {
    setStarted(false);
    setRunning(false);
    setStartTime(0);
    setPassedTimeWhenStop(0);
    setDisplayTime('00:00.000');
  }, []);

  useEffect(() => {
    if (started && running) {
      renderloop();
    }
  }, [started, running, renderloop]);

  useEffect(() => {
    if (running && started) {
    } else {
      if (currentAnimationFrameId) {
        cancelAnimationFrame(currentAnimationFrameId);
      }
    }
  }, [running, started, currentAnimationFrameId]);

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center">
      <div className="text-4xl font-bold">{displayTime}</div>
      <button className="text-2xl font-bold" onClick={handleStart}>start</button>
      <button className="text-2xl font-bold" onClick={handleStop}>{started ? running ? "stop" : "continue" : "stop"}</button>
      <button className="text-2xl font-bold" onClick={handleClear}>clear</button>
    </div>
  );
}
