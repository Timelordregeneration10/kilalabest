import Image from "next/image";
import Link from "next/link";
import momentaRem from "./assets/momentaRem.jpg";

const RemStickys = [
  { name: "水平滚动", url: "/attempt/sticky/horizontal" },
  { name: "加入rotate和clipPath的水平滚动", url: "/attempt/sticky/horizontalRotateClip" },
  { name: "垂直滚动", url: "/attempt/sticky/vertical" },
  { name: "使用absolute而非sticky的垂直滚动", url: "/attempt/sticky/absolute" },
];

export default function RemStickysPage() {
  return (
    <div className="w-screen h-screen relative">
      <Image
        className="w-full h-full absolute z-[0] top-0 left-0 object-cover sm:object-fill pointer-events-none"
        src={momentaRem}
        width={4096}
        height={2304}
        alt="Rem sticky bg"
      />
      <ul
        className="pt-[15vh] h-[80vh] w-[80vw] ml-[10vw] flex flex-col justify-around items-start text-[3.5vmax] font-light relative z-[1] text-white"
        style={{ listStyle: "inside" }}
      >
        {RemStickys.map((_) => (
          <li key={_.name}>
            <Link href={_.url} className="text-white" target="_blank">{_.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
