const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vistarGreen': '#004934',
        'vistarGreenHover' : '#008761',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

