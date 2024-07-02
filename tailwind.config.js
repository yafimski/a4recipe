/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        fluidTitle: "var(--fluid-16-40)",
        fluidSubtitle: "var(--fluid-16-24)",
        fluidCard: "var(--fluid-6-16)",
        fluidFooter: "var(--fluid-2-6)",
      },
    },
  },
  plugins: [],
};
