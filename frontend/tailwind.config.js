/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090a12',
        panel: '#111528',
        neon: '#47e5ff',
        violet: '#8f5cff'
      },
      boxShadow: {
        glow: '0 0 25px rgba(71, 229, 255, 0.35)'
      }
    }
  },
  plugins: []
};
