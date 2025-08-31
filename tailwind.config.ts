// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada para la boda - Azul pastel
        "wedding-olive": "#a9c4dd", // Azul pastel principal
        "wedding-olive-dark": "#76899a", // Azul pastel oscuro
        "wedding-olive-light": "#bacfe3", // Azul pastel muy claro
        "wedding-accent": "#4b5d73", // Azul oscuro para acentos
        "wedding-gold": "#d4a574", // Dorado suave para detalles
        "wedding-cream": "#fdf6f0", // Crema
        "wedding-sage": "#b5c2a9", // Verde salvia claro
        "wedding-white": "#ffffff",
        "wedding-gray": {
          light: "#f5f5f5",
          medium: "#e5e5e5",
          dark: "#333333",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Montserrat", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        "envelope-open": "envelopeOpen 1.5s ease-in-out forwards",
        "heart-beat": "heartBeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        envelopeOpen: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
