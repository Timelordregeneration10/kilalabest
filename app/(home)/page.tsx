import KilalaScene from "./components/kilalaScene";
import RMTScene from "./components/RMTScene";
import ProjectScene from "./components/projectScene";
import ApplicationScene from "./components/applicationScene";
import AttemptScene from "./components/attemptScene";
import MusicScene from "./components/musicScene";
import AnimeScene from "./components/animeScene";
import GameScene from "./components/gameScene";
import DrawingScene from "./components/drawingScene";

export default function Home() {
  return (
    <div>
      <KilalaScene></KilalaScene>
      <RMTScene></RMTScene>
      <ProjectScene></ProjectScene>
      <ApplicationScene></ApplicationScene>
      <AttemptScene></AttemptScene>
      <MusicScene></MusicScene>
      <AnimeScene></AnimeScene>
      <GameScene></GameScene>
      <DrawingScene></DrawingScene>
    </div>
  );
}
