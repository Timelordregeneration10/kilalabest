"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useWindow from "../hooks/useWindow";
import hollowknight from './img/game/hollowknight.webp';
import endinglilies from './img/game/endinglilies.webp';
import terreria from './img/game/terreria.webp';
import astlibra from './img/game/astlibra.webp';
import skull from './img/game/skull.webp';
import no11 from './img/game/no11.webp';
import Image from "next/image";

const gamesrc = [
    hollowknight,
    endinglilies,
    terreria,
    astlibra,
    skull,
    no11,
]

export default function GameScene() {
    const isMobile = useWindow().width < 640;
    const [isHover, setIsHover] = useState(isMobile);
    const router = useRouter();

    let beforeTransforms = [];
    let afterTransforms = [];
    const translateZBefore = 4;
    const translateZAfter = 10;
    const translateXY = 12;

    for (let i = 0; i < 24; i++) {
        let temp = ``;
        if (i < 16) {
            temp = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${i >= 8 ? 0 : (i % 4 >= 2 ? 90 : -90)}deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${i % 8 >= 4 ? translateZBefore : -1 * (translateZBefore)}vw)`;
        }
        else {
            temp = `translate3d(${(i - 16) % 2 >= 1 ? 0 : translateXY}vw,${(i - 16) % 4 >= 2 ? 0 : translateXY}vw,${i % 8 >= 4 ? translateZBefore : -1 * (translateZBefore)}vw)`;
        }
        beforeTransforms.push(temp);
    }
    for (let i = 0; i < 24; i++) {
        let temp = ``;
        if (i < 16) {
            temp = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${i >= 8 ? 0 : (i % 4 >= 2 ? 90 : -90)}deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${i % 8 >= 4 ? translateZAfter : -1 * (translateZAfter)}vw)`;
        }
        else {
            temp = `translate3d(${(i - 16) % 2 >= 1 ? 0 : translateXY}vw,${(i - 16) % 4 >= 2 ? 0 : translateXY}vw,${i % 8 >= 4 ? translateZAfter : -1 * (translateZAfter)}vw)`;
        }
        afterTransforms.push(temp);
    }

    let gamecubes = [];
    for (let i = 0; i < 24; i++) {
        gamecubes.push({
            id: i,
            src: gamesrc[i % 6],
            beforeTransform: beforeTransforms[i],
            afterTransform: afterTransforms[i],
        })
    }
    const finalgamecubes = gamecubes;

    return (
        <div className="h-screen w-screen bg-game bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
            {/* mainScene */}
            <div
                className=" absolute top-0 left-0 w-screen h-screen"
            ></div>
            {/* title and context */}
            <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[10vw]">
                <div className=" relative text-white h-[40vh] w-full flex justify-center items-center cursor-pointer "
                    onMouseEnter={() => { setIsHover(true) }}
                    onMouseLeave={() => { setIsHover(false) }}
                    onClick={() => { router.push('/game') }}>
                    <div className={`relative z-[2] text-[25vw] sm:text-[10.4vmax] ${isHover ? 'opacity-100' : 'opacity-0'} transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[#ffb5c3] to-[#97e5ffe8]  `}>GAME</div>
                    <div className={`absolute z-[2] flex justify-center items-center h-[40vh] text-[40vw] sm:text-[16.2vmax] [clip-path:inset(_0_0_50%_0)] ${isHover ? '-translate-y-[8vw] sm:-translate-y-[3.8vmax]' : 'translate-y-1'} transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[#ffb5c3] to-[#97e5ffe8]  `}>游</div>
                    <div className={`absolute z-[2] flex justify-center items-center h-[40vh] text-[40vw] sm:text-[16.2vmax] [clip-path:inset(_50%_0_0_0)] ${isHover ? 'translate-y-[8vw] sm:translate-y-[3.8vmax]' : 'translate-y-0'} transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[#ffb5c3] to-[#97e5ffe8]  `}>游</div>
                    <div className="absolute z-[1] left-0 top-0 w-full h-full flex justify-center items-center ">
                        <div className="relative w-[20vw] h-[20vw] perspective-1000 transform-style-3d transition-[transform_width_height] duration-1000 " style={{ perspective: isHover ? '1000px' : '200px' }}>
                            <div className="absolute w-full h-full transform-style-3d rotate-x-0 rotate-y-0 rotate-z-0 animate-turn24 ">
                                {finalgamecubes.map((gamecube) => {
                                    return (
                                        <div key={gamecube.id}
                                            className="absolute w-full h-full transform-style-3d transition-[transform_width_height] duration-1000"
                                            style={{ transform: isHover ? gamecube.afterTransform : gamecube.beforeTransform, width: isHover ? '40%' : '20%', height: isHover ? '40%' : '20%' }} >
                                            <Image src={gamecube.src} alt="gamecube" height={200} width={200} className="absolute w-[20%] h-[20%] object-cover transition-[transform_width_height] duration-1000" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" relative w-full text-white text-[12.5vw] sm:text-[6vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
                    <p>& somegame here &</p>
                </div>
            </div>
        </div>
    )
}