/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "max-sm": { max: "540px" },
        sm: "540px",
        md: "720px",
        lg: "960px",
        "lg-max": { max: "960px" },
        xl: "1140px",
        "2xl": "1320px",
      },
      colors: {
        "danger": "#FF4D4E",
        "hover-danger": "#B41A1A",
        "background-color": "#FAFAFA",
        "primary-color": "#0346A5",
        "hover-primary": "#033A87",
        "secondary-color": "#800080",
        "third-color": "#FFA500",
        "dark-bg": "#10172a",
        "text-color": "#363636",
        "description-color": "#636363",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
