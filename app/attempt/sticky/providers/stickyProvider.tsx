"use client";
import { createContext, useRef, useState } from "react";

export const stickyScrollContext = createContext({ scrollTop: 0 });

const StickyLayout = ({ children }: { children: React.ReactNode }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <stickyScrollContext.Provider value={{ scrollTop }}>
      <div
        className="w-screen h-screen overflow-x-hidden overflow-y-scroll no-scrollbar"
        ref={scrollRef}
        onScroll={() => {
          if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop);
        }}
      >
        {children}
      </div>
    </stickyScrollContext.Provider>
  );
};

export default StickyLayout;