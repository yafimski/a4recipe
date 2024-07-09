/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        fluidTitle: "var(--fluid-20-28)",
        fluidSubtitle: "var(--fluid-16-24)",
        fluidCard: "var(--fluid-6-16)",
        fluidPrint: "var(--fluid-8-14)",
        fluidPrintTitle: "var(--fluid-10-20)",
        fluidPrintSubtitle: "var(--fluid-6-10)",
      },
      fontFamily: {
        indie: "Indie Flower",
        shadowsLight: "Shadows Into Light",
        roboto: "Roboto",
      },
      aspectRatio: {
        videoReverse: "9/16",
        videoWide: "20/9",
        videoThin: "9/13",
      },
      maxHeight: {
        short: "20cqh",
        half: "55cqh",
        semi: "60cqh",
      },
      height: {
        clampSmall: "var(--h-clamp-small)",
      },
      width: {
        clamp: "var(--w-clamp)",
        clampSmall: "var(--w-clamp-small)",
        inputs: "var(--w-clamp-input)",
        fullImage: "8cqw",
        tinyImage: "3rem",
        printItem: "1.5rem",
        smallPrint: "1rem",
      },
    },
  },
  plugins: [],
};
