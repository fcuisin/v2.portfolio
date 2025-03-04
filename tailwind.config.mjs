/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "fira-code": ["Fira Code", "monospace"],
      },
      colors: {
        primary: "#fca311",
        secondary: "#8892b0",
        light: "#ced4da",
        navy: {
          DEFAULT: "#0a192f",
          light: "#112240",
          lighter: "#233554",
          dark: "#020c1b",
        },
        slate: {
          light: "#a8b2d1",
          lighter: "#ccd6f6",
        },
      },
    },
  },
  plugins: [],
};
