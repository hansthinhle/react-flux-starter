var path = require('path');
var webpack = require('webpack');
var bowerWebpackPlugin = require('bower-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, './app/app.js'),
    vendor: ['jquery', 'bootstrap', 'lodash']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      app: path.resolve(__dirname, './app'),
      test: path.resolve(__dirname, './test')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: extractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader!sass-loader?outputStyle=expanded&' +
          'includePaths[]=' +
          (path.resolve(__dirname, './app/bower_components')) + '&' +
          'includePaths[]=' +
          (path.resolve(__dirname, './node_modules')))
      },
      {
        test: /\.sass$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader!sass-loader?indentedSyntax=sass')
      },
      {
        test: /\.less$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new extractTextPlugin('[name].css'),
    new bowerWebpackPlugin({
      modulesDirectories: [path.resolve(__dirname, './app/bower_components')],
      excludes: /.*\.less/,
      searchResolveModulesDirectories: false
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'windows.jQuery': 'jquery'
    })
  ],
  stats: {
    children: false
  }
};
