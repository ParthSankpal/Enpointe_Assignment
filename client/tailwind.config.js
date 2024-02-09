/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Higuen:"Higuen",
        Norwester:'Norwester',
        Rubik:['sans-serif'],
        Tilt_Prism:['cursive'],
        Outfit:['sans-serif'],
        Poppins: ['sans-serif'],
        Spotify:"Spotify"
      },
      colors: {
        'custom-beige': '#fffbea',
      },
      backgroundImage: {
        'hero': "url('./src/assets/giant-glass-buildings.jpg')",
      },
    },
    
  },
  // plugins: [
  //   require('@tailwindcss/line-clamp'),
  // ],
}