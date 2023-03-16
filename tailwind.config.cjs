/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue100: "rgba(219, 222, 240, 1)",
        blue150: "rgba(214, 219, 245, 1)",
        blue200: "rgb(77, 91, 158)",
        blue300: "rgb(41, 50, 100)",
        white100: "rgb(245, 247, 251)",
        incorrect: "rgba(248, 188, 188, 1)",
        correct: "rgba(148, 215, 162, 1)",
      },

      animation: {
        fadeIn: "fadeIn 1s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
