const CleanCSS = require('clean-css');
const Terser = require('terser');
const dayjs = require('dayjs');
const slugify = require('@sindresorhus/slugify');

module.exports = {
  cssmin: function(code) {
    return new CleanCSS({}).minify(code).styles;
  },

  jsmin: function(code) {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    return minified.code;
  },

  dedupe: function(arr) {
    const uniqueArr = arr.reduce((acc, index) => {
      const x = acc.find(item => item.state === index.state);
      if (!x) {
        return acc.concat([index]);
      } else {
        return acc;
      }
    }, []);
    return uniqueArr;
  },

  slugify: function(str) {
    return slugify(str);
  },

  formatDate: function(date) {
    return dayjs(date).format('MMM D, YYYY');
  },

  sum: arr => arr.reduce((a, b) => a + b, 0)
};
