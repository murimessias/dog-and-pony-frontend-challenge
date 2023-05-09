/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: '#33a6ba',
          red: '#ff7b92',
        },
        primary: {
          'dark-blue': '#313e4f',
          grey: '#989Ea7',
          'light-grey': '#e8edf3',
        },
      },
    },
  },
  plugins: [],
}
