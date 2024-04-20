"use client";

import { useEffect, useState } from "react";

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
            <div className="h-[75vh]">rmt</div>
            <div className="h-[75vh]">rmt</div>
            <div>scrollTop: {scrollTop}</div>
        </div>
    )
}
