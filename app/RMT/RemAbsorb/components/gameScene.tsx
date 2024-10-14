"use client";
import SwayLeaf from "@/app/components/SwayLeaf";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RemCursor0 from "@/app/assets/rmt/RemCursors/0.gif";
import RemCursor1 from "@/app/assets/rmt/RemCursors/1.gif";
import RemCursor2 from "@/app/assets/rmt/RemCursors/2.gif";
import RemCursor3 from "@/app/assets/rmt/RemCursors/3.gif";
import RemCursor4 from "@/app/assets/rmt/RemCursors/4.gif";
import RemCursor5 from "@/app/assets/rmt/RemCursors/5.gif";
import RemCursor6 from "@/app/assets/rmt/RemCursors/6.gif";
import RemCursor7 from "@/app/assets/rmt/RemCursors/7.gif";
import RemCursor8 from "@/app/assets/rmt/RemCursors/8.gif";
import RemCursor9 from "@/app/assets/rmt/RemCursors/9.gif";
import RemCursor10 from "@/app/assets/rmt/RemCursors/10.gif";
import taido from "@/app/RMT/RemAbsorb/assets/taido.webp";
import { StaticImageData } from "next/image";

const RemCursors = [
  RemCursor0,
  RemCursor1,
  RemCursor2,
  RemCursor3,
  RemCursor4,
  RemCursor5,
  RemCursor6,
  RemCursor7,
  RemCursor8,
  RemCursor9,
  RemCursor10,
];

const waluyi = [taido];

interface Leaf {
  src: StaticImageData;
  size: number;
  scale: number;
  top: number;
  left: number;
  vanishTime: number;
  score: number;
  backgroundColor: string;
  showWarning: boolean;
  key: number;
}

interface GameSceneProps {
  currentDifficulty: number;
  setGameState: Dispatch<SetStateAction<number>>;
}

interface RemAbsorbSetting {
  generateSpeed: number;
  totalTime: number;
  waluyiPossibility: number;
  warningTime: number;
  waluyiScore: number;
  RemSizeRate: number;
  RemScaleRate: number;
  RemOccurTimeRate: number;
  waluyiSizeRate: number;
  waluyiScaleRate: number;
  waluyiOccurTimeRate: number;
}

const defaultSettings: RemAbsorbSetting = {
  generateSpeed: 1,
  totalTime: 30,
  waluyiPossibility: 0.1,
  warningTime: 1000,
  waluyiScore: -100,
  RemSizeRate: 1,
  RemScaleRate: 1,
  RemOccurTimeRate: 1,
  waluyiSizeRate: 1,
  waluyiScaleRate: 1,
  waluyiOccurTimeRate: 1,
};

