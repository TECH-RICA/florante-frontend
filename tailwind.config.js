/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        florante: {
          50: "#f0f7f2",
          100: "#dcefe2",
          200: "#b9dfc6",
          300: "#8cc8a1",
          400: "#5baa78",
          500: "#3a8f5c",
          600: "#2a7247",
          700: "#1a472a",
          800: "#14371f",
          900: "#0e2a18",
          950: "#081f11",
        },
        moss: {
          DEFAULT: "#eaf3ec",
          dark: "#dce9e0",
        },
        accent: {
          DEFAULT: "#4ade80",
          soft: "#86efac",
          dark: "#22c55e",
          muted: "#bbf7d0",
        },
        primary: {
          DEFAULT: "#1a472a",
          foreground: "#ffffff",
        },
        surface: "#ffffff",
        border: "#e5e7eb",
        muted: "#6b7280",
        // Industry page accent colors
        indigo: {
          500: "#6366f1",
          600: "#4f46e5",
        },
        sky: {
          500: "#0ea5e9",
          600: "#0284c7",
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706",
        },
        rose: {
          500: "#f43f5e",
          600: "#e11d48",
        },
        violet: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        teal: {
          500: "#14b8a6",
          600: "#0d9488",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tight2: "-0.03em",
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.4" }],
        sm: ["0.9375rem", { lineHeight: "1.55" }],
        base: ["1.0625rem", { lineHeight: "1.65" }],
        lg: ["1.1875rem", { lineHeight: "1.6" }],
        xl: ["1.3125rem", { lineHeight: "1.45" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.75rem", { lineHeight: "1.25" }],
        "4xl": ["2.125rem", { lineHeight: "1.15" }],
        "5xl": ["2.625rem", { lineHeight: "1.1" }],
        "6xl": ["3.25rem", { lineHeight: "1.05" }],
        "7xl": ["4rem", { lineHeight: "1.0" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,32,24,0.05), 0 8px 24px rgba(16,32,24,0.06)",
        lift: "0 2px 6px rgba(16,32,24,0.06), 0 20px 40px -12px rgba(16,32,24,0.18)",
        glow: "0 0 0 1px rgba(74,222,128,0.25), 0 8px 32px -8px rgba(74,222,128,0.45)",
        "glow-sm": "0 0 0 1px rgba(74,222,128,0.2), 0 4px 16px -4px rgba(74,222,128,0.4)",
        card: "0 1px 2px rgba(16,32,24,0.04), 0 12px 32px -8px rgba(16,32,24,0.10)",
        mega: "0 20px 60px rgba(8,31,17,0.4), 0 1px 0 rgba(255,255,255,0.06)",
        glass: "0 8px 32px rgba(8,31,17,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(to right,rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.05) 1px,transparent 1px)",
        "grid-light":
          "linear-gradient(to right,rgba(16,32,24,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(16,32,24,0.05) 1px,transparent 1px)",
        "grid-faint":
          "linear-gradient(to right,rgba(16,32,24,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(16,32,24,0.03) 1px,transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center,rgba(255,255,255,0.06) 0%,transparent 70%)",
        "hero-mesh":
          "radial-gradient(60% 60% at 12% 0%,rgba(74,222,128,0.22) 0%,transparent 55%),radial-gradient(50% 50% at 90% 12%,rgba(139,92,246,0.14) 0%,transparent 55%),radial-gradient(70% 70% at 60% 90%,rgba(42,114,71,0.35) 0%,transparent 60%)",
        "green-grad":
          "linear-gradient(135deg,#1a472a 0%,#14371f 45%,#081f11 100%)",
        "accent-grad":
          "linear-gradient(135deg,#4ade80 0%,#22c55e 100%)",
        "card-fade":
          "linear-gradient(180deg,rgba(255,255,255,0.02) 0%,rgba(255,255,255,0.14) 100%)",
        "industries-mesh":
          "radial-gradient(60% 80% at 0% 50%,rgba(99,102,241,0.12) 0%,transparent 60%),radial-gradient(50% 60% at 100% 50%,rgba(14,184,166,0.1) 0%,transparent 60%)",
        "labs-mesh":
          "radial-gradient(60% 60% at 20% 0%,rgba(139,92,246,0.18) 0%,transparent 55%),radial-gradient(50% 50% at 80% 80%,rgba(74,222,128,0.14) 0%,transparent 60%)",
        "cta-mesh":
          "radial-gradient(70% 50% at 30% 0%,rgba(74,222,128,0.25) 0%,transparent 55%),radial-gradient(60% 60% at 80% 100%,rgba(42,114,71,0.4) 0%,transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(24px,-32px) scale(1.08)" },
          "66%": { transform: "translate(-20px,18px) scale(0.94)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-down": "fade-down 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        blob: "blob 16s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "toast-in": "toast-in 0.25s ease-out both",
        "slide-down": "slide-down 0.25s cubic-bezier(0.22,1,0.36,1) both",
        "count-up": "count-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
