var WebpackConfig = require('./lib/webpack-config');

module.exports = WebpackConfig({
  hot: false,
  hash: false,
  debug: true,
  optimize: false,
  saveStats: false,
  failOnError: false,
  devTool: 'eval'
});
