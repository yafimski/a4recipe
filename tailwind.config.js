/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        fluidTitle: "var(--fluid-16-40)",
        fluidSubtitle: "var(--fluid-16-24)",
      },
    },
  },
  plugins: [],
};
