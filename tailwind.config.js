/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-bg": "#f0eeeb",
        "light-gray": "#d1ccc3",
        "dark-blue": "#1d2e50",
        "teal-check": "#019e99",
        "asia-colour": "#006664",
        "europe-colour": "#066b8e",
        "global-colour": "#de7900",
        "uk-colour": "#3a8ac9",
        "emerging-colour": "#019e99",
      },
      gridTemplateColumns: {
        "20-80": "20% 80%",
      },
    },
  },
  plugins: [],
};
