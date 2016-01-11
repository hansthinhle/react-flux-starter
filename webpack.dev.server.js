import express from 'express';
import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import path from 'path';
import preProcess from 'preprocess';
import http from 'http';
import opn from 'opn';
import httpProxy from 'http-proxy';
import config from './config.json';

const hostname = config.hostname || 'localhost';
const port = config.port || 3000;
const proxyOptions = config.proxy || [];
const serverUrl = `http://${hostname}:${port}`;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});

const compiler = webpack(webpackDevConfig);

const app = express();

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

app.use('/assets', express.static(path.join(__dirname, 'app/assets')));

proxyOptions.forEach(option => {
  app.all(option.path, (req, res) => {
    proxy.web(req, res, option, err => {
      console.log(err.message);
      res.statusCode = 502;
      res.end();
    });
  });
});

app.get('*', (req, res) => {
  let indexSource = fs.readFileSync(path.join(__dirname, 'app/index.html'));
  res.send(preProcess.preprocess(indexSource, null, {
    srcDir: path.join(__dirname, 'app')
  }));
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Listening at ' + serverUrl);
  opn(serverUrl);
});
