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
      const divLoadingContent = document.getElementsByClassName(
        "div-loading-content"
      )[0] as HTMLElement;
      const heyboxInspired = document.getElementsByClassName(
        "animate-heyboxInspired"
      )[0] as HTMLElement;
      const divHeyboxInspired = document.getElementsByClassName(
        "div-heyboxInspired"
      )[0] as HTMLElement;
      setTimeout(() => {
        heyboxInspired.style.animationPlayState = "running";
        setTimeout(() => {
          divLoadingContent.remove();
        }, 400);
        setTimeout(() => {
          divHeyboxInspired.remove();
        }, 900);
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
