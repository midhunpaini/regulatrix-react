/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0b1220",
          panel: "#111a2b",
          muted: "#94a3b8",
          accent: "#22d3ee",
        },
      },
      boxShadow: {
        soft: "0 12px 30px -18px rgba(34, 211, 238, 0.45)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
