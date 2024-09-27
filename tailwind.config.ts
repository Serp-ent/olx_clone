import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002f34',       // Dark Green
        secondary: '#002f6c',     // Dark Blue
        accent: '#23b2b0',        // Turquoise
        background: '#e5e7eb',

        // TODO: dark color scheme
        // dark: {
        //   primary: '#1a3a3f',     // Darker version of primary color for dark mode (example)
        //   secondary: '#1a375b',   // Darker secondary color (example)
        //   background: '#1c1c1e',  // Dark mode background color (dark gray, etc.)
        // }
      },
    },
  },
  plugins: [],
};
export default config;
