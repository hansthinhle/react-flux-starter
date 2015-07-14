var Server = require('./lib/server');
var path = require('path');
var config = require('./webpack.prebuild.config');

var options = {
  contentBase: path.join(__dirname, './app')
};

Server(config, options, 'localhost', 8080);