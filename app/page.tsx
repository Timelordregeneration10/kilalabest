"use client";

import { useEffect, useState } from "react";
import KilalaScene from "./components/kilalaScene";
import RMTScene from "./components/RMTScene";
import ProjectScene from "./components/projectScene";
import ApplicationScene from "./components/applicationScene";
import AttemptScene from "./components/attemptScene";
import ToolScene from "./components/toolScene";
import AnimeScene from "./components/animeScene";
import GameScene from "./components/gameScene";
import DrawingScene from "./components/drawingScene";

export default function Home() {

    // const [scrollTop, setScrollTop] = useState(localStorage ? (localStorage.getItem('kilaScrollTop') ? parseInt(localStorage.getItem('kilaScrollTop') as string) : 0) : 0);
    const [scrollTop, setScrollTop] = useState(0);
    const refreshScrollTop = () => {
        if (localStorage.getItem('kilaScrollTop')) setScrollTop(parseInt(localStorage.getItem('kilaScrollTop') as string));
        requestAnimationFrame(refreshScrollTop);
    }

    useEffect(() => {
        refreshScrollTop();
    }, []);

    return (
        <div>
            <KilalaScene></KilalaScene>
            <RMTScene scrollTop={scrollTop}></RMTScene>
            <ProjectScene></ProjectScene>
            <ApplicationScene></ApplicationScene>
            <AttemptScene></AttemptScene>
            <ToolScene></ToolScene>
            <AnimeScene></AnimeScene>
            <GameScene></GameScene>
            <DrawingScene></DrawingScene>
        </div>
    )
}
