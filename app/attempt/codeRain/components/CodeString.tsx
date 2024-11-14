"use client";

import { useEffect, useState } from "react";

// interface LetterProps {
//   opacity: number;
// }

// const Letter: React.FC<LetterProps> = ({ opacity }) => {
//   const [l, setL] = useState("");
//   useEffect(() => {
//     let eof = false;
//     const loop = () => {
//       setL(String.fromCharCode(Math.round(Math.random() * 2000)));
//       if (eof) return;
//       requestAnimationFrame(loop);
//     };
//     loop();
//     return () => {
//       eof = true;
//     };
//     // const interv = setInterval(() => {
//     //   setL(String.fromCharCode(Math.round(Math.random() * 2000)));
//     // }, 40);
//     // return () => {
//     //   clearInterval(interv);
//     // };
//   }, []);
//   return <span style={{ opacity }}>{l}</span>;
// };

interface CodeStringProps {
  x: number;
  y: number;
  animationDuration: number;
}

const CodeString: React.FC<CodeStringProps> = ({ x, y, animationDuration }) => {
  const [string, setString] = useState("RMTYYDS!!!");
  useEffect(() => {
    let eof = false;
    const loop = () => {
      setString(
        String.fromCharCode(
          ...Array(10)
            .fill(0)
            .map((v) => Math.round(Math.random() * 200))
        )
      );
      if (eof) return;
      requestAnimationFrame(loop);
    };
    loop();
    return () => {
      eof = true;
    };
    // const interv = setInterval(() => {
    //   setL(String.fromCharCode(Math.round(Math.random() * 2000)));
    // }, 40);
    // return () => {
    //   clearInterval(interv);
    // };
  }, []);
  return (
    <div
      className="absolute text-lg font-extrabold font-[YouYuan] flex flex-col justify-center animate-codeFalling"
      style={{
        top: y + "vh",
        left: x + "vw",
        animationDuration: animationDuration + "s",
      }}
    >
      {Array(10)
        .fill(0)
        .map((value, index) => (index + 1) * 0.1)
        .map((opacity, i) => (
          <span key={opacity} style={{ opacity }}>
            {string[i]}
          </span>
        ))}
    </div>
  );
};

export default CodeString;
