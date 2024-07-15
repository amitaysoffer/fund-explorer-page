/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayBg: "#f0eeeb",
        "light-gray": "#d1ccc3",
        darkBlue: "#1d2e50",
        "teal-check": "#019e99",
        "blue-light": "#1d2e50",
      },
    },
  },
  plugins: [],
};
