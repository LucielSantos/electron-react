import colors from 'tailwindcss/colors';

module.exports = {
  purge: false,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
