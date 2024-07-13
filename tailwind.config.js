/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayBg: "#f0eeeb",
        darkBlue: "#1d2e50",
      },
    },
  },
  plugins: [],
};
