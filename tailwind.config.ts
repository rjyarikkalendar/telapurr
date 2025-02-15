import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cream: "#F5F5F0",
        tea: {
          brown: "#8B4513",
          green: "#90A959",
          text: "#2A2A2A",
          bg: "#FDFBF7",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "leaf-fall": {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(6px) rotate(5deg)",
          },
          "66%": {
            transform: "translateY(10px) rotate(-3deg)",
          },
          "100%": {
            transform: "translateY(0) rotate(0deg)",
          },
        },
        "liquid-wave": {
          "0%": {
            transform: "translateX(0)",
          },
          "33%": {
            transform: "translateX(2px) skewX(-2deg)",
          },
          "66%": {
            transform: "translateX(-1px) skewX(1deg)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "package-open": {
          "0%": {
            transform: "scaleY(1)",
          },
          "50%": {
            transform: "scaleY(0.95)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        "slide-fade": {
          "0%": {
            opacity: "0",
            transform: "translateX(50%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "leaf-fall": "leaf-fall 1.5s ease-in-out infinite",
        "liquid-wave": "liquid-wave 1s ease-in-out infinite",
        "package-open": "package-open 1s ease-in-out infinite",
        "slide-fade": "slide-fade 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
