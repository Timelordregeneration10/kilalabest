"use client";
import * as TWEEN from "@tweenjs/tween.js";
import { useEffect, useState } from "react";

function useScroll() {
  const [scrollTop, setScrollTop] = useState(0);

  const controlScrollTop = (FNscrollTop: number) => {
    setScrollTop(FNscrollTop);
    const duration = Math.abs(FNscrollTop - scrollTop) / 10;
    const tw = new TWEEN.Tween({ objScrollTop: scrollTop })
      .to({ objScrollTop: FNscrollTop }, duration)
      .onUpdate((obj) => {
        document.documentElement.scrollTop = obj.objScrollTop;
      })
      .start();
    const group = new TWEEN.Group();
    group.add(tw);
    let count = 0;
    function render() {
      group.update();
      if (count++ > duration / 16.6) return;
      requestAnimationFrame(render);
    }
    render();
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      const updateScrollTop = (pos: number) => {
        setScrollTop(pos);
      };
      let lastKnownScrollPosition = 0;
      let ticking = false;
      const scrollHandler = () => {
        lastKnownScrollPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateScrollTop(lastKnownScrollPosition);
            ticking = false;
          });
          ticking = true;
        }
      };
      document.addEventListener("scroll", scrollHandler);
      scrollHandler();
      return () => {
        document.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  return { scrollTop, controlScrollTop };
}

export default useScroll;
