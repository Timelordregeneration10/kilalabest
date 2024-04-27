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
      'lqlm': '580px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "streamer-color": "linear-gradient(90deg, #03a9f4, #f441a5, #03a9f4)",
        "leaveweb": "url('./components/img/musedash/leaving.webp')", //最终会被打包到global.css
        "kilalascene": "url('./components/img/musedash/kilalascene.webp')",
        "rmt": "url('./components/img/musedash/rmt.webp')",
        "project": "url('./components/img/musedash/project.webp')",
        "application": "url('./components/img/musedash/application.webp')",
        "attempt": "url('./components/img/musedash/attempt.webp')",
        "tool": "url('./components/img/musedash/tool.webp')",
        "anime": "url('./components/img/musedash/anime.webp')",
        "game": "url('./components/img/musedash/game.webp')",
        "drawing": "url('./components/img/musedash/drawing.webp')",
        "warning": "url('./components/img/musedash/warning.webp')",
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
          }
        },
        scrollcycle: {
          from: {
            transform: "translateY(-10px)",
          },
          to: {
            transform: "translateY(30px)",
          }
        },
        sanInfinity: {
          '0%': {
            clipPath: "inset(20% -15px 60% 0)",
            transform: 'translate(-18px, 15px)',
            visibility: 'visible',
          },
          '3%': {
            clipPath: 'inset(50% -15px 30% 0)',
            transform: 'translate(18px, -15px)',
          },
          '6%': {
            clipPath: 'inset(20% -15px 60% 0)',
            transform: 'translate(15px, 0px)',
          },
          '9%': {
            clipPath: 'inset(80% -15px 5% 0)',
            transform: 'translate(-24px, 15px)',
          },
          '12%': {
            clipPath: 'inset(0 -15px 80% 0)',
            transform: 'translate(-12px, -9px)',
          },
          '15%': {
            clipPath: 'inset(50% -15px 30% 0)',
            transform: 'translate(-18px, -15px)',
          },
          '18%': {
            clipPath: 'inset(80% -15px 5% 0)',
            transform: 'translate(-21px, 15px)',
          },
          '21%': {
            clipPath: 'inset(0 -15px 80% 0)',
            transform: 'translate(9px, 18px)',
          },
          '24%': {
            clipPath: 'inset(50% -15px 30% 0)',
            transform: 'translate(15px, 15px)',
          },
          '27%': {
            clipPath: 'inset(20% -15px 60% 0)',
            transform: 'translate(18px, -15px)',
          },
          '30%': {
            clipPath: 'inset(0 -15px 80% 0)',
            transform: 'translate(3px, 15px)',
          },
          '33%': {
            visibility: 'hidden',
          },
        },
        turn24: {
          '100%': {
            transform: 'rotateX(360deg) rotateY(360deg)',
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
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("@xpd/tailwind-3dtransforms"),
  ],
};
export default config;
