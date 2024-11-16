/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        heading: "4rem",
        subheading: "2rem",
        caption2: "[1.2rem]",
        caption: "1rem",
      },
      colors: {
        login_main: "#212121",
        login_secondary: "#1A1A1A",
        app_main: "#1A1A1A",
        app_secondary: "#212121",
        text_primary: "#FFFFFF",
        text_secondary: "#000",
        button_primary: "#0360FF",
        button_secondary: "#1A1A1A",
        swiperActive: "#0360FF",
        swiperInactive: "#FFFFFF",
        input_background: "#565656",
        input_placeholder: "#FFFFFF",
        nav_inactive: "#212121",
        nav_active: "#565656",
      },
    },
  },
  plugins: [],
};
