module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#A1CEDC",
        darkBlue: "#1D3D47",
      },
    },
  },
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
  plugins: [],
};
