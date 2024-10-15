"use client";
import { useEffect, useState } from "react";
import GameScene from "./components/gameScene";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useWindow from "@/app/hooks/useWindow";
import cookie from "js-cookie";

const RemShelterPage: React.FC = () => {
  const [gameState, setGameState] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isInstuctionOpen,
    onOpen: onInstuctionOpen,
    onOpenChange: onInstuctionOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const instuctionReaded = cookie.get("RemShelterInstuctionReaded");
    if (!instuctionReaded) {
      onInstuctionOpen();
    }
  }, [onInstuctionOpen]);

  const { width: windowWidth } = useWindow();
  useEffect(() => {
    if (windowWidth === 0) return;
    if (windowWidth < 640) {
      alert(
        "This game is not supported well on mobile devices, please use a computer to play"
      );
    }
  }, [windowWidth]);

  // prevent zoom
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if ((e.deltaY && e.ctrlKey) || e.detail) {
        e.preventDefault();
      }
    }
    document.addEventListener("wheel", handleWheel, {
      capture: false,
      passive: false,
    });

    function handleKeydown(event: KeyboardEvent) {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        (event.code === "Minus" || event.code === "Equal")
      ) {
        event.preventDefault();
      }
    }
    document.addEventListener("keydown", handleKeydown, false);
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeydown, false);
    };
  }, []);

  return (
    <>
      {gameState === 0 && (
        <div className="relative w-screen h-screen text-[3vmax] overflow-hidden flex justify-center items-center">
          {/* start scene */}
          <div className="flex flex-col justify-center items-center flex-wrap gap-[5vmax] w-fit">
            <div
              className="cursor-pointer hover:opacity-70 transition-opacity text-white text-[3.5vmax] w-full py-4 px-6 flex justify-center items-center rounded-xl animate-streamer bg-streamer-color bg-[length:400%]"
              onClick={() => {
                setGameState(1);
              }}
            >
              <span className="">play</span>
            </div>
            <div
              className="cursor-pointer hover:opacity-70 transition-opacity text-white text-[3.5vmax] py-4 px-6 flex justify-center items-center rounded-xl bg-streamer-color bg-[length:400%]"
              onClick={onOpen}
            >
              <span className="">change difficulty</span>
            </div>
          </div>
          <div className="absolute lg:top-20 sm:top-32 top-24 right-4 text-[3vmax]">
            current difficulty: lv{" "}
            <span className=" text-[4vmax]  text-[#91bef0] ">
              {currentDifficulty}
            </span>
          </div>
          <div
            className="absolute lg:top-20 sm:top-32 top-24 left-4 text-[2vmax] cursor-pointer hover:opacity-60 transition-opacity"
            onClick={onInstuctionOpen}
          >
            instructions
          </div>
        </div>
      )}
      {gameState === 1 && (
        <GameScene
          setGameState={setGameState}
          currentDifficulty={currentDifficulty}
        ></GameScene>
      )}
      {/* choose difficulty */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "bg-[#ffffffcc]",
          backdrop: "bg-[#ffffff00]",
        }}
        className=" font-[saibo]"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" font-thin text-3xl flex justify-center items-center w-full">
                choose your difficulty
              </ModalHeader>
              <ModalBody className="text-3xl font-thin">
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 1 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(1)}
                >
                  lv 1
                </div>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 2 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(2)}
                >
                  lv 2
                </div>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 3 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(3)}
                >
                  lv 3
                </div>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 4 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(4)}
                >
                  lv 4
                </div>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 5 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(5)}
                >
                  lv 5
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#ffcafbbb] hover:bg-[#ff6be4a3] font-thin text-2xl"
                  onPress={() => {
                    onClose();
                  }}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isInstuctionOpen}
        onOpenChange={onInstuctionOpenChange}
        classNames={{
          base: "bg-[#ffffffcc]",
          backdrop: "bg-[#ffffff00]",
        }}
        className=" "
        size="3xl"
      >
        <ModalContent>
          {(onclose) => (
            <>
              <ModalHeader className=" font-thin text-3xl flex justify-center items-center w-full">
                <h2 className="font-[saibo]">注意事项</h2>
              </ModalHeader>
              <ModalBody className="text-xl font-light">
                <p>
                  1.
                  本应用部署在Github上，所以需要确保你的网络环境能够正常访问Github，以确保流畅体验。
                </p>
                <p>
                  2.
                  本应用通过移动鼠标进行，目标是躲过大罪司教，保护雷姆！移动到蓝色范围可以保护范围内的雷姆，分数增加！移动到红色区域就会把大罪司教放进来，分数降低！大罪司教出现前有红色闪烁预警。
                </p>
                <p>
                  3.
                  不同难度区域的出现速度不同，区域大小不同，留存时间不同，区域分数不同，lv1-lv5大罪司教区域最高失分分别为-100，-200，-500，-999，-9999。
                </p>
                <p>
                  4.
                  虽然我觉得不太可能，但是如果在lv5分别达到了22222和44444分的话可以找我领取奖励~
                </p>
                <p>
                  5. 蓝色区域的雷姆GIF来自B战up主
                  <a href="https://space.bilibili.com/8248150" target="_blank">
                    Incana在打鱼
                  </a>
                  ，侵删。
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#ffcafbbb] hover:bg-[#ff6be4a3] font-thin text-2xl font-[saibo]"
                  onPress={() => {
                    cookie.set("RemShelterInstuctionReaded", "yes", {
                      expires: 365,
                    });
                    onclose();
                  }}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemShelterPage;
