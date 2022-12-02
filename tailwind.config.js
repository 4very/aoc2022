module.exports = {
  content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['\"Source Code Pro\"', 'monospaced'],
      },
      colors: {
        aoc: {
          bg: '#0f0f23',
          lime: '#99ff99',
          green: '#009900',
          yellow: '#ffff66',
          gray: '#666666',
          darkgray: '#333333',
        },
      },
      dropShadow: {
        highlight: '0 0 5px #ffffff',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
