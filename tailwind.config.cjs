/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#1e1e20',
        'main-box': '#252529',
        'dark-text': '#8c8c92',
        'accent-purple': '#bd34fe',
        'accent-blue': '#646cff',
        'main-box-light': '#f6f6f7',
        'light-text': '#3C3C43',
        'light-b': '#dfdfe1'  
      },
      minHeight: {
        'body-min': 'calc(100vh - 75px)',
        'body-small': 'calc(100vh - 60px)'
      }
    },
  },
  plugins: [],
}
