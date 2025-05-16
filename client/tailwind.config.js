/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#f2af29",
        secondary: "#eae151",
        background: "#e0e0ce",
        text: "#000000",
        txtCard: "#1F384C",
        accent: "#C7253E",
        accent2: "#FF6969",
        bgForm: "#F6F8FA",
        redDark: "#F93827",
        greenDark: "#16C47F",
        yellowDark: "#FFD65A",
        bgWhite: "#F6F8FA",
        grayDark: "#edede9",
        yellowLight: "#fdd85d",
        brownLight: "#edc531",
        brownLight2: "#ffe6a7",
        brownDark:"#5a1a00"
      },
      backgroundImage: {
        gradientPrimary: "linear-gradient(to bottom right, #FFB330, #FFFCDE)",
        gradientRed: "linear-gradient(45deg, #ED213A, #93291E)",
      },
    },
  },
  plugins: [],
};