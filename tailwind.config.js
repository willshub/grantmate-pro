/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'consultant-blue': '#2D6CDF',
        'success-green': '#5FD068',
        'slate-bg': '#F8FAFC',
        'slate-border': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 