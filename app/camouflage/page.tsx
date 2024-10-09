import Image from "next/image";
import byuns_test from "./assets/byuns_test.jpg";
import SwayLeaf from "../components/SwayLeaf";

const CamouflagePage: React.FC = () => {
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
      <div className="w-full text-left relative z-[1]">
        <div className="w-full p-20 flex justify-center items-center">
          <SwayLeaf></SwayLeaf>
        </div>
      </div>
    </div>
  );
};

export default CamouflagePage;
