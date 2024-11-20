"use client";

import { useEffect, useRef } from "react";
import useWindow from "../hooks/useWindow";

const CanvasAttemptPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { width: innerWidth, height: innerHeight } = useWindow();
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = innerWidth;
      canvasRef.current.height = innerHeight;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        let x1 = 0,
          y1 = 0,
          x2 = 0,
          y2 = 0;
        const drawStars = () => {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          const angel = Math.random() * 2 * Math.PI;
          const radius = Math.random() * 40;
          const r = Math.random() * 4;
          ctx.arc(
            x1 + radius * Math.cos(angel),
            y1 + radius * Math.sin(angel),
            r,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.closePath();
        };
        // const drawCyclingStars = () => {
        //   ctx.fillStyle = "#ffffff";
        //   const time = new Date();
        //   [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angel) => {
        //     ctx.beginPath();
        //     angel +=
        //       ((2 * Math.PI) / 2) * time.getSeconds() +
        //       ((2 * Math.PI) / 2000) * time.getMilliseconds();
        //     ctx.arc(
        //       x1 + 20 * Math.cos(angel),
        //       y1 + 20 * Math.sin(angel),
        //       4,
        //       0,
        //       Math.PI * 2
        //     );
        //     ctx.fill();
        //     ctx.closePath();
        //   });
        // };
        const drawLightning = (
          x1: number,
          y1: number,
          x2: number,
          y2: number
        ) => {
          const d =
            2 * Math.sqrt(2 * ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
          const valleyCount = 6;
          // ctx.clearRect(0, 0, innerWidth, innerHeight);
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = d / 40;
          ctx.strokeStyle = "#ffffff";
          ctx.translate(x1 - d / 2, y1);
          ctx.moveTo(0, 0);
          ctx.rotate(Math.atan((y2 - y1) / (x2 - x1)));
          // 高中三角函数记忆的缺失
          if (x2 < x1) ctx.rotate(-Math.PI);
          for (let i = 0; i < valleyCount; i++) {
            if (i === 0) {
              ctx.rotate(Math.PI / 4);
            } else {
              switch (i % 4) {
                case 0:
                  break;
                case 1:
                  ctx.rotate(-Math.PI / 2);
                  break;
                case 2:
                  break;
                case 3:
                  ctx.rotate(Math.PI / 2);
                  break;
              }
            }
            ctx.lineTo(d / valleyCount, 0);
            ctx.translate(d / valleyCount, 0);
            ctx.stroke();
            // ctx.closePath();

            // 哈哈，骨龙炮？
            ctx.beginPath();
            ctx.fillStyle = "#ffffff";
            ctx.arc(0, i % 2 === 0 ? 10 : -10, d / 20, 0, Math.PI * 2);
            ctx.fill();
            // ctx.closePath();
          }
          ctx.restore();
        };
        const restrain = 10;
        const handleMove = (e: MouseEvent) => {
          x2 = e.clientX;
          y2 = e.clientY;
        };
        // let count = 0;
        const loop = () => {
          // count++;
          // if (count % 4 === 0) {
          //   requestAnimationFrame(loop);
          //   return;
          // }
          ctx.fillStyle = "#00000016";
          ctx.fillRect(0, 0, innerWidth, innerHeight);
          if (Math.abs(x1 - x2) > restrain || Math.abs(y1 - y2) > restrain) {
            drawLightning(x1, y1, x2, y2);
          } else {
            drawStars();
          }
          x1 = x2;
          y1 = y2;
          requestAnimationFrame(loop);
        };
        loop();
        window.addEventListener("mousemove", handleMove);
        return () => {
          window.removeEventListener("mousemove", handleMove);
        };

        // ctx.fillStyle = "#91bef0";
        // ctx.fillRect(10, 10, 100, 120);

        // ctx.beginPath();
        // ctx.moveTo(200, 200);
        // ctx.lineTo(260, 280);
        // ctx.lineTo(280, 260);
        // ctx.stroke();
        // ctx.fill();

        // ctx.beginPath();
        // ctx.arc(400, 400, 50, 0, Math.PI * 2);
        // ctx.stroke();
        // ctx.fill();

        // ctx.beginPath();
        // ctx.moveTo(400, 600);
        // ctx.lineTo(480, 660);
        // ctx.lineWidth = 10;
        // ctx.stroke();
      }
    }
  }, [innerHeight, innerWidth]);

  return (
    <>
      <canvas
        className="fixed top-0 left-0 pointer-events-none"
        ref={canvasRef}
      ></canvas>
      <div className="w-full h-screen overflow-hidden relative z-10 flex justify-center items-center text-white border-b-2 border-white border-solid">
        <h1 className="text-[10vmax]">CANVAS ATTEMPT</h1>
      </div>
    </>
  );
};

export default CanvasAttemptPage;
