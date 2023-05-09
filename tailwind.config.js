// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')

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
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
      },
      boxShadow: {
        'extra-large': '0px 25px 50px -10px rgba(0, 0, 0, 0.25)',
        base: '0px 10px 15px -5px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
        inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.06)',
        large:
          '0px 20px 25px -10px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
        micro:
          '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
        small:
          '0px 2px 4px -5px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
