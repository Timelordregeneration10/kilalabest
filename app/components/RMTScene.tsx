import bixinRem from "./img/rmt/bixinRem.webp";
import fushouRem from "./img/rmt/fushouRem.webp";
import heavenRem from "./img/rmt/heavenRem.webp";
import jpegRem from "./img/rmt/bixinRem.webp";
import sisRem1Rem from "./img/rmt/sisRem1.webp";
import sisRem2Rem from "./img/rmt/sisRem2.webp";
import wangjiangRem from "./img/rmt/wangjiangRem.webp";
import weixianRem from "./img/rmt/weixianRem.webp";
import wyyRem from "./img/rmt/wyyRem.webp";
import Image from "next/image";

export default function RMTScene({ scrollTop }: { scrollTop: number }) {
  const Rems = [
    {
      rid: "bixinRem",
      rsrc: bixinRem,
      rscaleX: 0,
      rscaleY: -4,
      fwidth: 26,
      fheight: 70,
      rwidth: 656,
      rheight: 1166,
      rtranslateX: 0,
      rtranslateY: 45,
      rzIndex: -1,
      rposition: "text-end",
    },
    {
      rid: "fushouRem",
      rsrc: fushouRem,
      rscaleX: 0,
      rscaleY: -1,
      fwidth: 25,
      fheight: 70,
      rwidth: 640,
      rheight: 1024,
      rtranslateX: 0,
      rtranslateY: 13,
      rzIndex: 1,
      rposition: "text-start",
    },
    {
      rid: "heavenRem",
      rsrc: heavenRem,
      rscaleX: -0.9,
      rscaleY: -3.2,
      fwidth: 120,
      fheight: 200,
      rwidth: 1996,
      rheight: 2994,
      rtranslateX: 50,
      rtranslateY: 300,
      rzIndex: 1,
      rposition: "text-start",
    },
    {
      rid: "jpegRem",
      rsrc: jpegRem,
      rscaleX: -1,
      rscaleY: -1.6,
      fwidth: 90,
      fheight: 150,
      rwidth: 1600,
      rheight: 2212,
      rtranslateX: 20,
      rtranslateY: 120,
      rzIndex: 1,
      rposition: "text-start",
    },
    {
      rid: "sisRem1Rem",
      rsrc: sisRem1Rem,
      rscaleX: 0.7,
      rscaleY: -2,
      fwidth: 50,
      fheight: 120,
      rwidth: 1002,
      rheight: 744,
      rtranslateX: -50,
      rtranslateY: 60,
      rzIndex: 1,
      rposition: "text-end",
    },
    {
      rid: "sisRem2Rem",
      rsrc: sisRem2Rem,
      rscaleX: 0.5,
      rscaleY: -3.2,
      fwidth: 26,
      fheight: 70,
      rwidth: 992,
      rheight: 1403,
      rtranslateX: -100,
      rtranslateY: 180,
      rzIndex: 1,
      rposition: "text-end",
    },
    {
      rid: "wangjiangRem",
      rsrc: wangjiangRem,
      rscaleX: 0,
      rscaleY: -3,
      fwidth: 55,
      fheight: 140,
      rwidth: 672,
      rheight: 1132,
      rtranslateX: -15,
      rtranslateY: 65,
      rzIndex: -1,
      rposition: "text-center",
    },
    {
      rid: "weixianRem",
      rsrc: weixianRem,
      rscaleX: -0.4,
      rscaleY: -2.6,
      fwidth: 30,
      fheight: 120,
      rwidth: 800,
      rheight: 1200,
      rtranslateX: 0,
      rtranslateY: 0,
      rzIndex: 1,
      rposition: "text-start",
    },
    {
      rid: "wyyRem",
      rsrc: wyyRem,
      rscaleX: 0,
      rscaleY: -2,
      fwidth: 55,
      fheight: 120,
      rwidth: 1475,
      rheight: 2074,
      rtranslateX: 17.5,
      rtranslateY: 0,
      rzIndex: -2,
      rposition: "text-center",
    },
  ];

  return (
    <div className=" h-[200vh] w-screen bg-rmt bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {Rems.map((Rem) => {
        return (
          <div key={Rem.rid} className={` h-0 w-screen ${Rem.rposition} `}>
            <Image
              src={Rem.rsrc}
              width={Rem.rwidth}
              height={Rem.rheight}
              alt={Rem.rid}
              className={` w-[${Rem.fwidth}] h-[${Rem.fheight}] z-[${Rem.rzIndex}] `}
              style={{
                transform: `translate(${
                  ((scrollTop - window.innerHeight) / 20) * Rem.rscaleX +
                  Rem.rtranslateX
                }vw,$${
                  ((scrollTop - window.innerHeight) / 20) * Rem.rscaleY +
                  Rem.rtranslateY
                }vh)`,
              }}
            ></Image>
          </div>
        );
      })}
    </div>
  );
}
