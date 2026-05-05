/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#39DB4A",
        hovergreen: "#2EB43E",
        lightHoverGreen: "#75EC71",
        lhgreen: "#9BFC98",
        LightHoverRed: "#FD8B8B",
        red: "#FF6868",
        secondary: "#555",
        primary: "#FCFCFC",
        myYellowOne: "#FFD740",
        mYyellow: "#CCA925",
        myHoverYellow: "#CEC338",
        textYellow: "#B89618",
        textDarkYellow: "#997C0E",
        simpleLightYellow: "#0d94884d",
        cardYellow: "#FFFADF",
        yellow: {
          100: "#0d94884d", // 👈 change this hex,
          200: "#0d948880",
          300: "#0d9488b3", // 👈 change this hex
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
