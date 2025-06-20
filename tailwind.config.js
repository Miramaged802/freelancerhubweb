/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: {
          40: "#F7F7F7",
          50: "#F1F6F9",
          100: "#E4EBF0",
          200: "#D7E0E7",
          300: "#CAD5DE",
          400: "#9BA4B4",
          500: "#394867",
          600: "#14274E",
          700: "#111F3E",
          800: "#0E172E",
          900: "#0B0F1E",
        },
        background: "#F1F6F9",
        surface: "#FFFFFF",
        text: {
          primary: "#14274E",
          secondary: "#394867",
          muted: "#9BA4B4",
        },
        gray: {
          50: "#F1F6F9",
          100: "#E4EBF0",
          200: "#D7E0E7",
          300: "#CAD5DE",
          400: "#9BA4B4",
          500: "#394867",
          600: "#14274E",
          700: "#111F3E",
          800: "#0E172E",
          900: "#0B0F1E",
        },
        secondary: {
          50: "#FCEFF1",
          100: "#FCCDD8",
          200: "#FAAAB0",
          300: "#F88888",
          400: "#F56660",
          500: "#F34438",
          600: "#C62D2A",
          700: "#94201F",
          800: "#621414",
          900: "#300908",
        },
        success: {
          50: "#EBFAF0",
          100: "#CFF5E0",
          200: "#A1EDC0",
          300: "#61E4A0",
          400: "#23DC80",
          500: "#12C75E",
          600: "#10A04C",
          700: "#0C7034",
          800: "#084E23",
          900: "#042B11",
        },
        warning: {
          50: "#FFF8EB",
          100: "#FFEDC1",
          200: "#FCDC79",
          300: "#F8C12F",
          400: "#E8AA19",
          500: "#D68C04",
          600: "#B17004",
          700: "#8C5405",
          800: "#673C03",
          900: "#412501",
        },
        danger: {
          50: "#FFF1F2",
          100: "#FFD8DA",
          200: "#FFA4B0",
          300: "#FF6F86",
          400: "#FF3A5D",
          500: "#FF0F45",
          600: "#CC0C38",
          700: "#99092A",
          800: "#66061C",
          900: "#33030E",
        },
        info: {
          50: "#E8F4FF",
          100: "#C5E0FF",
          200: "#8FBEFF",
          300: "#599BFF",
          400: "#2D7CFF",
          500: "#005DF7",
          600: "#004EC4",
          700: "#003F91",
          800: "#002F5E",
          900: "#001F2A",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, theme("colors.primary.500"), theme("colors.primary.600"))',
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(20, 39, 78, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(20, 39, 78, 0.1), 0 1px 2px 0 rgba(20, 39, 78, 0.06)",
        md: "0 4px 6px -1px rgba(20, 39, 78, 0.1), 0 2px 4px -1px rgba(20, 39, 78, 0.06)",
        lg: "0 10px 15px -3px rgba(20, 39, 78, 0.1), 0 4px 6px -2px rgba(20, 39, 78, 0.05)",
        xl: "0 20px 25px -5px rgba(20, 39, 78, 0.1), 0 10px 10px -5px rgba(20, 39, 78, 0.04)",
        "2xl": "0 25px 50px -12px rgba(20, 39, 78, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(20, 39, 78, 0.06)",
        card: "0 4px 6px -1px rgba(20, 39, 78, 0.1), 0 2px 4px -1px rgba(20, 39, 78, 0.06)",
      },
      spacing: {
        72: "18rem",
        80: "20rem",
        96: "24rem",
        128: "32rem",
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
        fast: "100ms",
        slow: "300ms",
      },
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        auto: "auto",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
