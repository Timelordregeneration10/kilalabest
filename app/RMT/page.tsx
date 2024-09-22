import Image from "next/image";
import RMTbg from "./assets/RMTbg.jpg";

const RMTPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative">
      <h1>RMT</h1>
      <h2>{"what's the meaning of RMT"}</h2>
      <p>RMT= Rem maji tianshi</p>
      <h2>why RMT</h2>
      <p>because Rem wa yi chi ban kawayii</p>
      <h2>things I do for RMT</h2>
      <ul>
        <li>RemHB!</li>
        <li>threeRem</li>
        <li>Rem3d from miku</li>
        <li>Rem gallery</li>
        <li>Rem sticky</li>
        <li>catch Rem</li>
        <li>rmtyydsPath</li>
      </ul>
      <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
        <Image
          src={RMTbg}
          width={1600}
          height={900}
          alt="RMT background"
          className="absolute top-0 left-0 w-screen h-screen object-cover sm:object-fill"
        ></Image>
        <h3 className="text-white text-[20vw] relative">施工ing...</h3>
      </div>
    </div>
  );
};

export default RMTPage;
