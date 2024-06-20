/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(223,25,170,0.41789215686274506) 36%, rgba(71,192,215,1) 100%)',
      },
      fontFamily:{
        'Robot':["Roboto Mono", "monospace"],
        'Hindi':["Hind", "sans-serif"],
      }
    },
  },
  plugins: [],
}