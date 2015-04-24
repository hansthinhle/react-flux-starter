var path = require('path');
var webpack = require('webpack');
var bowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
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
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './app/bower_components')) + '&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax=sass'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
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
  ]
};
