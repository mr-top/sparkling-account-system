import daisyui from "./node_modules/daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        myDark: {
          "primary": "#6b21a8",
          "secondary": "#1d4ed8",
          "accent": "#84cc16",
          "neutral": "#1c1917",
          "base-100": "#2e2a2e",
          "info": "#3fccff",
          "success": "#00ffb3",
          "warning": "#ffc300",
          "error": "#ff005f",
        },
        myLight: {
          "primary": "#1c1917",
          "secondary": "#6d28d9",
          "accent": "#06b6d4",
          "neutral": "#9ca3af",
          "base-100": "#f5f5f4",
          "info": "#006bda",
          "success": "#49cb15",
          "warning": "#f1b300",
          "error": "#db002a",
        },
      },
    ],
  }
}