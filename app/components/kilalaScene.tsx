

export default function KilalaScene() {
    return (
        <div className="h-screen w-screen bg-cover bg-center lg:bg-[length:100vw_100vh] relative">
            <video src="/kilalascene.mp4" autoPlay={true} loop={true} muted={true} playsInline={true} className="w-screen h-screen object-cover lg:object-fill"></video>
            <div className="absolute top-0 left-0 w-screen h-screen bg-[#000000cf]">
                {/* <div className="absolute"> */}
                    <div className="absolute top-[30vh] lg:top-[25vh] leading-[18vh] lqlm:leading-[24vh] left-[10vw] w-[80vw] h-[50vh] text-[20.4vh] lqlm:text-[32.4vh] md:text-[22.4vw] overflow-visible flex justify-center items-center text-transparent bg-kilalascene bg-clip-text bg-contain opacity-60 bg-center ">雷绮罗姆</div>
                    <div className="absolute top-[30vh] lg:top-[25vh] leading-[18vh] lqlm:leading-[24vh] left-[10vw] w-[80vw] h-[50vh] text-[20.4vh] lqlm:text-[32.4vh] md:text-[22.4vw] overflow-visible flex justify-center items-center text-transparent bg-kilalascene bg-clip-text bg-contain animate-sanInfinity opacity-60 bg-center ">雷绮罗姆</div>
                {/* </div> */}
                <div className="absolute left-[49vw] bottom-[5vh] sm:bottom-[7vh] lg:bottom-[10vh]">
                    <svg className="w-[30px] h-[30px]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4341" width="200" height="200"><path d="M512 170.666667a213.333333 213.333333 0 0 0-213.333333 213.333333v256a213.333333 213.333333 0 0 0 426.666666 0V384a213.333333 213.333333 0 0 0-213.333333-213.333333z m0-85.333334a298.666667 298.666667 0 0 1 298.666667 298.666667v256a298.666667 298.666667 0 0 1-597.333334 0V384a298.666667 298.666667 0 0 1 298.666667-298.666667z" fill="#ffffff" p-id="4342"></path><path d="M469.333333 256h85.333334v170.666667h-85.333334z" fill="#ffffff" p-id="4343"></path></svg>
                    <div className="text-white font-bold mt-2 w-[30px] h-[30px] overflow-hidden">
                        <div className=" animate-scrollcycle">↓</div>
                    </div>
                </div>
            </div>
        </div>
    )
}