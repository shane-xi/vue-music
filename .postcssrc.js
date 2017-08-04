// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-plugin-px2rem": {
      rootValue: 100,
      unitPrecision: 20,
      propWhiteList: [],
      propBlackList: ['font-size','line-height'],
      selectorBlackList: [/^(\.?vux)/,/^(\.?weui)/],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
}
