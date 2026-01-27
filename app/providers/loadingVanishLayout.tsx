"use client";

import { createContext, useEffect, useState } from "react";

export const loadingContext = createContext({
  loading: true,
});

export function LoadingVanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadfunc = () => {
      console.log("%cwindow loaded", "color:#91bef0; font-size: 20px;");
      setLoading(false);
      const loadingVanish = document.getElementsByClassName(
        "animate-loadingVanish"
      )[0] as HTMLElement;
      setTimeout(() => {
        loadingVanish.style.animationPlayState = "running";
        setTimeout(() => {
          loadingVanish.remove();
        }, 1100);
      }, 100);
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
