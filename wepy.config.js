const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['static'],
  build: {},
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@iconfont': path.join(__dirname, 'src/assets/iconfont/iconfont.less'),
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules'],
  },
  compilers: {
    less: {
      compress: prod,
    },
    babel: {
      sourceMap: true,
      presets: ['@babel/preset-env'],
      plugins: ['@wepy/babel-plugin-import-regenerator'],
    },
  },
  plugins: [],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
  },
};
