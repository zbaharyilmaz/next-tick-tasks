/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pompiere: ["var(--font-pompiere)"],
      },
      // colors: {
      //   taskcolor: {
      //     green1: "#0A7355",
      //     green2: "#0B5943",
      //     green3: "#03A696",
      //     darker: "#0B261E",
      //     blue: "#03738C",
      //     button1: "#F2B749",
      //     button2: "#F22E62",
      //     button3: "#0FBF1B",
      //     pink:"#F2809F",
      //   },
      // },
    },
  },
  plugins: [],
};
