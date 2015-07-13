var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.prebuild.config');
var path = require('path');
var opn = require('opn');

var webpackDevServer = new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, './app'),
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }
});

webpackDevServer.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening at http://localhost:3000');
    opn('http://localhost:3000');
  }
});