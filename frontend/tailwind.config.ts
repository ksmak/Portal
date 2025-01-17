import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55ACEE',
        secondary: '#e6f3ff',
        bcolor: '#939597'
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
