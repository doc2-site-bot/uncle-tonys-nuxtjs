/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/typography")],
  content: [
    "./components/**/*.{vue,tsx}",
    "./pages/**/*.vue",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "*": {
              color: theme("colors.white"),
            },
            "footer *": {
              color: theme("colors.black"),
            },
          },
        },
      }),
    },
  },
};
