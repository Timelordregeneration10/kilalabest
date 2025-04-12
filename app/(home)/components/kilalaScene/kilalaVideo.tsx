"use client";

import useScroll from "@/app/hooks/useScroll";
import useWindow from "@/app/hooks/useWindow";
import { loadingContext } from "@/app/providers/frontierVanishLayout";
import { useContext, useEffect, useRef } from "react";

export default function KilalaVideo() {
  const { loading } = useContext(loadingContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollTop } = useScroll();
  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  useEffect(() => {
    if (loading) return;
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [loading]);
  useEffect(() => {
    if (videoRef.current) {
      if (scrollTop > 2 * kilaInnerHeight) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [kilaInnerWidth, scrollTop, kilaInnerHeight]);
  return (
    <video
      src="/kilalascene.mp4"
      ref={videoRef}
      loop={true}
      muted={true}
      playsInline={true}
      className="w-screen h-screen object-cover lg:object-fill"
    ></video>
  );
}