const GameScene: React.FC<GameSceneProps> = ({
  currentDifficulty,
  setGameState,
}) => {
  const [leafArrays, setLeafArrays] = useState<Leaf[]>();
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState<RemAbsorbSetting>(defaultSettings);
  const handleChooseDifficulty = (d: number): RemAbsorbSetting => {
    let r: RemAbsorbSetting = defaultSettings;
    switch (d) {
      case 1:
        r = {
          generateSpeed: 5,
          totalTime: 30,
          waluyiPossibility: 0.1,
          warningTime: 1000,
          waluyiScore: -100,
          RemSizeRate: 1,
          RemScaleRate: 1,
          RemOccurTimeRate: 1,
          waluyiSizeRate: 1,
          waluyiScaleRate: 1,
          waluyiOccurTimeRate: 1,
        };
        break;
      case 2:
        r = {
          generateSpeed: 10,
          totalTime: 45,
          waluyiPossibility: 0.2,
          warningTime: 700,
          waluyiScore: -500,
          RemSizeRate: 0.8,
          RemScaleRate: 0.8,
          RemOccurTimeRate: 0.8,
          waluyiSizeRate: 1.5,
          waluyiScaleRate: 1.5,
          waluyiOccurTimeRate: 1.5,
        };
        break;
      case 3:
        r = {
          generateSpeed: 20,
          totalTime: 60,
          waluyiPossibility: 0.3,
          warningTime: 5000,
          waluyiScore: -999,
          RemSizeRate: 0.5,
          RemScaleRate: 0.5,
          RemOccurTimeRate: 0.5,
          waluyiSizeRate: 2,
          waluyiScaleRate: 2,
          waluyiOccurTimeRate: 2,
        };
        break;
    }
    return r;
  };
  const {
    generateSpeed,
    totalTime,
    waluyiPossibility,
    warningTime,
    waluyiScore,
    RemSizeRate,
    RemScaleRate,
    RemOccurTimeRate,
    waluyiSizeRate,
    waluyiScaleRate,
    waluyiOccurTimeRate,
  } = handleChooseDifficulty(currentDifficulty);
  const [restTime, setRestTime] = useState(totalTime);
  const generateInterval = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (generateInterval.current === null) {
      generateInterval.current = setInterval(() => {
        setLeafArrays((v) => {
          let sec = new Date().getTime();
          const showWarning = Math.random() > waluyiPossibility ? false : true;
          const n: Leaf = {
            src: !showWarning
              ? RemCursors[Math.floor(Math.random() * RemCursors.length)]
              : waluyi[Math.floor(Math.random() * waluyi.length)],
            scale: !showWarning
              ? Math.random() * 3 * RemScaleRate + 3
              : Math.random() * 3 * waluyiScaleRate + 3,
            size: !showWarning
              ? Math.random() * 40 * RemSizeRate + 30
              : Math.random() * 40 * waluyiSizeRate + 40,
            top: Math.random() * 100,
            left: Math.random() * 100,
            backgroundColor: !showWarning ? "#91bef022" : "#f96c7d22",
            score: !showWarning ? Math.floor(Math.random() * 80) : waluyiScore,
            showWarning,
            vanishTime: !showWarning
              ? Math.random() * 2000 * RemOccurTimeRate + 2000
              : Math.random() * 5000 * waluyiOccurTimeRate + 3000,
            key: sec,
          };
          if (showWarning) {
            setTimeout(() => {
              setLeafArrays((v) =>
                v
                  ? v.map((vv) => {
                      if (vv.key === sec) {
                        return { ...vv, showWarning: false };
                      } else {
                        return vv;
                      }
                    })
                  : v
              );
            }, warningTime);
          }
          setTimeout(() => {
            setLeafArrays((v) => (v ? v.filter((vv) => vv.key != sec) : v));
          }, n.vanishTime + 1000);
          if (v) return [...v, n];
          else {
            return [n];
          }
        });
      }, 1000 / generateSpeed);
    }
    return () => {
      if (generateInterval.current) {
        clearInterval(generateInterval.current);
        generateInterval.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let i = setInterval(() => {
      setRestTime((t) => {
        if (t <= 0) {
          clearInterval(i);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);

  useEffect(() => {
    if (restTime <= 0) {
      if (generateInterval.current) {
        clearInterval(generateInterval.current);
        generateInterval.current = null;
      }
      setLeafArrays(undefined);
      alert("You get " + score + " !");
      setGameState(0);
    }
  }, [restTime, score]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* current difficulty */}
      <div className="absolute top-20 left-4 text-[3vmax]">
        current difficulty: lv{" "}
        <span className=" text-[4vmax]  text-[#91bef0] ">
          {currentDifficulty}
        </span>
      </div>
      {/* score */}
      <div className="absolute top-20 right-6 text-[3vmax]">
        score:{" "}
        <span className=" text-[6vmax] text-transparent bg-application bg-clip-text bg-contain bg-center ">
          {score}
        </span>
      </div>
      {/* restTime */}
      <div className="absolute bottom-4 left-4 text-[3vmax]">
        restTime:{" "}
        <span className=" text-[4vmax]  text-[#91bef0] ">{restTime}</span>
      </div>
      {/* back */}
      <div
        className="absolute bottom-4 right-4 text-[3vmax] cursor-pointer"
        onClick={() => setGameState(0)}
      >
        back
      </div>
      {/* leafs */}
      {leafArrays &&
        leafArrays.map((leaf) =>
          leaf.showWarning ? (
            // warning
            <div
              className="relative flex justify-center items-center transition-opacity"
              key={leaf.key + "#"}
              style={{
                width: leaf.size + "px",
                height: leaf.size + "px",
                minWidth: leaf.size + "px",
                minHeight: leaf.size + "px",
                maxWidth: leaf.size + "px",
                maxHeight: leaf.size + "px",
                position: "absolute",
                top: `${leaf.top}vh`,
                left: `${leaf.left}vw`,
              }}
            >
              <div
                className="[clip-path:circle()] cursor-pointer bg-[#f96c7d11] animate-warning"
                style={{
                  width: leaf.scale * 100 + "%",
                  height: leaf.scale * 100 + "%",
                  minWidth: leaf.scale * 100 + "%",
                  minHeight: leaf.scale * 100 + "%",
                  maxWidth: leaf.scale * 100 + "%",
                  maxHeight: leaf.scale * 100 + "%",
                }}
              ></div>
            </div>
          ) : (
            // leaf
            <SwayLeaf
              src={leaf.src}
              hoverAreaScale={leaf.scale}
              style={{
                position: "absolute",
                top: `${leaf.top}vh`,
                left: `${leaf.left}vw`,
              }}
              key={leaf.key}
              height={leaf.size}
              width={leaf.size}
              initialVanishTime={leaf.vanishTime}
              hoverAreaBackgroundColor={leaf.backgroundColor}
              callbackFn={() => {
                setScore((v) => v + leaf.score);
              }}
            ></SwayLeaf>
          )
        )}
    </div>
  );
};

export default GameScene;
