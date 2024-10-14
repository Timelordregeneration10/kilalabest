"use client";
import { useState } from "react";
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

const RemAbsorbPage: React.FC = () => {
  const [gameState, setGameState] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {gameState === 0 && (
        <div className="relative w-screen h-screen p-60 text-[3vmax] flex flex-col justify-start items-start flex-wrap gap-10 overflow-hidden">
          {/* start scene */}
          <div
            className="cursor-pointer hover:opacity-50"
            onClick={() => {
              setGameState(1);
            }}
          >
            play
          </div>
          <div className="cursor-pointer hover:opacity-50" onClick={onOpen}>
            change difficulty
          </div>
          <div className="absolute top-20 right-4 text-[3vmax]">
            current difficulty: lv{" "}
            <span className=" text-[4vmax]  text-[#91bef0] ">
              {currentDifficulty}
            </span>
          </div>
        </div>
      )}
      {gameState === 1 && (
        <GameScene
          setGameState={setGameState}
          currentDifficulty={currentDifficulty}
        ></GameScene>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className=""
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>choose difficulty</ModalHeader>
              <ModalBody>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 1 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(1)}
                >
                  1
                </div>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 2 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(2)}
                >
                  2
                </div>
                <div
                  className={`w-full p-4 rounded-md transition-background hover:bg-[#91bef022] ${
                    currentDifficulty === 3 ? "bg-[#91bef022]" : ""
                  }`}
                  onClick={() => setCurrentDifficulty(3)}
                >
                  3
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#caffcabb] hover:bg-[#6bff6ba3]"
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
    </>
  );
};

export default RemAbsorbPage;
