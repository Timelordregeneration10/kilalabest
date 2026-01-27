"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Foot from "./components/footer";
import heartpng from "../assets/heart.png";
import { usePathname, useRouter } from "next/navigation";
import useWindow from "../hooks/useWindow";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
// @ts-ignore;
import cookie from "js-cookie";
import useScroll from "../hooks/useScroll";
import { BsFlower1 } from "react-icons/bs";
import { throttle } from "lodash";
import { loadingContext } from "./loadingVanishLayout";

interface Heart {
  px: number;
  py: number;
  order: number;
}

interface Hana {
  top: number;
  left: number;
  key: number;
  rotate: number;
  size: number;
  color: string;
}

const contactItems = [
  {
    id: "QQ",
    hoverColor: "hover:text-[rgb(255,255,139)]",
    content: "3497049745",
  },
  {
    id: "Wechat",
    hoverColor: "hover:text-[rgb(255,139,139)]",
    content: "timelord10point5",
  },
  {
    id: "Email",
    hoverColor: "hover:text-[rgb(174,255,255)]",
    content: "3497049745@qq.com",
  },
];

// height means scene scrollHeight
const naviItems = [
  { id: "RMT", url: "/RMT", height: 3.7 },
  { id: "Project", url: "/project", height: 1 },
  { id: "Application", url: "/application", height: 3 },
  { id: "Attempt", url: "/attempt", height: 1 },
  {
    id: "Music",
    url: "https://music.163.com/#/user/home?id=479983448",
    height: 1,
  },
  {
    id: "Anime",
    url: "https://anilist.co/user/NicholasBurkhardt/animelist",
    height: 1,
  },
  { id: "Game", url: "https://space.bilibili.com/515016084", height: 1 },
  { id: "Drawing", url: "/drawing", height: 1 },
];

const hideLeaveWeb = (path: string) => {
  if (path.startsWith("/camouflage") || path.startsWith("/RMT/RemShelter") || path.startsWith("/application/timer"))
    return true;
  return false;
};

const hideHana = (path: string) => {
  if (path.startsWith("/RMT/RemArea") || path === "/") return true;
  return false;
};

const hideHeart = (path: string) => {
  if (path.startsWith("/RMT/RemArea") || path.startsWith("/application/timer")) return true;
  return false;
};

const hideFont = (path: string) => {
  if (path.startsWith("/application/timer")) return true;
  return false;
};

