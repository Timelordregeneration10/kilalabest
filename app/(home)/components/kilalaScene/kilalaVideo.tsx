"use client";

import { loadingContext } from "@/app/providers/frontierVanishLayout";
import { useContext, useEffect, useRef } from "react";

export default function KilalaVideo() {
  const { loading } = useContext(loadingContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (loading) return;
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [loading]);
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
