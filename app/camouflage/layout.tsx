import Image from "next/image";
import byuns_test from "./assets/byuns_test.jpg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BYUNSBoard",
};

export default function CamouflageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-[2000vh] relative">
      {/* bg */}
      <Image
        className="w-full object-cover absolute z-0 top-0 left-0"
        width={2000}
        height={8000}
        alt="byuns_test"
        src={byuns_test}
      ></Image>
      {/* content */}
      <div className="w-full text-left relative z-[1]">{children}</div>
    </div>
  );
}
