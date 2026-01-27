export function FrontierLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="frontier-all fixed z-[1000] top-0 left-0 w-screen h-screen bg-black overflow-hidden flex justify-center items-center perspective-[100px] transform-style-3d animate-loadingVanish div-loading-content"
        style={{ animationPlayState: "paused" }}
      >
        <div className="absolute z-10 top-[12vh] left-0 w-full text-center text-white text-[3.5vmax] font-bold">
          loading...
        </div>
        <div className="absolute bottom-0 right-0 text-[#ffc6ff] text-xs p-4">
          ⚠本网站部署于Github，确保您的网络环境可以正常访问Github⚠
        </div>
        <div
          className="frontier-heart absolute top-0 left-0 z-20 min-w-[100vw] min-h-screen w-screen h-screen bg-[#91bef0] animate-frontierHeartExpand"
          style={{ animationPlayState: "paused" }}
        ></div>
        <div className=" relative w-[300px] h-[300px] flex justify-center items-center transform-style-3d ">
          {Array(30)
            .fill(0)
            .map((_, i) => (
              <div
                key={"border-item" + i}
                className="absolute top-0 left-0 w-full h-full transform-style-3d animate-frontier"
                style={{
                  animationDelay: i * 0.5 + "s",
                  transform: "translateZ(-200px) rotate(0deg)",
                }}
              >
                <div className="absolute top-0 left-0 bg-[#91bef0] [box-shadow:_0px_0px_20px_#91bef0] w-[calc(100%_-_15px)] h-[20px]"></div>
                <div className="absolute top-0 right-0 bg-[#91bef0] [box-shadow:_0px_0px_20px_#91bef0] h-[calc(100%_-_15px)] w-[20px]"></div>
                <div className="absolute bottom-0 right-0 bg-[#91bef0] [box-shadow:_0px_0px_20px_#91bef0] w-[calc(100%_-_15px)] h-[20px]"></div>
                <div className="absolute bottom-0 left-0 bg-[#91bef0] [box-shadow:_0px_0px_20px_#91bef0] h-[calc(100%_-_15px)] w-[20px]"></div>
              </div>
            ))}
        </div>
      </div>
      {children}
    </>
  );
}
