/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        title:["Sixtyfour", "serif"],
        frijole:[ "Frijole", "serif"],
        bentham:[ "Bentham", "serif"],
        Merriweather: ["Merriweather", "serif"]
      },
      colors: {
        'custom-dark': 'rgba(25,73,93,1)',
        'radio-yellow': 'rgb(234 216 106)',
      },
      screens: {
        nesthub: { raw: "(width: 1024px) and (height: 600px)" }, 
        mypc: { raw: "(width: 1920px) and (height: 1080px)" }, 
      },
    },
  },
  plugins: [],
}

