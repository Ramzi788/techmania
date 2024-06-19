const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/dropdown.js",
  ],
  theme: {
    extend: {
      screens: {
        "max-340px": { max: "340px" },
        sm: "640px", // Small screens and up
        "max-sm": { max: "640px" },
        md: "768px", // Medium screens and up
        "max-md": { max: "768px" },
        lg: "1024px", // Large screens and up
        "max-lg": { max: "1024px" },
        xl: "1280px", // Extra large screens and up
        "max-xl": { max: "1280px" },
      },
      colors: {
        searchbar: "#EEEEEE",
        searchbartext: "#747474",
        menucontainer: "#202020",
        inactive: "#C0C0C0",
        dark_green: "#060807",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
        archivo_black: ["Archivo Black", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
