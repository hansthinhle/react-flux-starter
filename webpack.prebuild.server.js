var Server = require('./lib/server');
var path = require('path');
var config = require('./webpack.prebuild.config');

var options = {
  contentBase: path.join(__dirname, './app'),
  hot: true
};

Server(config, options, 'localhost', 3000);