"use client";

import { useEffect } from "react";

export function FrontierVanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // if (typeof window === "object" && window.onload === null)
    //   window.onload = () => {
    //     console.log("%cwindow loaded", "color:#91bef0; font-size: 20px;");
    //     const frontierAll = document.getElementsByClassName(
    //       "frontier-all"
    //     )[0] as HTMLElement;
    //     const frontierHeart = document.getElementsByClassName(
    //       "frontier-heart"
    //     )[0] as HTMLElement;
    //     const kilalalayout = document.getElementsByClassName(
    //       "kilalalayout"
    //     )[0] as HTMLElement;
    //     frontierHeart.style.animationPlayState = "running";
    //     setTimeout(() => {
    //       frontierAll.style.animationPlayState = "running";
    //       kilalalayout.style.visibility = "visible";
    //       setTimeout(() => {
    //         frontierAll.remove();
    //       }, 1100);
    //     }, 900);
    //   };
    // return () => {
    //   window.onload = null;
    // };

    const loadfunc = () => {
      console.log("%cwindow loaded", "color:#91bef0; font-size: 20px;");
      const frontierAll = document.getElementsByClassName(
        "frontier-all"
      )[0] as HTMLElement;
      const frontierHeart = document.getElementsByClassName(
        "frontier-heart"
      )[0] as HTMLElement;
      const kilalalayout = document.getElementsByClassName(
        "kilalalayout"
      )[0] as HTMLElement;
      frontierHeart.style.animationPlayState = "running";
      setTimeout(() => {
        frontierAll.style.animationPlayState = "running";
        kilalalayout.style.display = "block";
        setTimeout(() => {
          frontierAll.remove();
        }, 1100);
      }, 900);
    };
    const checkInterv = setInterval(() => {
      if (typeof document === "object" && document.readyState === "complete") {
        loadfunc();
        clearInterval(checkInterv);
      }
    }, 100);
    return () => {
      clearInterval(checkInterv);
    };
  }, []);
  return children;
}
