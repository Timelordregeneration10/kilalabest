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
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Nicholas Burkhardt",
    url: "https://kilalabest.cn",
    image: "https://kilalabest.cn/profile.jpg",
    sameAs: [
      "https://github.com/Timelordregeneration10",
      "https://kilalabest.cn",
    ],
    jobTitle: "Frontend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Nicholas Burkhardt",
    },
  };

  return (
    <div className=" min-h-screen w-full overflow-hidden">
      <KilalaScene></KilalaScene>
      <RMTScene></RMTScene>
      <ProjectScene></ProjectScene>
      <ApplicationScene></ApplicationScene>
      <AttemptScene></AttemptScene>
      <MusicScene></MusicScene>
      <AnimeScene></AnimeScene>
      <GameScene></GameScene>
      <DrawingScene></DrawingScene>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
