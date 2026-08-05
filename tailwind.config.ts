import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1B1523",
          soft: "#221A2B",
        },
        surface: {
          DEFAULT: "#251C2E",
          raised: "#2E2338",
        },
        flash: {
          DEFAULT: "#F2B84B",
          warm: "#E89B3C",
          soft: "#F7CE7E",
        },
        blush: {
          DEFAULT: "#E8879E",
          soft: "#F2AFC0",
        },
        cream: "#F7F3F0",
        muted: "#B8A9C4",
        line: "rgba(247,243,240,0.09)",
        "ink-text": "#1B1523",
        "muted-dark": "#57534E",
        paper: {
          DEFAULT: "#FFFFFF",
          raised: "#FAF7F2",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "flash-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(242,184,75,0.35) 0%, rgba(242,184,75,0) 70%)",
        "blush-glow":
          "radial-gradient(50% 50% at 50% 50%, rgba(232,135,158,0.30) 0%, rgba(232,135,158,0) 70%)",
        grain: "url('/images/grain.svg')",
      },
      boxShadow: {
        strip: "0 30px 60px -20px rgba(0,0,0,0.55)",
        glow: "0 0 40px rgba(242,184,75,0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "flash-pop": {
          "0%": { opacity: "0" },
          "8%": { opacity: "1" },
          "20%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
        "flash-pop": "flash-pop 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
