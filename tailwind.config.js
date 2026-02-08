/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'love-red': '#ff4d6d',
        'love-pink': '#ffb3c1',
        'love-dark': '#590d22',
        'gold-light': '#ffd700', // Per anniversario/compleanno
        'gold-dark': '#b8860b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}