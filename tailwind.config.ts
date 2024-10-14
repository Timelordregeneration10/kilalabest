import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lqlm: "580px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "streamer-color": "linear-gradient(90deg, #91bdf044, #ee82ee44, #91bdf044)",
        leaveweb: "url('./assets/musedash/leaving.webp')", //最终会被打包到global.css
        kilalascene: "url('./assets/musedash/kilalascene.webp')",
        rmt: "url('./assets/musedash/rmt.webp')",
        project: "url('./assets/musedash/project.webp')",
        application: "url('./assets/musedash/application.webp')",
        attempt: "url('./assets/musedash/attempt.webp')",
        music: "url('./assets/musedash/music.webp')",
        anime: "url('./assets/musedash/anime.webp')",
        game: "url('./assets/musedash/game.webp')",
        drawing: "url('./assets/musedash/drawing.webp')",
        warning: "url('./assets/musedash/warning.webp')",
        graffiti: "url('./assets/drawing/graffiti/bg.jpg')",
      },
      keyframes: {
        streamer: {
          "100%": {
            backgroundPosition: "-400%",
          },
        },
        personwebheart: {
          from: {
            transform: "translate(0px, 0px)",
            opacity: "1",
          },
          to: {
            transform: "translate(0px, -100px)",
            opacity: "0",
          },
        },
        rmtcycle: {
          from: {},
          to: {
            transform: "translateX(-50%)",
          },
        },
        scrollcycle: {
          from: {
            transform: "translateY(-10px)",
          },
          to: {
            transform: "translateY(30px)",
          },
        },
        sanInfinity: {
          "0%": {
            clipPath: "inset(20% -15px 60% 0)",
            transform: "translate(-18px, 15px)",
            visibility: "visible",
          },
          "3%": {
            clipPath: "inset(50% -15px 30% 0)",
            transform: "translate(18px, -15px)",
          },
          "6%": {
            clipPath: "inset(20% -15px 60% 0)",
            transform: "translate(15px, 0px)",
          },
          "9%": {
            clipPath: "inset(80% -15px 5% 0)",
            transform: "translate(-24px, 15px)",
          },
          "12%": {
            clipPath: "inset(0 -15px 80% 0)",
            transform: "translate(-12px, -9px)",
          },
          "15%": {
            clipPath: "inset(50% -15px 30% 0)",
            transform: "translate(-18px, -15px)",
          },
          "18%": {
            clipPath: "inset(80% -15px 5% 0)",
            transform: "translate(-21px, 15px)",
          },
          "21%": {
            clipPath: "inset(0 -15px 80% 0)",
            transform: "translate(9px, 18px)",
          },
          "24%": {
            clipPath: "inset(50% -15px 30% 0)",
            transform: "translate(15px, 15px)",
          },
          "27%": {
            clipPath: "inset(20% -15px 60% 0)",
            transform: "translate(18px, -15px)",
          },
          "30%": {
            clipPath: "inset(0 -15px 80% 0)",
            transform: "translate(3px, 15px)",
          },
          "33%": {
            visibility: "hidden",
          },
        },
        turn24: {
          "100%": {
            transform: "rotateX(360deg) rotateY(360deg)",
          },
        },
        cardRotate: {
          "0%": {
            transform: " rotateY(0deg)",
          },
          "100%": {
            transform: " rotateY(360deg)",
          },
        },
        concreter: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slowbigger: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.2)",
          },
        },
        moving1: {
          "100%": {
            transform: "translate(0,0) scale(1)",
          },
          "0%": {
            transform: "translate(-20%, -20%) scale(2)",
          },
          "33%": {
            transform: "translate(-20%, 20%) scale(2)",
          },
          "66%": {
            transform: "translate(20%,0) scale(2)",
          },
        },
        moving2: {
          "100%": {
            transform: "translate(0,0) scale(1)",
          },
          "0%": {
            transform: "translate(20%, 20%) scale(2)",
          },
          "33%": {
            transform: "translate(20%, -20%) scale(2)",
          },
          "66%": {
            transform: "translate(-20%,0) scale(2)",
          },
        },
        moving3: {
          "100%": {
            transform: "translate(0,0) scale(1)",
          },
          "0%": {
            transform: "translate(-20%, 20%) scale(2)",
          },
          "33%": {
            transform: "translate(20%, 20%) scale(2)",
          },
          "66%": {
            transform: "translate(0,-20%) scale(2)",
          },
        },
        moving4: {
          "100%": {
            transform: "translate(0,0) scale(1)",
          },
          "0%": {
            transform: "translate(20%, -20%) scale(2)",
          },
          "33%": {
            transform: "translate(-20%, -20%) scale(2)",
          },
          "66%": {
            transform: "translate(0,20%) scale(2)",
          },
        },
        rotate3d1: {
          "0%": {
            transform: "translate(-40%,-40%) rotate3d(1,1,1,90deg) scale(1)",
          },
          "80%": {
            transform: "translate(0,0) rotate3d(0) scale(1.2)",
          },
          "90%": {
            transform: "scale(1.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        rotate3d2: {
          "0%": {
            transform: "translate(40%,-40%) rotate3d(1,-2,1,180deg) scale(1)",
          },
          "80%": {
            transform: "translate(0,0) rotate3d(0) scale(1.2)",
          },
          "90%": {
            transform: "scale(1.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        rotate3d3: {
          "0%": {
            transform: "translate(-40%,40%) rotate3d(1,1,-2,270deg) scale(1)",
          },
          "80%": {
            transform: "translate(0,0) rotate3d(0) scale(1.2)",
          },
          "90%": {
            transform: "scale(1.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        rotate3d4: {
          "0%": {
            transform: "translate(40%,40%) rotate3d(1,1,-1,360deg) scale(1)",
          },
          "80%": {
            transform: "translate(0,0) rotate3d(0) scale(1.2)",
          },
          "90%": {
            transform: "scale(1.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        rotate1: {
          "0%": {
            transform: "translateX(-40%) rotate(0deg) scale(2)",
          },
          "100%": {
            transform: "translateX(0) rotate(360deg) scale(1)",
          },
        },
        rotate2: {
          "0%": {
            transform: "translateY(40%) rotate(135deg) scale(0.5)",
          },
          "100%": {
            transform: "translateY(0) rotate(720deg) scale(1)",
          },
        },
        rotate3: {
          "0%": {
            transform: "translateY(-40%) rotate(135deg) scale(2)",
          },
          "100%": {
            transform: "translateY(0) rotate(360deg) scale(1)",
          },
        },
        rotate4: {
          "0%": {
            transform: "translateX(40%) rotate(270deg) scale(0.5)",
          },
          "100%": {
            transform: "translateX(0) rotate(720deg) scale(1)",
          },
        },
        rising: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-95%)",
          },
        },
        falling: {
          "0%": {
            transform: "translateY(0%)",
          },
          "100%": {
            transform: "translateY(95%)",
          },
        },
        notbiggest: {
          from: {
            transform: "translateX(100vw)",
          },

          to: {
            transform: "translateX(-300vw)",
          },
        },
        toLeftBottom: {
          from: {
            transform: "translate(0, 0)",
          },

          to: {
            transform: "translate(-50vw,70vh)",
          },
        },
        musicAnimation: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.3)",
          },
        },
        warning: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        streamer: "streamer 5s infinite linear",
        personwebheart: "personwebheart 2s linear forwards",
        rmtcycle: "rmtcycle 10s linear infinite backwards",
        scrollcycle: "scrollcycle 1.3s linear infinite",
        sanInfinity: "sanInfinity 3s steps(1) infinite",
        turn24: "turn24 6s linear infinite",
        cardRotate: "cardRotate 6s linear infinite",
        concreter: "concreter 1.5s linear forwards",
        slowbigger: "slowbigger 6s linear forwards",
        moving1: "moving1 3s ease forwards",
        rising: "rising 1s linear alternate infinite",
        falling: "falling 1s linear alternate infinite",
        notbiggest: "notbiggest 7s linear 1 forwards",
        toLeftBottom: "toLeftBottom 1s linear 1 forwards",
        musicAnimation: "musicAnimation 30s linear alternate infinite",
        warning: "warning 0.2s linear infinite alternate",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@xpd/tailwind-3dtransforms")],
};
export default config;
