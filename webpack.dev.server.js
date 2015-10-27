var path = require('path');
var express = require('express');
var httpProxy = require('http-proxy');
var opn = require('opn');
var http = require('http');
var url = require('url');
var webpack = require('webpack');
var webpackDevConfig = require('./webpack.dev.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./config.json');
var fs = require('fs');
var preProcess = require('preprocess');

var app = express();
var compiler = webpack(webpackDevConfig);
var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});
var server = http.createServer(app);

var host = config.host || 'localhost';
var port = config.port || 3000;
var https = config.https || false;
var proxyOptions = config.proxy || [];

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackDevConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    version: false,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res) {
  var indexSource = fs.readFileSync(path.join(__dirname, 'app/index.html'));
  res.send(preProcess.preprocess(indexSource));
});

proxyOptions.forEach(function (option) {
  app.all(option.path, function (req, res) {
    proxy.web(req, res, option, function (err) {
      console.log(err.message);
      res.statusCode = 502;
      res.end();
    });
  });
});

server.listen(port, function () {
  var appUrl = url.format({
    hostname: host,
    port: port,
    protocol: https ? 'https' : 'http'
  });
  console.log('Listening at ' + appUrl);
  opn(appUrl);
});
