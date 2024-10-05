"use client";
import * as TWEEN from "@tweenjs/tween.js";
import { useEffect, useState } from "react";

function useScroll() {
  const [scrollTop, setScrollTop] = useState(0);

  const controlScrollTop = (FNscrollTop: number) => {
    setScrollTop(FNscrollTop);
    const duration = Math.abs(FNscrollTop - scrollTop) / 10;
    new TWEEN.Tween({ objScrollTop: scrollTop })
      .to({ objScrollTop: FNscrollTop }, duration)
      .onUpdate((obj) => {
        document.documentElement.scrollTop = obj.objScrollTop;
      })
      .start();
    let count = 0;
    function render() {
      TWEEN.update();
      if (count++ > duration / 16.6) return;
      requestAnimationFrame(render);
    }
    render();
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      const updateScrollTop = () => {
        setScrollTop(
          document.documentElement.scrollTop || document.body.scrollTop
        );
      };
      updateScrollTop();
      window.addEventListener("scroll", updateScrollTop);
      return () => {
        window.removeEventListener("scroll", updateScrollTop);
      };
    }
  }, []);

  return { scrollTop, controlScrollTop };
}

export default useScroll;