export function KilaLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  const { onOpenChange: onWarningOpenChange } = useDisclosure();

  const [contactContent, setContactContent] = useState("CONTACT ME");

  const { width: kilaInnerWidth, height: kilaInnerHeight } = useWindow();
  const [navitopHeight, setNavitopHeight] = useState("10vh");

  const { scrollTop, controlScrollTop } = useScroll();

  const lastscroll = useRef(0);
  useEffect(() => {
    const currentscroll = scrollTop;
    if (currentscroll > lastscroll.current) {
      setNavitopHeight("0vh");
    } else if (currentscroll < lastscroll.current) {
      setNavitopHeight(
        kilaInnerWidth > 1024 ? "10vh" : kilaInnerWidth > 640 ? "16vh" : "12vh"
      );
    }
    lastscroll.current = currentscroll;
  }, [kilaInnerWidth, scrollTop]);

  useEffect(() => {
    setNavitopHeight(
      kilaInnerWidth > 1024 ? "10vh" : kilaInnerWidth > 640 ? "16vh" : "12vh"
    );
  }, [kilaInnerWidth]);

  // leave web
  const [pathShowLeaveWeb, setPathShowLeaveWeb] = useState(false);
  useEffect(()=>{
    if(hideLeaveWeb(path)){
      setPathShowLeaveWeb(false);
    }else{
      setPathShowLeaveWeb(true);
    }
  }, [path])  
  const [showLeaveWeb, setShowLeaveWeb] = useState(false);
  const [leaveWebTimeout, setLeaveWebTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { loading } = useContext(loadingContext);
  useEffect(() => {
    if (hideLeaveWeb(path)) return;
    if (loading) return;
    const mouseLeaveHandler = () => {
      setLeaveWebTimeout(
        setTimeout(() => {
          setShowLeaveWeb(true);
        }, 2000)
      );
    };
    const mouseEnterHandler = () => {
      if (leaveWebTimeout) clearTimeout(leaveWebTimeout);
      setLeaveWebTimeout(null);
    };
    document.addEventListener("mouseleave", mouseLeaveHandler);
    document.addEventListener("mouseenter", mouseEnterHandler);
    return () => {
      document.removeEventListener("mouseleave", mouseLeaveHandler);
      document.removeEventListener("mouseenter", mouseEnterHandler);
    };
  }, [path, loading, leaveWebTimeout]);

  // heart bubble
  const [heartList, setHeartlist] = useState<Array<Heart>>([]);
  useEffect(() => {
    if (hideHeart(path)) return;
    let ticking = false;
    const clickHandle = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHeartlist((v) => {
            const sec = Math.random();
            const h: Heart = {
              px: e.pageX - 20,
              py: e.pageY - 20,
              order: sec,
            };
            setTimeout(() => {
              setHeartlist((v) => v.filter((vv) => vv.order != sec));
            }, 2000);
            // 因为react浅监听，内容还是数组所以不触发监听，需要解构（相当于浅拷贝）才能触发更新
            return [...v, h];
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    // @ts-ignore
    window.addEventListener("click", clickHandle);
    return () => {
      window.removeEventListener(
        "click",
        // @ts-ignore
        clickHandle
      );
    };
  }, [path]);

  // hana following
  const [hanaArray, setHanaArray] = useState<Hana[]>([]);
  useEffect(() => {
    if (hideHana(path)) return;
    let ticking = false;
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHanaArray((v) => {
            const sec = Math.random();
            const size = Math.random() * 6 + 24;
            const r = Math.floor(Math.random() * 76 + 180);
            const g = Math.floor(Math.random() * 76 + 180);
            const b = Math.floor(Math.random() * 76 + 180);
            const o = Math.random() * 0.3 + 0.3;
            const color = `rgba(${r},${g},${b},${o})`;
            const h: Hana = {
              top: e.pageY + size / 2,
              left: e.pageX + size / 2,
              size,
              color,
              rotate: Math.random() * 360,
              key: sec,
            };
            setTimeout(() => {
              setHanaArray((v) => v.filter((vv) => vv.key != sec));
            }, 2000);
            return [...v, h];
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    const handler = throttle(mouseMoveHandler, 100);
    // @ts-ignore
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener(
        "mousemove",
        // @ts-ignore
        handler
      );
    };
  }, [path]);

  const [hideFontClass, setHideFontClass] = useState(true);
  useEffect(() => {
    if (hideFont(path)) {
      setHideFontClass(true);
    } else {
      setHideFontClass(false);
    }
  }, [path]);

  return (
    <div className="w-screen text-center no-scrollbar m-0 p-0 select-none" style={{ fontFamily: hideFontClass ? "cursive" : "saibo" }}>
      <div className=" min-h-screen w-full">{children}</div>

      {/* footer放在components里是因为footer都是静态的，剥离出来可以服务端渲染 */}
      <Foot></Foot>

      {/* navi */}
      <div className="fixed top-0 left-0 w-screen text-white select-none z-[20] flex flex-col">
        <div
          className="w-screen lg:h-[10vh] h-[12vh] sm:h-[16vh] flex lg:flex-row flex-col border-b-2 border-white overflow-hidden transition-[height_opacity] duration-500  [box-shadow:_0_0_2px_violet]"
          style={{
            height: navitopHeight,
            opacity: navitopHeight === "0vh" ? "0.2" : "1",
          }}
        >
          <div className="w-screen lg:w-[50vw] h-[6vh] sm:h-[8vh] lg:h-[10vh] border-white flex justify-center items-center lg:border-r-2 border-b-2 lg:border-b-0 [box-shadow:_0_0_2px_violet]">
            <div
              className="w-[88vw] lg:w-[44vw] h-[6vh] text-[2.4vmax] overflow-hidden pt-2 lg:p-0 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="h-[6vh] w-[200%] flex justify-around items-center animate-rmtcycle transition-[_color,_text-shadow] duration-700 hover:text-[rgb(145,190,240)] [text-shadow:_0_0_2px_violet] hover:[text-shadow:_0_0_2px_#ffffff]">
                {Array.from({
                  length:
                    (navitopHeight === "10vh"
                      ? 3
                      : navitopHeight === "16vh"
                      ? 4
                      : 2) * 2,
                }).map((_, i) => (
                  <div key={"R · M · T" + i}>R · M · T</div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-screen lg:w-[50vw] h-[6vh] sm:h-[8vh] lg:h-[10vh] flex flex-row-reverse">
            <div className=" w-[60%] text-[2.6vmax] sm:text-[3.2vmax] flex justify-center items-center transition-[color,_text-shadow] duration-700 hover:text-[rgb(255,158,229)] [text-shadow:_0_0_2px_violet] hover:[text-shadow:_0_0_2px_#ffffff]">
              <a href="/">Nicholas Burkhardt</a>
            </div>
            <div className=" w-[40%] text-[1.5vmax] flex flex-col">
              <div className=" select-text h-[50%] border-r-2 flex justify-center items-center border-b-2 border-white [box-shadow:_0_0_2px_violet] transition-[color,_text-shadow] duration-500 hover:text-[rgb(255,158,229)] [text-shadow:_0_0_2px_violet] hover:[text-shadow:_0_0_2px_#ffffff]">
                {contactContent}
              </div>
              <div className="h-[50%] flex flex-row justify-around items-center ">
                {contactItems.map((item) => {
                  return (
                    <div
                      className={` flex flex-1 h-full justify-center items-center border-r-2 border-white [box-shadow:_0_0_2px_violet] transition-[color,_text-shadow] duration-500 cursor-pointer text-white ${item.hoverColor} [text-shadow:_0_0_2px_violet] hover:[text-shadow:_0_0_2px_#ffffff]`}
                      key={item.id}
                      onClick={() => setContactContent(item.content)}
                    >
                      {item.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {path === "/" && (
          <div className=" w-screen h-[6vh] sm:[8vh] lg:h-[5vh] text-white flex flex-row flex-wrap justify-around">
            {naviItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    let sum = 1;
                    for (let i = 0; i < index; i++) {
                      sum += naviItems[i].height;
                    }
                    controlScrollTop(sum * kilaInnerHeight);
                  }}
                  className="cursor-pointer lg:w-[12.4vw] w-[24.9vw] h-[3vh] sm:h-[4vh] lg:h-[5vh] flex justify-center items-center text-[1.7vmax] border-b-2 border-r-2 [box-shadow:_0_0_2px_violet] border-white transition-[color,_text-shadow] duration-500 hover:text-[violet] [text-shadow:_0_0_2px_violet] hover:[text-shadow:_0_0_2px_#ffffff]"
                >
                  {item.id}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* modal for 光敏癫痫 */}
      {!cookie.get("lightWarning") && (
        <Modal
          isOpen={true}
          defaultOpen={true}
          isDismissable={false}
          hideCloseButton={true}
          onOpenChange={onWarningOpenChange}
          className=" bg-warning bg-cover sm:bg-cover bg-center lg:bg-[length:100%_100%]"
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader></ModalHeader>
                <ModalBody>
                  <div className="lg:h-[40vh] sm:h-[30vh] h-[20vh]"></div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      cookie.set("lightWarning", "accept", { expires: 365 });
                      onClose();
                    }}
                  >
                    了解
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* leaveweb page */}
      {pathShowLeaveWeb && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[99] bg-leaveweb bg-cover bg-center lg:bg-[length:100vw_100vh]"
          // 确保加载页面时背景图也被加载
          style={{ visibility: showLeaveWeb ? "visible" : "hidden" }}
        >
          <div className="absolute top-[35vh] right-0 px-[2vmax] text-[4vmax] sm:text-[6vmax] bg-[rgb(255,158,229)] text-white">
            you have leaved!
          </div>
          <button
            onClick={() => {
              setShowLeaveWeb(false);
            }}
            className="absolute bottom-[25vh] right-[5vw] px-[2vmax] text-[5vmax] bg-[rgb(124,255,130)] text-white border-hidden hover:bg-[rgb(55,255,0)]"
          >
            return
          </button>
        </div>
      )}

      {/* heart bubble */}
      {heartList.map((item: Heart) => {
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

      {/* hana following */}
      {hanaArray.map((hana: Hana) => {
        return (
          <div
            className="absolute animate-fadeInOut select-none pointer-events-none z-[2147483646]"
            style={{
              width: hana.size + "px",
              height: hana.size + "px",
              top: hana.top + "px",
              left: hana.left + "px",
              transform: ` rotate(${hana.rotate}deg)`,
            }}
            key={hana.key}
          >
            <BsFlower1
              className="w-full h-full animate-hanamove"
              style={{ color: hana.color }}
            />
          </div>
        );
      })}
    </div>
  );
}
