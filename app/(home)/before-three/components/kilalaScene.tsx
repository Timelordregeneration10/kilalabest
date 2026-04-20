import CyberPunkKilala from "./kilalaScene/cyberPunkKilala";
import KilalaVideo from "./kilalaScene/kilalaVideo";
import ScrollToRMTscene from "./kilalaScene/ScrollToRMTscene";

export default function KilalaScene() {
  return (
    <div className="h-screen w-screen bg-cover bg-center lg:bg-[length:100vw_100vh] relative">
      <KilalaVideo />
      <div className="absolute top-0 left-0 w-screen h-screen bg-[#0000009f]">
        <div className="absolute top-[30vh] lg:top-[25vh] leading-[33vw] left-[10vw] w-[80vw] h-[50vh] text-[40.4vw] sm:text-[22.4vw] overflow-visible flex justify-center items-center text-transparent bg-anime bg-clip-text bg-contain opacity-90 bg-center ">
          <h1>雷绮罗姆</h1>
        </div>
        <CyberPunkKilala />
        <ScrollToRMTscene />
      </div>
    </div>
  );
}
