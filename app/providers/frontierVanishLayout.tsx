"use client";

import { createContext, useEffect, useState } from "react";

export const loadingContext = createContext({
  loading: true,
});

export function FrontierVanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadfunc = () => {
      console.log("%cwindow loaded", "color:#91bef0; font-size: 20px;");
      setLoading(false);
      const frontierAll = document.getElementsByClassName(
        "frontier-all"
      )[0] as HTMLElement;
      const frontierHeart = document.getElementsByClassName(
        "frontier-heart"
      )[0] as HTMLElement;
      frontierHeart.style.animationPlayState = "running";
      setTimeout(() => {
        frontierAll.style.animationPlayState = "running";
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
  return (
    <loadingContext.Provider value={{ loading }}>
      {children}
    </loadingContext.Provider>
  );
}
