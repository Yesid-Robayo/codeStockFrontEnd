/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        enterFromLeft: {
          from: {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        enterFromRight: {
          from: {
            transform: "translateX(100%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        spinFromRight: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        spinFromLeft: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(-360deg)",
          },
        },
        exitfromLeft: {
          from: {
            transform: "translateX(0)",
            opacity: "1",
          },
          to: {
            transform: "translateX(-100%)",
            opacity: "0",
          },
        },
        enterFromBack: {
          from: {
            transform: "translateY(100%) scale(0)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        enterFromBack: "enterFromBack 1s ease-out forwards",
        enterFromLeft: "enterFromLeft 1s ease-out forwards",
        enterFromRight: "enterFromRight .5s ease-out forwards",
        exitfromLeft: "exitfromLeft 1s ease-out forwards",
        spinFromRight: "spinFromRight .3s linear forwards ",
        spinFromLeft: "spinFromLeft .3s linear forwards",
      },
    },
  },
  plugins: [],
};
