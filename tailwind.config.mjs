/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#111217",
        panel: "#181923",
        line: "#2f3240",
        volt: "#b7ff4a",
        pulse: "#00d4ff",
        coral: "#ff5f6d"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(0, 212, 255, 0.16)"
      }
    }
  },
  plugins: []
};
