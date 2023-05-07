/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {
      colors:{
        primary:'#FF0000',
        secondry:'#00FF00'
      },
    },
  },
  plugins: [],
}

