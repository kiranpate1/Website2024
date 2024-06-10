import type { Config } from "tailwindcss";
import TypeSystemPlugin from "./TypeSystemPlugin";

const config: Config & {
  theme: {};
} = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-twk-lausanne)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-pt-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [
    TypeSystemPlugin({
      // default base stlying (mobile)
      default: {
        // mono
        "mono-reg": {
          "font-family": "var(--font-pt-mono)",
          "font-size": "1.25rem",
          "letter-spacing": "0.08rem",
          "line-height": "110%",
          "text-transform": "uppercase",
        },
        // sans
        "sans-xl": {
          "font-size": "4rem",
          "letter-spacing": "-0.03rem",
          "line-height": "130%",
        },
        "sans-lg": {
          "font-size": "1.75rem",
          "letter-spacing": "-0.03rem",
          "line-height": "110%",
        },
        "sans-md": {
          "font-size": "2.5rem",
          "letter-spacing": "-0.03rem",
          "line-height": "110%",
        },
        "sans-sm": {
          "font-size": "1rem",
          "letter-spacing": "0rem",
          "line-height": "110%",
        },
      },

      // When screen is at lg breakpoint (desktop)
      lg: {
        // mono
        "mono-reg": {
          "font-family": "var(--font-pt-mono)",
          "font-size": "1.25rem",
          "letter-spacing": "0.08rem",
          "line-height": "110%",
          "text-transform": "uppercase",
        },
        // sans
        "sans-xl": {
          "font-size": "4rem",
          "letter-spacing": "-0.03rem",
          "line-height": "130%",
        },
        "sans-lg": {
          "font-size": "1.75rem",
          "letter-spacing": "-0.03rem",
          "line-height": "110%",
        },
        "sans-md": {
          "font-size": "2.5rem",
          "letter-spacing": "-0.03rem",
          "line-height": "110%",
        },
        "sans-sm": {
          "font-size": "1rem",
          "letter-spacing": "0rem",
          "line-height": "110%",
        },
      },
    }),
  ],
};

export default config;
