import Image from "next/image";
import Link from "next/link";
import darkRem from "./assets/darkRem.jpg";

const RemGallerys = [
  { name: "卡片旋转动效", url: "/application/gallery/Rem/cardRotate" },
  { name: "进出场动效", url: "/application/gallery/Rem/single" },
  { name: "背景循环轮播", url: "/application/gallery/Rem/login" },
  { name: "three.js", url: "/application/gallery/Rem/three" },
];

export default function RemGalleryPage() {
  return (
    <div className="w-screen h-screen relative">
      <Image
        className="w-full h-full absolute z-[0] top-0 left-0 object-cover sm:object-fill pointer-events-none"
        src={darkRem}
        width={4096}
        height={2304}
        alt="Rem gallery bg"
      />
      <ul
        className="pt-[15vh] h-[80vh] w-[50vw] ml-[6vw] flex flex-col justify-around items-start text-[3.5vmax] font-light relative z-[1] text-white"
        style={{ listStyle: "inside" }}
      >
        {RemGallerys.map((_) => (
          <li key={_.name}>
            <Link href={_.url} className="text-white " target="_blank">
              <span className="[text-shadow:_2px_2px_2px_#000000] ">
                {_.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
