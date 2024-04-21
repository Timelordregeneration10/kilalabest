"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Foot from './components/footer';
import heartpng from "../components/img/heart.png";
import { useRouter } from "next/navigation";
import useWindow from "../hooks/useWindow";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import cookie from "js-cookie";

export function KilaLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const boxallRef = useRef<HTMLDivElement>(null);

    const [heartList, setHeartlist] = useState<Array<{ px: number; py: number; order: number }>>([]);

    const [showLeaveWeb, setShowLeaveWeb] = useState(false);
    const [leaveWebTimeout, setLeaveWebTimeout] = useState<NodeJS.Timeout | null>(null);


    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onOpenChange: onWarningOpenChange } = useDisclosure();

    const contactItems = [
        { id: 'QQ', hoverColor: 'hover:text-[rgb(255,255,139)]', content: '3497049745' },
        { id: 'Wechat', hoverColor: 'hover:text-[rgb(255,139,139)]', content: 'timelord10point5' },
        { id: 'Email', hoverColor: 'hover:text-[rgb(174,255,255)]', content: '3497049745@qq.com' },
    ];

    const naviItems = [
        { id: 'RMT', url: '/RMT' },
        { id: 'Projects', url: '/Projects' },
        { id: 'Appications', url: '/Appications' },
        { id: 'Attempts', url: '/Attempts' },
        { id: 'Tools', url: '/Tools' },
        { id: 'Animes', url: '/Animes' },
        { id: 'Games', url: '/Games' },
        { id: 'Drawings', url: '/Drawings' },
    ];

    const [contactContent, setContactContent] = useState('CONTACT ME');

    const { width: kilaInnerWidth } = useWindow();
    const [navitopHeight, setNavitopHeight] = useState(kilaInnerWidth > 1024 ? '10vh' : kilaInnerWidth > 640 ? '16vh' : "12vh");

    const generateHeart = (px: number, py: number) => {
        // setHeartlist((arr) => {
        //   let tempHeartlist = arr;
        //   const sec =new Date().getTime();
        //   tempHeartlist.push({ px:px, py:py, order: sec });
        //   return tempHeartlist;
        // });
        // 因为react浅监听，内容还是数组所以不触发监听，需要解构（相当于浅拷贝）才能触发更新
        let sec = new Date().getTime();
        setHeartlist([...heartList, { px, py, order: sec }]);

        // 精准延时remove
        setTimeout((sec: number) => {
            setHeartlist((arr) => {
                let tempHeartlist = [...arr];
                let index = 0;
                for (let i = 0; i < tempHeartlist.length; i++) {
                    if (tempHeartlist[i].order === sec) {
                        index = i;
                    }
                }
                tempHeartlist.splice(index, 1);
                return tempHeartlist;
            });
        }, 2000);
    };

    var lastscroll = 0;
    const naviLoop = useCallback((InnerWidth: number) => {
        if (boxallRef.current) {
            let currentscroll = boxallRef.current.scrollTop;
            if (currentscroll > lastscroll) {
                setNavitopHeight('0vh');
            } else if (currentscroll < lastscroll) {
                setNavitopHeight(InnerWidth > 1024 ? '10vh' : InnerWidth > 640 ? '16vh' : "12vh");
            }
            lastscroll = currentscroll;
        }
    }, [kilaInnerWidth])

    useEffect(() => {
        setNavitopHeight(kilaInnerWidth > 1024 ? '10vh' : kilaInnerWidth > 640 ? '16vh' : "12vh");
    }, [kilaInnerWidth]);

    const setScrollTop = () => {
        if (boxallRef.current) localStorage.setItem('kilaScrollTop', boxallRef.current?.scrollTop.toString());
        requestAnimationFrame(setScrollTop);
    }
    useEffect(() => {
        if (localStorage.getItem('kilaScrollTop')) boxallRef.current?.scrollTo(0, parseInt(localStorage.getItem('kilaScrollTop') as string));
        setScrollTop();
    }, []);

    return (
        <div
            className="overflow-x-hidden overflow-y-scroll w-screen h-screen no-scrollbar text-center m-0 p-0 font-[saibo] select-none"
            onClick={(e) => {
                if (boxallRef.current)
                    generateHeart(
                        e.pageX - 15,
                        e.pageY - 20
                    );
            }}
            onMouseLeave={() => {
                setLeaveWebTimeout(setTimeout(() => {
                    setShowLeaveWeb(true);
                }, 2000))
            }}
            onMouseEnter={() => {
                if (leaveWebTimeout)
                    clearTimeout(leaveWebTimeout);
                setLeaveWebTimeout(null);
            }}
            onScroll={() => { naviLoop(kilaInnerWidth) }}
            ref={boxallRef}
        >

            <div className=" min-h-screen">
                {children}
            </div>

            {/* footer放在components里是因为footer都是静态的，剥离出来可以服务端渲染 */}
            <Foot></Foot>

            {/* navi */}
            <div className="absolute top-0 left-0 w-screen text-white select-none z-[10] flex flex-col">
                <div className="w-screen lg:h-[10vh] h-[12vh] sm:h-[16vh] flex lg:flex-row flex-col border-b-2 border-white overflow-hidden transition-[height_opacity] duration-500"
                    style={{ height: navitopHeight, opacity: navitopHeight === '0vh' ? '0.2' : '1' }}>
                    <div className="w-screen lg:w-[50vw] h-[6vh] sm:h-[8vh] lg:h-[10vh] border-white flex justify-center items-center lg:border-r-2 border-b-2 lg:border-b-0">
                        <div className="w-[88vw] lg:w-[44vw] h-[6vh] text-[2.4vmax] overflow-hidden pt-2 lg:p-0">
                            <div className="h-[6vh] w-[200vmax] animate-rmtcycle transition-colors duration-700 hover:text-[rgb(145,190,240)]">
                                R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T R · M · T
                            </div>
                        </div>
                    </div>
                    <div className="w-screen lg:w-[50vw] h-[6vh] sm:h-[8vh] lg:h-[10vh] flex flex-row-reverse">
                        <div className=" w-[60%] text-[2.6vmax] sm:text-[3.2vmax] flex justify-center items-center transition-colors duration-700 hover:text-[rgb(255,158,229)]">
                            Nicholas Burkhardt
                        </div>
                        <div className=" w-[40%] text-[1.5vmax] flex flex-col">
                            <div className=" select-text h-[50%] border-r-2 flex justify-center items-center border-b-2 border-white transition-colors duration-500 hover:text-[rgb(255,158,229)]">
                                {contactContent}
                            </div>
                            <div className="h-[50%] flex flex-row justify-around items-center ">
                                {contactItems.map((item) => {
                                    return (
                                        <div
                                            className={` flex flex-1 h-full justify-center items-center border-r-2 border-white transition-colors duration-500 cursor-pointer text-white ${item.hoverColor}`}
                                            key={item.id}
                                            onClick={() => setContactContent(item.content)}
                                        >{item.id}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-screen h-[6vh] sm:[8vh] lg:h-[5vh] text-white flex flex-row flex-wrap justify-around">
                    {naviItems.map((item) => {
                        return (
                            <div key={item.id} onClick={() => { router.push(item.url) }} className="cursor-pointer lg:w-[12.4vw] w-[24.9vw] h-[3vh] sm:h-[4vh] lg:h-[5vh] flex justify-center items-center text-[1.7vmax] border-b-2 border-r-2 shadow border-white transition-colors duration-500 hover:text-[violet]">
                                {item.id}
                            </div>
                        )
                    })}
                </div>

            </div>

            {/* modal for 光敏癫痫 */}
            {!cookie.get('lightWarning') && (
                <Modal isOpen={true} defaultOpen={true} isDismissable={false} hideCloseButton={true} onOpenChange={onWarningOpenChange}
                    className=" bg-warning bg-cover sm:bg-contain bg-center lg:bg-[length:100%_100%]" size='3xl'>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader></ModalHeader>
                                <ModalBody>
                                    <div className="lg:h-[40vh] sm:h-[30vh] h-[20vh]"></div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => {
                                        cookie.set("lightWarning", "accept", { expires: 365 });
                                        onClose();
                                    }}>
                                        了解
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}


            {/* leaveweb page */}
            {showLeaveWeb && (
                <div className="absolute top-0 left-0 w-screen h-screen z-[99] bg-leaveweb bg-cover bg-center lg:bg-[length:100vw_100vh]">
                    <div className="absolute top-[35vh] right-0 px-[2vmax] text-[4vmax] sm:text-[6vmax] bg-[rgb(255,158,229)] text-white">you have leaved!</div>
                    <button onClick={() => { setShowLeaveWeb(false) }} className="absolute bottom-[25vh] right-[5vw] px-[2vmax] text-[5vmax] bg-[rgb(124,255,130)] text-white border-hidden hover:bg-[rgb(55,255,0)]">return</button>
                </div>
            )}

            {/* heart bubble */}
            {heartList.map((item) => {
                return (
                    <Image
                        height={40}
                        width={40}
                        src={heartpng}
                        alt="heart"
                        key={item.order}
                        className={`absolute w-[40px] h-[40px] select-none pointer-events-none animate-personwebheart z-[2147483647]`}
                        style={{ top: item.py + "px", left: item.px + "px" }}
                    ></Image>
                );
            })}
        </div>
    );
}
