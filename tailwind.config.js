/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'logo-pink': '#F500A2',
        'pink-dark': '#d50790',
        'pink-light': '#f424ae'
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}

